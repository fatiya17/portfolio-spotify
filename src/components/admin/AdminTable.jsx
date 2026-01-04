import React from 'react';
import { Pencil, Trash2, Plus } from 'lucide-react';

const AdminTable = ({ title, columns, data, onEdit, onDelete, onAdd }) => {
  return (
    <div className="bg-[#181818] p-4 md:p-6 rounded-xl border border-[#333]">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl md:text-2xl font-bold text-white">{title}</h2>
        <button 
          onClick={onAdd}
          className="bg-green-500 hover:bg-green-600 text-black font-bold py-2 px-4 rounded-full flex items-center gap-2 transition text-sm md:text-base"
        >
          <Plus size={18} /> <span className="hidden md:inline">Add New</span><span className="md:hidden">Add</span>
        </button>
      </div>

      {/* --- mobile view (cards) --- */}
      <div className="md:hidden flex flex-col gap-4">
        {data.length === 0 ? (
            <div className="text-center text-gray-500 py-8 text-sm">
                No data found. Tap "Add" to create one.
            </div>
        ) : (
            data.map((item, idx) => (
                <div key={item._id || idx} className="bg-[#2a2a2a] p-4 rounded-lg border border-[#333] flex flex-col gap-3 shadow-sm">
                    {/* content loop */}
                    <div className="flex flex-col gap-3">
                        {columns.map((col, cIdx) => (
                            <div key={cIdx} className="flex flex-col border-b border-[#333] last:border-0 pb-2 last:pb-0">
                                <span className="text-[10px] text-gray-500 uppercase font-bold tracking-wider mb-1">
                                    {col.header}
                                </span>
                                <div className="text-sm text-gray-200">
                                    {col.render ? col.render(item) : item[col.accessor]}
                                </div>
                            </div>
                        ))}
                    </div>
                    
                    {/* actions footer */}
                    <div className="flex justify-end gap-3 pt-3 border-t border-[#333] mt-1">
                        <button 
                            onClick={() => onEdit(item)}
                            className="flex items-center gap-2 px-4 py-2 bg-[#333] active:bg-[#444] rounded text-blue-400 text-xs font-bold transition"
                        >
                            <Pencil size={14} /> EDIT
                        </button>
                        <button 
                            onClick={() => onDelete(item._id)}
                            className="flex items-center gap-2 px-4 py-2 bg-[#333] active:bg-[#444] rounded text-red-400 text-xs font-bold transition"
                        >
                            <Trash2 size={14} /> DELETE
                        </button>
                    </div>
                </div>
            ))
        )}
      </div>

      {/* --- desktop view (table) --- */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-[#333] text-gray-400 text-sm uppercase tracking-wider">
              {columns.map((col, idx) => (
                <th key={idx} className="p-3 font-medium">{col.header}</th>
              ))}
              <th className="p-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="text-gray-300 text-sm">
            {data.length === 0 ? (
                <tr>
                    <td colSpan={columns.length + 1} className="p-4 text-center text-gray-500">
                        No data found. Click "Add New" to create one.
                    </td>
                </tr>
            ) : (
                data.map((item, idx) => (
                <tr key={item._id || idx} className="border-b border-[#2a2a2a] hover:bg-[#ffffff0d] transition group">
                    {columns.map((col, cIdx) => (
                    <td key={cIdx} className="p-3 align-middle">
                        {col.render ? col.render(item) : item[col.accessor]}
                    </td>
                    ))}
                    <td className="p-3 text-right">
                    <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition">
                        <button 
                        onClick={() => onEdit(item)}
                        className="p-2 bg-[#2a2a2a] hover:bg-blue-500/20 hover:text-blue-400 rounded text-gray-400 transition"
                        title="Edit"
                        >
                        <Pencil size={16} />
                        </button>
                        <button 
                        onClick={() => onDelete(item._id)}
                        className="p-2 bg-[#2a2a2a] hover:bg-red-500/20 hover:text-red-400 rounded text-gray-400 transition"
                        title="Delete"
                        >
                        <Trash2 size={16} />
                        </button>
                    </div>
                    </td>
                </tr>
                ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminTable;