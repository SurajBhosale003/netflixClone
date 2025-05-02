
export type VideoItem = {
    id: string;
    thumbnail: string;
    video: string;
    fullVideo: string;
    title: string;
    description: string;
    rating: number;
    date: string;
    plot: string;
    genre: string[];      
    language: string;
    duration: string;
    cast: string[];      
    director: string;
    type: "Movie" | "Show" | "Documentary" | "News"; 
  };


export const movies : VideoItem[] = [
  {
    id: "saloN-z6p8",
    title: "Ringing In 2022 With Style",
    description: "After months of careful and detailed planning by a local youth council, a New Year’s Eve Dance was held on Friday night, Dec. 31, for Moapa Valley teens. The dance was held at the Logandale Stake Center of the Church of Jesus Christ of Latter-day Saints. Youth, ages 14 and up, from all over the Moapa Valley communities, gathered at the church to celebrate the final hours of 2021 and spend the beginning of 2022 together.",
    thumbnail: "https://res.cloudinary.com/de6u5kbiw/image/upload/v1745909262/stream/video/01MainNewsVideo/01MainNewsThumb_z8d3cb.png",
    video: "https://res.cloudinary.com/de6u5kbiw/video/upload/v1745909623/stream/video/01MainNewsVideo/01MainNewsVideo_online-video-cutter.com_smsmrd.mp4",
    fullVideo: "https://res.cloudinary.com/de6u5kbiw/video/upload/v1745908947/stream/video/01MainNewsVideo/01MainNewsVideo_ktjkop.mp4",
    rating: 4.5,
    date: "2020",
    plot: "From ancient waterfalls to hidden river cities, explore how water shaped humanity’s greatest triumphs.",
    genre: ["Documentary", "Travel", "History"],
    language: "English",
    duration: "1h 15m",
    cast: ["Narrated by Oliver Brooks"],
    director: "Isla Cascade",
    type: "Documentary"
  }
] 


