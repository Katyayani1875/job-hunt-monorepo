import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/button";
import { BriefcaseIcon, MapPinIcon, SearchIcon } from "lucide-react";
import axios from "axios";

const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const [query, setQuery] = useState("");

  const fetchJobs = async () => {
    try {
      const res = await axios.get("/api/jobs");
      setJobs(res.data);
    } catch (error) {
      console.error("Error fetching jobs:", error);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const filteredJobs = jobs.filter((job) =>
    job.title.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-bold mb-6 text-center">
        Explore Job Opportunities
      </h1>

      {/* Search bar */}
      <div className="mb-8 flex flex-col sm:flex-row items-center justify-center gap-4">
        <div className="w-full sm:w-2/3">
          <Input
            placeholder="Search by job title, company, or skills..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            icon={<SearchIcon />}
          />
        </div>
        <Button onClick={fetchJobs}>Refresh</Button>
      </div>

      {/* Job listings */}
      {filteredJobs.length === 0 ? (
        <p className="text-center text-gray-500">No jobs found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredJobs.map((job) => (
            <Link to={`/jobs/${job._id}`} key={job._id}>
              <div className="p-6 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl shadow hover:shadow-lg transition duration-200 hover:scale-[1.01]">
                <h2 className="text-xl font-semibold text-blue-600">
                  {job.title}
                </h2>
                <p className="mt-1 text-gray-700 dark:text-gray-300">
                  {job.companyName}
                </p>
                <div className="mt-2 flex items-center text-sm text-gray-500 dark:text-gray-400 gap-2">
                  <MapPinIcon className="w-4 h-4" />
                  <span>{job.location || "Remote"}</span>
                </div>
                <div className="mt-2 flex items-center text-sm text-gray-500 dark:text-gray-400 gap-2">
                  <BriefcaseIcon className="w-4 h-4" />
                  <span>{job.type || "Full-time"}</span>
                </div>
                <p className="mt-4 text-sm text-gray-600 dark:text-gray-400 line-clamp-3">
                  {job.description}
                </p>
                <div className="mt-4">
                  <Button size="sm" variant="secondary">
                    View Details
                  </Button>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default Jobs;
