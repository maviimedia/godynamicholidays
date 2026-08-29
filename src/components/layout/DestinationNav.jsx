import { useRef, useState, useEffect } from "react";
import { NavLink } from "react-router-dom";

export default function DestinationNav() {
  const scrollRef = useRef(null);
  const [showLeft, setShowLeft] = useState(false);
  const [showRight, setShowRight] = useState(true);

  const destinations = [
    { name: "Explore", icon: "ri-fire-fill", path: "/", isFontIcon: true },
    { name: "Dubai", img: "Dubai.svg", path: "/destinations/dubai" },
    { name: "Europe", img: "Europe.svg", path: "/destinations/europe" },
    { name: "Ladakh", img: "Ladakh.svg", path: "/destinations/ladakh", trending: true },
    { name: "Singapore", img: "Singapore.svg", path: "/destinations/singapore" },
    { name: "Japan", img: "Japan.svg", path: "/destinations/japan" },
    { name: "USA", img: "USA.svg", path: "/destinations/usa" },
    { name: "Thailand", img: "Thailand.svg", path: "/destinations/thailand" },
    { name: "Switzerland", img: "Switzerland.svg", path: "/destinations/switzerland" },
    { name: "Bali", img: "Bali.svg", path: "/destinations/bali", trending: true },
    { name: "Spiti Valley", img: "SpitiValley.svg", path: "/destinations/spiti-valley" }
  ];

  const handleScroll = () => {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    setShowLeft(scrollLeft > 0);
    setShowRight(scrollLeft + clientWidth < scrollWidth - 1);
  };

  useEffect(() => {
    handleScroll();
    window.addEventListener("resize", handleScroll);
    return () => window.removeEventListener("resize", handleScroll);
  }, []);

  const scroll = (offset) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: offset, behavior: "smooth" });
    }
  };

  return (
    <div className="w-full bg-white mb-6">
      <div className="max-w-[1100px] mx-auto px-2 md:px-10 py-2 md:py-3 flex items-center justify-between gap-3 md:gap-5">
        
        <button 
          onClick={() => scroll(-200)}
          disabled={!showLeft}
          className={`flex items-center justify-center text-3xl transition-colors ${showLeft ? 'text-gray-400 hover:text-orange-500 cursor-pointer' : 'text-gray-200 cursor-default'}`}
        >
          <i className="ri-arrow-left-s-line"></i>
        </button>

        <nav 
          ref={scrollRef}
          onScroll={handleScroll}
          className="flex-1 flex gap-8 md:gap-12 overflow-x-auto scrollbar-hide scroll-smooth items-center pb-2 px-2"
        >
          {destinations.map((dest) => (
            <NavLink
              key={dest.name}
              to={dest.path}
              className={({ isActive }) => 
                `relative flex-shrink-0 flex flex-col items-center text-[12px] transition-colors hover:text-orange-500 group ${
                  isActive ? "text-orange-500 font-semibold border-b-2 border-orange-500 pb-1" : "text-gray-500"
                }`
              }
            >
              {dest.isFontIcon ? (
                <i className={`${dest.icon} text-[24px] mb-1 group-hover:text-orange-500`}></i>
              ) : (
                <img 
                  src={`/assets/icons/${dest.img}`} 
                  alt={dest.name} 
                  className="h-[24px] mb-1 grayscale group-hover:grayscale-0 transition-all duration-300"
                />
              )}
              <span>{dest.name}</span>
              {dest.trending && (
                <span className="absolute top-0 -right-4 bg-gradient-to-br from-red-600 to-orange-500 text-white text-[9px] px-2 py-[2px] rounded-full shadow-sm font-bold">
                  Trending
                </span>
              )}
            </NavLink>
          ))}
        </nav>

        <button 
          onClick={() => scroll(200)}
          disabled={!showRight}
          className={`flex items-center justify-center text-3xl transition-colors ${showRight ? 'text-gray-400 hover:text-orange-500 cursor-pointer' : 'text-gray-200 cursor-default'}`}
        >
          <i className="ri-arrow-right-s-line"></i>
        </button>
      </div>
    </div>
  );
}