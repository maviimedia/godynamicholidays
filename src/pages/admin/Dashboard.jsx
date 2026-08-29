import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { Link } from "react-router-dom";

export default function Dashboard() {
  const leads = useQuery(api.leads.getAllLeads) || [];
  const trips = useQuery(api.trips.getAllTrips) || [];

  const newLeads = leads.filter((lead) => lead.status === "new").length;
  const trendingTrips = trips.filter((trip) => trip.isTrending).length;

  return (
    <div className="flex flex-col gap-4 h-full">
      <div className="flex justify-between items-end flex-shrink-0">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-[#ffedd5] text-[#f97316] rounded-full flex items-center justify-center text-[14px]">
            <i className="ri-dashboard-3-line"></i>
          </div>
          <div>
            <h1 className="text-[15px] font-bold leading-none mb-1 text-[#111827]">Overview</h1>
            <p className="text-[11px] text-[#4b5563] m-0">Live platform analytics and recent activities.</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 flex-shrink-0">
        <div className="bg-white p-3 border border-[#e5e7eb] rounded-lg shadow-sm">
          <div className="text-[11px] font-medium text-[#4b5563] mb-1">Total Packages</div>
          <div className="text-[20px] font-bold text-[#111827]">{trips.length}</div>
        </div>
        <div className="bg-white p-3 border border-[#e5e7eb] rounded-lg shadow-sm">
          <div className="text-[11px] font-medium text-[#4b5563] mb-1">Trending Packages</div>
          <div className="text-[20px] font-bold text-[#f97316]">{trendingTrips}</div>
        </div>
        <div className="bg-white p-3 border border-[#e5e7eb] rounded-lg shadow-sm">
          <div className="text-[11px] font-medium text-[#4b5563] mb-1">Total Inquiries</div>
          <div className="text-[20px] font-bold text-[#111827]">{leads.length}</div>
        </div>
        <div className="bg-white p-3 border border-[#e5e7eb] rounded-lg shadow-sm bg-orange-50/50">
          <div className="text-[11px] font-medium text-[#4b5563] mb-1">New Unread Leads</div>
          <div className="text-[20px] font-bold text-red-600">{newLeads}</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 flex-1 min-h-0">
        <div className="bg-white border border-[#e5e7eb] rounded-lg flex flex-col shadow-sm">
          <div className="p-3 border-b border-[#f3f4f6]">
            <h2 className="text-[13px] font-bold text-[#111827] m-0">Quick Actions</h2>
          </div>
          <div className="p-3 flex-1 flex flex-col gap-2">
            <Link to="/admin/packages/new" className="flex items-center gap-3 w-full p-2.5 border border-[#e5e7eb] rounded-lg hover:border-[#f97316] hover:bg-[#ffedd5] transition-colors group">
              <div className="w-8 h-8 rounded bg-[#f8f9fa] flex items-center justify-center group-hover:bg-white"><i className="ri-add-circle-line text-[#f97316] text-[16px]"></i></div>
              <div className="flex flex-col"><span className="text-[12px] font-bold text-[#111827]">Create Package</span><span className="text-[10px] text-[#4b5563]">Publish a new itinerary</span></div>
            </Link>
            <Link to="/admin/packages" className="flex items-center gap-3 w-full p-2.5 border border-[#e5e7eb] rounded-lg hover:border-[#f97316] hover:bg-[#ffedd5] transition-colors group">
              <div className="w-8 h-8 rounded bg-[#f8f9fa] flex items-center justify-center group-hover:bg-white"><i className="ri-suitcase-2-line text-[#f97316] text-[16px]"></i></div>
              <div className="flex flex-col"><span className="text-[12px] font-bold text-[#111827]">Manage Inventory</span><span className="text-[10px] text-[#4b5563]">Edit or remove packages</span></div>
            </Link>
            <Link to="/admin/leads" className="flex items-center gap-3 w-full p-2.5 border border-[#e5e7eb] rounded-lg hover:border-[#f97316] hover:bg-[#ffedd5] transition-colors group">
              <div className="w-8 h-8 rounded bg-[#f8f9fa] flex items-center justify-center group-hover:bg-white"><i className="ri-inbox-archive-line text-[#f97316] text-[16px]"></i></div>
              <div className="flex flex-col"><span className="text-[12px] font-bold text-[#111827]">View Inquiries</span><span className="text-[10px] text-[#4b5563]">Check client messages</span></div>
            </Link>
          </div>
        </div>

        <div className="bg-white border border-[#e5e7eb] rounded-lg flex flex-col shadow-sm">
          <div className="p-3 border-b border-[#f3f4f6] flex justify-between items-center">
            <h2 className="text-[13px] font-bold text-[#111827] m-0">Recent Inquiries</h2>
            <Link to="/admin/leads" className="text-[#f97316] text-[11px] font-bold hover:underline">View All</Link>
          </div>
          <div className="flex-1 overflow-y-auto">
            {leads.length === 0 ? (
              <div className="p-6 text-center text-[#9ca3af] text-[11px]">No inquiries available.</div>
            ) : (
              leads.slice(0, 6).map((lead) => (
                <div key={lead._id} className="flex justify-between items-center p-3 border-b border-[#f9fafb] hover:bg-[#f8f9fa]">
                  <div className="flex flex-col truncate pr-2">
                    <span className="text-[12px] font-bold text-[#111827] truncate">{lead.fullName}</span>
                    <span className="text-[10px] text-[#4b5563] truncate">{lead.packageName || "General Inquiry"}</span>
                  </div>
                  <span className={`px-2 py-0.5 rounded text-[9px] font-bold flex-shrink-0 ${
                    lead.status === "new" ? "bg-red-100 text-red-600" :
                    lead.status === "converted" ? "bg-green-100 text-green-600" :
                    "bg-gray-100 text-gray-600"
                  }`}>
                    {lead.status.toUpperCase()}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="bg-white border border-[#e5e7eb] rounded-lg flex flex-col shadow-sm">
          <div className="p-3 border-b border-[#f3f4f6] flex justify-between items-center">
            <h2 className="text-[13px] font-bold text-[#111827] m-0">Live Packages</h2>
            <Link to="/admin/packages" className="text-[#f97316] text-[11px] font-bold hover:underline">View All</Link>
          </div>
          <div className="flex-1 overflow-y-auto">
            {trips.length === 0 ? (
              <div className="p-6 text-center text-[#9ca3af] text-[11px]">No packages published.</div>
            ) : (
              trips.slice(0, 6).map((trip) => (
                <div key={trip._id} className="flex items-center gap-3 p-2.5 border-b border-[#f9fafb] hover:bg-[#f8f9fa]">
                  <div className="w-10 h-10 rounded border border-[#e5e7eb] overflow-hidden flex-shrink-0">
                    <img src={trip.mainImageUrl} alt={trip.title} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 flex flex-col truncate">
                    <span className="text-[12px] font-bold text-[#111827] truncate">{trip.title}</span>
                    <span className="text-[10px] text-[#4b5563]">₹ {trip.pricing?.newPrice?.toLocaleString('en-IN')} &bull; {trip.duration?.days}D</span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}