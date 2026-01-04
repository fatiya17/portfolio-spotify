import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { GraduationCap, Award, Loader } from 'lucide-react';
import PageTransition from '../components/PageTransition';

const Education = () => {
  const [educationData, setEducationData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/education");
        setEducationData(res.data);
      } catch (error) {
        console.error("error fetching education:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <PageTransition>
      <div className="h-full overflow-y-auto bg-[#121212] pb-32 md:pb-0 custom-scrollbar">

        {/* header consistent with home */}
        <section className="relative pt-20 md:pt-24 pb-6 px-4 md:px-8 bg-gradient-to-b from-[#3b65bd] via-[#243e73] to-[#121212] flex flex-col md:flex-row items-center md:items-end gap-6 md:gap-8 transition-all">
            
            {/* cover image */}
            <div className="shrink-0 shadow-[0_8px_40px_rgba(0,0,0,0.6)] md:shadow-2xl mx-auto md:mx-0">
              <div className="w-[200px] h-[200px] md:w-60 md:h-60 bg-[#2a2a2a] flex items-center justify-center shadow-2xl rounded-md md:rounded-none">
                 <GraduationCap size={80} className="text-blue-400"/>
              </div>
            </div>

            {/* metadata text */}
            <div className="flex flex-col gap-1 text-left w-full">
              <span className="uppercase text-[10px] md:text-xs font-bold tracking-widest text-white hidden md:block">
                Academic Background
              </span>

              <h1 className="text-3xl md:text-5xl lg:text-7xl font-black tracking-tighter text-white drop-shadow-lg mb-2">
                Education
              </h1>

              <p className="text-gray-300/90 text-xs md:text-sm font-medium max-w-xl">
                Degrees, certifications, and academic achievements.
              </p>

              <div className="flex items-center gap-1 text-xs md:text-sm text-gray-300 mt-2 font-medium">
                <Award size={16} className="text-blue-400" />
                <span className="font-bold text-white">Fatiya Dev</span>
                <span className="mx-1">•</span>
                <span>{educationData.length} milestones</span>
              </div>
            </div>
         </section>

        {/* content */}
        <div className="px-4 md:px-8 grid grid-cols-1 gap-4 mt-6 pb-24">
          {loading ? (
             <div className="flex justify-center py-10">
                <Loader className="animate-spin text-blue-400" size={32}/>
             </div>
          ) : (
             educationData.map((edu, idx) => (
                <motion.div
                  key={edu._id || edu.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  whileHover={{ y: -4 }}
                  className="
                    bg-[#181818]
                    hover:bg-[#282828]
                    transition-all
                    duration-300
                    rounded-xl
                    p-4 sm:p-6
                    flex
                    flex-col
                    md:flex-row
                    md:items-start
                    gap-4
                    group
                  "
                >
                  {/* left */}
                  <div className="flex-1">
                    <div className="flex items-start sm:items-center gap-3 sm:gap-4 mb-3">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#2a2a2a] flex items-center justify-center group-hover:bg-blue-400/20 transition shrink-0">
                        <GraduationCap size={20} className="text-blue-400" />
                      </div>
                      <div>
                        <h3 className="text-white text-base sm:text-lg font-bold leading-snug group-hover:text-blue-400 transition">
                          {edu.school}
                        </h3>
                        <p className="text-gray-400 text-sm font-medium">
                          {edu.degree}
                        </p>
                      </div>
                    </div>
                    <p className="text-gray-400 text-sm leading-relaxed ml-0 sm:ml-14">
                      {edu.desc}
                    </p>
                  </div>

                  {/* right */}
                  <div className="flex flex-row md:flex-col justify-between md:items-end text-left md:text-right gap-2 sm:gap-3">
                    <span className="text-white text-sm font-semibold">{edu.year}</span>
                    <span className="inline-block bg-[#2a2a2a] text-gray-200 text-xs px-3 py-1 rounded-full font-medium w-fit">
                      {edu.grade}
                    </span>
                  </div>
                </motion.div>
             ))
          )}
        </div>

      </div>
    </PageTransition>
  );
};

export default Education;