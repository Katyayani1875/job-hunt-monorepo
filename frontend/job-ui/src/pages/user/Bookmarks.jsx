import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { BookmarkMinusIcon, BriefcaseIcon, MapPinIcon, CalendarIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Bookmarks = () => {
  const [bookmarkedJobs, setBookmarkedJobs] = useState([]);

  useEffect(() => {
    const fetchBookmarks = async () => {
      try {
        const res = await axios.get('/api/bookmarks');
        setBookmarkedJobs(res.data);
      } catch (err) {
        console.error(err);
        toast.error('Failed to load bookmarks.');
      }
    };

    fetchBookmarks();
  }, []);

  const handleRemove = async (jobId) => {
    try {
      await axios.delete(`/api/bookmarks/${jobId}`);
      setBookmarkedJobs(prev => prev.filter(job => job._id !== jobId));
      toast.success('Removed from bookmarks.');
    } catch (err) {
      toast.error('Failed to remove bookmark.');
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">Bookmarked Jobs</h1>

      {bookmarkedJobs.length === 0 ? (
        <p className="text-gray-500 dark:text-gray-400 text-lg">No bookmarked jobs yet.</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2">
          {bookmarkedJobs.map((job) => (
            <div
              key={job._id}
              className="bg-white dark:bg-gray-800 shadow-md rounded-xl p-5 border hover:shadow-lg transition-all"
            >
              <h2 className="text-xl font-semibold text-blue-700 dark:text-blue-400 mb-2">
                {job.title}
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-1 flex items-center gap-2">
                <BriefcaseIcon className="w-4 h-4" />
                {job.company?.name || 'Unknown Company'}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-1 flex items-center gap-2">
                <MapPinIcon className="w-4 h-4" />
                {job.location}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-300 flex items-center gap-2">
                <CalendarIcon className="w-4 h-4" />
                Posted on {new Date(job.createdAt).toLocaleDateString()}
              </p>

              <div className="mt-4 flex justify-between items-center">
                <Link to={`/jobs/${job._id}`}>
                  <Button size="sm">View Job</Button>
                </Link>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => handleRemove(job._id)}
                >
                  <BookmarkMinusIcon className="w-4 h-4 mr-1" />
                  Remove
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Bookmarks;
