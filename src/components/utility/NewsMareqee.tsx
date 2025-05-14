import React from "react";
import Marquee from "react-fast-marquee";

type NewsItem = {
  text: string;
  url: string;
};

interface NewsTickerProps {
  newsItems: NewsItem[];
}

const NewsTicker: React.FC<NewsTickerProps> = ({ newsItems }) => {
  return (
    <div
    className="w-full py-2 px-4 flex items-center h-[48px] min-h-[48px]"
      style={{
        background: "linear-gradient(to right, #e50914, #b81d24)",
        color: "white",
      }}
    >
      {/* Fixed Breaking News Image */}
      <img
        src="https://storage.googleapis.com/1000gns/1001/1001website/Images/newsBreak.png"
        alt="Breaking News"
        width="88"
        height="90"
        className="w-[88px] h-[90px] mr-4 flex-shrink-0"
      />

      {/* Marquee with news items */}
      <Marquee gradient={false} speed={50} className="w-full">
        {newsItems.map((item, index) => (
          <span
            key={index}
            className="mr-10 inline-block text-base font-medium tracking-wide"
          >
            <a
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline text-white transition-colors duration-200 font-bold"
            >
              • {item.text}
            </a>
          </span>
        ))}
      </Marquee>
    </div>
  );
};

export default NewsTicker;
