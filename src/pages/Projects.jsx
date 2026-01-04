import React, { useEffect, useState } from "react";
import { useOutletContext, useLocation } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
import { LayoutGrid, Loader } from "lucide-react"; 
import ProjectCard from "../components/ProjectCard";
import PageTransition from "../components/PageTransition";

const FILTERS = ["All", "Web Dev", "Mobile Dev", "UI/UX"];

const Projects = () => {
  const { setSelectedProject, setShowRightSidebar } = useOutletContext();
  const location = useLocation();

  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("All");

  const searchQuery =
    new URLSearchParams(location.search).get("q") || "";

  useEffect(() => {
    // fetch data from backend api
    const fetchData = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/projects");
        setProjects(res.data);
      } catch (error) {
        console.error("error fetching projects:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleProjectClick = (project) => {
    setSelectedProject(project);
    setShowRightSidebar(true);
  };

  /* filtered projects */
  const filteredProjects = projects.filter((p) => {
    const matchCategory =
      filter === "All" || p.category?.includes(filter);

    const matchSearch =
      p.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.category?.toLowerCase().includes(searchQuery.toLowerCase());

    return matchCategory && matchSearch;
  });

  // get first 6 projects for hero section
  const featuredProjects = projects.slice(0, 6);

  return (
    <PageTransition>
      <div className="h-full overflow-y-auto custom-scrollbar bg-[#121212] pb-32 md:pb-0">

        {/* header */}
        <div className="relative bg-gradient-to-b from-[#61368a] via-[#3f205e] to-[#121212] pt-24 pb-12 px-6 md:px-10 lg:px-14 flex flex-col md:flex-row items-end gap-6 md:gap-10 transition-colors duration-500">
          
          {/* icon */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="w-32 h-32 md:w-52 md:h-52 bg-[#2a2a2a] shadow-[0_8px_40px_rgba(0,0,0,0.5)] rounded-full md:rounded-md flex items-center justify-center shrink-0 group hover:scale-105 transition-transform duration-500"
          >
            <LayoutGrid className="text-purple-400 drop-shadow-md w-14 h-14 md:w-24 md:h-24 group-hover:rotate-12 transition-transform duration-500" />
          </motion.div>

          {/* title */}
          <div className="flex flex-col gap-2 w-full z-10 pb-1">
            <span className="text-xs font-bold tracking-widest uppercase text-white flex items-center gap-1.5">
              <LayoutGrid size={16} className="text-purple-400 fill-white" />{" "}
              Public Playlist
            </span>
            <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tighter text-white drop-shadow-2xl leading-tight">
              Your Projects
            </h1>
            <p className="text-gray-300 font-medium text-sm md:text-base mt-3 max-w-2xl leading-relaxed">
               {searchQuery ? `Search result for "${searchQuery}"` : "A collection of applications and interfaces I have built."}
            </p>
          </div>
        </div>

        {/* filter */}
        <div className="px-4 md:px-8 mt-6 flex gap-2 mb-6 overflow-x-auto no-scrollbar">
          {FILTERS.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-4 py-1.5 rounded-full text-sm font-bold transition
                ${
                  filter === cat
                    ? "bg-white text-black"
                    : "bg-[#2a2a2a] text-white hover:bg-[#3E3E3E]"
                }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {loading ? (
           <div className="flex justify-center py-20">
              <Loader className="animate-spin text-white" size={32} />
           </div>
        ) : (
          <>
            {/* hero */}
            {featuredProjects.length > 0 && (
              <section className="px-4 md:px-8 mb-8">
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {featuredProjects.map((item) => (
                    <div
                      key={item._id || item.id}
                      onClick={() => handleProjectClick(item)}
                      className="flex items-center gap-3 bg-[#2a2a2a]/90 hover:bg-[#3E3E3E] rounded pr-2 cursor-pointer h-14 md:h-16 transition overflow-hidden"
                    >
                      <img
                        src={item.imageUrl || "https://via.placeholder.com/150"}
                        alt={item.title}
                        className="h-full aspect-square object-cover"
                      />
                      <span className="font-bold text-xs md:text-sm text-white line-clamp-2 pr-2">
                        {item.title}
                      </span>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* all projects */}
            <section className="px-4 md:px-8 pb-24">
              <h2 className="text-lg md:text-2xl font-bold mb-4 text-white">
                All Projects
              </h2>

              {filteredProjects.length === 0 ? (
                 <div className="text-gray-500 text-sm mt-10">
                    No projects found.
                 </div>
              ) : (
                <div className="grid grid-cols-2 gap-3 md:flex md:flex-wrap md:gap-5">
                  {filteredProjects.map((item) => (
                    <div key={item._id || item.id} className="w-full md:w-[200px] shrink-0">
                      <ProjectCard
                        project={item}
                        onClick={handleProjectClick}
                      />
                    </div>
                  ))}
                </div>
              )}
            </section>
          </>
        )}
      </div>
    </PageTransition>
  );
};

export default Projects;