import React, { useState, useEffect } from "react";
import { X, Save, Loader } from "lucide-react";

const AdminModal = ({
  isOpen,
  onClose,
  title,
  fields,
  initialData,
  onSubmit,
  isSubmitting,
}) => {
  const [formData, setFormData] = useState({});

  // reset form when modal opens or initialData changes
  useEffect(() => {
    if (isOpen) {
      if (initialData) {
        // format array to comma string for editing
        const formattedData = { ...initialData };
        fields.forEach((field) => {
          if (
            field.type === "array" &&
            Array.isArray(initialData[field.name])
          ) {
            formattedData[field.name] = initialData[field.name].join(", ");
          }
        });
        setFormData(formattedData);
      } else {
        setFormData({});
      }
    }
  }, [isOpen, initialData, fields]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // process data before submit
    const processedData = { ...formData };

    fields.forEach((field) => {
      if (field.type === "array") {
        const val = formData[field.name];
        // convert string "react, vue" -> ["React", "Vue"]
        processedData[field.name] = val
          ? val
              .split(",")
              .map((s) => s.trim())
              .filter((s) => s)
          : [];
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
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition"
          >
            <X size={24} />
          </button>
        </div>

        {/* body scrollable */}
        <div className="p-6 overflow-y-auto custom-scrollbar flex-1">
          <form id="admin-form" onSubmit={handleSubmit} className="space-y-5">
            {fields.map((field) => (
              <div key={field.name} className="flex flex-col gap-2">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                  {field.label}
                </label>

                {field.type === "textarea" ? (
                  <textarea
                    name={field.name}
                    value={formData[field.name] || ""}
                    onChange={handleChange}
                    rows={4}
                    placeholder={field.placeholder}
                    className="bg-[#2a2a2a] border border-transparent focus:border-green-500 rounded p-3 text-white outline-none transition placeholder-gray-600 resize-none"
                  />
                ) : (
                  <input
                    type={field.type === "number" ? "number" : "text"}
                    name={field.name}
                    value={formData[field.name] || ""}
                    onChange={handleChange}
                    placeholder={
                      field.type === "array"
                        ? "Ex: React, Tailwind, Node.js"
                        : field.placeholder
                    }
                    className="bg-[#2a2a2a] border border-transparent focus:border-green-500 rounded p-3 text-white outline-none transition placeholder-gray-600"
                  />
                )}

                {field.type === "array" && (
                  <p className="text-[10px] text-gray-500">
                    Separate items with commas
                  </p>
                )}
              </div>
            ))}
          </form>
        </div>

        {/* footer */}
        <div className="p-5 border-t border-[#333] flex justify-end gap-3 bg-[#181818] rounded-b-xl">
          <button
            onClick={onClose}
            className="px-5 py-2 text-gray-300 font-bold hover:text-white transition"
            type="button"
          >
            Cancel
          </button>
          <button
            form="admin-form"
            type="submit"
            disabled={isSubmitting}
            className="bg-green-500 hover:bg-green-600 text-black font-bold py-2 px-6 rounded-full flex items-center gap-2 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <Loader className="animate-spin" size={18} />
            ) : (
              <Save size={18} />
            )}
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminModal;
