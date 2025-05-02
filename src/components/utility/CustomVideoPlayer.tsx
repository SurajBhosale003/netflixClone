import React, { useEffect, useRef, useState } from "react";
import videojs from "video.js";
import Hls from "hls.js";
import "video.js/dist/video-js.css";

interface Ad {
  time: number;
  adUrl: string;
  link?: string;
}

interface Props {
  source: string;
  adSchedule: Ad[];
}

const CustomVideoPlayer: React.FC<Props> = ({ source, adSchedule }) => {
  const videoNode = useRef<HTMLVideoElement>(null);
  const hlsInstance = useRef<Hls | null>(null);
  const playerRef = useRef<any>(null);

  const [showAd, setShowAd] = useState(false);
  const [currentAd, setCurrentAd] = useState<Ad | null>(null);
  const [triggered, setTriggered] = useState<Record<number, boolean>>({});

  useEffect(() => {
    const initializePlayer = () => {
      const videoElement = videoNode.current;
      if (!videoElement || !document.body.contains(videoElement)) return;

      if (source.endsWith(".m3u8") && Hls.isSupported()) {
        hlsInstance.current = new Hls();
        hlsInstance.current.loadSource(source);
        hlsInstance.current.attachMedia(videoElement);
      } else {
        videoElement.src = source;
      }

      playerRef.current = videojs(videoElement, {
        controls: true,
        autoplay: true,
        preload: "auto",
        fluid: true,
        controlBar: {
          volumePanel: { inline: false },
        },
      });

      const player = playerRef.current;

      player.on("timeupdate", () => {
        const currentTime = Math.floor(player.currentTime());
        adSchedule.forEach((ad) => {
          if (currentTime === ad.time && !triggered[ad.time]) {
            setTriggered((prev) => ({ ...prev, [ad.time]: true }));
            setCurrentAd(ad);
            setShowAd(true);
            player.pause();
          }
        });
      });
    };

    // Delay to ensure DOM is mounted
    const timeout = setTimeout(initializePlayer, 100);

    return () => {
      clearTimeout(timeout);
      playerRef.current?.dispose();
      hlsInstance.current?.destroy();
    };
  }, [source]);

  const handleAdEnded = () => {
    setShowAd(false);
    setCurrentAd(null);
    playerRef.current?.play();
  };

  return (
    <div className="relative w-full h-full bg-black">
      <video
        ref={videoNode}
        className="video-js vjs-big-play-centered w-full h-full"
      />

      {showAd && currentAd && (
        <div className="absolute inset-0 z-50 bg-black flex flex-col items-center justify-center">
          <video
            src={currentAd.adUrl}
            autoPlay
            onEnded={handleAdEnded}
            className="w-full h-full object-contain"
          />
          <div className="absolute bottom-6 right-6">
            <button
              onClick={() => window.open(currentAd.link, "_blank")}
              className="bg-yellow-400 hover:bg-yellow-500 px-4 py-2 font-bold rounded"
            >
              Visit Now
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomVideoPlayer; 