import React from 'react';
import { BriefcaseIcon, MapPinIcon, ClockIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
const jobs = [
    {
      title: "Frontend Developer",
      company: "Google",
      type: "Remote",
    },
    {
      title: "Finance Analyst",
      company: "Deloitte",
      type: "Full-time",
    },
  ];
  
  const FeaturedJobs = () => {
    return (
      <section className="py-12 bg-gray-50 dark:bg-gray-800">
        <h2 className="text-2xl font-bold text-center mb-6">Featured Jobs</h2>
        <div className="grid gap-6 max-w-4xl mx-auto">
          {jobs.map((job, index) => (
            <div
              key={index}
              className="p-6 bg-white dark:bg-gray-900 rounded-xl border dark:border-gray-700 shadow flex justify-between items-center"
            >
              <div>
                <h3 className="text-lg font-semibold">{job.title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">{job.company} • {job.type}</p>
              </div>
              <div className="flex gap-2">
                <Button size="sm">Apply Now</Button>
                <Button variant="outline" size="sm">Save</Button>
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  };
  
  export default FeaturedJobs;