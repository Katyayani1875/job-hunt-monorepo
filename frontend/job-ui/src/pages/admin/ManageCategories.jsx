import { useEffect, useState } from "react";
import axios from "axios";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2, PlusCircle } from "lucide-react";
import { toast } from "react-hot-toast";

const ManageCategories = () => {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const res = await axios.get("/api/categories");
      setCategories(res.data);
    } catch (err) {
      toast.error("Failed to fetch categories");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim()) return toast.error("Category name is required");

    try {
      if (editingId) {
        await axios.put(`/api/categories/${editingId}`, { name });
        toast.success("Category updated");
      } else {
        await axios.post("/api/categories", { name });
        toast.success("Category added");
      }
      setName("");
      setEditingId(null);
      fetchCategories();
    } catch (err) {
      toast.error("Error saving category");
    }
  };

  const handleEdit = (category) => {
    setName(category.name);
    setEditingId(category._id);
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this category?")) return;
    try {
      await axios.delete(`/api/categories/${id}`);
      toast.success("Category deleted");
      setCategories((prev) => prev.filter((cat) => cat._id !== id));
    } catch (err) {
      toast.error("Failed to delete category");
    }
  };

  return (
    <section className="space-y-6">
      <h1 className="text-2xl font-semibold">Manage Categories</h1>

      <form onSubmit={handleSubmit} className="flex gap-3 items-center">
        <Input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter category name"
          className="w-64"
        />
        <Button type="submit" className="flex items-center gap-2">
          <PlusCircle className="w-4 h-4" />
          {editingId ? "Update" : "Add"}
        </Button>
        {editingId && (
          <Button
            variant="ghost"
            type="button"
            onClick={() => {
              setName("");
              setEditingId(null);
            }}
          >
            Cancel
          </Button>
        )}
      </form>

      {loading ? (
        <p className="text-gray-500">Loading...</p>
      ) : categories.length === 0 ? (
        <p className="text-gray-500">No categories found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {categories.map((cat) => (
            <div
              key={cat._id}
              className="bg-white dark:bg-gray-800 rounded-xl shadow p-4 flex justify-between items-center"
            >
              <span className="font-medium">{cat.name}</span>
              <div className="space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleEdit(cat)}
                >
                  <Pencil className="w-4 h-4" />
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => handleDelete(cat._id)}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default ManageCategories;
