import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import CustomVideoPlayer from "../components/utility/CustomVideoPlayer"; 

interface VideoData {
  fullVideo?: string;
  video?: string;
}

function PlayerV(): JSX.Element {
  const { state } = useLocation();
  const navigate = useNavigate();

  const videoData: VideoData | undefined = (state as any)?.videoData;

  const adSchedule = [
    {
      time: 14,
      adUrl: "https://storage.googleapis.com/1000gns/1001/content/ads/Refined%20Ads/barAds.mp4",
      link: "https://example.com/barad",
    },
    {
      time: 40,
      adUrl: "https://storage.googleapis.com/1000gns/1001/content/ads/Refined%20Ads/cakeAds.mp4",
      link: "https://example.com/cakead",
    },
  ];

  useEffect(() => {
    if (!videoData) navigate("/");
  }, [videoData, navigate]);

  return (
    <div className="fixed top-0 left-0 w-screen h-screen bg-black flex items-center justify-center z-50">
      {videoData && (
        <CustomVideoPlayer
          source={videoData.fullVideo?videoData.fullVideo:videoData.video}
          adSchedule={adSchedule}
        />
      )}
    </div>
  );
}

export default PlayerV;
