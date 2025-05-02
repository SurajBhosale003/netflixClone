import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react"; 
import { useNavigate } from "react-router-dom";
import { videos } from "../../content/VideoOBJ";

function Slider() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [hovered, setHovered] = useState(false);
  const navigate = useNavigate();
  
  const handlePlay = () => {
    navigate(`/page/${currentVideo.id}`, { state: currentVideo }); 
  };
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % videos.length);
    }, 10000); // Auto-slide every 5 seconds

    return () => clearInterval(interval);
  }, []);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + videos.length) % videos.length);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % videos.length);
  };

  const currentVideo = videos[currentIndex];

  // performx
  function optimizeCloudinaryVideo(url: string): string {
    return url.replace('/upload/', '/upload/f_auto,q_auto/');
  }
  
  return (
    <div
      className="relative w-full h-screen overflow-hidden group"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Background */}
      <div className="absolute inset-0 cursor-pointer" onClick={handlePlay}>
        {hovered ? (
          <video
            
            key={currentVideo.video} 
            src={optimizeCloudinaryVideo(currentVideo.video)}
            autoPlay
            muted
            loop
            className="w-full h-full object-cover"
          />
        ) : (
          <img
            src={currentVideo.thumbnail}
            alt={currentVideo.title}
            className="w-full h-full object-cover"
          />
        )}
        {/* Black overlay for dark effect */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/20 to-black/90"></div>
      </div>

      <div className="absolute bottom-12 left-12 z-10 max-w-2xl text-white flex flex-col gap-6">
        <h1 className="text-5xl font-bold drop-shadow-lg">{currentVideo.title}</h1>
        <p className="text-lg text-gray-300">{currentVideo.description}</p>
        <div className="flex gap-4 mt-4">
          <button 
            onClick={handlePlay}
            className="flex items-center gap-2 bg-[#2F8DC0] hover:bg-red-700 transition px-6 py-3 rounded-lg text-white font-bold text-base md:text-lg"
          >
            <svg className="w-5 h-5 fill-white" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
            Play
          </button>

          <button 
            className="flex items-center gap-2 bg-white/20 hover:bg-white/30 transition px-6 py-3 rounded-lg text-white font-semibold text-base md:text-lg"
          >
            <svg className="w-5 h-5 fill-white" viewBox="0 0 24 24">
              <path d="M12 2a10 10 0 1 0 0 20a10 10 0 0 0 0-20Zm1 15h-2v-2h2v2Zm0-4h-2V7h2v6Z" />
            </svg>
            More Info
          </button>
        </div>

      </div>


      {/* Arrows */}
      <button onClick={handlePrev} className="absolute left-6 top-1/2 -translate-y-1/2 z-20 bg-black/50 p-3 rounded-full text-white hover:bg-black/70 transition hidden group-hover:block">
        <ChevronLeft size={32} />
      </button>
      <button onClick={handleNext} className="absolute right-6 top-1/2 -translate-y-1/2 z-20 bg-black/50 p-3 rounded-full text-white hover:bg-black/70 transition hidden group-hover:block">
        <ChevronRight size={32} />
      </button>
    </div>
  );
}

export default Slider;
