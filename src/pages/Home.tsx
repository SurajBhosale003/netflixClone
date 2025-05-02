
import Slider from '../components/sections/Slider';
import List from '../components/sections/List';
import { videos  }from '../content/VideoOBJ';

const Home = () => {
  return (
    <div>
      <Slider />
      <List title="Trending Now" items={videos} />
      <List title="Weather" items={videos} />
      <List title="Movies" items={videos} />
      <List title="Cartoons" items={videos} />
    </div>
  );
};

export default Home;
