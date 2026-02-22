import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { Award, BadgeCheck, ExternalLink, X, Loader } from 'lucide-react';
import PageTransition from '../components/PageTransition';

const Certificates = () => {
  const [certificates, setCertificates] = useState([]);
  const [selectedCert, setSelectedCert] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState("All");

  const categories = ["All", "Course Certificate", "Award", "Badge", "Competition", "Competency", "Organization", "Others"];

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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("https://portfolio-be-five-dun.vercel.app/api/certificates");
        setCertificates(res.data);
      } catch (error) {
        console.error("error fetching certificates:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <PageTransition>
      <div className="h-full overflow-y-auto custom-scrollbar bg-[#121212] pb-32 md:pb-0">
         
        {/* header */}
        <div className="relative bg-gradient-to-b from-[#d7a332] via-[#8a6820] to-[#121212] pt-24 pb-12 px-6 md:px-10 lg:px-14 flex flex-col md:flex-row items-end gap-6 md:gap-10 transition-colors duration-500">
          {/* icon */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="w-32 h-32 md:w-52 md:h-52 bg-[#2a2a2a] shadow-[0_8px_40px_rgba(0,0,0,0.5)] rounded-full md:rounded-md flex items-center justify-center shrink-0 group hover:scale-105 transition-transform duration-500"
          >
            <Award className="text-yellow-400 drop-shadow-md w-14 h-14 md:w-24 md:h-24 group-hover:rotate-12 transition-transform duration-500" />
          </motion.div>

          {/* title */}
          <div className="flex flex-col gap-2 w-full z-10 pb-1">
            <span className="text-xs font-bold tracking-widest uppercase text-white flex items-center gap-1.5">
              <Award size={16} className="text-yellow-400 fill-white" />{" "}
              Achievements
            </span>
            <h1 className="text-4xl sm:text-6xl md:text-7xl  font-black tracking-tighter text-white drop-shadow-2xl leading-tight">
              Certificates
            </h1>
            <p className="text-gray-300 font-medium text-sm md:text-base mt-3 max-w-2xl leading-relaxed">
              Professional credentials, badges, and awards.
            </p>
          </div>
        </div>

        {/* filter tabs */}
        <div className="px-4 md:px-8 mt-8 mb-4">
           <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 pb-4">
              {categories.map((cat) => (
                 <button
                    key={cat}
                    onClick={() => setActiveFilter(cat)}
                    className={`whitespace-nowrap px-4 py-2 rounded-full text-xs font-bold transition-all border ${
                       activeFilter === cat 
                       ? "bg-[#d7a332] text-black border-transparent shadow-[0_0_15px_rgba(215,163,50,0.3)]" 
                       : "bg-[#282828] text-gray-400 border-[#333] hover:border-gray-500 hover:text-white"
                    }`}
                 >
                    {cat}
                 </button>
              ))}
           </div>
        </div>

         {/* grid certificates */}
         <div className="px-4 md:px-8 pb-24 mt-4">
            {loading ? (
               <div className="flex justify-center py-10">
                  <Loader className="animate-spin text-yellow-400" size={32}/>
               </div>
            ) : (
               <div className="grid grid-cols-2 lg:grid-cols-3 gap-2 md:gap-4">
                  {certificates
                    .filter(cert => activeFilter === "All" || cert.category === activeFilter)
                    .map((cert, idx) => (
                     <motion.div 
                       key={cert._id || cert.id} 
                       initial={{ opacity: 0, scale: 0.9 }}
                       animate={{ opacity: 1, scale: 1 }}
                       transition={{ delay: idx * 0.1 }}
                       whileHover={{ scale: 1.02 }}
                       onClick={() => setSelectedCert(cert)}
                       className="group bg-[#181818] hover:bg-[#282828] p-3 md:p-4 rounded-lg transition cursor-pointer relative overflow-hidden border border-transparent hover:border-[#333] flex flex-col h-full gap-4"
                     >
                        {/* image preview area */}
                        <div className="relative w-full aspect-[4/3] bg-black/20 rounded-md overflow-hidden border border-[#333]">
                            <img 
                                src={cert.imageUrl || "https://via.placeholder.com/300"} 
                                alt={cert.title}
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                            {/* overlay icon */}
                            <div className="absolute top-2 right-2 bg-black/60 p-1.5 rounded-full text-yellow-500 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity">
                                <ExternalLink size={16} />
                            </div>
                        </div>

                        {/* content area */}
                        <div className="flex flex-col flex-1">
                            <h3 className="font-bold text-white text-sm md:text-lg line-clamp-2 mb-1 group-hover:text-yellow-500 transition leading-tight">
                                {cert.title}
                            </h3>
                            
                            <div className="flex items-center gap-2 mb-2">
                               <span className={`text-[10px] font-bold px-3 py-1 rounded-full border uppercase tracking-tighter ${getCategoryColor(cert.category)}`}>
                                  {cert.category || 'Others'}
                               </span>
                            </div>
                            <div className="flex items-center gap-2 mb-3 mt-1">
                               <BadgeCheck size={14} className="text-blue-400 shrink-0"/>
                               <p className="text-xs text-gray-400 font-medium truncate">{cert.issuer}</p>
                            </div>
                            
                            <div className="border-t border-[#333] pt-3 mt-auto flex justify-between items-center text-xs text-gray-500 font-mono">
                               <span>{cert.date}</span>
                               <span className="text-green-500 bg-green-900/20 px-2 py-0.5 rounded border border-green-900/30">Valid</span>
                            </div>
                        </div>
                     </motion.div>
                  ))}
               </div>
            )}
         </div>

         {/* popup modal */}
         <AnimatePresence>
            {selectedCert && (
               <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                  {/* backdrop */}
                  <motion.div 
                     initial={{ opacity: 0 }}
                     animate={{ opacity: 1 }}
                     exit={{ opacity: 0 }}
                     onClick={() => setSelectedCert(null)}
                     className="absolute inset-0 bg-black/90 backdrop-blur-sm"
                  />

                  {/* modal container */}
                  <motion.div 
                     initial={{ scale: 0.95, opacity: 0, y: 20 }}
                     animate={{ scale: 1, opacity: 1, y: 0 }}
                     exit={{ scale: 0.95, opacity: 0, y: 20 }}
                     className="bg-[#181818] w-[90%] md:w-full max-w-4xl max-h-[85vh] md:max-h-[600px] rounded-xl border border-[#333] shadow-2xl overflow-hidden relative z-10 flex flex-col md:flex-row"
                  >
                     <button 
                        onClick={() => setSelectedCert(null)}
                        className="absolute top-3 right-3 bg-black/60 hover:bg-black p-1.5 rounded-full text-white z-50 transition border border-white/10"
                     >
                        <X size={18} />
                     </button>

                     <div className="w-full md:w-[55%] bg-black flex items-center justify-center p-4 border-b md:border-b-0 md:border-r border-[#333] shrink-0 h-[250px] md:h-auto relative">
                        <img 
                           src={selectedCert.imageUrl} 
                           alt={selectedCert.title} 
                           className="w-full h-full object-contain rounded-md shadow-lg"
                        />
                     </div>

                     <div className="w-full md:w-[45%] flex flex-col h-full bg-[#181818] min-h-0">
                        <div className="flex-1 overflow-y-auto custom-scrollbar p-4 md:p-6">
                           <div className="mb-4">
                              <div className="flex items-center gap-2 mb-2">
                                 <span className={`text-[10px] font-bold px-3 py-1 rounded-full border uppercase ${getCategoryColor(selectedCert.category)}`}>
                                    {selectedCert.category || 'Others'}
                                 </span>
                                 <span className="text-gray-500 text-xs font-mono">{selectedCert.date}</span>
                              </div>
                              <h2 className="text-xl md:text-2xl font-bold text-white leading-tight mb-2">{selectedCert.title}</h2>
                              <div className="flex items-center gap-2 text-blue-400">
                                 <BadgeCheck size={16} />
                                 <span className="text-sm font-semibold">{selectedCert.issuer}</span>
                              </div>
                           </div>

                           <div className="bg-[#242424] p-3 rounded-lg mb-4 border border-[#2a2a2a]">
                              <p className="text-gray-300 text-xs md:text-sm leading-relaxed">
                                 {selectedCert.description}
                              </p>
                           </div>

                           <div className="flex items-center justify-between text-[10px] md:text-xs text-gray-500 font-mono bg-[#242424] p-2 rounded border border-[#2a2a2a]">
                              <span className="font-bold">ID:</span>
                              <span className="text-gray-300 select-all truncate ml-2">{selectedCert.credentialId}</span>
                           </div>
                        </div>

                        <div className="p-4 border-t border-[#2a2a2a] bg-[#181818] shrink-0">
                           <a 
                              href={selectedCert.verifyLink} 
                              target="_blank" 
                              rel="noreferrer" 
                              className="flex items-center justify-center gap-2 bg-[#1ed760] hover:bg-[#1db954] text-black font-bold py-2.5 rounded-full transition w-full text-sm hover:scale-[1.02] active:scale-[0.98]"
                           >
                              <ExternalLink size={16} /> Verify Credential
                           </a>
                        </div>
                     </div>
                  </motion.div>
               </div>
            )}
         </AnimatePresence>
      </div>
    </PageTransition>
  );
};

export default Certificates;