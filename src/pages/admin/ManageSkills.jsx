import React, { useState, useEffect } from 'react';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import AdminTable from '../../components/admin/AdminTable';
import AdminModal from '../../components/admin/AdminModal';

const ManageSkills = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // config columns
  const columns = [
    { header: 'Category', accessor: 'category' },
    { header: 'Main Icon', accessor: 'iconName' },
    { 
        header: 'Items', 
        accessor: 'items',
        render: (item) => (
            <div className="flex gap-1 flex-wrap max-w-[200px]">
                {item.items.map((t, i) => (
                    <span 
                      key={i} 
                      className="text-[10px] bg-[#333] px-1.5 py-0.5 rounded border border-[#444]" 
                      style={{ color: t.color || '#fff' }}
                      title={t.iconKey}
                    >
                        {t.name}
                    </span>
                ))}
            </div>
        )
    },
  ];

  // config form fields
  const formFields = [
    { name: 'category', label: 'Category Name', type: 'text', placeholder: 'e.g. Frontend' },
    { name: 'iconName', label: 'Main Icon (Lucide)', type: 'text', placeholder: 'e.g. Layout, Server' },
    { name: 'color', label: 'Category Title Color', type: 'text', placeholder: 'e.g. text-blue-400' },
    { name: 'bg', label: 'Category Icon BG', type: 'text', placeholder: 'e.g. bg-blue-500/10' },
    { 
        name: 'tempItems', 
        // updated label instructions
        label: 'Items (Format: Name:IconKey:HexColor)', 
        type: 'array', 
        placeholder: 'React:SiReact:#61DAFB, Vue:SiVuedotjs:#4FC08D' 
    },
  ];

  const fetchData = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/skills');
      // transform: combine name, iconKey, and color back to string for editing
      const formattedData = res.data.map(cat => ({
          ...cat,
          // format: "Name:IconKey:Color"
          tempItems: cat.items.map(i => `${i.name}:${i.iconKey}:${i.color || '#ffffff'}`)
      }));
      setData(formattedData);
    } catch (error) {
      toast.error("failed to load skills");
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
    if (!window.confirm("delete this skill category?")) return;
    try {
        await axios.delete(`http://localhost:5000/api/skills/${id}`);
        toast.success("category deleted");
        fetchData();
    } catch (error) {
        toast.error("failed to delete");
    }
  };

  const handleSubmit = async (formData) => {
    setIsSubmitting(true);
    
    // transform string "Name:IconKey:Color" -> object { name, iconKey, color }
    const processedItems = formData.tempItems.map(itemStr => {
        // split by colon
        const parts = itemStr.split(':');
        
        const name = parts[0] ? parts[0].trim() : '';
        // if iconkey missing, auto generate logic
        const iconKey = parts[1] && parts[1].trim() !== '' 
            ? parts[1].trim() 
            : `Si${name.replace(/\s+/g, '').replace(/\./g, '')}`;
        
        // if color missing, default to white
        const color = parts[2] && parts[2].trim() !== '' 
            ? parts[2].trim() 
            : '#ffffff';

        return { name, iconKey, color };
    });

    const payload = {
        ...formData,
        items: processedItems
    };

    try {
        if (editItem) {
            await axios.put(`http://localhost:5000/api/skills/${editItem._id}`, payload);
            toast.success("skills updated");
        } else {
            await axios.post('http://localhost:5000/api/skills', payload);
            toast.success("skills category created");
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
        <h1 className="text-3xl font-black mb-2">Tech Stack</h1>
        <p className="text-gray-400">Manage your skills and tools categories.</p>
        
        {/* tips card */}
        <div className="mt-4 p-4 bg-blue-900/20 border border-blue-500/30 rounded-lg text-xs text-blue-200 leading-relaxed">
            <span className="font-bold text-blue-400 uppercase tracking-wider block mb-2">How to Input Items:</span>
            
            <div className="mb-3">
              Use format: <code className="bg-black/30 px-1 py-0.5 rounded text-white">Name : IconKey : HexColor</code> (Separated by colons)<br/>
              Example: <code className="bg-black/30 px-1 py-0.5 rounded text-yellow-300">React:SiReact:#61DAFB</code><br/>
              Example: <code className="bg-black/30 px-1 py-0.5 rounded text-green-300">Vue:SiVuedotjs:#4FC08D</code>
            </div>

            <div className="flex flex-wrap gap-4 pt-2 border-t border-blue-500/30">
                <a 
                  href="https://react-icons.github.io/react-icons/icons/si/" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="flex items-center gap-1 underline hover:text-white transition font-bold"
                >
                   Find Icon Keys (React Icons) ↗
                </a>
                <a 
                  href="https://simpleicons.org/" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="flex items-center gap-1 underline hover:text-white transition font-bold"
                >
                   Find Hex Colors (Simple Icons) ↗
                </a>
            </div>
        </div>
      </div>

      <AdminTable 
        title="Skill Categories"
        columns={columns}
        data={data}
        onAdd={handleCreate}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <AdminModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editItem ? "Edit Category" : "Add Category"}
        fields={formFields}
        initialData={editItem}
        onSubmit={handleSubmit}
        isSubmitting={isSubmitting}
      />
    </div>
  );
};

export default ManageSkills;