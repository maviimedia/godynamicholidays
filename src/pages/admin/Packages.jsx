import { useQuery, useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { Link, useOutletContext } from "react-router-dom";

export default function Packages() {
  const trips = useQuery(api.trips.getAllTrips);
  const deleteTrip = useMutation(api.trips.deleteTrip);
  const context = useOutletContext();
  const searchTerm = context?.searchTerm || "";

  if (trips === undefined) {
    return <div className="p-6 text-center text-[#9ca3af] font-medium">Loading packages...</div>;
  }

  const filteredTrips = trips.filter(trip => 
    trip.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this package?")) {
      await deleteTrip({ id });
    }
  };

  return (
    <div className="bg-white border border-[#e5e7eb] rounded-lg flex flex-col shadow-sm flex-1 min-h-0">
      <div className="p-4 border-b border-[#f3f4f6] flex justify-between items-center flex-shrink-0">
        <h2 className="text-[16px] font-bold text-[#111827] m-0">Package Inventory</h2>
        <Link to="/admin/packages/new" className="bg-[#f97316] text-white px-4 py-1.5 rounded text-[12px] font-semibold hover:bg-[#ea580c] transition-colors flex items-center gap-1.5">
          <i className="ri-add-line"></i> Create New
        </Link>
      </div>

      <div className="flex-1 overflow-auto p-4">
        {filteredTrips.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-3">
              <i className="ri-suitcase-2-line text-2xl text-gray-300"></i>
            </div>
            <h3 className="text-[14px] font-bold text-[#111827]">No Packages Found</h3>
            <p className="text-[12px] text-[#4b5563] mt-1 max-w-[250px]">
              Your inventory is empty or no packages match your search.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredTrips.map((trip) => (
              <div key={trip._id} className="border border-[#e5e7eb] rounded-lg overflow-hidden flex flex-col hover:shadow-md transition-shadow">
                <div className="h-[120px] bg-gray-100 relative">
                  <img src={trip.mainImageUrl} alt={trip.title} className="w-full h-full object-cover" />
                  {trip.isTrending && (
                    <span className="absolute top-2 right-2 bg-red-500 text-white text-[9px] font-bold px-2 py-0.5 rounded shadow-sm">
                      Trending
                    </span>
                  )}
                </div>
                <div className="p-3 flex flex-col flex-1">
                  <h3 className="text-[13px] font-bold text-[#111827] leading-tight mb-1">{trip.title}</h3>
                  <div className="text-[11px] text-[#4b5563] flex items-center gap-1 mb-3">
                    <i className="ri-time-line"></i> {trip.duration?.days} Days / {trip.duration?.nights} Nights
                  </div>
                  <div className="mt-auto pt-3 border-t border-[#f3f4f6] flex justify-between items-center">
                    <div className="flex flex-col">
                      <span className="text-[10px] text-[#9ca3af] line-through">₹ {trip.pricing?.oldPrice}</span>
                      <span className="text-[13px] font-bold text-[#111827]">₹ {trip.pricing?.newPrice}</span>
                    </div>
                    <div className="flex gap-2">
                      <Link to={`/admin/packages/edit/${trip._id}`} className="text-[#f97316] text-[12px] font-medium hover:underline">
                        Edit
                      </Link>
                      <button onClick={() => handleDelete(trip._id)} className="text-red-500 text-[12px] font-medium hover:underline">
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}