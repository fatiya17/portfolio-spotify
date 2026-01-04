import React, { useState, useEffect } from 'react';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import AdminTable from '../../components/admin/AdminTable';
import AdminModal from '../../components/admin/AdminModal';

const ManageEducation = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // config columns
  const columns = [
    { header: 'School', accessor: 'school' },
    { header: 'Degree', accessor: 'degree' },
    { header: 'Year', accessor: 'year' },
    { header: 'Grade', accessor: 'grade' },
  ];

  // config form fields
  const formFields = [
    { name: 'school', label: 'School / University', type: 'text', placeholder: 'e.g. Harvard University' },
    { name: 'degree', label: 'Degree / Major', type: 'text', placeholder: 'e.g. Computer Science' },
    { name: 'year', label: 'Year', type: 'text', placeholder: 'e.g. 2020 - 2024' },
    { name: 'grade', label: 'Grade / GPA', type: 'text', placeholder: 'e.g. 3.8/4.0' },
    { name: 'desc', label: 'Description', type: 'textarea', placeholder: 'Additional info, activities...' },
  ];

  const fetchData = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/education');
      setData(res.data);
    } catch (error) {
      toast.error("failed to load education");
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
    if (!window.confirm("are you sure?")) return;
    try {
        await axios.delete(`http://localhost:5000/api/education/${id}`);
        toast.success("deleted successfully");
        fetchData();
    } catch (error) {
        toast.error("failed to delete");
    }
  };

  const handleSubmit = async (formData) => {
    setIsSubmitting(true);
    try {
        if (editItem) {
            await axios.put(`http://localhost:5000/api/education/${editItem._id}`, formData);
            toast.success("updated successfully");
        } else {
            await axios.post('http://localhost:5000/api/education', formData);
            toast.success("created successfully");
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
      <Toaster position="top-right" toastOptions={{ style: { background: '#333', color: '#fff' } }}/>
      
      <div className="mb-8">
        <h1 className="text-3xl font-black mb-2">Education</h1>
        <p className="text-gray-400">Manage your academic background.</p>
      </div>

      <AdminTable 
        title="Education List"
        columns={columns}
        data={data}
        onAdd={handleCreate}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <AdminModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editItem ? "Edit Education" : "Add Education"}
        fields={formFields}
        initialData={editItem}
        onSubmit={handleSubmit}
        isSubmitting={isSubmitting}
      />
    </div>
  );
};

export default ManageEducation;