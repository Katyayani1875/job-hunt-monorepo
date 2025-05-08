import React, { useState, useEffect } from "react";
import { getCompanyProfile, updateCompanyProfile } from "@/api/companyApi";
import { Button } from "@/components/ui/Button.jsx";
import Input from "@/components/ui/Input";
import Textarea from "@/components/ui/Textarea";
import toast from "react-hot-toast";

const CompanyProfile = () => {
  const [form, setForm] = useState({
    name: "",
    website: "",
    location: "",
    industry: "",
    description: "",
    logoUrl: "",
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Fetch company data
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await getCompanyProfile();
        setForm(data);
      } catch (err) {
        toast.error("Failed to load company data");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      await updateCompanyProfile(form);
      toast.success("Profile updated successfully");
    } catch (err) {
      toast.error("Update failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 space-y-6">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
        Company Profile
      </h2>

      <Input
        label="Company Name"
        name="name"
        value={form.name}
        onChange={handleChange}
      />
      <Input
        label="Website"
        name="website"
        value={form.website}
        onChange={handleChange}
      />
      <Input
        label="Location"
        name="location"
        value={form.location}
        onChange={handleChange}
      />
      <Input
        label="Industry"
        name="industry"
        value={form.industry}
        onChange={handleChange}
      />
      <Input
        label="Logo URL"
        name="logoUrl"
        value={form.logoUrl}
        onChange={handleChange}
      />
      <Textarea
        label="Description"
        name="description"
        value={form.description}
        onChange={handleChange}
        rows={5}
      />

      <div className="text-right">
        <Button onClick={handleSubmit} loading={loading}>
          Save Changes
        </Button>
      </div>
    </div>
  );
};

export default CompanyProfile;
