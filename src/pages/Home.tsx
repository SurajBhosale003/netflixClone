import React, { Suspense, lazy } from 'react';
import { videos, ClassicMovies, ActionMovies, CartoonMovies } from '../content/VideoOBJ';

// Lazy load components
const Slider = lazy(() => import('../components/sections/Slider'));
const List = lazy(() => import('../components/sections/List'));

const Home = () => {
  return (
    <div>
      {/* Suspense for lazy loading fallback */}
      <Suspense fallback={<div>Loading...</div>}>
        <Slider />
        <List title="Full Movies" items={ClassicMovies} />
        <List title="Action Movies" items={ActionMovies} />
        <List title="Cartoons" items={CartoonMovies} />
        <List title="Dummy Videos" items={videos} />
      </Suspense>
    </div>
  );
};

export default React.memo(Home);
