import { useState, useEffect } from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/utility/Header";
import Footer from "./components/utility/Footer";
import Home from "./pages/Home"; 
import PageData from "./pages/PageData";
import PlayerV from "./pages/PlayerV";
import SHKplayer2 from "./pages/SHKplayer2";
function App() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 70) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])
  return (
    <Router>
      <Header scrolled={scrolled} />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/SHK2" element={<SHKplayer2 />} />
          <Route path="/page/:id" element={<PageData />} />
          <Route path="/player/:id" element={<PlayerV />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
