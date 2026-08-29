import { useState, useEffect, useRef } from "react";
import { NavLink, Outlet, useNavigate, Link } from "react-router-dom";
import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";

export default function AdminLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  
  const searchRef = useRef(null);
  const navigate = useNavigate();

  const trips = useQuery(api.trips.getAllTrips) || [];
  const leads = useQuery(api.leads.getAllLeads) || [];

  useEffect(() => {
    const authStatus = sessionStorage.getItem("adminAuth");
    if (authStatus === "true") {
      setIsAuthenticated(true);
    }
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsSearchOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === "admin123") {
      sessionStorage.setItem("adminAuth", "true");
      setIsAuthenticated(true);
      setError("");
    } else {
      setError("Incorrect password. Access denied.");
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem("adminAuth");
    setIsAuthenticated(false);
    navigate("/");
  };

  const handleSupportClick = () => {
    navigator.clipboard.writeText("support@maviimedia.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const filteredTrips = trips.filter(trip => 
    trip.title.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const filteredLeads = leads.filter(lead => 
    lead.fullName.toLowerCase().includes(searchTerm.toLowerCase()) || 
    lead.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (!isAuthenticated) {
    return (
      <div className="flex items-center justify-center h-screen w-full bg-[#f8f9fa] font-sans px-4">
        <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-[400px] border border-[#e5e7eb]">
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold text-[#111827]">GO CMS</h1>
            <p className="text-sm text-[#4b5563] mt-1">Authorized Personnel Only</p>
          </div>
          <form onSubmit={handleLogin} className="flex flex-col gap-4">
            <div>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter Admin Password" 
                className="w-full px-4 py-3 border border-[#e5e7eb] rounded-lg text-sm focus:outline-none focus:border-[#f97316] transition-colors"
                required
              />
            </div>
            {error && <p className="text-xs text-red-500 font-medium">{error}</p>}
            <button type="submit" className="w-full bg-[#f97316] text-white font-semibold py-3 rounded-lg hover:bg-[#ea580c] transition-colors">
              Access Dashboard
            </button>
          </form>
          <div className="mt-6 text-center">
            <button onClick={() => navigate("/")} className="text-xs text-[#9ca3af] hover:text-[#f97316]">
              &larr; Return to Website
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen w-full bg-[#f8f9fa] text-[12px] font-sans overflow-hidden">
      <aside className={`fixed md:static inset-y-0 left-0 z-40 w-[200px] bg-[#1a1c1e] flex flex-col flex-shrink-0 transition-transform duration-300 ${isSidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}>
        <div className="p-3 border-b border-[#272a2d] flex-shrink-0 flex justify-between items-center">
          <div className="text-[16px] font-bold text-white tracking-wide">GO CMS</div>
          <button onClick={() => setIsSidebarOpen(false)} className="md:hidden text-gray-400 text-lg">
            <i className="ri-close-line"></i>
          </button>
        </div>
        <nav className="flex-1 overflow-y-auto p-2 flex flex-col gap-1">
          <NavLink to="/admin" end className={({ isActive }) => `flex items-center gap-2 p-2 rounded text-[13px] font-medium transition-colors ${isActive ? "bg-[#272a2d] text-white shadow-[inset_2px_0_0_#f97316]" : "text-[#9ca3af] hover:bg-[#272a2d] hover:text-white"}`}>
            <i className="ri-home-line w-4 text-center"></i> Home
          </NavLink>
          <NavLink to="/admin/packages" className={({ isActive }) => `flex items-center gap-2 p-2 rounded text-[13px] font-medium transition-colors ${isActive ? "bg-[#272a2d] text-white shadow-[inset_2px_0_0_#f97316]" : "text-[#9ca3af] hover:bg-[#272a2d] hover:text-white"}`}>
            <i className="ri-flight-takeoff-line w-4 text-center"></i> Packages
          </NavLink>
          <NavLink to="/admin/leads" className={({ isActive }) => `flex items-center gap-2 p-2 rounded text-[13px] font-medium transition-colors ${isActive ? "bg-[#272a2d] text-white shadow-[inset_2px_0_0_#f97316]" : "text-[#9ca3af] hover:bg-[#272a2d] hover:text-white"}`}>
            <i className="ri-inbox-line w-4 text-center"></i> Inquiries
          </NavLink>
        </nav>
        <div className="p-3 border-t border-[#272a2d] flex-shrink-0">
          <button onClick={handleLogout} className="w-full flex items-center gap-2 p-2 rounded text-[13px] font-medium text-red-400 hover:bg-[#272a2d] hover:text-red-300 transition-colors">
            <i className="ri-logout-box-r-line w-4 text-center"></i> Logout
          </button>
        </div>
      </aside>

      <main className="flex-1 flex flex-col min-w-0 relative">
        <header className="h-[40px] bg-white border-b border-[#e5e7eb] flex items-center justify-between px-3 flex-shrink-0 z-20">
          <div className="flex items-center gap-3">
            <button onClick={() => setIsSidebarOpen(true)} className="md:hidden text-gray-600 text-lg">
              <i className="ri-menu-line"></i>
            </button>
            <div ref={searchRef} className="relative w-[200px] md:w-[240px]">
              <i className="ri-search-line absolute left-2 top-1/2 -translate-y-1/2 text-[#9ca3af] text-[12px]"></i>
              <input 
                type="text" 
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setIsSearchOpen(true);
                }}
                onFocus={() => setIsSearchOpen(true)}
                placeholder="Search bookings, packages..." 
                className="w-full bg-[#f8f9fa] border border-transparent rounded px-2 py-1 pl-7 text-[12px] text-[#111827] focus:outline-none focus:bg-white focus:border-[#f97316] transition-all" 
              />
              
              {isSearchOpen && searchTerm.length > 0 && (
                <div className="absolute top-full left-0 w-full md:w-[320px] mt-1 bg-white border border-[#e5e7eb] rounded-lg shadow-lg max-h-[300px] overflow-y-auto z-50 flex flex-col">
                  {filteredTrips.length > 0 && (
                    <div className="p-2 border-b border-[#f3f4f6]">
                      <div className="text-[10px] font-bold text-[#9ca3af] uppercase mb-1 px-1">Packages</div>
                      {filteredTrips.map(trip => (
                        <Link 
                          key={trip._id} 
                          to={`/admin/packages/edit/${trip._id}`} 
                          onClick={() => setIsSearchOpen(false)} 
                          className="block px-2 py-1.5 hover:bg-[#f8f9fa] rounded text-[12px] text-[#111827] truncate"
                        >
                          {trip.title}
                        </Link>
                      ))}
                    </div>
                  )}
                  {filteredLeads.length > 0 && (
                    <div className="p-2">
                      <div className="text-[10px] font-bold text-[#9ca3af] uppercase mb-1 px-1">Inquiries</div>
                      {filteredLeads.map(lead => (
                        <Link 
                          key={lead._id} 
                          to="/admin/leads" 
                          onClick={() => setIsSearchOpen(false)} 
                          className="block px-2 py-1.5 hover:bg-[#f8f9fa] rounded text-[12px] text-[#111827] truncate"
                        >
                          <span className="font-semibold">{lead.fullName}</span> - {lead.packageName || "General Inquiry"}
                        </Link>
                      ))}
                    </div>
                  )}
                  {filteredTrips.length === 0 && filteredLeads.length === 0 && (
                    <div className="p-3 text-center text-[11px] text-[#9ca3af]">
                      No results found for "{searchTerm}"
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
          <div className="flex items-center gap-3">
            <a 
              href="mailto:support@maviimedia.com" 
              onClick={handleSupportClick}
              className="bg-[#ffedd5] text-[#ea580c] border-none px-2 py-1 rounded text-[11px] font-semibold flex items-center gap-1 hover:bg-[#fed7aa] transition-colors no-underline"
            >
              <i className={copied ? "ri-check-line" : "ri-question-line"}></i> 
              {copied ? "Copied!" : "support"}
            </a>
          </div>
        </header>

        <div className="flex-1 p-3 overflow-y-auto flex flex-col gap-3">
          <Outlet />
        </div>
      </main>

      {isSidebarOpen && (
        <div onClick={() => setIsSidebarOpen(false)} className="fixed inset-0 bg-black/50 z-30 md:hidden"></div>
      )}
    </div>
  );
}