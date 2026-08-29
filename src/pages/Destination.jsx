import { useParams, Link } from "react-router-dom";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { Helmet } from "react-helmet-async";

export default function Destination() {
  const { slug } = useParams();
  const formattedTitle = slug ? slug.charAt(0).toUpperCase() + slug.slice(1).replace("-", " ") : "Destination";
  const allTrips = useQuery(api.trips.getAllTrips);

  if (allTrips === undefined) {
    return <div className="w-full min-h-[60vh] flex items-center justify-center"><i className="ri-loader-4-line text-4xl text-orange-500 animate-spin"></i></div>;
  }

  const destinationTrips = allTrips.filter(trip => 
    trip.route.some(r => r.toLowerCase().includes(slug.toLowerCase().replace("-", " "))) ||
    trip.title.toLowerCase().includes(slug.toLowerCase().replace("-", " "))
  );

  return (
    <main className="w-full bg-white font-sans text-gray-800">
      <Helmet><title>{formattedTitle} Tour Packages | GoDynamicHolidays</title></Helmet>
      
      <section className="py-10 md:py-12">
        <div className="max-w-[1100px] mx-auto px-4 sm:px-10">
          <div className="mb-8 border-b border-gray-100 pb-4">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Explore {formattedTitle}</h1>
            <p className="text-sm text-gray-500">Showing {destinationTrips.length} curated itineraries</p>
          </div>

          {destinationTrips.length === 0 ? (
            <div className="w-full py-20 flex flex-col items-center justify-center bg-gray-50 rounded-xl border border-dashed border-gray-300">
              <i className="ri-map-pin-line text-4xl text-gray-300 mb-3"></i>
              <h3 className="text-lg font-semibold text-gray-700">No packages available yet</h3>
              <p className="text-sm text-gray-500 mt-1">Check back later or contact us to build a custom itinerary.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {destinationTrips.map((trip) => (
                <div key={trip._id} className="group relative bg-cover bg-center rounded-xl overflow-hidden shadow-md flex flex-col justify-end min-h-[400px]" style={{ backgroundImage: `url('${trip.mainImageUrl}')` }}>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent z-0"></div>
                  {trip.isTrending && <span className="absolute top-4 left-4 bg-red-600 text-white px-3 py-1 text-[10px] rounded-full font-bold z-10">TRENDING</span>}
                  <div className="relative z-10 p-5 flex flex-col gap-2 text-white">
                    <span className="text-xs text-orange-400 font-semibold">{trip.duration.days} Days / {trip.duration.nights} Nights</span>
                    <h3 className="text-lg font-bold leading-tight">{trip.title}</h3>
                    <div className="flex gap-2 text-sm mt-2">
                      <span className="font-bold text-white text-base">₹ {trip.pricing.newPrice.toLocaleString('en-IN')}</span>
                      {trip.pricing.oldPrice > trip.pricing.newPrice && <span className="line-through text-gray-400 text-xs mt-1">₹ {trip.pricing.oldPrice.toLocaleString('en-IN')}</span>}
                    </div>
                    <Link to={`/trips/${trip.slug}`} className="mt-4 w-full bg-orange-500 text-center rounded-lg py-2.5 text-sm font-semibold hover:bg-orange-600 transition-colors">View Itinerary</Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}