export const videos: VideoItem[] = [
    {
      id: "saloN-z6p8",
      title: "Ringing In 2022 With Style",
      description: "After months of careful and detailed planning by a local youth council, a New Year’s Eve Dance was held on Friday night, Dec. 31, for Moapa Valley teens. The dance was held at the Logandale Stake Center of the Church of Jesus Christ of Latter-day Saints. Youth, ages 14 and up, from all over the Moapa Valley communities, gathered at the church to celebrate the final hours of 2021 and spend the beginning of 2022 together.",
      thumbnail: "https://res.cloudinary.com/de6u5kbiw/image/upload/v1745909262/stream/video/01MainNewsVideo/01MainNewsThumb_z8d3cb.png",
      video: "https://res.cloudinary.com/de6u5kbiw/video/upload/v1745909623/stream/video/01MainNewsVideo/01MainNewsVideo_online-video-cutter.com_smsmrd.mp4",
      fullVideo: "https://res.cloudinary.com/de6u5kbiw/video/upload/v1745908947/stream/video/01MainNewsVideo/01MainNewsVideo_ktjkop.mp4",
      rating: 4.5,
      date: "2020",
      plot: "From ancient waterfalls to hidden river cities, explore how water shaped humanity’s greatest triumphs.",
      genre: ["Documentary", "Travel", "History"],
      language: "English",
      duration: "1h 15m",
      cast: ["Narrated by Oliver Brooks"],
      director: "Isla Cascade",
      type: "Documentary"
    },
    {
      id: "BIRD-a8f3",
      title: "Bird Adventures",
      description: "A stunning story of freedom, nature, and colorful birds soaring across continents.",
      thumbnail: "https://res.cloudinary.com/de6u5kbiw/image/upload/v1745909290/stream/video/02BirdVideo/02BirdThumb_xmr6ld.png",
      video: "https://res.cloudinary.com/de6u5kbiw/video/upload/v1745908977/stream/video/02BirdVideo/02BirdVideo_hprerk.mp4",
      fullVideo: "https://res.cloudinary.com/de6u5kbiw/video/upload/v1745908977/stream/video/02BirdVideo/02BirdVideo_hprerk.mp4",
      rating: 4.5,
      date: "2023",
      plot: "Follow the thrilling journey of a brave bird who defies storms, predators, and the unknown in search of its home.",
      genre: ["Adventure", "Nature", "Family"],
      language: "English",
      duration: "1h 45m",
      cast: ["Olivia Feather", "Sky Breeze"],
      director: "James Wildwing",
      type: "Movie"
    },
    {
      id: "CAME-5d2r",
      title: "Camera Girl",
      description: "Through the lens of a dreamer, ordinary life turns extraordinary.",
      thumbnail: "https://res.cloudinary.com/de6u5kbiw/image/upload/v1745909309/stream/video/03CameraGirlVideo/03CameraGirlThumb_gjucyi.png",
      video: "https://res.cloudinary.com/de6u5kbiw/video/upload/v1745909006/stream/video/03CameraGirlVideo/03CameraGirlVideo_wd51px.mp4",
      fullVideo: "https://res.cloudinary.com/de6u5kbiw/video/upload/v1745909006/stream/video/03CameraGirlVideo/03CameraGirlVideo_wd51px.mp4",
      rating: 4.7,
      date: "2022",
      plot: "A young photographer stumbles upon a hidden world invisible to the naked eye, changing her destiny forever.",
      genre: ["Drama", "Mystery"],
      language: "English",
      duration: "2h 10m",
      cast: ["Samantha Lane", "Jordan Vance"],
      director: "Rebecca Storm",
      type: "Movie"
    },
    {
      id: "FISH-p9x7",
      title: "Fish Tales",
      description: "Discover the breathtaking wonders of life beneath the ocean.",
      thumbnail: "https://res.cloudinary.com/de6u5kbiw/image/upload/v1745909322/stream/video/04FishVideo/04FishThumb_zmr0gm.png",
      video: "https://res.cloudinary.com/de6u5kbiw/video/upload/v1745909143/stream/video/04FishVideo/04FishVideo_fjvioc.mp4",
      fullVideo: "https://res.cloudinary.com/de6u5kbiw/video/upload/v1745909143/stream/video/04FishVideo/04FishVideo_fjvioc.mp4",
      rating: 4.3,
      date: "2021",
      plot: "Dive deep into crystal-clear waters and witness the secret lives of the ocean’s most fascinating creatures.",
      genre: ["Documentary", "Nature"],
      language: "English",
      duration: "55m",
      cast: ["Narrated by David Shales"],
      director: "Sophie Waters",
      type: "Documentary"
    },
    {
      id: "FLOW-x3t8",
      title: "Flower Kingdom",
      description: "Step into a magical realm where every petal tells a story.",
      thumbnail: "https://res.cloudinary.com/de6u5kbiw/image/upload/v1745909350/stream/video/05FlowerVideo/05FlowerThumb_azxpna.png",
      video: "https://res.cloudinary.com/de6u5kbiw/video/upload/v1745909161/stream/video/05FlowerVideo/05FlowerVideo_rruzqd.mp4",
      fullVideo: "https://res.cloudinary.com/de6u5kbiw/video/upload/v1745909161/stream/video/05FlowerVideo/05FlowerVideo_rruzqd.mp4",
      rating: 4.6,
      date: "2020",
      plot: "An enchanting journey through fields of vivid color and whispered myths hidden among blooms.",
      genre: ["Fantasy", "Adventure"],
      language: "English",
      duration: "1h 30m",
      cast: ["Lily Bloom", "Aaron Green"],
      director: "Flora Belle",
      type: "Movie"
    },
    {
      id: "LEAF-w2c6",
      title: "Leaf Chronicles",
      description: "Nature’s poetry in motion across the changing seasons.",
      thumbnail: "https://res.cloudinary.com/de6u5kbiw/image/upload/v1745909369/stream/video/06LeafVideo/06LeafThumb_foobm8.png",
      video: "https://res.cloudinary.com/de6u5kbiw/video/upload/v1745909209/stream/video/06LeafVideo/06LeafVideo_mmpoky.mp4",
      fullVideo: "https://res.cloudinary.com/de6u5kbiw/video/upload/v1745909209/stream/video/06LeafVideo/06LeafVideo_mmpoky.mp4",
      rating: 4.4,
      date: "2022",
      plot: "A tiny leaf embarks on an epic adventure from towering forests to bustling city streets.",
      genre: ["Animation", "Adventure", "Family"],
      language: "English",
      duration: "1h 20m",
      cast: ["Voice of Max Greenleaf"],
      director: "Wendy Woods",
      type: "Movie"
    },
    {
      id: "PYRA-q1m4",
      title: "Pyramid Secrets",
      description: "Unlock the mysteries buried deep beneath ancient sands.",
      thumbnail: "https://res.cloudinary.com/de6u5kbiw/image/upload/v1745909393/stream/video/07PyrmdVideo/07PyrmdThumb_ns0els.png",
      video: "https://res.cloudinary.com/de6u5kbiw/video/upload/v1745909082/stream/video/07PyrmdVideo/07PyrmdVideo_wejjqd.mp4",
      fullVideo: "https://res.cloudinary.com/de6u5kbiw/video/upload/v1745909082/stream/video/07PyrmdVideo/07PyrmdVideo_wejjqd.mp4",
      rating: 4.8,
      date: "2023",
      plot: "Archaeologists uncover hidden chambers and forgotten treasures inside the greatest pyramids ever built.",
      genre: ["Documentary", "History", "Mystery"],
      language: "English",
      duration: "1h 50m",
      cast: ["Narrated by Morgan Graves"],
      director: "Leon Sands",
      type: "Documentary"
    },
    {
      id: "WATE-a7n5",
      title: "City of Water",
      description: "A surreal future where dreams float and cities breathe underwater.",
      thumbnail: "https://res.cloudinary.com/de6u5kbiw/image/upload/v1745909413/stream/video/08WaterCityVideo/08WaterCityThumb_ba9emc.png",
      video: "https://res.cloudinary.com/de6u5kbiw/video/upload/v1745909093/stream/video/08WaterCityVideo/08WaterCityVideo_e0dsag.mp4",
      fullVideo: "https://res.cloudinary.com/de6u5kbiw/video/upload/v1745909093/stream/video/08WaterCityVideo/08WaterCityVideo_e0dsag.mp4",
      rating: 4.2,
      date: "2021",
      plot: "A breathtaking story of hope, architecture, and humanity’s survival beneath the seas.",
      genre: ["Sci-Fi", "Drama"],
      language: "English",
      duration: "2h 5m",
      cast: ["Marina Blue", "Caspian Wells"],
      director: "Aqua Lune",
      type: "Movie"
    },
    {
      id: "WATE-z6p8",
      title: "Waves of Time",
      description: "Ancient rivers and waterfalls carve the story of civilization.",
      thumbnail: "https://res.cloudinary.com/de6u5kbiw/image/upload/v1745909435/stream/video/09WaterVideo/09WaterThumb_afxj7k.png",
      video: "https://res.cloudinary.com/de6u5kbiw/video/upload/v1745909135/stream/video/09WaterVideo/09WaterVideo_q9mojn.mp4",
      fullVideo: "",
      rating: 4.5,
      date: "2020",
      plot: "From ancient waterfalls to hidden river cities, explore how water shaped humanity’s greatest triumphs.",
      genre: ["Documentary", "Travel", "History"],
      language: "English",
      duration: "1h 15m",
      cast: ["Narrated by Oliver Brooks"],
      director: "Isla Cascade",
      type: "Documentary"
    },
  ];