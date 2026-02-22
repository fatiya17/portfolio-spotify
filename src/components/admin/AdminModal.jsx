import React, { useState, useEffect } from 'react';
import { X, Save, Loader, UploadCloud, Plus, Trash2 } from 'lucide-react';

const AdminModal = ({ isOpen, onClose, title, fields, initialData, onSubmit, isSubmitting }) => {
  const [formData, setFormData] = useState({});
  const [previews, setPreviews] = useState({}); 

  useEffect(() => {
    if (isOpen) {
        if (initialData) {
            const formattedData = { ...initialData };
            fields.forEach(field => {
                if (field.type === 'array' && Array.isArray(initialData[field.name])) {
                    formattedData[field.name] = initialData[field.name].join(', ');
                }
                // handle gallery preview initialization
                if (field.type === 'gallery' && Array.isArray(initialData[field.name])) {
                   // gallery data is already in correct format, just ensure it exists
                   formattedData[field.name] = initialData[field.name];
                }
            });
            setFormData(formattedData);
            if (initialData.imageUrl) {
                setPreviews(prev => ({ ...prev, imageUrl: initialData.imageUrl }));
            }
        } else {
            setFormData({});
            setPreviews({});
        }
    }
  }, [isOpen, initialData, fields]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // handle single file upload
  const handleFileChange = (e, fieldName) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({ ...prev, [fieldName]: reader.result }));
        setPreviews(prev => ({ ...prev, [fieldName]: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  // --- gallery handlers ---
  const addGalleryItem = (fieldName) => {
    const currentGallery = formData[fieldName] || [];
    setFormData({ ...formData, [fieldName]: [...currentGallery, { url: '', caption: '' }] });
  };

  const removeGalleryItem = (fieldName, index) => {
    const currentGallery = [...(formData[fieldName] || [])];
    currentGallery.splice(index, 1);
    setFormData({ ...formData, [fieldName]: currentGallery });
  };

  const handleGalleryCaptionChange = (fieldName, index, value) => {
    const currentGallery = [...(formData[fieldName] || [])];
    currentGallery[index].caption = value;
    setFormData({ ...formData, [fieldName]: currentGallery });
  };

  const handleGalleryImageUpload = (e, fieldName, index) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const currentGallery = [...(formData[fieldName] || [])];
        currentGallery[index].url = reader.result;
        setFormData({ ...formData, [fieldName]: currentGallery });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const processedData = { ...formData };
    
    fields.forEach(field => {
        if (field.type === 'array' && typeof formData[field.name] === 'string') {
            const val = formData[field.name];
            processedData[field.name] = val ? val.split(',').map(s => s.trim()).filter(s => s) : [];
        }
    });

    onSubmit(processedData);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="bg-[#181818] w-full max-w-2xl rounded-xl border border-[#333] shadow-2xl flex flex-col max-h-[90vh]">
        
        {/* header */}
        <div className="p-5 border-b border-[#333] flex justify-between items-center">
          <h3 className="text-xl font-bold text-white">{title}</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-white transition">
            <X size={24} />
          </button>
        </div>

        {/* body */}
        <div className="p-6 overflow-y-auto custom-scrollbar flex-1">
          <form id="admin-form" onSubmit={handleSubmit} className="space-y-5">
            {fields.map((field) => (
              <div key={field.name} className="flex flex-col gap-2">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                  {field.label}
                </label>
                
                {field.type === 'textarea' ? (
                  <textarea
                    name={field.name}
                    value={formData[field.name] || ''}
                    onChange={handleChange}
                    rows={4}
                    placeholder={field.placeholder}
                    className="bg-[#2a2a2a] border border-transparent focus:border-green-500 rounded p-3 text-white outline-none transition placeholder-gray-600 resize-none"
                  />
                ) : field.type === 'image' ? (
                   <div className="flex flex-col gap-3">
                      <div className="flex items-center gap-4">
                        {previews[field.name] && (
                            <img 
                                src={previews[field.name]} 
                                alt="Preview" 
                                className="w-20 h-20 object-cover rounded-lg border border-[#444]"
                            />
                        )}
                        <label className="flex items-center gap-2 cursor-pointer bg-[#2a2a2a] hover:bg-[#333] text-gray-300 px-4 py-2 rounded border border-[#444] transition">
                            <UploadCloud size={18} />
                            <span className="text-sm">Choose File</span>
                            <input 
                                type="file" 
                                accept="image/*" 
                                className="hidden"
                                onChange={(e) => handleFileChange(e, field.name)}
                            />
                        </label>
                      </div>
                      <input
                        type="text"
                        name={field.name}
                        value={formData[field.name] || ''}
                        onChange={handleChange}
                        placeholder="Or paste image URL..."
                        className="bg-[#2a2a2a] border border-transparent focus:border-green-500 rounded p-3 text-white outline-none transition placeholder-gray-600 text-sm"
                      />
                   </div>
                ) : field.type === 'gallery' ? (
                    // --- gallery input section ---
                    <div className="space-y-3">
                        {(formData[field.name] || []).map((item, idx) => (
                            <div key={idx} className="bg-[#222] p-3 rounded border border-[#333] flex gap-3 items-start">
                                <div className="w-20 h-20 bg-[#111] rounded overflow-hidden shrink-0 flex items-center justify-center border border-[#444]">
                                    {item.url ? (
                                        <img src={item.url} alt="gal" className="w-full h-full object-cover" />
                                    ) : (
                                        <UploadCloud size={20} className="text-gray-500" />
                                    )}
                                </div>
                                <div className="flex-1 space-y-2">
                                    <label className="cursor-pointer bg-[#333] hover:bg-[#444] text-xs px-2 py-1 rounded text-white inline-block">
                                        Upload Image
                                        <input type="file" accept="image/*" className="hidden" onChange={(e) => handleGalleryImageUpload(e, field.name, idx)} />
                                    </label>
                                    <input 
                                        type="text" 
                                        placeholder="Caption..." 
                                        value={item.caption}
                                        onChange={(e) => handleGalleryCaptionChange(field.name, idx, e.target.value)}
                                        className="w-full bg-[#111] border border-[#444] rounded p-2 text-sm text-white"
                                    />
                                </div>
                                <button type="button" onClick={() => removeGalleryItem(field.name, idx)} className="text-red-400 hover:text-red-300 p-1">
                                    <Trash2 size={18} />
                                </button>
                            </div>
                        ))}
                        <button type="button" onClick={() => addGalleryItem(field.name)} className="flex items-center gap-2 text-sm text-green-400 hover:text-green-300 font-bold">
                            <Plus size={16} /> Add Gallery Image
                        </button>
                    </div>
                ) : field.type === 'select' ? (
                  <select
                    name={field.name}
                    value={formData[field.name] || field.defaultValue || ''}
                    onChange={handleChange}
                    className="bg-[#2a2a2a] border border-transparent focus:border-green-500 rounded p-3 text-white outline-none transition"
                  >
                    <option value="" disabled>{field.placeholder || "Select Category"}</option>
                    {field.options && field.options.map(opt => (
                      <option key={opt.value} value={opt.value}>{opt.label}</option>
                    ))}
                  </select>
                ) : (
                  <input
                    type={field.type === 'number' ? 'number' : 'text'}
                    name={field.name}
                    value={formData[field.name] || ''}
                    onChange={handleChange}
                    placeholder={field.placeholder}
                    className="bg-[#2a2a2a] border border-transparent focus:border-green-500 rounded p-3 text-white outline-none transition placeholder-gray-600"
                  />
                )}
                
                {field.type === 'array' && (
                    <p className="text-[10px] text-gray-500">Separate items with commas</p>
                )}
              </div>
            ))}
          </form>
        </div>

        {/* footer */}
        <div className="p-5 border-t border-[#333] flex justify-end gap-3 bg-[#181818] rounded-b-xl">
          <button onClick={onClose} className="px-5 py-2 text-gray-300 font-bold hover:text-white transition" type="button">Cancel</button>
          <button form="admin-form" type="submit" disabled={isSubmitting} className="bg-green-500 hover:bg-green-600 text-black font-bold py-2 px-6 rounded-full flex items-center gap-2 transition disabled:opacity-50 disabled:cursor-not-allowed">
            {isSubmitting ? <Loader className="animate-spin" size={18} /> : <Save size={18} />}
            Save Changes
          </button>
        </div>

      </div>
    </div>
  );
};

export default AdminModal;