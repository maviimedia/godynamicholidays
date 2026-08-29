import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const [placeholderText, setPlaceholderText] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [showResults, setShowResults] = useState(false);
  const searchRef = useRef(null);
  const navigate = useNavigate();
  
  const destinations = ["Thailand", "Dubai", "Singapore", "Bali", "Europe", "Ladakh", "Spiti Valley"];
  
  const trips = useQuery(api.trips.getAllTrips) || [];

  const filteredTrips = trips.filter(trip => 
    trip.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    let destIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let timer;

    const type = () => {
      const currentDest = destinations[destIndex];
      const prefix = "Search for ";

      if (isDeleting) {
        setPlaceholderText(prefix + currentDest.substring(0, charIndex - 1));
        charIndex--;
      } else {
        setPlaceholderText(prefix + currentDest.substring(0, charIndex + 1));
        charIndex++;
      }

      let speed = isDeleting ? 50 : 120;

      if (!isDeleting && charIndex === currentDest.length) {
        speed = 1000;
        isDeleting = true;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        destIndex = (destIndex + 1) % destinations.length;
        speed = 500;
      }
      timer = setTimeout(type, speed);
    };

    timer = setTimeout(type, 120);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowResults(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="bg-white shadow-[0_1px_4px_rgba(0,0,0,0.05)] sticky top-0 z-50">
      <div className="w-full bg-orange-50/50 py-2 px-4 flex justify-center items-center gap-4">
        <span className="text-[14px] font-semibold text-orange-500 animate-pulse">Get 20% Off on All Packages!</span>
        <a href="https://wa.me/919820402089" className="bg-orange-500 text-white px-4 py-1.5 rounded-full text-[13px] font-semibold hover:scale-105 transition-transform">Book Now</a>
      </div>

      <div className="max-w-[1100px] mx-auto px-4 md:px-10 py-3 md:py-4 flex flex-wrap items-center justify-between gap-3 md:gap-4">
        <Link to="/" className="flex items-center order-1">
          <img src="/assets/images/GDH Logo (Header2).png" alt="GoDynamicHolidays" className="h-[25px] md:h-[30px]" />
        </Link>

        <div className="flex items-center order-2 md:order-3 ml-auto md:ml-0">
          <a href="tel:+919820402089" className="flex items-center gap-1.5 md:gap-2 bg-orange-500 text-white px-3 py-1.5 md:px-4 md:py-2 rounded-[5px] text-[12px] md:text-[14px] font-medium hover:bg-orange-600 transition-colors">
            <i className="ri-phone-fill text-sm md:text-base"></i> Plan Your Trip
          </a>
        </div>

        <div className="relative w-full md:flex-1 md:max-w-[500px] md:mx-10 order-3 md:order-2 mt-2 md:mt-0" ref={searchRef}>
          <div className="flex items-center bg-white border border-gray-200 rounded-full px-4 py-2 shadow-sm focus-within:border-orange-500 transition-colors">
            <i className="ri-search-line text-gray-400 mr-2"></i>
            <input 
              type="text" 
              placeholder={placeholderText} 
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setShowResults(e.target.value.trim() !== "");
              }}
              className="w-full outline-none text-[14px] text-gray-800"
            />
          </div>
          
          {showResults && (
            <div className="absolute top-[calc(100%+4px)] left-0 w-full bg-white border border-gray-200 rounded-lg shadow-lg max-h-[300px] overflow-y-auto z-[1000]">
              {filteredTrips.length > 0 ? (
                filteredTrips.map((trip) => (
                <button 
                  key={trip._id}
                  onClick={() => {
                    navigate(`/trips/${trip.slug}`);
                    setShowResults(false);
                    setSearchQuery("");
                  }}
                  className="w-full text-left px-4 py-3 border-b border-gray-100 hover:bg-orange-500 hover:text-white transition-colors text-[14px] flex justify-between items-center group"
                >
                  <span>{trip.title}</span>
                  <i className="ri-arrow-right-line text-gray-400 group-hover:text-white"></i>
                </button>
              ))
              ) : (
                <div className="px-4 py-3 text-[14px] text-gray-500">No destinations found.</div>
              )}
            </div>
          )}
        </div>
      </div>
      
      <div className="h-[1px] w-full bg-gray-200 hidden md:block"></div>
    </header>
  );
}