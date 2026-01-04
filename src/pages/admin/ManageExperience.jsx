import React, { useState, useEffect } from 'react';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import AdminTable from '../../components/admin/AdminTable';
import AdminModal from '../../components/admin/AdminModal';

const ManageExperience = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // config columns
  const columns = [
    { header: 'Role', accessor: 'role' },
    { header: 'Company', accessor: 'company' },
    { header: 'Period', accessor: 'period' },
    { header: 'Type', accessor: 'type' },
  ];

  // config form fields
  const formFields = [
    { name: 'role', label: 'Role / Job Title', type: 'text', placeholder: 'e.g. Frontend Developer' },
    { name: 'company', label: 'Company Name', type: 'text', placeholder: 'e.g. Tech Startup' },
    { name: 'location', label: 'Location', type: 'text', placeholder: 'e.g. Jakarta, Indonesia' },
    { name: 'period', label: 'Period', type: 'text', placeholder: 'e.g. Jan 2024 - Present' },
    { name: 'type', label: 'Job Type', type: 'text', placeholder: 'e.g. Full-time / Internship' },
    { name: 'description', label: 'Description', type: 'textarea', placeholder: 'Describe your responsibilities...' },
    { name: 'skills', label: 'Skills Used', type: 'array', placeholder: 'React, Figma, Git' },
  ];

  const fetchData = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/experience');
      setData(res.data);
    } catch (error) {
      toast.error("failed to load experience");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchData(); }, []);

  const handleCreate = () => {
    setEditItem(null);
    setIsModalOpen(true);
  };

  const handleEdit = (item) => {
    setEditItem(item);
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("are you sure you want to delete this experience?")) return;
    try {
        await axios.delete(`http://localhost:5000/api/experience/${id}`);
        toast.success("experience deleted");
        fetchData();
    } catch (error) {
        toast.error("failed to delete");
    }
  };

  const handleSubmit = async (formData) => {
    setIsSubmitting(true);
    try {
        if (editItem) {
            await axios.put(`http://localhost:5000/api/experience/${editItem._id}`, formData);
            toast.success("experience updated");
        } else {
            await axios.post('http://localhost:5000/api/experience', formData);
            toast.success("experience added");
        }
        setIsModalOpen(false);
        fetchData();
    } catch (error) {
        console.error(error);
        toast.error("operation failed");
    } finally {
        setIsSubmitting(false);
    }
  };

  return (
    <div className="text-white">
      <Toaster position="top-right" toastOptions={{ style: { background: '#333', color: '#fff' } }}/>
      
      <div className="mb-8">
        <h1 className="text-3xl font-black mb-2">Experience</h1>
        <p className="text-gray-400">Manage your work history and internships.</p>
      </div>

      <AdminTable 
        title="Work History"
        columns={columns}
        data={data}
        onAdd={handleCreate}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <AdminModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editItem ? "Edit Experience" : "Add Experience"}
        fields={formFields}
        initialData={editItem}
        onSubmit={handleSubmit}
        isSubmitting={isSubmitting}
      />
    </div>
  );
};

export default ManageExperience;