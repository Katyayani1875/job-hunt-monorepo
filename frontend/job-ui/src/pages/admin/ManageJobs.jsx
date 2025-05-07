import { useEffect, useState } from "react";
import axios from "axios";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/button";
import { Loader } from "@/components/shared/Loader";
import { Trash2, Briefcase } from "lucide-react";
import { toast } from "react-hot-toast";

const ManageJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await axios.get("/api/jobs");
        setJobs(res.data);
        setFiltered(res.data);
      } catch (err) {
        console.error("Failed to fetch jobs", err);
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, []);

  useEffect(() => {
    const q = query.toLowerCase();
    setFiltered(
      jobs.filter(
        (j) =>
          j.title.toLowerCase().includes(q) ||
          j.company.name.toLowerCase().includes(q)
      )
    );
  }, [query, jobs]);

  const handleDelete = async (id) => {
    if (!confirm("Delete this job post?")) return;
    try {
      await axios.delete(`/api/jobs/${id}`);
      toast.success("Job deleted");
      setJobs((prev) => prev.filter((j) => j._id !== id));
    } catch (err) {
      console.error("Error deleting job", err);
      toast.error("Delete failed");
    }
  };

  return (
    <section className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Manage Job Posts</h1>
        <Input
          placeholder="Search by job title or company..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-64"
        />
      </div>

      {loading ? (
        <Loader />
      ) : filtered.length === 0 ? (
        <p className="text-gray-500">No job posts found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto border rounded-md">
            <thead className="bg-gray-100 dark:bg-gray-800 text-left">
              <tr>
                <th className="p-3">Title</th>
                <th className="p-3">Company</th>
                <th className="p-3">Location</th>
                <th className="p-3">Posted</th>
                <th className="p-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((job) => (
                <tr
                  key={job._id}
                  className="border-t hover:bg-gray-50 dark:hover:bg-gray-700"
                >
                  <td className="p-3 flex items-center gap-2">
                    <Briefcase className="w-4 h-4 text-blue-500" />
                    {job.title}
                  </td>
                  <td className="p-3">{job.company.name}</td>
                  <td className="p-3">{job.location}</td>
                  <td className="p-3">
                    {new Date(job.createdAt).toLocaleDateString()}
                  </td>
                  <td className="p-3 text-center">
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDelete(job._id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
};

export default ManageJobs;
