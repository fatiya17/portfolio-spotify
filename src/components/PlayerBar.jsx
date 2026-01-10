import React, { useState, useRef, useEffect } from 'react';
import { 
  Play, Pause, SkipBack, SkipForward, 
  Heart, Github, ExternalLink, Share2, Info, X, CheckCircle2, 
  Link, Linkedin, MessageCircle, Twitter
} from 'lucide-react'; 
import { motion, AnimatePresence } from 'framer-motion';

const PlayerBar = ({ project, onOpenMobilePlayer }) => {
  const [isPlaying, setIsPlaying] = useState(false); // default to false
  const [showShareModal, setShowShareModal] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  
  // audio state
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef(null);

  // audio source from project (removed fallback string)
  const audioSource = project?.audioUrl;

  if (!project) return null;

  // --- audio logic start ---

  // handle play/pause when isPlaying changes
  useEffect(() => {
    if (audioRef.current && audioSource) {
        if (isPlaying) {
            audioRef.current.play().catch(err => console.log("playback error:", err));
        } else {
            audioRef.current.pause();
        }
    }
  }, [isPlaying, audioSource]);

  // reset and force play ONLY IF audioSource exists
  useEffect(() => {
    if(audioRef.current && audioSource) {
        audioRef.current.load(); 
        
        // force play immediately
        const playPromise = audioRef.current.play();
        if (playPromise !== undefined) {
            playPromise.catch(error => {
                console.log("auto-play prevented:", error);
                setIsPlaying(false); // revert to pause if blocked
            });
        }
        
        setIsPlaying(true); // update ui state to playing
    } else {
        // if no audio, ensure ui is paused
        setIsPlaying(false);
    }
  }, [project, audioSource]);

  const handleTimeUpdate = () => {
    if (audioRef.current) {
        setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
        setDuration(audioRef.current.duration);
    }
  };

  const handleEnded = () => {
    setIsPlaying(false);
  };

  // seek functionality
  const handleSeek = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const width = rect.width;
    const percentage = x / width;
    const newTime = percentage * duration;
    
    if (audioRef.current) {
        audioRef.current.currentTime = newTime;
        setCurrentTime(newTime);
    }
  };

  // format time mm:ss
  const formatTime = (time) => {
    if(isNaN(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  // --- audio logic end ---

  const togglePlay = (e) => {
    e.stopPropagation();
    // only toggle if there is audio
    if (audioSource) {
        setIsPlaying(!isPlaying);
    }
  };

  const openLink = (url) => {
    if (url) window.open(url, "_blank");
  };

  const openShareModal = (e) => {
    e.stopPropagation();
    setShowShareModal(true);
  };

  // 1. copy link function
  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setShowShareModal(false);
      setShowSuccessPopup(true);
      setTimeout(() => setShowSuccessPopup(false), 3000);
    } catch (error) {
      alert('failed to copy link');
    }
  };

  // 2. social media share logic
  const shareToSocial = (platform) => {
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent(`Check out this project: ${project.title} by Fatiya Labibah`);
    
    let shareUrl = "";

    switch (platform) {
        case 'whatsapp':
            shareUrl = `https://wa.me/?text=${text}%20${url}`;
            break;
        case 'linkedin':
            shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${url}`;
            break;
        case 'twitter':
            shareUrl = `https://twitter.com/intent/tweet?text=${text}&url=${url}`;
            break;
        default:
            return;
    }

    window.open(shareUrl, '_blank');
    setShowShareModal(false);
  };

  // 3. native system share (mobile friendly)
  const handleNativeShare = async () => {
    if (navigator.share) {
        try {
            await navigator.share({
                title: project.title,
                text: `Check out this project: ${project.title}`,
                url: window.location.href,
            });
            setShowShareModal(false);
        } catch (error) {
            console.log('error sharing:', error);
        }
    } else {
        alert("web share api not supported in this browser");
    }
  };

  return (
    <>
      {/* hidden audio element with autoPlay attribute */}
      {/* conditionally render audio tag only if source exists */}
      {audioSource && (
        <audio 
            ref={audioRef}
            src={audioSource}
            autoPlay={true} 
            onTimeUpdate={handleTimeUpdate}
            onLoadedMetadata={handleLoadedMetadata}
            onEnded={handleEnded}
        />
      )}

      <div className="hidden md:flex w-full h-[90px] bg-black border-t border-[#282828] px-4 z-50 items-center justify-between shrink-0">
          
          {/* info project */}
          <div className="flex items-center gap-3 w-[30%] min-w-0">
            <img 
                src={project.imageUrl} 
                alt="" 
                className="w-14 h-14 rounded-[4px] object-cover shadow-sm cursor-pointer hover:opacity-80 transition shrink-0"
                onClick={onOpenMobilePlayer}
            />
            <div className="flex flex-col justify-center overflow-hidden mr-2 min-w-0">
              <h4 className="font-bold text-white text-sm truncate hover:underline cursor-pointer block">
                  {project.title}
              </h4>
              <p className="text-xs text-gray-400 truncate hover:underline cursor-pointer block">
                  {project.techStack?.[0]}
              </p>
            </div>
            <button className="text-gray-400 hover:text-green-500 transition ml-2 shrink-0">
                <Heart size={18}/>
            </button>
          </div>

          {/* center: controls */}
          <div className="flex flex-col items-center max-w-[40%] w-full gap-1">
            <div className="flex items-center gap-6">
                <button className="text-gray-400 hover:text-white transition" title="Previous">
                    <SkipBack fill="currentColor" size={20}/>
                </button>
                
                <button 
                    onClick={togglePlay} 
                    className={`rounded-full p-2 transition shadow-lg flex items-center justify-center ${audioSource ? 'bg-white hover:scale-105 active:scale-95 cursor-pointer' : 'bg-gray-500 cursor-not-allowed opacity-50'}`}
                    disabled={!audioSource}
                >
                    {isPlaying ? <Pause fill="black" size={20} /> : <Play fill="black" size={20} className="ml-0.5" />}
                </button>
                
                <button className="text-gray-400 hover:text-white transition" title="Next">
                    <SkipForward fill="currentColor" size={20}/>
                </button>
            </div>
            
            <div className="flex items-center gap-2 w-full text-xs text-gray-400 font-mono">
                {/* current time */}
                <span className="w-8 text-right">{formatTime(currentTime)}</span>
                
                {/* progress bar */}
                <div 
                    className={`h-1 bg-[#4d4d4d] rounded-full w-full relative group ${audioSource ? 'cursor-pointer' : 'cursor-default'}`}
                    onClick={audioSource ? handleSeek : undefined}
                >
                    <div 
                        className="absolute top-0 left-0 h-full bg-white rounded-full group-hover:bg-spotify-green transition-colors"
                        style={{ width: `${(currentTime / (duration || 1)) * 100}%` }}
                    ></div>
                    {/* draggable thumb effect */}
                    {audioSource && (
                        <div 
                            className="hidden group-hover:block absolute top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow"
                            style={{ left: `${(currentTime / (duration || 1)) * 100}%` }}
                        ></div>
                    )}
                </div>
                
                {/* duration */}
                <span className="w-8">{formatTime(duration)}</span>
            </div>
          </div>

          {/* 3. RIGHT: Actions */}
          <div className="flex items-center justify-end w-[30%] gap-2 text-gray-400">
             <button onClick={() => openLink(project.githubLink)} className="hover:text-white hover:scale-110 transition p-2" title="Source Code">
                <Github size={18}/>
             </button>
             <button onClick={() => openLink(project.demoLink)} className="hover:text-white hover:scale-110 transition p-2" title="Live Demo">
                <ExternalLink size={18}/>
             </button>
             <button onClick={openShareModal} className="hover:text-white hover:scale-110 transition p-2" title="Share">
                <Share2 size={18}/>
             </button>
             <div className="w-[1px] h-4 bg-gray-700 mx-1"></div>
             <button className="hover:text-white hover:scale-110 transition p-2" title="Details">
                <Info size={18}/>
             </button>
          </div>
      </div>

      {/* mobile mini player */}
      <div 
        onClick={onOpenMobilePlayer}
        className="md:hidden fixed bottom-[68px] left-2 right-2 h-14 bg-[#3E3E3E] rounded-md shadow-xl px-3 flex items-center justify-between z-[60] cursor-pointer animate-in slide-in-from-bottom-4"
      >
          <div className="flex items-center gap-3 overflow-hidden min-w-0 flex-1">
             <img src={project.imageUrl} alt="" className="w-10 h-10 rounded-[4px] object-cover shrink-0 block"/>
             <div className="flex flex-col min-w-0 flex-1">
                <span className="text-white font-bold text-sm truncate pr-2 block">{project.title}</span>
                <span className="text-xs text-gray-300 truncate block">
                    {formatTime(currentTime)} / {formatTime(duration)}
                </span>
             </div>
          </div>

          <div className="flex items-center gap-3 shrink-0">
              <button className="text-gray-300 hover:text-white" onClick={openShareModal}>
                  <Share2 size={20} />
              </button>
              
              <button onClick={togglePlay} className={`text-white ${!audioSource && 'opacity-50 cursor-not-allowed'}`} disabled={!audioSource}>
                 {isPlaying ? <Pause fill="white" size={24} /> : <Play fill="white" size={24} />}
              </button>
          </div>
          
          <div className="absolute bottom-0 left-2 right-2 h-[2px] bg-white/20 rounded-b-md overflow-hidden">
             <div 
                className="h-full bg-white rounded-full transition-all duration-300"
                style={{ width: `${(currentTime / (duration || 1)) * 100}%` }}
             ></div>
          </div>
      </div>

      {/* share modal */}
      <AnimatePresence>
        {showShareModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowShareModal(false)}
              className="absolute inset-0 bg-black/90 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="bg-[#181818] w-full max-w-sm rounded-xl border border-[#333] shadow-2xl overflow-hidden relative z-10"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-white">Share Project</h3>
                  <button onClick={() => setShowShareModal(false)} className="text-gray-400 hover:text-white">
                    <X size={24} />
                  </button>
                </div>
                
                <div className="flex flex-col gap-3">
                  {/* copy link */}
                  <button 
                    onClick={copyLink}
                    className="flex items-center gap-4 p-3 bg-[#2a2a2a] hover:bg-[#3E3E3E] rounded-lg transition group"
                  >
                    <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center text-white group-hover:scale-110 transition">
                        <Link size={20} />
                    </div>
                    <div className="text-left">
                      <div className="font-bold text-white text-sm">Copy Link</div>
                    </div>
                  </button>

                  {/* whatsapp */}
                  <button 
                    onClick={() => shareToSocial('whatsapp')}
                    className="flex items-center gap-4 p-3 bg-[#2a2a2a] hover:bg-[#3E3E3E] rounded-lg transition group"
                  >
                    <div className="w-10 h-10 rounded-full bg-green-600 flex items-center justify-center text-white group-hover:scale-110 transition">
                        <MessageCircle size={20} />
                    </div>
                    <div className="text-left">
                      <div className="font-bold text-white text-sm">WhatsApp</div>
                    </div>
                  </button>

                  {/* linkedin */}
                  <button 
                    onClick={() => shareToSocial('linkedin')}
                    className="flex items-center gap-4 p-3 bg-[#2a2a2a] hover:bg-[#3E3E3E] rounded-lg transition group"
                  >
                    <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white group-hover:scale-110 transition">
                        <Linkedin size={20} />
                    </div>
                    <div className="text-left">
                      <div className="font-bold text-white text-sm">LinkedIn</div>
                    </div>
                  </button>

                  {/* twitter / x */}
                  <button 
                    onClick={() => shareToSocial('twitter')}
                    className="flex items-center gap-4 p-3 bg-[#2a2a2a] hover:bg-[#3E3E3E] rounded-lg transition group"
                  >
                    <div className="w-10 h-10 rounded-full bg-black border border-gray-600 flex items-center justify-center text-white group-hover:scale-110 transition">
                        <Twitter size={20} />
                    </div>
                    <div className="text-left">
                      <div className="font-bold text-white text-sm">Twitter / X</div>
                    </div>
                  </button>
                  
                  {/* native share (only visible if supported) */}
                  {navigator.share && (
                      <button 
                        onClick={handleNativeShare}
                        className="flex items-center gap-4 p-3 bg-[#2a2a2a] hover:bg-[#3E3E3E] rounded-lg transition group"
                      >
                        <div className="w-10 h-10 rounded-full bg-purple-600 flex items-center justify-center text-white group-hover:scale-110 transition">
                            <Share2 size={20} />
                        </div>
                        <div className="text-left">
                          <div className="font-bold text-white text-sm">More Options...</div>
                        </div>
                      </button>
                  )}

                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* success popup */}
      <AnimatePresence>
        {showSuccessPopup && (
          <motion.div
            initial={{ opacity: 0, y: -50, x: "-50%" }}
            animate={{ opacity: 1, y: 0, x: "-50%" }}
            exit={{ opacity: 0, y: -50, x: "-50%" }}
            className="fixed top-10 left-1/2 z-50 bg-[#1ed760] text-black px-6 py-4 rounded-lg shadow-2xl flex items-center gap-4 min-w-[300px]"
          >
            <CheckCircle2 size={24} />
            <div className="flex-1">
              <h4 className="font-bold text-sm">Link Copied!</h4>
              <p className="text-xs font-medium opacity-80">Ready to share with the world.</p>
            </div>
            <button onClick={() => setShowSuccessPopup(false)} className="hover:bg-black/10 p-1 rounded-full transition">
              <X size={18} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default PlayerBar;