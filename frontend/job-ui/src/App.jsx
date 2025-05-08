import SplashScreen from './pages/SplashScreen'; 
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Navbar from './components/shared/Navbar';
import Footer from './components/shared/Footer';
import Home from './pages/Home';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Jobs from './pages/job/Jobs';
import JobDetail from './pages/job/JobDetail';
import Dashboard from './pages/dashboard/Dashboard';
import ResumeUpload from './pages/resume/ResumeUpload';
import Bookmarks from './pages/user/Bookmarks';
import Applications from './pages/user/Applications';
import CoverLetter from './pages/ai/CoverLetter';
import SmartJobPost from './pages/ai/SmartJobPost';
import AnalyzeResume from './pages/ai/AnalyzeResume';
import RecommendJobs from './pages/ai/RecommendJobs';
import ChatAssistant from './pages/ai/ChatAssistant';
import CompanyProfile from './pages/company/CompanyProfile';
import NotFound from './pages/NotFound';
import ProfilePage from "./pages/ProfilePage";



function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
        <Navbar />
        <main className="flex-1 container mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Routes>
            <Route path="/" element={<SplashScreen />} />
            <Route path="/home" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/jobs" element={<Jobs />} />
            <Route path="/jobs/:id" element={<JobDetail />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/resume" element={<ResumeUpload />} />
            <Route path="/bookmarks" element={<Bookmarks />} />
            <Route path="/applications" element={<Applications />} />
            <Route path="/ai/cover-letter" element={<CoverLetter />} />
            <Route path="/ai/smart-job-post" element={<SmartJobPost />} />
            <Route path="/ai/analyze-resume" element={<AnalyzeResume />} />
            <Route path="/ai/recommend-jobs" element={<RecommendJobs />} />
            <Route path="/ai/chat" element={<ChatAssistant />} />
            <Route path="/company/profile" element={<CompanyProfile />} />
            <Route path="*" element={<NotFound />} />
            <Route path="/candidate-profile" element={<ProfilePage userType="candidate" />} />
            <Route path="/employer-profile" element={<ProfilePage userType="employer" />} />
          </Routes>
        </main>
        <Footer />
        <Toaster position="top-center" reverseOrder={false} />
      </div>
    </Router>
  );
}

export default App;
