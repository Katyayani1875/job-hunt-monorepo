import { Card, CardContent } from "@/components/ui/card";
import { Users, Briefcase, Building, Layers } from "lucide-react";
import { useEffect, useState } from "react";
import axios from "axios";

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    users: 0,
    jobs: 0,
    companies: 0,
    categories: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await axios.get("/api/admin/stats"); // Make sure this endpoint is available
        setStats(res.data);
      } catch (err) {
        console.error("Failed to load admin stats", err);
      }
    };
    fetchStats();
  }, []);

  const statCards = [
    {
      title: "Total Users",
      value: stats.users,
      icon: <Users className="text-blue-500 w-6 h-6" />,
    },
    {
      title: "Total Jobs",
      value: stats.jobs,
      icon: <Briefcase className="text-green-500 w-6 h-6" />,
    },
    {
      title: "Total Companies",
      value: stats.companies,
      icon: <Building className="text-yellow-500 w-6 h-6" />,
    },
    {
      title: "Categories",
      value: stats.categories,
      icon: <Layers className="text-purple-500 w-6 h-6" />,
    },
  ];

  return (
    <section className="space-y-6">
      <h1 className="text-3xl font-semibold text-gray-900 dark:text-white">Admin Dashboard</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((card, idx) => (
          <Card key={idx} className="bg-white dark:bg-gray-800 rounded-2xl shadow-md hover:shadow-lg transition">
            <CardContent className="flex items-center justify-between p-5">
              <div>
                <h2 className="text-sm text-gray-500 dark:text-gray-300">{card.title}</h2>
                <p className="text-2xl font-bold">{card.value}</p>
              </div>
              <div>{card.icon}</div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default AdminDashboard;
