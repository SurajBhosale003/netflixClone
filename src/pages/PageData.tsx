import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useMemo, useState, useCallback } from "react";
import StarSVG from "../svg/StarSVG";

function PageData() {
  const location = useLocation();
  const navigate = useNavigate();
  const videoData = location.state;

  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [canLoadVideo, setCanLoadVideo] = useState(false); // Delay video loading for paint

  // Delay non-critical video load after render
  useEffect(() => {
    if ("requestIdleCallback" in window) {
      (window as any).requestIdleCallback(() => setCanLoadVideo(true));
    } else {
      setTimeout(() => setCanLoadVideo(true), 200); // fallback
    }
  }, []);

  const previewVideo = useMemo(() => {
    const width = window.innerWidth;
    if (width >= 1440 && videoData.FHDPreview) return videoData.FHDPreview;
    if (width >= 1024 && videoData.HDPreview) return videoData.HDPreview;
    if (width >= 768 && videoData.SDPreview) return videoData.SDPreview;
    if (videoData.LDPreview) return videoData.LDPreview;
    return videoData.video;
  }, [videoData]);

  const handlePlay = useCallback(() => {
    navigate(`/player/${videoData.id}`, { state: { videoData } });
  }, [navigate, videoData]);

  return (
    <div className="relative min-h-screen bg-black">
      {/* Lazy Background image */}
      {!isVideoLoaded && (
        <div
          className="absolute top-0 left-0 w-full h-full bg-cover bg-center z-0"
          style={{ backgroundImage: `url(${videoData.thumbnail})` }}
        />
      )}

      {/* Lazy-loaded Background video */}
      {canLoadVideo && previewVideo && (
        <video
          src={previewVideo}
          preload="metadata"
          poster={videoData.thumbnail}
          autoPlay
          loop
          playsInline
          onLoadedData={() => setIsVideoLoaded(true)}
          className="absolute top-0 left-0 w-full h-full object-cover z-0 transition-opacity duration-500"
        />
      )}

      {/* Content overlay */}
      <div className="bg-black/50 backdrop-blur-[2px] rounded-r-md max-w-[50vw] absolute bottom-0 left-0 right-0 w-full bg-gradient-to-t from-black via-transparent to-transparent p-10 pb-[10vh] text-white z-10">
        <h1 className="ml-[2vw] text-[2vh] md:text-[4vh] lg:text-[6vh] font-extrabold leading-tight tracking-tight break-words max-w-5xl">
          {videoData.title}
        </h1>

        <div className="ml-[3vw] mt-6">
          <p className="text-sm md:text-base text-white/90 mb-2 line-clamp-2">{videoData.description}</p>
          <p className="text-sm md:text-base text-white/70 mb-4 line-clamp-2">{videoData.plot}</p>

          <div className="grid grid-cols-2 gap-x-6 gap-y-1 text-xs md:text-sm text-white/70 max-w-md">
            <p><span className="font-semibold text-white">Genre:</span> {videoData.genre.join(", ")}</p>
            <p><span className="font-semibold text-white">Language:</span> {videoData.language}</p>
            <p><span className="font-semibold text-white">Duration:</span> {videoData.duration}</p>
            <p><span className="font-semibold text-white">Cast:</span> {videoData.cast.join(", ")}</p>
            <p><span className="font-semibold text-white">Director:</span> {videoData.director}</p>
            <p><span className="font-semibold text-white">Release:</span> {videoData.date}</p>
            <p><span className="font-semibold text-white">Type:</span> {videoData.type}</p>
          </div>

          <div className="mt-6">
            <button 
              onClick={handlePlay}
              className="flex items-center gap-2 bg-[#2F8DC0] hover:bg-red-700 transition px-6 py-3 rounded-lg text-white font-bold text-base md:text-lg"
            >
              <svg className="w-5 h-5 fill-white" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
              Play
            </button>
          </div>
        </div>
      </div>

      {/* Rating Display */}
      <div className="absolute bottom-[20vh] right-0 bg-gray-900 bg-opacity-80 p-3 rounded-l-lg shadow-lg pr-[5vw] z-10">
        <span className="text-2xl font-semibold text-white flex items-center gap-2">
          <StarSVG className="h-8 w-10" />
          {videoData.rating}
        </span>
      </div>
    </div>
  );
}

export default PageData;
