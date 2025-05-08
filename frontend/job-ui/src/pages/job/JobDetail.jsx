import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { BookmarkIcon, BriefcaseIcon, MapPinIcon } from "lucide-react";
import axios from "axios";
import toast from "react-hot-toast";

const JobDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState(null);

  const fetchJob = async () => {
    try {
      const res = await axios.get(`/api/jobs/${id}`);
      setJob(res.data);
    } catch (err) {
      toast.error("Failed to fetch job details");
      navigate("/jobs");
    }
  };

  const handleApply = async () => {
    try {
      await axios.post("/api/applications", { jobId: id });
      toast.success("Application submitted!");
    } catch (err) {
      toast.error("Application failed");
    }
  };

  const handleBookmark = async () => {
    try {
      await axios.post("/api/bookmarks", { jobId: id });
      toast.success("Job bookmarked!");
    } catch (err) {
      toast.error("Bookmarking failed");
    }
  };

  useEffect(() => {
    fetchJob();
  }, [id]);

  if (!job)
    return (
      <div className="text-center py-20 text-gray-500">Loading job...</div>
    );

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-xl p-8 space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-blue-600">{job.title}</h1>
          <p className="text-lg mt-1 text-gray-700 dark:text-gray-300">
            {job.companyName}
          </p>
        </div>

        <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400 flex-wrap">
          <div className="flex items-center gap-1">
            <MapPinIcon className="w-4 h-4" />
            <span>{job.location || "Remote"}</span>
          </div>
          <div className="flex items-center gap-1">
            <BriefcaseIcon className="w-4 h-4" />
            <span>{job.type || "Full-time"}</span>
          </div>
        </div>

        <div className="text-gray-800 dark:text-gray-200 leading-relaxed space-y-4">
          <h3 className="text-xl font-semibold">Job Description</h3>
          <p>{job.description}</p>
        </div>

        <div className="flex items-center gap-4 mt-6">
          <Button onClick={handleApply}>Apply Now</Button>
          <Button onClick={handleBookmark} variant="ghost">
            <BookmarkIcon className="w-5 h-5 mr-2" />
            Bookmark
          </Button>
        </div>
      </div>
    </div>
  );
};

export default JobDetail;
