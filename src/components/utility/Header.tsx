import { useState } from "react";
import { ChevronDown, Bell, Search, Menu, X } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import './Header.css'
interface HeaderProps {
  scrolled: boolean;
}

const Header = ({ scrolled }: HeaderProps) => {
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showLanguageMenu, setShowLanguageMenu] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const isPlayerPage = /^\/player\/[^/]+$/.test(location.pathname); 

  if (isPlayerPage) {
    return (
      <>
      
      <header
        className={`fixed top-0 w-full z-50 transition-all duration-500 ${
          scrolled ? "bg-black" : "bg-gradient-to-b from-black/80 to-transparent"
        }`}
      >
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
          <button
              onClick={() => navigate(-1)}
              className="text-white bg-gray-800 hover:bg-gray-700 rounded-full px-4 py-2 text-sm"
            >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="2em"
              height="2em"
            >
              <path
                fill="currentColor"
                d="m4 10l-.707.707L2.586 10l.707-.707zm17 8a1 1 0 1 1-2 0zM8.293 15.707l-5-5l1.414-1.414l5 5zm-5-6.414l5-5l1.414 1.414l-5 5zM4 9h10v2H4zm17 7v2h-2v-2zm-7-7a7 7 0 0 1 7 7h-2a5 5 0 0 0-5-5z"
              ></path>
            </svg>
           </button>
            <img
              className="h-[5rem] w-[10rem]"
              src="https://storage.googleapis.com/1000gns/1001/assets/logo.png"
              alt="Logo"
            />
          </div>
        </div>
      </header>
      </>
    );
  }

  // Regular Header (unchanged)
   return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-500 ${
        scrolled ? "bg-black" : "bg-gradient-to-b from-black/80 to-transparent"
      }`}
    >
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        {/* Left: Logo and Navigation */}
        <div className="flex items-center">
        {/* <svg viewBox="0 0 111 30" className="h-8 w-24 fill-red-600 mr-8" aria-hidden="true" focusable="false">
            <g>
              <path d="M105.06233,14.2806261 L110.999156,30 C109.249227,29.7497422 107.500234,29.4366857 105.718437,29.1554972 L102.374168,20.4686475 L98.9371075,28.4375293 C97.2499766,28.1563408 95.5928391,28.061674 93.9057081,27.8432843 L99.9372012,14.0931671 L94.4680851,-5.68434189e-14 L99.5313525,-5.68434189e-14 L102.593495,7.87421502 L105.874965,-5.68434189e-14 L110.999156,-5.68434189e-14 L105.06233,14.2806261 Z M90.4686475,-5.68434189e-14 L85.8749649,-5.68434189e-14 L85.8749649,27.2499766 C87.3746368,27.3437061 88.9371075,27.4055675 90.4686475,27.5930265 L90.4686475,-5.68434189e-14 Z M81.9055207,26.93692 C77.7186241,26.6557316 73.5307901,26.4064111 69.250164,26.3117443 L69.250164,-5.68434189e-14 L73.9366389,-5.68434189e-14 L73.9366389,21.8745899 C76.6248008,21.9373887 79.3120255,22.1557784 81.9055207,22.2804387 L81.9055207,26.93692 Z M64.2496954,10.6561065 L64.2496954,15.3435186 L57.8442216,15.3435186 L57.8442216,25.9996251 L53.2186709,25.9996251 L53.2186709,-5.68434189e-14 L66.3436123,-5.68434189e-14 L66.3436123,4.68741213 L57.8442216,4.68741213 L57.8442216,10.6561065 L64.2496954,10.6561065 Z M45.3435186,4.68741213 L45.3435186,26.2498828 C43.7810479,26.2498828 42.1876465,26.2498828 40.6561065,26.3117443 L40.6561065,4.68741213 L35.8121661,4.68741213 L35.8121661,-5.68434189e-14 L50.2183897,-5.68434189e-14 L50.2183897,4.68741213 L45.3435186,4.68741213 Z M30.749836,15.5928391 C28.687787,15.5928391 26.2498828,15.5928391 24.4999531,15.6875059 L24.4999531,22.6562939 C27.2499766,22.4678976 30,22.2495079 32.7809542,22.1557784 L32.7809542,26.6557316 L19.812541,27.6876933 L19.812541,-5.68434189e-14 L32.7809542,-5.68434189e-14 L32.7809542,4.68741213 L24.4999531,4.68741213 L24.4999531,10.9991564 C26.3126816,10.9991564 29.0936358,10.9054269 30.749836,10.9054269 L30.749836,15.5928391 Z M4.78114163,12.9684132 L4.78114163,29.3429562 C3.09401069,29.5313525 1.59340144,29.7497422 0,30 L0,-5.68434189e-14 L4.4690224,-5.68434189e-14 L10.562377,17.0315868 L10.562377,-5.68434189e-14 L15.2497891,-5.68434189e-14 L15.2497891,28.061674 C13.5935889,28.3437998 11.906458,28.4375293 10.1246602,28.6868498 L4.78114163,12.9684132 Z"></path>
            </g>
          </svg> */}
          <img className="h-[5rem] w-[10rem] mr-8" aria-hidden="true" src="https://storage.googleapis.com/1000gns/1001/assets/logo.png" alt="" />
          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-6">
            <a href="" className="text-white hover:text-gray-300 font-medium">Home</a>
            <a href="" className="text-gray-300 hover:text-white">Local News</a>
            <a href="" className="text-gray-300 hover:text-white">Free Movies</a>
            <a href="" className="text-gray-300 hover:text-white">Cartoon & Kids</a>
            <a href="" className="text-gray-300 hover:text-white">My List</a>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="flex md:hidden text-white ml-2"
            onClick={() => setShowMobileMenu(!showMobileMenu)}
          >
            {showMobileMenu ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Right: Icons and Profile */}
        <div className="flex items-center space-x-4">
          <button className="text-white p-1">
            <Search size={20} />
          </button>
          <button className="text-white p-1">
            <Bell size={20} />
          </button>

          {/* Profile Dropdown */}
          <div className="relative">
            <button className="flex items-center space-x-2" onClick={() => setShowProfileMenu(!showProfileMenu)}>
              <img src="https://i.etsystatic.com/31548528/r/il/ffde13/5804742914/il_300x300.5804742914_ap2d.jpg" alt="Profile" className="h-8 w-8 rounded" />
              <ChevronDown size={16} className={`transition-transform ${showProfileMenu ? "rotate-180" : ""}`} />
            </button>
            {showProfileMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-black/90 border border-gray-700 rounded shadow-lg py-2">
                <a href="" className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-800">Profile</a>
                <a href="" className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-800">Account</a>
                <a href="" className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-800">Help Center</a>
                <hr className="my-1 border-gray-700" />
                <a href="" className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-800">Sign out of Netflix</a>
              </div>
            )}
          </div>

          {/* Language Selector */}
          <div className="relative">
            <button
              className="flex items-center space-x-1 text-sm border border-gray-600 rounded px-2 py-1"
              onClick={() => setShowLanguageMenu(!showLanguageMenu)}
            >
              <span>English</span>
              <ChevronDown size={14} className={`transition-transform ${showLanguageMenu ? "rotate-180" : ""}`} />
            </button>

            {showLanguageMenu && (
              <div className="absolute right-0 mt-2 w-40 bg-black/90 border border-gray-700 rounded shadow-lg py-2">
                <a href="" className="block px-4 py-2 text-sm text-white hover:bg-gray-800">English</a>
                <a href="" className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-800">Español</a>
                <a href="" className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-800">Français</a>
                <a href="" className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-800">Deutsch</a>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Menu Navigation */}
      {showMobileMenu && (
        <div className="md:hidden bg-black/90 px-4 py-4 space-y-4">
          <a href="" className="block text-white hover:text-gray-300">Home</a>
          <a href="" className="block text-gray-300 hover:text-white">Local News</a>
          <a href="" className="block text-gray-300 hover:text-white">Free Movies</a>
          <a href="" className="block text-gray-300 hover:text-white">Cartoon & Kids</a>
          <a href="" className="block text-gray-300 hover:text-white">My List</a>
        </div>
      )}
    </header>
  )};

export default Header;