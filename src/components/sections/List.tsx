import { useState, useRef, MouseEvent, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { VideoItem } from "../../content/VideoOBJ";

interface VideoSliderProps {
  title: string;
  items: VideoItem[];
}

function VideoSlider({ title, items }: VideoSliderProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const sliderRef = useRef<HTMLDivElement | null>(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);
  const navigate = useNavigate();

  useEffect(() => {
    const timeout = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timeout);
  }, []);

  const handlePlay = (vid: VideoItem) => {
    if (vid.type !== "AD") {
      navigate(`/page/${vid.id}`, { state: vid });
    }
  };

  const handleMouseDown = (e: MouseEvent<HTMLDivElement>) => {
    if (!sliderRef.current) return;
    isDragging.current = true;
    startX.current = e.pageX - sliderRef.current.offsetLeft;
    scrollLeft.current = sliderRef.current.scrollLeft;
    sliderRef.current.classList.add("select-none");
  };

  const handleMouseLeave = () => {
    if (!sliderRef.current) return;
    isDragging.current = false;
    sliderRef.current.classList.remove("select-none");
  };

  const handleMouseUp = () => {
    if (!sliderRef.current) return;
    isDragging.current = false;
    sliderRef.current.classList.remove("select-none");
  };

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!isDragging.current || !sliderRef.current) return;
    e.preventDefault();
    const x = e.pageX - sliderRef.current.offsetLeft;
    const walk = (x - startX.current) * 1.5;
    sliderRef.current.scrollLeft = scrollLeft.current - walk;
  };
  const renderSkeletons = () =>
    Array.from({ length: 6 }).map((_, index) => (
      <div
        key={index}
        className="w-[15vw] h-[20vh] bg-gray-700 animate-pulse rounded-lg shrink-0"
      />
    ));

  return (
    <div className="mt-12 px-6 mb-12 ml-[0vw] mr-[0vw]">
      <h2 className="text-white text-2xl font-bold mb-4">{title}</h2>
      <div
        ref={sliderRef}
        className="flex gap-4 overflow-x-auto scrollbar-none cursor-grab active:cursor-grabbing"
        onMouseDown={handleMouseDown}
        onMouseLeave={handleMouseLeave}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
      >
        {loading
          ? renderSkeletons()
          : items.map((item, index) => (
              <div
                key={index}
                onClick={() => handlePlay(item)}
                className={`relative w-[15vw] h-[20vh] bg-gray-800 rounded-lg overflow-hidden shrink-0 cursor-grab active:cursor-grabbing transition-transform group ${
                  item.type === "AD"
                    ? "border-4 border-yellow-500 cursor-default"
                    : "hover:scale-105"
                }`}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                {hoveredIndex === index ? (
                  <>
                    <video
                      src={item.video}
                      autoPlay
                      muted
                      loop
                      width="288"
                      height="216"
                      className="w-full h-full object-cover pointer-events-none"
                    />
                    <div className="absolute inset-0 text-white flex flex-col justify-end p-4 opacity-0 group-hover:opacity-100 transition-opacity bg-gradient-to-t from-black/70 to-transparent">
                      <h3 className="text-lg font-bold">{item.title}</h3>
                      <div className="flex items-center gap-2 text-sm mt-1">
                        <span>⭐ {item.rating}</span>
                        <span>• {item.date}</span>
                      </div>
                      <p className="text-xs mt-2 line-clamp-1">{item.plot}</p>
                      {item.type === "AD" && (
                        <button
                          className="mt-2 bg-yellow-500 text-black p-2 rounded-full hover:bg-yellow-600 transition-all"
                          onClick={(e) => {
                            e.stopPropagation();
                          }}
                        >
                          Visit Now
                        </button>
                      )}
                    </div>
                  </>
                ) : (
                  <img
                    src={item.thumbnail}
                    alt={item.title}
                    width="288"
                    height="216"
                    className="w-full h-full object-cover pointer-events-none"
                  />
                )}
              </div>
            ))}
      </div>
    </div>
  );
}

export default VideoSlider;
