/// <reference types="react" />
declare global {
  namespace JSX {
    interface IntrinsicElements {
      'mux-player': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
        src?: string;
        'stream-type'?: string;
        'metadata-video-title'?: string;
        'primary-color'?: string;
        autoplay?: boolean;
        muted?: boolean;
        playsinline?: boolean;
      };
    }
  }
}

import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import NewsTicker from "../components/utility/NewsMareqee";
import { newsItems } from "../content/NewsContent"
import { adSchedule } from "../content/AdsContent"
import '@mux/mux-player';

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
          <div className="relative w-full h-[95vh]">
          <mux-player
            ref={videoRef as any}
            src={videoData.fullVideo || videoData.video}
            stream-type="on-demand"
            metadata-video-title="Video"
            primary-color="#2F8DC0"
            muted
            autoplay
            playsinline
            onCanPlay={handleCanPlay as any}
            onTimeUpdate={handleTimeUpdate as any}
            onSeeked={handleSeeked as any}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "contain",
              backgroundColor: "black",
              zIndex: showAd ? 0 : 10,
              position: "absolute",
            }}
          ></mux-player>
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
          {showAd && currentAdIndex !== null && (
            <div className="absolute inset-0 z-20 bg-black flex items-center justify-center">
              <video
                ref={adVideoRef}
                src={adSchedule[currentAdIndex].adUrl}
                autoPlay
                onEnded={handleAdEnded}
                controls={false}
                className="w-full h-full object-cover"
                style={{ pointerEvents: "none" }}
              />
            </div>
          )}
        </>
      )}
    </div>
    <NewsTicker newsItems={newsItems} />
    </>
  );
}

export default PlayerV;