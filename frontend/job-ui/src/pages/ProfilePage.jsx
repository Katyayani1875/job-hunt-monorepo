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
import { Badge } from "../components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import { motion } from "framer-motion";
import axios from "axios";

// Lucide Icons
import {
  UserCircle,
  BrainCircuit,
  LightningBolt,
  CheckCircle,
  Edit,
} from "lucide-react";

export default function ProfilePage({ userType }) {
  const [profileCompletion, setProfileCompletion] = useState(0);
  const [activeTab, setActiveTab] = useState("overview");
  const [aiInsights, setAiInsights] = useState({
    resumeScore: null,
    jobMatches: [],
  });

  useEffect(() => {
    axios
      .get(`/api/profile/completion?type=${userType}`)
      .then((res) => setProfileCompletion(res.data.percentage))
      .catch(() => setProfileCompletion(0));
  }, [userType]);

  const handleAnalyzeResume = async () => {
    const response = await axios.post("/api/ai/analyze-resume", {
      text: "sample resume text",
    });
    setAiInsights((prev) => ({ ...prev, resumeScore: response.data.analysis }));
  };

  const handleRecommendJobs = async () => {
    const response = await axios.post("/api/ai/recommend-jobs", {
      skills: "React, Node.js",
    });
    setAiInsights((prev) => ({
      ...prev,
      jobMatches: response.data.recommendations,
    }));
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-semibold text-gray-800 mb-4">
        {userType === "candidate" ? "Candidate Profile" : "Employer Profile"}
      </h1>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3 bg-gray-100 rounded-xl shadow-inner">
          <TabButton value="overview" label="Overview" icon={<UserCircle className="h-4 w-4 mr-1" />} activeTab={activeTab} />
          <TabButton value="ai" label="AI Insights" icon={<BrainCircuit className="h-4 w-4 mr-1" />} activeTab={activeTab} />
          <TabButton value="actions" label="Quick Actions" icon={<LightningBolt className="h-4 w-4 mr-1" />} activeTab={activeTab} />
        </TabsList>

        {/* Candidate Profile — Enhanced UI */}
        {userType === "candidate" ? (
          <>
            <TabsContent value="overview">
              <div className="space-y-4">
                <CandidateProfileHeader
                  name="Anjali"
                  title="Frontend Developer"
                  completion={profileCompletion}
                />
                <SectionCard title="Basic Information" fields={["Full Name", "Email", "Phone", "Location"]} />
                <SectionCard title="Professional Summary" fields={["Short Bio"]} />
                <SectionCard title="Work Experience" fields={["Company", "Job Title", "Duration"]} />
                <SectionCard title="Skills" fields={["Technical Skills", "Soft Skills"]} />
                <SectionCard title="Education" fields={["Degree", "University"]} />
                <SectionCard title="Certifications & Projects" fields={["Certifications", "Projects"]} />
                <SectionCard title="Preferences" fields={["Preferred Job Type", "Notice Period"]} />
              </div>
            </TabsContent>

            <TabsContent value="ai">
              <Card className="bg-white/60 backdrop-blur-xl rounded-2xl shadow-lg">
                <CardContent className="p-6 space-y-4">
                  <h3 className="text-lg font-bold text-gray-700">
                    AI Powered Insights
                  </h3>
                  <div className="flex gap-3 flex-wrap">
                    <Button onClick={handleAnalyzeResume}>Analyze Resume</Button>
                    <Button onClick={handleRecommendJobs} variant="secondary">
                      Recommend Jobs
                    </Button>
                  </div>
                  <div className="text-gray-700 mt-4">
                    <p>
                      <strong>Resume Analysis:</strong>{" "}
                      {aiInsights.resumeScore
                        ? JSON.stringify(aiInsights.resumeScore)
                        : "Not yet analyzed."}
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

            <TabsContent value="actions">
              <Card className="bg-white/60 backdrop-blur-xl rounded-2xl shadow-lg">
                <CardContent className="p-6 space-y-4">
                  <h3 className="text-lg font-bold text-gray-700">Quick Actions</h3>
                  <div className="flex flex-wrap gap-3">
                    <Button variant="outline">Upload Resume</Button>
                    <Button variant="outline">View Applied Jobs</Button>
                    <Button variant="outline">Saved Jobs</Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </>
        ) : (
          // Employer UI stays same (your original)
          <>
            <TabsContent value="overview">
              <Card className="bg-white/60 backdrop-blur-xl rounded-2xl shadow-lg">
                <CardContent className="p-6 space-y-4">
                  <Section title="Company Information" fields={["Company Name", "Industry Type", "Size"]} />
                  <Section title="Contact Information" fields={["Contact Person", "Email", "Phone"]} />
                  <Section title="Company Description" fields={["Mission", "Vision", "Culture"]} />
                  <Section title="Job Postings" fields={["Active Jobs", "Manage Jobs"]} />
                  <Section title="Hiring Preferences" fields={["Preferred Roles", "Experience Levels"]} />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="ai">
              <Card className="bg-white/60 backdrop-blur-xl rounded-2xl shadow-lg">
                <CardContent className="p-6 space-y-4">
                  <h3 className="text-lg font-bold text-gray-700">
                    AI Powered Insights
                  </h3>
                  <Button onClick={handleAnalyzeResume}>Analyze Resume</Button>
                  <Button onClick={handleRecommendJobs} variant="secondary">
                    Recommend Jobs
                  </Button>
                  <div className="text-gray-700 mt-4">
                    <p>
                      <strong>Resume Analysis:</strong>{" "}
                      {aiInsights.resumeScore
                        ? JSON.stringify(aiInsights.resumeScore)
                        : "Not yet analyzed."}
                    </p>
                    <p>
                      <strong>Job Recommendations:</strong>
                    </p>
                    <ul className="list-disc list-inside">
                      {aiInsights.jobMatches.map((job, index) => (
                        <li key={index}>{job}</li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="actions">
              <Card className="bg-white/60 backdrop-blur-xl rounded-2xl shadow-lg">
                <CardContent className="p-6 space-y-4">
                  <h3 className="text-lg font-bold text-gray-700">Quick Actions</h3>
                  <Button variant="outline">Post New Job</Button>
                  <Button variant="outline">View Applications</Button>
                  <Button variant="outline">Analytics Dashboard</Button>
                </CardContent>
              </Card>
            </TabsContent>
          </>
        )}
      </Tabs>
    </div>
  );
}

// --------- Enhanced Components ---------
function CandidateProfileHeader({ name, title, completion }) {
  return (
    <Card className="shadow-md rounded-2xl p-4 flex items-center gap-4 bg-gradient-to-r from-blue-50 via-white to-blue-50">
      <Avatar className="h-16 w-16">
        <AvatarImage src="https://i.pravatar.cc/150?img=5" alt="Profile" />
        <AvatarFallback>{name[0]}</AvatarFallback>
      </Avatar>
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

function SectionCard({ title, fields }) {
  return (
    <Card className="shadow-md rounded-xl border">
      <CardContent className="p-4 space-y-2">
        <div className="flex items-center justify-between">
          <h4 className="text-md font-semibold text-gray-700">{title}</h4>
          <Button size="icon" variant="ghost">
            <Edit className="h-4 w-4 text-gray-500" />
          </Button>
        </div>
        <ul className="grid grid-cols-2 gap-1 text-gray-800 text-sm">
          {fields.map((field, idx) => (
            <li key={idx} className="flex items-center gap-1">
              <CheckCircle className="h-3 w-3 text-green-500" />
              {field}
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}

function Section({ title, fields }) {
  return (
    <div>
      <h4 className="text-md font-semibold text-gray-600 mb-2">{title}</h4>
      <ul className="grid grid-cols-2 gap-2 text-gray-800">
        {fields.map((field, idx) => (
          <li key={idx}>• {field}</li>
        ))}
      </ul>
    </div>
  );
}

function TabButton({ value, label, icon, activeTab }) {
  const isActive = activeTab === value;
  return (
    <TabsTrigger value={value} className="relative flex items-center justify-center gap-1 py-2 text-sm font-medium text-gray-600 hover:text-blue-600">
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
