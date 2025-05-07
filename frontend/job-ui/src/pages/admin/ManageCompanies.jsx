import { useEffect, useState } from "react";
import axios from "axios";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/button";
import { Loader } from "@/components/shared/Loader";
import { Trash2, Building2, Ban } from "lucide-react";
import { toast } from "react-hot-toast";

const ManageCompanies = () => {
  const [companies, setCompanies] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const res = await axios.get("/api/companies");
        setCompanies(res.data);
        setFiltered(res.data);
      } catch (err) {
        console.error("Failed to fetch companies", err);
        toast.error("Error fetching companies");
      } finally {
        setLoading(false);
      }
    };
    fetchCompanies();
  }, []);

  useEffect(() => {
    const q = query.toLowerCase();
    setFiltered(
      companies.filter(
        (c) =>
          c.name.toLowerCase().includes(q) || c.email.toLowerCase().includes(q)
      )
    );
  }, [query, companies]);

  const handleDelete = async (id) => {
    if (!confirm("Delete this company?")) return;
    try {
      await axios.delete(`/api/companies/${id}`);
      toast.success("Company deleted");
      setCompanies((prev) => prev.filter((c) => c._id !== id));
    } catch (err) {
      console.error("Error deleting company", err);
      toast.error("Failed to delete company");
    }
  };

  return (
    <section className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Manage Companies</h1>
        <Input
          placeholder="Search by company name or email..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-64"
        />
      </div>

      {loading ? (
        <Loader />
      ) : filtered.length === 0 ? (
        <p className="text-gray-500">No companies found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto border rounded-md">
            <thead className="bg-gray-100 dark:bg-gray-800 text-left">
              <tr>
                <th className="p-3">Name</th>
                <th className="p-3">Email</th>
                <th className="p-3">Location</th>
                <th className="p-3">Created</th>
                <th className="p-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((company) => (
                <tr
                  key={company._id}
                  className="border-t hover:bg-gray-50 dark:hover:bg-gray-700"
                >
                  <td className="p-3 flex items-center gap-2">
                    <Building2 className="w-4 h-4 text-indigo-500" />
                    {company.name}
                  </td>
                  <td className="p-3">{company.email}</td>
                  <td className="p-3">{company.location || "—"}</td>
                  <td className="p-3">
                    {new Date(company.createdAt).toLocaleDateString()}
                  </td>
                  <td className="p-3 text-center space-x-2">
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDelete(company._id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                    {/* Optional: Add block/unblock functionality */}
                    {/* <Button variant="outline" size="sm">
                      <Ban className="w-4 h-4 text-yellow-500" />
                    </Button> */}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
};

export default ManageCompanies;
