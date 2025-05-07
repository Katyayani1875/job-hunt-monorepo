import { useState } from "react";
import axios from "axios";
import { Textarea } from "@/components/ui/Textarea";
import { Button } from "@/components/ui/button";
import { Loader, FileTextIcon } from "lucide-react";
import toast from "react-hot-toast";

const CoverLetter = () => {
  const [formData, setFormData] = useState({
    jobTitle: "",
    companyName: "",
    userSkills: "",
  });

  const [generating, setGenerating] = useState(false);
  const [generatedLetter, setGeneratedLetter] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleGenerate = async () => {
    if (!formData.jobTitle || !formData.companyName || !formData.userSkills) {
      return toast.error("Please fill in all fields");
    }

    setGenerating(true);
    setGeneratedLetter("");

    const prompt = `
      Write a professional and personalized cover letter for a position as a "${formData.jobTitle}" at "${formData.companyName}". 
      The candidate has the following skills and experience: ${formData.userSkills}.
    `;

    try {
      const res = await axios.post("/api/ai/cover-letter", { prompt });
      setGeneratedLetter(
        res.data.coverLetter || res.data || "No response from AI."
      );
    } catch (err) {
      console.error(err);
      toast.error("Failed to generate cover letter.");
    } finally {
      setGenerating(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white flex items-center gap-2">
        <FileTextIcon className="w-6 h-6 text-blue-600" />
        AI Cover Letter Generator
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <input
            type="text"
            name="jobTitle"
            placeholder="Job Title (e.g., Frontend Developer)"
            value={formData.jobTitle}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg dark:bg-gray-800 dark:text-white"
          />
          <input
            type="text"
            name="companyName"
            placeholder="Company Name (e.g., Google)"
            value={formData.companyName}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg dark:bg-gray-800 dark:text-white"
          />
          <Textarea
            name="userSkills"
            placeholder="Your skills, experiences, or achievements..."
            value={formData.userSkills}
            onChange={handleChange}
            className="h-40"
          />

          <Button
            onClick={handleGenerate}
            disabled={generating}
            className="w-full"
          >
            {generating ? (
              <span className="flex items-center gap-2">
                <Loader className="animate-spin w-4 h-4" />
                Generating...
              </span>
            ) : (
              "Generate Cover Letter"
            )}
          </Button>
        </div>

        <div>
          <h2 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">
            Generated Cover Letter:
          </h2>
          <div className="p-4 border rounded-lg bg-white dark:bg-gray-900 dark:text-gray-100 min-h-[300px] whitespace-pre-wrap">
            {generating
              ? "Generating your cover letter..."
              : generatedLetter || "Your cover letter will appear here."}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoverLetter;
