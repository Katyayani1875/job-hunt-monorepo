import { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import {
  FileTextIcon,
  UserIcon,
  BookmarkIcon,
  BriefcaseIcon,
  LayoutDashboardIcon,
  Building2Icon,
} from 'lucide-react';

const Dashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({});
  const navigate = useNavigate();

  const fetchStats = async () => {
    try {
      const res = await axios.get('/api/users/me'); // Profile includes role and other data
      setStats(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  if (!user) return <div className="text-center py-20 text-gray-500">Loading dashboard...</div>;

  const isCandidate = user.role === 'candidate';
  const isEmployer = user.role === 'employer';
  const isAdmin = user.role === 'admin';

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Welcome, {user.name}</h1>
        <p className="text-gray-600 dark:text-gray-400">Your personalized dashboard</p>
      </div>

      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {isCandidate && (
          <>
            <DashboardCard
              title="Resume"
              icon={<FileTextIcon className="w-6 h-6 text-blue-600" />}
              action="Upload or View"
              onClick={() => navigate('/resume')}
            />
            <DashboardCard
              title="My Applications"
              icon={<BriefcaseIcon className="w-6 h-6 text-green-600" />}
              action="View Applications"
              onClick={() => navigate('/applications')}
            />
            <DashboardCard
              title="Bookmarked Jobs"
              icon={<BookmarkIcon className="w-6 h-6 text-purple-600" />}
              action="View Bookmarks"
              onClick={() => navigate('/bookmarks')}
            />
            <DashboardCard
              title="AI Assistant"
              icon={<LayoutDashboardIcon className="w-6 h-6 text-pink-600" />}
              action="Open AI Tools"
              onClick={() => navigate('/ai/chat')}
            />
          </>
        )}

        {isEmployer && (
          <>
            <DashboardCard
              title="Company Profile"
              icon={<Building2Icon className="w-6 h-6 text-indigo-600" />}
              action="Manage Profile"
              onClick={() => navigate('/companies')}
            />
            <DashboardCard
              title="Post a Job"
              icon={<BriefcaseIcon className="w-6 h-6 text-blue-600" />}
              action="Create Job"
              onClick={() => navigate('/ai/smart-job-post')}
            />
            <DashboardCard
              title="Posted Jobs"
              icon={<LayoutDashboardIcon className="w-6 h-6 text-teal-600" />}
              action="Manage Jobs"
              onClick={() => navigate('/jobs')}
            />
          </>
        )}

        {isAdmin && (
          <>
            <DashboardCard
              title="Users"
              icon={<UserIcon className="w-6 h-6 text-blue-600" />}
              action="Manage Users"
              onClick={() => navigate('/admin/users')}
            />
            <DashboardCard
              title="Jobs"
              icon={<BriefcaseIcon className="w-6 h-6 text-green-600" />}
              action="Manage Jobs"
              onClick={() => navigate('/admin/jobs')}
            />
            <DashboardCard
              title="Categories"
              icon={<LayoutDashboardIcon className="w-6 h-6 text-purple-600" />}
              action="Manage Categories"
              onClick={() => navigate('/admin/categories')}
            />
          </>
        )}
      </div>
    </div>
  );
};

const DashboardCard = ({ title, icon, action, onClick }) => (
  <div
    className="bg-white dark:bg-gray-800 shadow-md rounded-2xl p-6 cursor-pointer hover:shadow-xl transition"
    onClick={onClick}
  >
    <div className="flex items-center space-x-4 mb-4">
      <div className="p-3 rounded-full bg-gray-100 dark:bg-gray-700">{icon}</div>
      <h2 className="text-xl font-semibold text-gray-900 dark:text-white">{title}</h2>
    </div>
    <Button variant="outline" className="w-full">
      {action}
    </Button>
  </div>
);

export default Dashboard;
