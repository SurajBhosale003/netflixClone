import Marquee from "react-fast-marquee";
import {newsCardData} from "../../content/NewsCardContent"

const NewsMarqueeCards = () => {
    return (
      <div className="absolute bottom-0 left-0 w-full h-[25vh] z-20 px-6 py-4  text-white">
        <Marquee
          gradient={false}
          speed={40}
          pauseOnHover
          direction="right"
          className="w-full group"
        >
          {newsCardData.map((item) => (
            <div
              key={item.id}
              className="group/card h-[22vh] w-[16vw] min-w-[200px] flex-shrink-0 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-xl shadow-lg overflow-hidden text-white mx-2 transition-opacity duration-300"
            >
              <img
                src={item.image}
                alt="News"
                width="320"
                height="180"
                className="w-full h-[70%] object-cover"
              />
              <div className="h-1/3 flex items-center">
                <p className="ml-3 mt-6 text-xs sm:text-sm md:text-base lg:text-lg leading-snug line-clamp-3">
                  {item.text}
                </p>
              </div>
            </div>
          ))}
        </Marquee>
  
        <style>
          {`
            .group:hover .group\\/card:not(:hover) {
              opacity: 0.4;
            }
          `}
        </style>
      </div>
    );
  };
  
  export default NewsMarqueeCards;
  