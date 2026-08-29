import { Link } from "react-router-dom";

export default function Footer() {
  const destinations = [
    { name: "BALI", img: "bali.avif" },
    { name: "DUBAI", img: "dubai.avif" },
    { name: "SINGAPORE", img: "singapore.avif" },
    { name: "THAILAND", img: "thailand.avif" },
    { name: "ANDAMAN", img: "andaman.avif" },
    { name: "INDIA", img: "india.avif" },
    { name: "LADAKH", img: "ladakh.avif" },
    { name: "HONGKONG", img: "hongkong.avif" },
    { name: "SRILANKA", img: "srilanka.avif" }
  ];

  return (
    <footer className="bg-gray-800 text-white mt-20 font-sans">
      <div className="max-w-[1000px] mx-auto px-5 -translate-y-10">
        <div className="bg-white text-gray-800 rounded-3xl shadow-xl p-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          <div>
            <h3 className="text-sm font-bold mb-3">ABOUT DYNAMICHOLIDAYS</h3>
            <ul className="space-y-2 text-xs text-gray-600">
              <li><Link to="/about" className="hover:text-orange-500 transition-colors">About Us</Link></li>
              <li><a href="mailto:careers@godynamicholidays.com" className="hover:text-orange-500 transition-colors">We Are Hiring</a></li>
              <li><Link to="/terms-conditions" className="hover:text-orange-500 transition-colors">Terms & Conditions</Link></li>
              <li><Link to="/privacy-policy" className="hover:text-orange-500 transition-colors">Privacy Policies</Link></li>
              <li><Link to="/refund-policy" className="hover:text-orange-500 transition-colors">Refund Policy</Link></li>
              <li><a href="mailto:support@godynamicholidays.com" className="hover:text-orange-500 transition-colors">Travel Support</a></li>
              <li><a href="tel:+919820402089" className="text-red-600 font-bold hover:text-red-700">BEWARE OF FRAUDS ⚠️</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-bold mb-3">FOR GROUPS</h3>
            <ul className="space-y-2 text-xs text-gray-600 mb-6">
              <li><a href="https://wa.me/919820402089" className="hover:text-orange-500 transition-colors">Plan Your Trip</a></li>
            </ul>
            <h3 className="text-sm font-bold mb-3">FOR BRANDS</h3>
            <ul className="space-y-2 text-xs text-gray-600">
              <li><a href="mailto:partners@godynamicholidays.com" className="hover:text-orange-500 transition-colors">Partner With Us</a></li>
              <li><a href="tel:+919820402089" className="hover:text-orange-500 transition-colors">Destination Marketing</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-bold mb-3">FOR TRAVELLERS</h3>
            <ul className="space-y-2 text-xs text-gray-600">
              <li><a href="tel:+919820402089" className="hover:text-orange-500 transition-colors">Contact Travel Experts</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-bold mb-3">TRAVEL DESTINATIONS</h3>
            <div className="grid grid-cols-3 gap-2">
              {destinations.map((dest) => (
                <div 
                  key={dest.name}
                  className="h-20 rounded-lg flex items-center justify-center text-[10px] font-bold text-white bg-cover bg-center shadow-inner"
                  style={{ backgroundImage: `url('/assets/images/${dest.img}')`, textShadow: "0px 2px 4px rgba(0,0,0,0.8)" }}
                >
                  {dest.name}
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>

      <div className="text-center border-t border-gray-700 py-10 px-5">
        <img src="/assets/images/GDH Logo (Header).png" alt="Logo" className="w-40 mx-auto mb-4" />
        <div className="flex justify-center gap-4 mb-4">
          <a href="#" className="text-gray-400 hover:text-orange-500 text-xl transition-colors"><i className="ri-facebook-fill"></i></a>
          <a href="#" className="text-gray-400 hover:text-orange-500 text-xl transition-colors"><i className="ri-instagram-line"></i></a>
          <a href="#" className="text-gray-400 hover:text-orange-500 text-xl transition-colors"><i className="ri-twitter-x-line"></i></a>
          <a href="#" className="text-gray-400 hover:text-orange-500 text-xl transition-colors"><i className="ri-youtube-fill"></i></a>
        </div>
        <div className="max-w-3xl mx-auto text-xs text-gray-400 leading-relaxed">
          <p className="mb-2">© 2026 GoDynamicHolidays.Com — Every journey, every right reserved.</p>
          <p>All content and images on this site are protected by copyright and remain the property of their respective owners. These materials are presented here solely for the purpose of promoting the works, and no endorsement of the artists or creators is implied. Unauthorized use is strictly prohibited and subject to legal action.</p>
        </div>
      </div>
    </footer>
  );
}