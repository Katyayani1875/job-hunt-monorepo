// ProfilePage.jsx
import { useState, useEffect } from "react";
import { Card, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Progress } from "../components/ui/progress";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import { Input } from "../components/ui/input";
import { motion } from "framer-motion";
import axios from "axios";

// Lucide Icons
import {
  UserCircle,
  BrainCircuit,
  Zap,
  CheckCircle,
  Edit,
  Camera,
  LogIn,
  UserPlus,
} from "lucide-react";

// Create a reusable axios instance
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

export default function ProfilePage({ userType, isLoggedIn, userName }) {
  const [profileCompletion, setProfileCompletion] = useState(0);
  const [activeTab, setActiveTab] = useState("overview");
  const [aiInsights, setAiInsights] = useState({
    resumeScore: null,
    jobMatches: [],
  });
  const [avatarImage, setAvatarImage] = useState("https://i.pravatar.cc/150?img=5");

  useEffect(() => {
    api
      .get(`/profile/completion?type=${userType}`)
      .then((res) => setProfileCompletion(res.data.percentage))
      .catch(() => setProfileCompletion(0));
  }, [userType]);

  const handleAnalyzeResume = async () => {
    const response = await api.post("/ai/analyze-resume", {
      text: "sample resume text",
    });
    setAiInsights((prev) => ({ ...prev, resumeScore: response.data.analysis }));
  };

  const handleRecommendJobs = async () => {
    const response = await api.post("/ai/recommend-jobs", {
      skills: "React, Node.js",
    });
    setAiInsights((prev) => ({
      ...prev,
      jobMatches: response.data.recommendations,
    }));
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-semibold text-gray-800 mb-4">
        {userType === "candidate" ? "Candidate Profile" : "Employer Profile"}
      </h1>

      {/* Greeting Message */}
      <div className="p-4 bg-blue-50 rounded-xl flex items-center justify-between shadow-inner">
        {isLoggedIn ? (
          <h2 className="text-lg text-gray-700 font-medium">
            Hi <span className="font-bold text-blue-600">{userName}</span>!
          </h2>
        ) : (
          <div className="flex items-center gap-3">
            <h2 className="text-lg text-gray-700 font-medium">Welcome! Please</h2>
            <Button variant="outline" size="sm">
              <LogIn className="h-4 w-4 mr-1" /> Login
            </Button>
            <Button variant="outline" size="sm">
              <UserPlus className="h-4 w-4 mr-1" /> Register
            </Button>
          </div>
        )}
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3 bg-gray-100 rounded-xl shadow-inner">
          <TabButton value="overview" label="Overview" icon={<UserCircle className="h-4 w-4 mr-1" />} activeTab={activeTab} />
          <TabButton value="ai" label="AI Insights" icon={<BrainCircuit className="h-4 w-4 mr-1" />} activeTab={activeTab} />
          <TabButton value="actions" label="Quick Actions" icon={<Zap className="h-4 w-4 mr-1" />} activeTab={activeTab} />
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview">
          <div className="space-y-4">
            <CandidateProfileHeader
              name={userName}
              title={userType === "candidate" ? "Frontend Developer" : "Employer Representative"}
              completion={profileCompletion}
              avatarImage={avatarImage}
              handleAvatarChange={handleAvatarChange}
            />
            <EditableSectionCard title="Basic Information" fields={["Full Name", "Email", "Phone", "Location"]} />
            <EditableSectionCard title="Professional Summary" fields={["Short Bio"]} />
            <EditableSectionCard title="Work Experience" fields={["Company", "Job Title", "Duration"]} />
            <EditableSectionCard title="Skills" fields={["Technical Skills", "Soft Skills"]} />
            <EditableSectionCard title="Education" fields={["Degree", "University"]} />
            <EditableSectionCard title="Certifications & Projects" fields={["Certifications", "Projects"]} />
            <EditableSectionCard title="Preferences" fields={["Preferred Job Type", "Notice Period"]} />
          </div>
        </TabsContent>

        {/* AI Insights Tab */}
        <TabsContent value="ai">
          <Card className="bg-white/60 backdrop-blur-xl rounded-2xl shadow-lg">
            <CardContent className="p-6 space-y-4">
              <h3 className="text-lg font-bold text-gray-700">AI Powered Insights</h3>
              <div className="flex gap-3 flex-wrap">
                <Button onClick={handleAnalyzeResume}>Analyze Resume</Button>
                <Button onClick={handleRecommendJobs} variant="secondary">
                  Recommend Jobs
                </Button>
              </div>
              <div className="text-gray-700 mt-4">
                <p>
                  <strong>Resume Analysis:</strong>{" "}
                  {aiInsights.resumeScore ? JSON.stringify(aiInsights.resumeScore) : "Not yet analyzed."}
                </p>
                <p className="mt-2 font-semibold">Job Recommendations:</p>
                <ul className="list-disc list-inside">
                  {aiInsights.jobMatches.map((job, index) => (
                    <li key={index}>{job}</li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Quick Actions Tab */}
        <TabsContent value="actions">
          <Card className="bg-white/60 backdrop-blur-xl rounded-2xl shadow-lg">
            <CardContent className="p-6 space-y-4">
              <h3 className="text-lg font-bold text-gray-700">Quick Actions</h3>
              <div className="flex flex-wrap gap-3">
                {userType === "candidate" ? (
                  <>
                    <Button variant="outline">Upload Resume</Button>
                    <Button variant="outline">View Applied Jobs</Button>
                    <Button variant="outline">Saved Jobs</Button>
                  </>
                ) : (
                  <>
                    <Button variant="outline">Post New Job</Button>
                    <Button variant="outline">View Applications</Button>
                    <Button variant="outline">Analytics Dashboard</Button>
                  </>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

// ---------- Enhanced Components ----------

function CandidateProfileHeader({ name, title, completion, avatarImage, handleAvatarChange }) {
  return (
    <Card className="shadow-md rounded-2xl p-4 flex items-center gap-4 bg-gradient-to-r from-blue-50 via-white to-blue-50">
      <div className="relative group">
        <Avatar className="h-16 w-16">
          <AvatarImage src={avatarImage} alt="Profile" />
          <AvatarFallback>{name ? name[0] : "U"}</AvatarFallback>
        </Avatar>
        <label className="absolute bottom-0 right-0 bg-white rounded-full p-1 cursor-pointer border group-hover:scale-110 transition-transform">
          <Camera className="h-4 w-4 text-gray-600" />
          <input type="file" accept="image/*" className="hidden" onChange={handleAvatarChange} />
        </label>
      </div>
      <div className="flex-1">
        <h2 className="text-xl font-bold text-gray-800">Hi {name}!</h2>
        <p className="text-gray-600">{title}</p>
        <Progress value={completion} className="h-2 mt-2 rounded-full" />
        <p className="text-xs text-gray-500 mt-1">{completion}% Complete</p>
      </div>
      <Button variant="secondary">Complete Profile</Button>
    </Card>
  );
}

function EditableSectionCard({ title, fields }) {
  const [isEditing, setIsEditing] = useState(false);
  const [values, setValues] = useState(Object.fromEntries(fields.map(f => [f, ""])));

  const handleChange = (field, value) => {
    setValues((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <Card className="shadow-md rounded-xl border hover:shadow-lg transition-shadow">
      <CardContent className="p-4 space-y-2">
        <div className="flex items-center justify-between">
          <h4 className="text-md font-semibold text-gray-700">{title}</h4>
          <Button size="icon" variant="ghost" onClick={() => setIsEditing(!isEditing)}>
            <Edit className={`h-4 w-4 ${isEditing ? "text-blue-600" : "text-gray-500"}`} />
          </Button>
        </div>
        <ul className="grid grid-cols-2 gap-2 text-gray-800 text-sm">
          {fields.map((field, idx) => (
            <li key={idx} className="flex items-center gap-1">
              <CheckCircle className="h-3 w-3 text-green-500" />
              {isEditing ? (
                <Input
                  value={values[field]}
                  placeholder={field}
                  onChange={(e) => handleChange(field, e.target.value)}
                  className="h-7 text-sm"
                />
              ) : (
                <span className="hover:text-blue-600 transition">{values[field] || field}</span>
              )}
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}

function TabButton({ value, label, icon, activeTab }) {
  const isActive = activeTab === value;
  return (
    <TabsTrigger value={value} className="relative flex items-center justify-center gap-1 py-2 text-sm font-medium text-gray-600 hover:text-blue-600 transition">
      {icon} {label}
      {isActive && (
        <motion.div
          layoutId="underline"
          className="absolute bottom-0 h-[3px] w-3/4 bg-blue-500 rounded-full"
        />
      )}
    </TabsTrigger>
  );
}
