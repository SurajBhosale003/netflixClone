import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import NewsTicker from "../components/utility/NewsMareqee";
interface VideoData {
  fullVideo?: string;
  video?: string;
}

interface Ad {
  time: number;
  adUrl: string;
}

function PlayerV(): JSX.Element {
  const { state } = useLocation();
  const navigate = useNavigate();

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const adVideoRef = useRef<HTMLVideoElement | null>(null);
  const wasFullscreen = useRef<boolean>(false);

  const [loading, setLoading] = useState(true);
  const [showAd, setShowAd] = useState(false);
  const [currentAdIndex, setCurrentAdIndex] = useState<number | null>(null);
  const [duration, setDuration] = useState<number>(0);

  const videoData: VideoData | undefined = (state as any)?.videoData;
  const triggeredAds = useRef<Record<number, boolean>>({});
  const lastPlaybackTime = useRef<number>(0);

  const adSchedule: Ad[] = [
    { time: 30, adUrl: "https://storage.googleapis.com/1000gns/1001/content/ads/Refined%20Ads/barAds.mp4" },
    { time: 60, adUrl: "https://storage.googleapis.com/1000gns/1001/content/ads/Refined%20Ads/cakeAds.mp4" },
    { time: 90, adUrl: "https://storage.googleapis.com/1000gns/1001/content/ads/Refined%20Ads/donutads.mp4" },
    { time: 120, adUrl: "https://storage.googleapis.com/1000gns/1001/content/ads/Refined%20Ads/friesAds.mp4" },
    { time: 150, adUrl: "https://storage.googleapis.com/1000gns/1001/content/ads/Refined%20Ads/gymAds.mp4" },
    { time: 180, adUrl: "https://storage.googleapis.com/1000gns/1001/content/ads/Refined%20Ads/hairAds.mp4" },
    { time: 210, adUrl: "https://storage.googleapis.com/1000gns/1001/content/ads/Refined%20Ads/resturantAds.mp4" },
    { time: 240, adUrl: "https://storage.googleapis.com/1000gns/1001/content/ads/Refined%20Ads/spaAds.mp4" },
    { time: 270, adUrl: "https://storage.googleapis.com/1000gns/1001/content/ads/Refined%20Ads/storeAds.mp4" }
  ];
  
  const newsItems = [
    {
      text: "$5 MILLION AVAILABLE FOR FOREST-SECTOR BUSINESS AND WORKFORCE DEVELOPMENT PROJECTS",
      url: "https://chron.biz/chron/news?&5-million-available-for-forest-sector-business-and-workforce-development-projects"
    },
    {
      text: "Ranking Members Padilla, Morelle Continue to Press Trump Administration on Firings",
      url: "https://chron.biz/chron/news?&ranking-members-padilla-morelle-continue-to-press-trump-administration-on-firings"
    },
    {
      text: "Ranking Member Morelle Condemns Dismissal of Key Inspectors General",
      url: "https://chron.biz/chron/news?&ranking-member-morelle-condemns-dismissal-of-key-inspectors-general"
    },
    {
      text: "Low-Income Household Water Assistance Program",
      url: "https://chron.biz/chron/news?&low-income-household-water-assistance-program"
    },
    {
      text: "Child and Adult Care Food Program",
      url: "https://chron.biz/chron/news?&child-and-adult-care-food-program"
    },
    {
      text: "USDOL Grant",
      url: "https://chron.biz/chron/news?&usdol-grant"
    },
    {
      text: "Coronavirus Capital Projects Fund (CCPF)",
      url: "https://chron.biz/chron/news?&coronavirus-capital-projects-fund-ccpf"
    },
    {
      text: "NYSERDA Clean Energy Internship Program",
      url: "https://chron.biz/chron/news?&nyserda-clean-energy-internship-program"
    },
    {
      text: "Broadband Program Awards",
      url: "https://chron.biz/chron/news?&broadband-program-awards"
    },
    {
      text: "New York State Biodefense Commercialization Fund",
      url: "https://chron.biz/chron/news?&new-york-state-biodefense-commercialization-fund"
    },
    {
      text: "Small Business Pandemic Recovery Grant Program",
      url: "https://chron.biz/chron/news?&small-business-pandemic-recovery-grant-program"
    },
    {
      text: "Emergency Rental Assistance Program",
      url: "https://chron.biz/chron/news?&emergency-rental-assistance-program"
    },
    {
      text: "Section 8 Housing Choice Voucher Program",
      url: "https://chron.biz/chron/news?&section-8-housing-choice-voucher-program"
    },
    {
      text: "Get Assistance with Home Heating Bills",
      url: "https://chron.biz/chron/news?&get-assistance-with-home-heating-bills"
    },
    {
      text: "Utility Bill Assistance Programs",
      url: "https://chron.biz/chron/news?&utility-bill-assistance-programs"
    },
    {
      text: "SNAP - Supplemental Nutrition Assistance Program",
      url: "https://chron.biz/chron/news?&snap-supplemental-nutrition-assistance-program"
    },
    {
      text: "Child Support Services",
      url: "https://chron.biz/chron/news?&child-support-services"
    },
    {
      text: "Home Energy Assistance Program (HEAP)",
      url: "https://chron.biz/chron/news?&home-energy-assistance-program-heap"
    },
    {
      text: "Healthcare Worker Bonus (HWB) Program",
      url: "https://chron.biz/chron/news?&healthcare-worker-bonus-hwb-program"
    }
  ];
  
  

  useEffect(() => {
    if (!videoData) navigate("/");
  }, [videoData, navigate]);

  useEffect(() => {
    const interval = setInterval(() => {
      const video = videoRef.current;
      if (video && !showAd) {
        const currentTime = Math.floor(video.currentTime);
        adSchedule.forEach((ad, index) => {
          if (currentTime === ad.time && !triggeredAds.current[ad.time]) {
            triggeredAds.current[ad.time] = true;
            playAd(index);
          }
        });
      }
    }, 500);

    return () => clearInterval(interval);
  }, [showAd]);

  const playAd = async (index: number) => {
    const video = videoRef.current;
    if (!video) return;

    // Save fullscreen state and exit
    wasFullscreen.current = !!document.fullscreenElement;
    if (wasFullscreen.current) {
      try {
        await document.exitFullscreen();
      } catch {}
    }

    video.pause();
    setCurrentAdIndex(index);
    setShowAd(true);
  };

  const handleAdEnded = async () => {
    setShowAd(false);
    setCurrentAdIndex(null);

    if (wasFullscreen.current && videoRef.current) {
      try {
        await videoRef.current.requestFullscreen();
      } catch {}
    }

    videoRef.current?.play();
  };

  const handleCanPlay = () => {
    setLoading(false);
    setDuration(videoRef.current?.duration || 0);
  };

  const handleTimeUpdate = () => {
    if (!showAd) {
      lastPlaybackTime.current = videoRef.current?.currentTime || 0;
    }
  };

  const handleSeeked = () => {
    const video = videoRef.current;
    const seekedTime = video?.currentTime ?? 0;

    const skippedAd = adSchedule.find(
      (ad) =>
        seekedTime >= ad.time &&
        lastPlaybackTime.current < ad.time &&
        !triggeredAds.current[ad.time]
    );

    if (video && skippedAd) {
      video.currentTime = skippedAd.time;
      triggeredAds.current[skippedAd.time] = true;
      playAd(adSchedule.indexOf(skippedAd));
    }
  };

  const getMarkerStyles = (adTime: number): React.CSSProperties => {
    const percentage = (adTime / duration) * 100;
    return {
      position: "absolute",
      left: `${percentage}%`,
      top: 0,
      height: "100%",
      width: "2px",
      backgroundColor: "yellow",
      zIndex: 15,
    };
  };

  return (
    <>
    <div className="w-full h-[95vh] bg-black flex items-center justify-center relative">
      {loading && (
        <div className="absolute text-white text-lg">Loading Video...</div>
      )}

      {videoData && (
        <>
          {/* Main Video */}
          <div className="relative w-full h-[95vh]">
            <video
              ref={videoRef}
              src={videoData.fullVideo || videoData.video}
              controls={!showAd}
              autoPlay
              onCanPlay={handleCanPlay}
              onTimeUpdate={handleTimeUpdate}
              onSeeked={handleSeeked}
              className="w-full h-full object-contain"
              style={{ backgroundColor: "black", zIndex: showAd ? 0 : 10 }}
            />

            {/* Ad Markers on progress bar */}
            {duration > 0 && (
              <div
                className="absolute bottom-0 left-0 right-0 h-1 pointer-events-none"
                style={{ zIndex: 14 }}
              >
                {adSchedule.map((ad) => (
                  <div key={ad.time} style={getMarkerStyles(ad.time)} />
                ))}
              </div>
            )}
          </div>

          {/* Ad Overlay */}
          {showAd && currentAdIndex !== null && (
            <video
              ref={adVideoRef}
              src={adSchedule[currentAdIndex].adUrl}
              autoPlay
              onEnded={handleAdEnded}
              controls={false}
              className="absolute w-full h-full object-contain z-20"
              style={{ pointerEvents: "none" }}
            />
          )}
        </>
      )}
    </div>
    <NewsTicker newsItems={newsItems} />
    </>
  );
}

export default PlayerV;