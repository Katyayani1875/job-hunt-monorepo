// src/pages/Home.jsx

import { useState, useEffect } from "react";
import { Search, MapPin, ChevronDown } from "lucide-react";
import CountUp from "react-countup";
import JobTitleSearch from "@/components/JobTitleSearch";
import { fetchJobs } from "@/api/jobApi";

export default function HeroSection() {
  const [jobTitle, setJobTitle] = useState("");
  const [location, setLocation] = useState("");
  const [category, setCategory] = useState("");
  const [jobs, setJobs] = useState([]);
  const [debouncedJobTitle, setDebouncedJobTitle] = useState(jobTitle);

  // Debounce the jobTitle input
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedJobTitle(jobTitle);
    }, 500); // 500ms debounce delay

    return () => {
      clearTimeout(handler);
    };
  }, [jobTitle]);

  // Fetch jobs when debouncedJobTitle, location, or category changes
  useEffect(() => {
    const search = async () => {
      if (debouncedJobTitle || location || category) {
        const results = await fetchJobs({
          title: debouncedJobTitle,
          location,
          category,
        });
        setJobs(results);
      } else {
        setJobs([]);
      }
    };
    search();
  }, [debouncedJobTitle, location, category]);

  return (
    <section className="relative bg-gradient-to-b from-white to-[#f9fbff] dark:from-[#0C1A2B] dark:to-[#0C1A2B] py-16 px-4 md:px-20 overflow-hidden transition-colors duration-500">
      {/* Decorative Gradient Shape */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-blue-100 dark:bg-blue-900 rounded-full blur-3xl opacity-50 z-0" />

      {/* Hero Title */}
      <div className="relative z-10 text-center mb-10">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900 dark:text-white">
          Discover Your{" "}
          <span className="bg-gradient-to-r from-blue-600 to-indigo-500 text-transparent bg-clip-text">
            Next Opportunity
          </span>
        </h1>
        <p className="mt-4 text-gray-600 dark:text-gray-300 text-lg max-w-2xl mx-auto">
          Match with top companies, get AI-generated career support,
          <br className="hidden md:block" />
          and land your dream job faster.
        </p>
      </div>

      {/* Job Stats */}
      <div className="relative z-10 text-center mt-4 mb-8 text-gray-700 dark:text-gray-400 text-sm md:text-base">
        🔍 <CountUp end={1200} duration={2} />+ jobs available | 👥{" "}
        <CountUp end={300} duration={2} />+ companies hiring now
      </div>

      {/* Search Bar */}
      <div className="relative z-10 max-w-5xl mx-auto bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-4 flex flex-col md:flex-row gap-4 items-center transition-colors duration-500">
        <div className="flex-1">
          <JobTitleSearch
            value={jobTitle}
            onChange={(val) => setJobTitle(val)}
            onSelect={(val) => setJobTitle(val)}
          />
        </div>

        <div className="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-700 rounded-lg flex-1">
          <MapPin size={18} className="text-gray-500 dark:text-gray-300" />
          <input
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Location"
            className="bg-transparent w-full outline-none text-sm text-gray-800 dark:text-white dark:placeholder-gray-400"
          />
        </div>

        <div className="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-700 rounded-lg cursor-pointer">
          <span className="text-sm text-gray-600 dark:text-gray-200">
            All Categories
          </span>
          <ChevronDown size={16} className="text-gray-500 dark:text-gray-300" />
        </div>

        <button
          onClick={() => {
            setDebouncedJobTitle(jobTitle); // Trigger immediate search on button click
          }}
          className="bg-blue-600 text-white px-6 py-2 rounded-xl transition-transform transform hover:scale-105 duration-300"
        >
          Search Jobs
        </button>
      </div>

      {/* Popular Categories */}
      <div className="relative z-10 mt-16 text-center">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-8">
          Popular Categories
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
          {[
            { title: "IT", icon: "💻", slug: "it" },
            { title: "Finance", icon: "💰", slug: "finance" },
            { title: "Design", icon: "🎨", slug: "design" },
            { title: "Marketing", icon: "📣", slug: "marketing" },
          ].map((cat) => (
            <a
              key={cat.title}
              href={`/jobs/category/${cat.slug}`}
              className="flex flex-col items-center bg-white dark:bg-gray-800 shadow-md rounded-xl p-6 hover:shadow-xl hover:scale-105 transition-all cursor-pointer"
            >
              <div className="text-3xl">{cat.icon}</div>
              <span className="mt-2 text-gray-700 dark:text-gray-200 font-medium">
                {cat.title}
              </span>
            </a>
          ))}
        </div>

        {/* Browse All CTA */}
        <div className="mt-6">
          <a
            href="/jobs"
            className="inline-block mt-4 px-6 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900 transition"
          >
            Browse All Jobs
          </a>
        </div>
      </div>

      {/* Top Hiring Companies */}
      <div className="relative z-10 mt-14 text-center">
        <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
          Trusted by top companies
        </p>
        <div className="flex justify-center gap-8 items-center flex-wrap">
          {["google", "microsoft", "tata", "amazon"].map((name) => (
            <img
              key={name}
              src={`/logos/${name}.png`}
              alt={name}
              className="h-10 object-contain"
            />
          ))}
        </div>
      </div>

      {/* Job Results */}
      {jobs.length > 0 && (
        <div className="relative z-10 mt-16 max-w-5xl mx-auto">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
            Job Results
          </h2>
          <ul className="space-y-4">
            {jobs.map((job) => (
              <li
                key={job._id}
                className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow flex flex-col"
              >
                <span className="text-lg font-medium text-gray-900 dark:text-white">
                  {job.title}
                </span>
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  {job.company?.name || "Unknown Company"} • {job.location}
                </span>
                <span className="text-sm text-blue-500">{job.category}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
}
