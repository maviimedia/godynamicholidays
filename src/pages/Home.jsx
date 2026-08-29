import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const trips = useQuery(api.trips.getAllTrips); // Fetching live database packages

  const slides = [
    { desktop: "GDH-Slider 1.png", mobile: "GDH-Slider-Mobile 1.png" },
    { desktop: "GDH-Slider 2.png", mobile: "GDH-Slider-Mobile 2.png" },
    { desktop: "GDH-Slider 3.png", mobile: "GDH-Slider-Mobile 3.png" },
    { desktop: "GDH-Slider 4.png", mobile: "GDH-Slider-Mobile 4.png" },
    { desktop: "GDH-Slider 5.png", mobile: "GDH-Slider-Mobile 5.png" }
  ];
  const logos = [
    "Dubai_logo.avif", "France_logo.avif", "Japan_logo.avif",
    "Jordan_logo.avif", "saudi_logo.avif", "singapore_logo.avif", "Abu_Dhabi_logo.avif"
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);

  return (
    <main className="w-full">
      <Helmet>
        <title>GoDynamicHolidays - India's #1 Travel Company</title>
        <meta name="description" content="Explore customized travel packages, bespoke itineraries, and group tours with GoDynamicHolidays. Book your dream vacation today." />
      </Helmet>
      
      <section className="py-1 bg-white">
        <div className="max-w-[1100px] mx-auto px-4 sm:px-10">
          <div className="flex justify-between items-center flex-wrap gap-2 mb-6">
            <h2 className="text-2xl font-semibold text-gray-800">Tour <span className="text-orange-500">Packages ✨</span></h2>
            <a href="tel:+919820402089" className="text-gray-500 hover:text-orange-500 text-sm font-medium">Quick Booking &gt;</a>
          </div>

          {/* Dynamic Data, Loading State & Empty State */}
          {trips === undefined ? (
            <div className="text-center py-10"><i className="ri-loader-4-line animate-spin text-3xl text-orange-500"></i></div>
          ) : trips.length === 0 ? (
            <div className="w-full py-16 flex flex-col items-center justify-center bg-gray-50 rounded-xl border border-dashed border-gray-300">
              <i className="ri-flight-takeoff-line text-4xl text-gray-300 mb-3"></i>
              <h3 className="text-lg font-semibold text-gray-700">Packages are being updated!</h3>
              <p className="text-sm text-gray-500 mt-1">Check back soon.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {trips.slice(0, 6).map((trip) => (
                <div key={trip._id} className="group relative bg-cover bg-center rounded-xl overflow-hidden shadow-md flex flex-col justify-end min-h-[450px] transition-transform hover:-translate-y-2" style={{ backgroundImage: `url('${trip.mainImageUrl}')` }}>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-black/10 z-0"></div>
                  
                  {trip.isTrending && (
                    <span className="absolute top-4 left-4 bg-red-600 text-white px-3 py-1 text-[10px] rounded-full font-bold shadow-md tracking-wider z-10">
                      TRENDING
                    </span>
                  )}

                  <div className="relative z-10 p-5 flex flex-col gap-2 text-white">
                    <div className="flex justify-between items-center text-xs">
                      <span>{trip.duration?.days} days & {trip.duration?.nights} nights</span>
                    </div>
                    <h3 className="text-base font-semibold leading-tight">{trip.title}</h3>
                    <div className="flex flex-wrap gap-2 text-xs text-gray-300">
                      {trip.route?.map((r, i) => (
                        <span key={i}>{r}{i < trip.route.length - 1 ? ' • ' : ''}</span>
                      ))}
                    </div>
                    <div className="flex flex-wrap items-center gap-2 text-sm mt-1">
                      <span className="font-semibold text-white">₹ {trip.pricing?.newPrice?.toLocaleString('en-IN')}</span>
                      {trip.pricing?.oldPrice > trip.pricing?.newPrice && (
                        <>
                          <span className="line-through text-gray-400 text-xs">₹ {trip.pricing?.oldPrice?.toLocaleString('en-IN')}</span>
                          <span className="bg-green-600/30 text-green-400 text-[10px] px-2 py-0.5 rounded font-bold">
                            SAVE ₹ {(trip.pricing.oldPrice - trip.pricing.newPrice).toLocaleString('en-IN')}
                          </span>
                        </>
                      )}
                    </div>
                    <div className="flex gap-2 mt-2">
                      <a href="tel:+919820402089" className="bg-white/20 border border-white/30 rounded-md p-2 hover:bg-white/40 transition-colors flex items-center justify-center"><i className="ri-phone-fill"></i></a>
                      <Link to={`/trips/${trip.slug}`} className="flex-1 bg-orange-500 text-center rounded-md p-2 text-sm font-medium hover:bg-orange-600 transition-colors">Start the Journey</Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <div className="max-w-[1100px] mx-auto px-4 sm:px-10">
        <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-gray-300 to-transparent my-8"></div>
      </div>

      <section className="py-4 bg-white">
        <div className="max-w-[1100px] mx-auto px-4 sm:px-10">
          <div className="relative w-full rounded-xl overflow-hidden shadow-lg aspect-[1/1] md:aspect-[14/4]">
            <div className="flex h-full w-full transition-transform duration-500 ease-in-out" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
              {slides.map((slide, idx) => (
                <div key={idx} className="w-full h-full flex-shrink-0">
                  <a href="https://wa.me/919820402089" className="block w-full h-full">
                    <img src={`/assets/images/${slide.desktop}`} alt={`Slide ${idx + 1}`} className="hidden md:block w-full h-full object-cover" />
                    <img src={`/assets/images/${slide.mobile}`} alt={`Slide ${idx + 1}`} className="block md:hidden w-full h-full object-cover" />
                  </a>
                </div>
              ))}
            </div>
            <button onClick={prevSlide} className="absolute left-4 top-1/2 -translate-y-1/2 text-white text-2xl md:text-3xl hover:text-orange-500 z-10"><i className="ri-arrow-left-s-line"></i></button>
            <button onClick={nextSlide} className="absolute right-4 top-1/2 -translate-y-1/2 text-white text-2xl md:text-3xl hover:text-orange-500 z-10"><i className="ri-arrow-right-s-line"></i></button>
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
              {slides.map((_, idx) => (
                <button key={idx} onClick={() => setCurrentSlide(idx)} className={`w-2.5 h-2.5 rounded-full transition-colors ${currentSlide === idx ? "bg-orange-500" : "bg-white hover:bg-orange-300"}`}></button>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-10 overflow-hidden">
        <div className="max-w-[1100px] mx-auto px-4 sm:px-10">
          <h2 className="text-center text-2xl font-semibold text-gray-800 mb-6">Tourism Board Alliances</h2>
          <div className="relative w-full overflow-hidden flex items-center">
            <div className="flex w-max animate-[scroll_30s_linear_infinite] hover:[animation-play-state:paused]">
              {[...logos, ...logos, ...logos].map((logo, idx) => (
                <div key={idx} className="w-[140px] md:w-[180px] flex-shrink-0 flex items-center justify-center px-4">
                  <img src={`/assets/images/${logo}`} alt="Logo" className="max-h-[50px] md:max-h-[60px] object-contain hover:scale-110 transition-transform" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="my-10">
        <div className="max-w-[1100px] mx-auto px-4 sm:px-10">
          <div className="rounded-2xl overflow-hidden text-white p-8 md:p-10 flex items-center w-full bg-cover bg-center" style={{ backgroundImage: "url('/assets/images/CTA Image.avif')" }}>
            <div className="max-w-[450px]">
              <h2 className="text-2xl md:text-3xl font-medium mb-4 leading-tight">Bigger Group? Get special offers up to <strong>50% Off!</strong></h2>
              <p className="text-sm mb-6 leading-snug">We create unforgettable adventures, customised for your group.</p>
              <a href="tel:+919820402089" className="bg-orange-500 text-white px-6 py-3 rounded-lg font-semibold inline-block hover:bg-white hover:text-orange-500 transition-colors">Get A Callback</a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}