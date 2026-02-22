import React, { useState, useEffect } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import AdminTable from "../../components/admin/AdminTable";
import AdminModal from "../../components/admin/AdminModal";
import { useLocation } from 'react-router-dom';

const ManageCertificates = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const location = useLocation();
  
  const getCategoryColor = (category) => {
    const colors = {
      "Course Certificate": "bg-blue-900/30 text-blue-400 border-blue-800/50",
      "Award": "bg-yellow-900/30 text-yellow-500 border-yellow-700/50",
      "Badge": "bg-purple-900/30 text-purple-400 border-purple-800/50",
      "Competition": "bg-red-900/30 text-red-400 border-red-800/50",
      "Competency": "bg-orange-900/30 text-orange-400 border-orange-800/50",
      "Organization": "bg-green-900/30 text-green-400 border-green-800/50",
      "Others": "bg-gray-800/30 text-gray-400 border-gray-700/50",
    };
    return colors[category] || "bg-yellow-900/30 text-yellow-500 border-yellow-700/50";
  };

  // config columns
  const columns = [
    {
      header: "Image",
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
    { header: "Issuer", accessor: "issuer" },
    { header: "Date", accessor: "date" },
    { 
      header: "Category", 
      accessor: "category",
      render: (item) => (
        <span className={`text-[10px] font-bold px-3 py-1 rounded-full border uppercase tracking-tighter ${getCategoryColor(item.category)}`}>
          {item.category || "Others"}
        </span>
      )
    },
  ];

  // config form fields
  const formFields = [
    {
      name: "title",
      label: "Certificate Title",
      type: "text",
      placeholder: "e.g. AWS Practitioner",
    },
    {
      name: "issuer",
      label: "Issuer",
      type: "text",
      placeholder: "e.g. Amazon Web Services",
    },
    { name: "date", label: "Date", type: "text", placeholder: "e.g. Dec 2023" },
    {
      name: "credentialId",
      label: "Credential ID",
      type: "text",
      placeholder: "e.g. ABC-123",
    },
    {
      name: "verifyLink",
      label: "Verify Link",
      type: "text",
      placeholder: "https://...",
    },
    {
      name: "category",
      label: "Category",
      type: "select",
      defaultValue: "Others",
      options: [
        { label: "Course Certificate", value: "Course Certificate" },
        { label: "Award", value: "Award" },
        { label: "Badge", value: "Badge" },
        { label: "Competition", value: "Competition" },
        { label: "Competency", value: "Competency" },
        { label: "Organization", value: "Organization" },
        { label: "Others", value: "Others" },
      ]
    },
    {
      name: "imageUrl",
      label: "Certificate Image",
      type: "image", // changed to image type for upload support
      placeholder: "Upload or paste URL...",
    },
    {
      name: "description",
      label: "Description",
      type: "textarea",
      placeholder: "What did you learn?",
    },
  ];

  const fetchData = async () => {
    try {
      const res = await axios.get("https://portfolio-be-five-dun.vercel.app/api/certificates");
      setData(res.data);
    } catch (error) {
      toast.error("failed to load certificates");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    if (location.state?.openCreate) {
        handleCreate();
        window.history.replaceState({}, document.title);
    }
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
    if (!window.confirm("delete this certificate?")) return;
    try {
      await axios.delete(`https://portfolio-be-five-dun.vercel.app/api/certificates/${id}`);
      toast.success("certificate deleted");
      fetchData();
    } catch (error) {
      toast.error("failed to delete");
    }
  };

  const handleSubmit = async (formData) => {
    setIsSubmitting(true);
    try {
      if (editItem) {
        await axios.put(
          `https://portfolio-be-five-dun.vercel.app/api/certificates/${editItem._id}`,
          formData
        );
        toast.success("certificate updated");
      } else {
        await axios.post("https://portfolio-be-five-dun.vercel.app/api/certificates", formData);
        toast.success("certificate added");
      }
      setIsModalOpen(false);
      fetchData();
    } catch (error) {
      toast.error("operation failed");
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
        <h1 className="text-3xl font-black mb-2">Certificates</h1>
        <p className="text-gray-400">
          Manage your licenses and certifications.
        </p>
      </div>

      <AdminTable
        title="All Certificates"
        columns={columns}
        data={data}
        onAdd={handleCreate}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <AdminModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editItem ? "Edit Certificate" : "Add Certificate"}
        fields={formFields}
        initialData={editItem}
        onSubmit={handleSubmit}
        isSubmitting={isSubmitting}
      />
    </div>
  );
};

export default ManageCertificates;
