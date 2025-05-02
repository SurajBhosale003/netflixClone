
import Slider from '../components/sections/Slider';
import List from '../components/sections/List';
import { videos , ClassicMovies , ActionMovies , CartoonMovies }from '../content/VideoOBJ';

const Home = () => {
  return (
    <div>
      <Slider />
      <List title="Full Movies" items={ClassicMovies} />
      <List title="Action Movies" items={ActionMovies} />
      <List title="Cartoons" items={CartoonMovies} />
      <List title="Dummy Videos" items={videos} />
    </div>
  );
};

export default Home;
