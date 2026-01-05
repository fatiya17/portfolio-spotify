import React, { useState, useEffect } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import AdminTable from "../../components/admin/AdminTable";
import AdminModal from "../../components/admin/AdminModal";
import { useLocation } from 'react-router-dom';

const ManageProjects = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const location = useLocation();

  // config columns for table
  const columns = [
    {
      header: "Cover",
      accessor: "image",
      render: (item) => (
        <img
          src={item.imageUrl}
          alt={item.title}
          className="w-10 h-10 rounded object-cover bg-[#333]"
        />
      ),
    },
    { header: "Title", accessor: "title" },
    { header: "Category", accessor: "category" },
    {
      header: "Tech Stack",
      accessor: "techStack",
      render: (item) => (
        <div className="flex gap-1 flex-wrap max-w-[200px]">
          {item.techStack.slice(0, 3).map((t, i) => (
            <span
              key={i}
              className="text-[10px] bg-[#333] px-1.5 py-0.5 rounded text-gray-300"
            >
              {t}
            </span>
          ))}
          {item.techStack.length > 3 && (
            <span className="text-[10px] text-gray-500">
              +{item.techStack.length - 3}
            </span>
          )}
        </div>
      ),
    },
  ];

  // config fields for form modal
  const formFields = [
    {
      name: "title",
      label: "Project Title",
      type: "text",
      placeholder: "e.g. Spotify Clone",
    },
    {
      name: "projectType",
      label: "Type (Individual/Group)",
      type: "text",
      placeholder: "e.g. Individual",
    },
    {
      name: "teamSize",
      label: "Team Size",
      type: "number",
      placeholder: "e.g. 1",
    },
    {
      name: "duration",
      label: "Duration",
      type: "text",
      placeholder: "e.g. 2 Months",
    },
    {
      name: "year",
      label: "Year",
      type: "text",
      placeholder: "e.g. 2025",
    },
    {
      name: "category",
      label: "Category",
      type: "text",
      placeholder: "e.g. Web Dev",
    },
    {
      name: "imageUrl",
      label: "Cover Image (Main)",
      type: "image",
      placeholder: "Upload or paste URL...",
    },
    // --- added gallery field here ---
    {
      name: "gallery",
      label: "Project Gallery (Multiple Images)",
      type: "gallery", // make sure adminmodal handles this type
    },
    {
      name: "techStack",
      label: "Tech Stack",
      type: "array",
      placeholder: "React, Node.js",
    },
    {
      name: "description",
      label: "Description",
      type: "textarea",
      placeholder: "Project details...",
    },
    {
      name: "problemSolved",
      label: "Problem Solved",
      type: "textarea",
      placeholder: "What problem did this solve?",
    },
    {
      name: "githubLink",
      label: "GitHub Link",
      type: "text",
      placeholder: "https://github.com/...",
    },
    {
      name: "demoLink",
      label: "Demo Link",
      type: "text",
      placeholder: "https://...",
    },
  ];

  const fetchData = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/projects");
      setData(res.data);
    } catch (error) {
      toast.error("Failed to load projects");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // check if navigated from quick action
    if (location.state?.openCreate) {
        handleCreate();
        window.history.replaceState({}, document.title);
    }
    fetchData();
  }, [location]);

  const handleCreate = () => {
    setEditItem(null);
    setIsModalOpen(true);
  };

  const handleEdit = (item) => {
    setEditItem(item);
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this project?"))
      return;
    try {
      await axios.delete(`http://localhost:5000/api/projects/${id}`);
      toast.success("Project deleted successfully");
      fetchData();
    } catch (error) {
      toast.error("Failed to delete project");
    }
  };

  const handleSubmit = async (formData) => {
    setIsSubmitting(true);
    try {
      if (editItem) {
        // update
        await axios.put(
          `http://localhost:5000/api/projects/${editItem._id}`,
          formData
        );
        toast.success("Project updated!");
      } else {
        // create
        await axios.post("http://localhost:5000/api/projects", formData);
        toast.success("Project created!");
      }
      setIsModalOpen(false);
      fetchData();
    } catch (error) {
      console.error(error);
      toast.error("Operation failed");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="text-white">
      <Toaster
        position="top-right"
        toastOptions={{ style: { background: "#333", color: "#fff" } }}
      />

      <div className="mb-8">
        <h1 className="text-3xl font-black mb-2">Projects</h1>
        <p className="text-gray-400">Manage your portfolio projects here.</p>
      </div>

      <AdminTable
        title="All Projects"
        columns={columns}
        data={data}
        onAdd={handleCreate}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <AdminModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editItem ? "Edit Project" : "Add New Project"}
        fields={formFields}
        initialData={editItem}
        onSubmit={handleSubmit}
        isSubmitting={isSubmitting}
      />
    </div>
  );
};

export default ManageProjects;