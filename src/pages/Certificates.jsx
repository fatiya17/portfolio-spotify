import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { Award, BadgeCheck, ExternalLink, X, FileText, Star, Loader } from 'lucide-react';
import PageTransition from '../components/PageTransition';

const Certificates = () => {
  const [certificates, setCertificates] = useState([]);
  const [selectedCert, setSelectedCert] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/certificates");
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
         <section className="relative pt-20 md:pt-24 pb-6 px-4 md:px-8 bg-gradient-to-b from-[#d7a332] via-[#8a6820] to-[#121212] flex flex-col md:flex-row items-center md:items-end gap-6 md:gap-8 transition-all">
            
            {/* cover image */}
            <div className="shrink-0 shadow-[0_8px_40px_rgba(0,0,0,0.6)] md:shadow-2xl mx-auto md:mx-0">
              <div className="w-[200px] h-[200px] md:w-60 md:h-60 bg-[#2a2a2a] flex items-center justify-center shadow-2xl rounded-md md:rounded-none">
                 <Award size={80} className="text-yellow-400"/>
              </div>
            </div>

            {/* metadata text */}
            <div className="flex flex-col gap-1 text-left w-full">
              <span className="uppercase text-[10px] md:text-xs font-bold tracking-widest text-white hidden md:block">
                Achievements
              </span>

              <h1 className="text-3xl md:text-5xl lg:text-7xl font-black tracking-tighter text-white drop-shadow-lg mb-1 md:mb-2">
                Certificates
              </h1>

              <p className="text-gray-300/90 text-xs md:text-sm font-medium max-w-xl">
                Professional credentials, badges, and awards.
              </p>

              <div className="flex items-center gap-1 text-xs md:text-sm text-gray-300 mt-2 font-medium">
                <Star size={16} className="text-yellow-400 fill-white" />
                <span>Certified</span>
                <span className="mx-1">•</span>
                <span>{certificates.length} credentials</span>
              </div>
            </div>
         </section>

         {/* grid certificates */}
         <div className="px-4 md:px-8 pb-24 mt-4">
            {loading ? (
               <div className="flex justify-center py-10">
                  <Loader className="animate-spin text-yellow-400" size={32}/>
               </div>
            ) : (
               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {certificates.map((cert, idx) => (
                     <motion.div 
                       key={cert._id || cert.id} 
                       initial={{ opacity: 0, scale: 0.9 }}
                       animate={{ opacity: 1, scale: 1 }}
                       transition={{ delay: idx * 0.1 }}
                       whileHover={{ scale: 1.02 }}
                       onClick={() => setSelectedCert(cert)}
                       className="group bg-[#181818] hover:bg-[#282828] p-5 rounded-lg transition cursor-pointer relative overflow-hidden border border-transparent hover:border-[#333] flex flex-col h-full"
                     >
                        <div className="flex items-start justify-between mb-4">
                           <div className="w-12 h-12 bg-yellow-900/30 rounded-lg flex items-center justify-center text-yellow-500 font-bold border border-yellow-700/50">
                              <Award size={24}/>
                           </div>
                           <ExternalLink size={18} className="text-gray-500 group-hover:text-white transition opacity-0 group-hover:opacity-100"/>
                        </div>
                        
                        <h3 className="font-bold text-white text-lg line-clamp-2 mb-1 group-hover:text-yellow-500 transition">{cert.title}</h3>
                        
                        <div className="flex items-center gap-2 mb-3">
                           <BadgeCheck size={14} className="text-blue-400 shrink-0"/>
                           <p className="text-sm text-gray-300 font-medium truncate">{cert.issuer}</p>
                        </div>
                        
                        <div className="border-t border-[#333] pt-3 mt-auto">
                           <p className="text-xs text-gray-500 font-mono flex justify-between">
                               <span>{cert.date}</span>
                               <span>Valid</span>
                           </p>
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

                     <div className="w-full md:w-[55%] bg-black flex items-center justify-center p-4 border-b md:border-b-0 md:border-r border-[#333] shrink-0 h-[180px] md:h-auto relative">
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
                                 <span className="bg-yellow-900/30 text-yellow-500 text-[10px] font-bold px-2 py-0.5 rounded border border-yellow-700/50 uppercase">
                                    Cert
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