import { useState, useEffect, lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/utility/Header";
import Footer from "./components/utility/Footer";

// Lazy load pages for performance
const Home = lazy(() => import("./pages/Home"));
const PageData = lazy(() => import("./pages/PageData"));
const PlayerV = lazy(() => import("./pages/PlayerV"));
// const SHKplayer2 = lazy(() => import("./pages/SHKplayer2"));

function App() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 70);
    };

    // Throttle scroll events (every 100ms)
    let throttleTimeout: NodeJS.Timeout | null = null;
    const throttledScroll = () => {
      if (throttleTimeout === null) {
        throttleTimeout = setTimeout(() => {
          handleScroll();
          throttleTimeout = null;
        }, 100);
      }
    };

    window.addEventListener("scroll", throttledScroll);
    return () => window.removeEventListener("scroll", throttledScroll);
  }, []);

  return (
    <Router>
      <Header scrolled={scrolled} />
      <main>
        <Suspense fallback={<div className="text-center p-6">Loading...</div>}>
          <Routes>
            <Route path="/" element={<Home />} />
            {/* <Route path="/SHK2" element={<SHKplayer2 />} /> */}
            <Route path="/page/:id" element={<PageData />} />
            <Route path="/player/:id" element={<PlayerV />} />
          </Routes>
        </Suspense>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
