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
    <div className="w-[100vw] bg-black text-white py-2 px-4">
      <Marquee gradient={false} speed={50}>
        {newsItems.map((item, index) => (
          <span key={index} className="mr-10 inline-block text-sm">
            <a
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline text-[#ffffff]"
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
