import { useQuery, useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";

export default function Leads() {
  const leads = useQuery(api.leads.getAllLeads);
  const updateStatus = useMutation(api.leads.updateLeadStatus);

  if (leads === undefined) {
    return <div className="p-6 text-center text-[#9ca3af] font-medium">Loading inquiries...</div>;
  }

  return (
    <div className="bg-white border border-[#e5e7eb] rounded-lg flex flex-col shadow-sm flex-1 min-h-0">
      <div className="p-4 border-b border-[#f3f4f6] flex justify-between items-center flex-shrink-0">
        <h2 className="text-[16px] font-bold text-[#111827] m-0">Inquiries & Leads</h2>
        <div className="bg-[#ffedd5] text-[#ea580c] px-3 py-1 rounded-full text-[11px] font-bold">
          Total: {leads.length}
        </div>
      </div>
      
      <div className="flex-1 overflow-auto">
        <table className="w-full text-left border-collapse">
          <thead className="bg-[#f8f9fa] sticky top-0 z-10 border-b border-[#e5e7eb]">
            <tr>
              <th className="p-3 text-[11px] font-semibold text-[#4b5563] uppercase tracking-wider">Date</th>
              <th className="p-3 text-[11px] font-semibold text-[#4b5563] uppercase tracking-wider">Client Info</th>
              <th className="p-3 text-[11px] font-semibold text-[#4b5563] uppercase tracking-wider">Trip Details</th>
              <th className="p-3 text-[11px] font-semibold text-[#4b5563] uppercase tracking-wider">Message</th>
              <th className="p-3 text-[11px] font-semibold text-[#4b5563] uppercase tracking-wider">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#f3f4f6]">
            {leads.length === 0 ? (
              <tr>
                <td colSpan="5" className="p-8 text-center text-[#9ca3af]">No inquiries found.</td>
              </tr>
            ) : (
              leads.map((lead) => (
                <tr key={lead._id} className="hover:bg-[#fbfbfc] transition-colors">
                  <td className="p-3 text-[12px] text-[#4b5563] whitespace-nowrap align-top">
                    {new Date(lead._creationTime).toLocaleDateString()}
                  </td>
                  <td className="p-3 align-top">
                    <div className="text-[13px] font-semibold text-[#111827]">{lead.fullName}</div>
                    <div className="text-[11px] text-[#4b5563] mt-0.5"><i className="ri-mail-line"></i> {lead.email}</div>
                    <div className="text-[11px] text-[#4b5563] mt-0.5"><i className="ri-phone-line"></i> {lead.phone}</div>
                  </td>
                  <td className="p-3 align-top">
                    <div className="text-[12px] font-medium text-[#111827] max-w-[150px] truncate" title={lead.packageName}>
                      {lead.packageName || "General Query"}
                    </div>
                    <div className="text-[11px] text-[#4b5563] mt-1">
                      <span className="font-medium">Date:</span> {lead.travelDate || "N/A"}
                    </div>
                    <div className="text-[11px] text-[#4b5563] mt-0.5">
                      <span className="font-medium">Pax:</span> {lead.travellerCount || 0}
                    </div>
                  </td>
                  <td className="p-3 align-top">
                    <div className="text-[11px] text-[#4b5563] max-w-[200px] break-words line-clamp-3" title={lead.message}>
                      {lead.message || "No message attached."}
                    </div>
                  </td>
                  <td className="p-3 align-top">
                    <select
                      value={lead.status}
                      onChange={(e) => updateStatus({ id: lead._id, status: e.target.value })}
                      className={`text-[11px] font-bold rounded px-2 py-1 outline-none border cursor-pointer ${
                        lead.status === "new" ? "bg-red-50 text-red-600 border-red-100" :
                        lead.status === "contacted" ? "bg-blue-50 text-blue-600 border-blue-100" :
                        lead.status === "converted" ? "bg-green-50 text-green-600 border-green-100" :
                        "bg-gray-100 text-gray-600 border-gray-200"
                      }`}
                    >
                      <option value="new">New</option>
                      <option value="contacted">Contacted</option>
                      <option value="converted">Converted</option>
                      <option value="archived">Archived</option>
                    </select>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}