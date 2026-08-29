import { useState, useEffect } from "react";
import { useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";

export default function PopupForm() {
  const [isOpen, setIsOpen] = useState(false);
  const [status, setStatus] = useState("");
  const [dateInputType, setDateInputType] = useState("text");
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    countryCode: "+91",
    travelDate: "",
    travellerCount: "",
    message: ""
  });

  useEffect(() => {
    const timer = setTimeout(() => setIsOpen(true), 5000);
    return () => clearTimeout(timer);
  }, []);

  const createLead = useMutation(api.leads.createLead);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("Sending...");
    try {
      await createLead({
        fullName: formData.fullName,
        email: formData.email,
        phone: `${formData.countryCode}${formData.phone}`,
        travelDate: formData.travelDate,
        travellerCount: Number(formData.travellerCount),
        message: formData.message,
        packageName: "General Popup Inquiry"
      });
      setStatus("Sent Successfully!");
      setTimeout(() => setIsOpen(false), 2000);
    } catch (error) {
      setStatus("Failed to send.");
    }
  };

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[1000] bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-lg p-5 sm:p-6 max-w-[400px] w-full relative shadow-2xl animate-fade-in-down max-h-[90vh] overflow-y-auto">
        <button onClick={() => setIsOpen(false)} className="absolute top-2 right-3 sm:top-3 sm:right-4 text-gray-400 hover:text-gray-800 text-2xl">&times;</button>
        <h2 className="text-lg sm:text-xl font-semibold mb-2 mt-2 sm:mt-0">Save up to <span className="text-orange-500">50% OFF</span></h2>
        <p className="text-xs sm:text-sm text-gray-600 mb-4">We'll be needing some of your basic details to help you better with your trip</p>
        
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} placeholder="Full Name*" required className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:border-orange-500 outline-none" />
          <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email Address" className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:border-orange-500 outline-none" />
          
          <div className="flex gap-2">
            <select name="countryCode" value={formData.countryCode} onChange={handleChange} className="w-[70px] sm:w-[80px] px-1 sm:px-2 py-2 border border-gray-300 rounded text-sm focus:border-orange-500 outline-none bg-white">
              <option value="+91">+91</option>
              <option value="+1">+1</option>
              <option value="+44">+44</option>
            </select>
            <input type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="Phone Number*" required className="flex-1 px-3 py-2 border border-gray-300 rounded text-sm focus:border-orange-500 outline-none" />
          </div>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-2">
            <input 
              type={dateInputType} 
              name="travelDate" 
              value={formData.travelDate} 
              onChange={handleChange} 
              onFocus={() => setDateInputType("date")}
              onBlur={() => {
                if (!formData.travelDate) setDateInputType("text");
              }}
              placeholder="Travel Date"
              className="w-full sm:w-1/2 px-3 py-2 border border-gray-300 rounded text-sm focus:border-orange-500 outline-none text-gray-700 bg-white" 
            />
            <input type="number" name="travellerCount" value={formData.travellerCount} onChange={handleChange} placeholder="People" className="w-full sm:w-1/2 px-3 py-2 border border-gray-300 rounded text-sm focus:border-orange-500 outline-none" />
          </div>

          <textarea name="message" value={formData.message} onChange={handleChange} placeholder="Where Are You Traveling?" className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:border-orange-500 outline-none min-h-[80px]"></textarea>
          
          <button type="submit" disabled={status === "Sending..."} className="w-full bg-orange-500 text-white font-medium py-2.5 rounded mt-2 hover:bg-orange-600 disabled:bg-orange-300">
            {status || "Connect with an Expert"}
          </button>
        </form>
      </div>
    </div>
  );
}