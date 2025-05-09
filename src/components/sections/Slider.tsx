import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { videos } from "../../content/VideoOBJ";
import NewsTicker from "../utility/NewsMareqee";
import { newsItems } from "../../content/NewsContent"

function Slider() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [hovered, setHovered] = useState(false);
  const [isAdPlaying, setIsAdPlaying] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const currentVideo = videos[currentIndex];
  const isAd = currentVideo.type === "AD";

  const handlePlay = () => {
    if (!isAd) {
      navigate(`/page/${currentVideo.id}`, { state: currentVideo });
    }
  };

  useEffect(() => {
    setLoading(true); // Reset loading when video changes
    if (isAd) {
      setIsAdPlaying(true);
      const adTimer = setTimeout(() => {
        setIsAdPlaying(false);
        console.log(isAdPlaying)
        setCurrentIndex((prev) => (prev + 1) % videos.length);
      }, 15000);
      return () => clearTimeout(adTimer);
    } else {
      const interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % videos.length);
      }, 10000);
      return () => clearInterval(interval);
    }
  }, [currentIndex, isAd]);

  

  const handlePrev = () => setCurrentIndex((prev) => (prev - 1 + videos.length) % videos.length);
  const handleNext = () => setCurrentIndex((prev) => (prev + 1) % videos.length);

  const optimizeCloudinaryVideo = (url: string) =>
    url.replace("/upload/", "/upload/f_auto,q_auto/");

  const getVideoQuality = (url: string) => {
    const width = window.innerWidth;
    if (width >= 1920) return currentVideo.FHDPreview || url;
    if (width >= 1280) return currentVideo.HDPreview || url;
    if (width >= 720) return currentVideo.SDPreview || url;
    return currentVideo.LDPreview || url;
  };

  const handleVideoLoaded = () => setLoading(false);

  return (
    <>
    <div
      className="relative w-full h-[95vh] overflow-hidden group"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Background: Video or Image */}
      <div className="absolute inset-0 cursor-pointer" onClick={handlePlay}>
        {loading && (
          <div className="w-full h-full bg-gray-900 animate-pulse flex items-center justify-center">
            <div className="w-16 h-16 border-4 border-white border-t-transparent rounded-full animate-spin" />
          </div>
        )}

        {hovered || isAd ? (
          <video
            key={currentVideo.id}
            src={getVideoQuality(optimizeCloudinaryVideo(currentVideo.video))}
            autoPlay
            muted
            loop={!isAd}
            onLoadedData={handleVideoLoaded}
            className={`w-full h-full object-cover absolute top-0 left-0 transition-opacity duration-500 ${
              loading ? "opacity-0" : "opacity-100"
            }`}
          />
        ) : (
          <img
            src={currentVideo.thumbnail}
            alt={currentVideo.title}
            className="w-full h-full object-cover"
            loading="lazy"
            onLoad={() => setLoading(false)}
          />
        )}

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/20 to-black/90" />
      </div>

      {/* Content */}
      <div className="absolute bottom-12 left-12 z-10 max-w-2xl text-white flex flex-col gap-6">
        <h1 className="text-5xl font-bold drop-shadow-lg">{currentVideo.title}</h1>
        <p className="text-lg text-gray-300">{currentVideo.description}</p>

        {isAd ? (
          <div className="flex flex-col gap-2">
            <button className="bg-yellow-500 hover:bg-yellow-600 px-6 py-3 rounded-lg text-black font-bold text-lg transition">
              🚀 Visit Now
            </button>
            <div className="bg-white/20 px-4 py-2 rounded-lg text-white text-sm">
              🎁 Special Offer: Limited Time Deal!
            </div>
          </div>
        ) : (
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

            <button className="flex items-center gap-2 bg-white/20 hover:bg-white/30 transition px-6 py-3 rounded-lg text-white font-semibold text-base md:text-lg">
              <svg className="w-5 h-5 fill-white" viewBox="0 0 24 24">
                <path d="M12 2a10 10 0 1 0 0 20a10 10 0 0 0 0-20Zm1 15h-2v-2h2v2Zm0-4h-2V7h2v6Z" />
              </svg>
              More Info
            </button>
          </div>
        )}
      </div>

      {/* Navigation Arrows */}
      {!isAd && (
        <>
          <button
            onClick={handlePrev}
            className="absolute left-6 top-1/2 -translate-y-1/2 z-20 bg-black/50 p-3 rounded-full text-white hover:bg-black/70 transition hidden group-hover:block"
          >
            <ChevronLeft size={32} />
          </button>
          <button
            onClick={handleNext}
            className="absolute right-6 top-1/2 -translate-y-1/2 z-20 bg-black/50 p-3 rounded-full text-white hover:bg-black/70 transition hidden group-hover:block"
          >
            <ChevronRight size={32} />
          </button>
        </>
      )}
    </div>
       <NewsTicker newsItems={newsItems} />
</>
  );
}

export default Slider;
