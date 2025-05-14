import React, { Suspense, lazy } from 'react';
import { videos, ClassicMovies, ActionMovies, CartoonMovies } from '../content/VideoOBJ';
const Slider = lazy(() => import('../components/sections/Slider'));
const List = lazy(() => import('../components/sections/List'));
const Calendar = lazy(() => import('../components/sections/CalendarComp'));
const Classification = lazy(() => import('../components/sections/Classification'));

const listSections = [
  { title: 'Full Movies', items: ClassicMovies },
  { title: 'Action Movies', items: ActionMovies },
  { title: 'Cartoons', items: CartoonMovies },
  { title: 'Dummy Videos', items: videos },
];

const Home = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <Slider />
        <Calendar/>
        <Classification/>
        {listSections.map(({ title, items }) => (
          <List key={title} title={title} items={items} />
        ))}
      </Suspense>
    </div>
  );
};

export default React.memo(Home);
