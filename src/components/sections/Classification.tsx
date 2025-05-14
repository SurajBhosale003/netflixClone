import React, { useRef, useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { categories } from "../../content/ClassifiedData"


function Classification() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartX(e.pageX - (scrollRef.current?.offsetLeft || 0));
    setScrollLeft(scrollRef.current?.scrollLeft || 0);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !scrollRef.current) return;
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 1.5;
    scrollRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleMouseUp = () => setIsDragging(false);
  const handleMouseLeave = () => setIsDragging(false);

  const scroll = (dir: "left" | "right") => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: dir === "left" ? -300 : 300,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="relative flex bg-black text-white overflow-hidden select-none">
      {/* Left Arrow */}

      {/* Vertical CLASSIFIEDS Strip */}
      <div className="bg-red-600 w-[60px] flex justify-center items-center">
        <div className="rotate-[-90deg] text-white font-extrabold text-xl tracking-widest">
          CLASSIFIEDS
        </div>
      </div>
      <button
        onClick={() => scroll("left")}
        className="z-20 p-2 bg-black/60 hover:bg-black/80 text-white rounded-full m-2 my-auto"
      >
        <ChevronLeft size={26} />
      </button>

      {/* Scrollable Cards */}
      <div
        ref={scrollRef}
        className="flex gap-6 overflow-x-auto scrollbar-hide cursor-grab active:cursor-grabbing py-4 px-4"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
      >
        {categories.map((item, index) => {
          const Icon = item.icon;
          return (
            <div
              key={index}
              className="min-w-[360px] h-[140px] bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-lg overflow-hidden shadow-md shrink-0 flex items-center transition hover:scale-[1.02]"
            >
              {/* Image */}
              <div className="w-[140px] h-full flex-shrink-0">
              <img
                src={item.image}
                alt={item.title}
                width="140"
                height="140"
                className="w-full h-full object-cover"
                draggable={false}
              />
              </div>

              {/* Content */}
              <div className="flex flex-col justify-center px-4 py-3 w-full">
                <div className="flex items-center gap-2 text-white font-semibold text-base">
                  <span className="p-1.5 bg-red-600 text-white rounded-full">
                    <Icon size={16} />
                  </span>
                  <span>{item.title}</span>
                </div>
                <p className="text-white/70 text-sm mt-1 line-clamp-2">
                  {item.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Right Arrow */}
      <button
        onClick={() => scroll("right")}
        className="z-20 p-2 bg-black/60 hover:bg-black/80 text-white rounded-full m-2 my-auto"
      >
        <ChevronRight size={26} />
      </button>

      {/* Scrollbar Hide CSS */}
      <style>
        {`
          .scrollbar-hide::-webkit-scrollbar {
            display: none;
          }
          .scrollbar-hide {
            -ms-overflow-style: none;
            scrollbar-width: none;
          }
        `}
      </style>
    </div>
  );
}

export default Classification;
