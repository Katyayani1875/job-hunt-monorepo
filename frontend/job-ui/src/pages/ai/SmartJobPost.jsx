import { useState } from "react";
import axios from "axios";
import { Textarea } from "@/components/ui/Textarea";
import { Button } from "@/components/ui/button";
import { Briefcase, Loader } from "lucide-react";
import toast from "react-hot-toast";

const SmartJobPost = () => {
  const [formData, setFormData] = useState({
    title: "",
    role: "",
    skills: "",
  });

  const [generatedPost, setGeneratedPost] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleGenerate = async () => {
    const { title, role, skills } = formData;
    if (!title || !role || !skills) {
      return toast.error("All fields are required");
    }

    const prompt = `
      Generate a professional, clear, and engaging job post for the position of "${title}".
      Role: ${role}
      Required Skills: ${skills}
    `;

    try {
      setLoading(true);
      const res = await axios.post("/api/ai/smart-job-post", { prompt });
      setGeneratedPost(res.data.jobPost || res.data || "No response from AI.");
    } catch (err) {
      console.error(err);
      toast.error("Failed to generate job post.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white flex items-center gap-2">
        <Briefcase className="w-6 h-6 text-emerald-600" />
        AI Smart Job Post Generator
      </h1>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <input
            type="text"
            name="title"
            placeholder="Job Title (e.g., Backend Developer)"
            value={formData.title}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg dark:bg-gray-800 dark:text-white"
          />
          <Textarea
            name="role"
            placeholder="Brief Role Description..."
            value={formData.role}
            onChange={handleChange}
            className="h-32"
          />
          <Textarea
            name="skills"
            placeholder="Required Skills (comma-separated)..."
            value={formData.skills}
            onChange={handleChange}
            className="h-32"
          />

          <Button
            onClick={handleGenerate}
            disabled={loading}
            className="w-full"
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <Loader className="animate-spin w-4 h-4" />
                Generating...
              </span>
            ) : (
              "Generate Job Post"
            )}
          </Button>
        </div>

        <div>
          <h2 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">
            Generated Job Post:
          </h2>
          <div className="p-4 border rounded-lg bg-white dark:bg-gray-900 dark:text-gray-100 min-h-[300px] whitespace-pre-wrap">
            {loading
              ? "Generating your job post..."
              : generatedPost || "Your AI-generated job post will appear here."}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SmartJobPost;
