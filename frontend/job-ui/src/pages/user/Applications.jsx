import { useEffect, useState } from 'react';
import axios from 'axios';
import { BriefcaseIcon, ClockIcon, CalendarCheckIcon, CircleCheckIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

const statusColors = {
  pending: 'bg-yellow-100 text-yellow-800',
  reviewed: 'bg-blue-100 text-blue-800',
  accepted: 'bg-green-100 text-green-800',
  rejected: 'bg-red-100 text-red-800',
};

const Applications = () => {
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const res = await axios.get('/api/applications');
        setApplications(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchApplications();
  }, []);

  return (
    <div className="max-w-5xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">My Applications</h1>

      {applications.length === 0 ? (
        <p className="text-gray-500 dark:text-gray-400 text-lg">You haven’t applied to any jobs yet.</p>
      ) : (
        <div className="space-y-5">
          {applications.map((app) => (
            <div
              key={app._id}
              className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow border hover:shadow-md transition-all"
            >
              <div className="flex justify-between items-center mb-2">
                <h2 className="text-xl font-semibold text-blue-700 dark:text-blue-400">
                  {app.job?.title || 'Job Title'}
                </h2>
                <span
                  className={cn(
                    'text-sm font-medium px-3 py-1 rounded-full',
                    statusColors[app.status] || 'bg-gray-200 text-gray-800'
                  )}
                >
                  {app.status.charAt(0).toUpperCase() + app.status.slice(1)}
                </span>
              </div>

              <p className="text-sm text-gray-600 dark:text-gray-300 flex items-center gap-2">
                <BriefcaseIcon className="w-4 h-4" />
                {app.job?.company?.name || 'Unknown Company'}
              </p>

              <p className="text-sm text-gray-600 dark:text-gray-300 flex items-center gap-2">
                <CalendarCheckIcon className="w-4 h-4" />
                Applied on {new Date(app.createdAt).toLocaleDateString()}
              </p>

              {app.statusUpdatedAt && (
                <p className="text-sm text-gray-600 dark:text-gray-300 flex items-center gap-2">
                  <ClockIcon className="w-4 h-4" />
                  Last update {new Date(app.statusUpdatedAt).toLocaleDateString()}
                </p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Applications;
