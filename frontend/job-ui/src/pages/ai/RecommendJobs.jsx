import { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { BadgeCheck, FileSearch, Loader } from 'lucide-react';
import { Button } from '@/components/ui/button';

const RecommendJobs = () => {
  const [input, setInput] = useState('');
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleRecommend = async () => {
    if (!input.trim()) return toast.error('Please enter your skills or experience.');

    try {
      setLoading(true);
      const res = await axios.post('/api/ai/recommend-jobs', { prompt: input });
      setRecommendations(res.data.jobs || []);
    } catch (err) {
      console.error(err);
      toast.error('Failed to fetch recommendations.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-2 mb-8">
        <FileSearch className="w-6 h-6 text-indigo-600" />
        AI Job Recommender
      </h1>

      <div className="bg-white dark:bg-gray-900 rounded-xl shadow border border-gray-200 dark:border-gray-700 p-6">
        <textarea
          rows="4"
          placeholder="Describe your skills, experience, or paste your resume content..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="w-full p-4 border rounded-md text-sm bg-gray-50 dark:bg-gray-800 dark:text-white"
        ></textarea>

        <Button onClick={handleRecommend} className="mt-4" disabled={loading}>
          {loading ? (
            <span className="flex items-center gap-2">
              <Loader className="w-4 h-4 animate-spin" />
              Recommending...
            </span>
          ) : (
            <span className="flex items-center gap-2">
              <BadgeCheck className="w-4 h-4" />
              Recommend Jobs
            </span>
          )}
        </Button>

        {recommendations.length > 0 && (
          <div className="mt-8 space-y-4">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white">Recommended Jobs:</h2>
            <ul className="grid gap-4 sm:grid-cols-2">
              {recommendations.map((job, idx) => (
                <li
                  key={idx}
                  className="p-4 rounded-lg border bg-gray-50 dark:bg-gray-800 dark:text-white hover:shadow-md transition-all"
                >
                  <h3 className="text-lg font-medium text-indigo-700 dark:text-indigo-300">{job.title}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">{job.description}</p>
                  <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">Location: {job.location}</p>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default RecommendJobs;
