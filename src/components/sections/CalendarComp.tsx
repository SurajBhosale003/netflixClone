import { useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { eventData } from "../../content/EventData";

function CalendarComp() {
  const sliderRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  // Drag scroll handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartX(e.pageX - (sliderRef.current?.offsetLeft || 0));
    setScrollLeft(sliderRef.current?.scrollLeft || 0);
  };

  const handleMouseLeave = () => setIsDragging(false);
  const handleMouseUp = () => setIsDragging(false);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !sliderRef.current) return;
    e.preventDefault();
    const x = e.pageX - sliderRef.current.offsetLeft;
    const walk = (x - startX) * 1.5; // scroll speed
    sliderRef.current.scrollLeft = scrollLeft - walk;
  };


  const scroll = (direction: "left" | "right") => {
    if (!sliderRef.current) return;
    const amount = direction === "left" ? -300 : 300;
    sliderRef.current.scrollBy({ left: amount, behavior: "smooth" });
  };

  return (
    <div className="w-full px-4 pt-6 pb-5 text-white relative group">
      <h2 className="text-lg sm:text-xl font-semibold mb-5">Upcoming Events</h2>

      {/* Arrow Buttons */}
      <button
        onClick={() => scroll("left")}
        className="absolute left-2 top-[calc(50%+12px)] -translate-y-1/2 z-20 bg-black/50 p-2 rounded-full text-white hover:bg-black/70 transition hidden group-hover:block"
      >
        <ChevronLeft size={24} />
      </button>
      <button
        onClick={() => scroll("right")}
        className="absolute right-2 top-[calc(50%+12px)] -translate-y-1/2 z-20 bg-black/50 p-2 rounded-full text-white hover:bg-black/70 transition hidden group-hover:block"
      >
        <ChevronRight size={24} />
      </button>

      {/* Slider */}
      <div
        ref={sliderRef}
        className="flex gap-4 overflow-x-auto scrollbar-hide cursor-grab active:cursor-grabbing select-none"
        onMouseDown={handleMouseDown}
        onMouseLeave={handleMouseLeave}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
      >
        {eventData.map((event, i) => (
          <div
            key={`${event.id}-${i}`}
            className="group/card flex-shrink-0 w-52 min-h-[250px] bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-lg overflow-hidden shadow-md transition-transform duration-300"
          >
            <img
              loading="lazy"
              src={event.image}
              alt={event.title}
              width="208"  // matches w-52
              height="96"  // 24 * 4 = 96px
              className="w-full h-[96px] object-cover pointer-events-none"
              draggable={false}
            />

            <div className="p-2 space-y-1 text-xs select-none">
              <h3 className="font-semibold line-clamp-1">{event.title}</h3>
              <p className="text-white/80 line-clamp-2">{event.text}</p>
              <div className="pt-1 space-y-0.5 text-white/60 flex flex-wrap gap-x-2 gap-y-1">
                <p>📅 {event.date}</p>
                <p>⏰ {event.time}</p>
                <p>📍 {event.location}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <style>
        {`
          .group:hover .group\\/card:not(:hover) {
            opacity: 0.4;
          }
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

export default CalendarComp;