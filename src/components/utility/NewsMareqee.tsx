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
    <div className="w-full bg-black text-white py-2 px-4 flex items-center h-12">
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
              className="hover:underline text-white transition-colors duration-200"
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
