import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery, useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { Helmet } from "react-helmet-async";

export default function TripDetails() {
  const { slug } = useParams();
  const navigate = useNavigate();
  
  const trip = useQuery(api.trips.getTripBySlug, { slug: slug || "" });
  const createLead = useMutation(api.leads.createLead);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);
  const [formData, setFormData] = useState({
    fullName: "", email: "", phone: "", travelDate: "", travellerCount: "", message: ""
  });
  const [status, setStatus] = useState("");

  if (trip === undefined) {
    return (
      <div className="w-full min-h-[60vh] flex items-center justify-center">
        <i className="ri-loader-4-line text-4xl text-orange-500 animate-spin"></i>
      </div>
    );
  }

  if (trip === null) {
    return (
      <div className="w-full min-h-[60vh] flex flex-col items-center justify-center px-4">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Trip Not Found</h1>
        <p className="text-gray-500 mb-6">The package you are looking for does not exist.</p>
        <button onClick={() => navigate("/")} className="bg-orange-500 text-white px-6 py-2 rounded-lg font-medium hover:bg-orange-600">
          Go Back Home
        </button>
      </div>
    );
  }

  const images = [trip.mainImageUrl, ...(trip.galleryImageUrls || [])];

  const openModal = (index) => {
    setCurrentImage(index);
    setIsModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("Sending...");
    try {
      await createLead({
        ...formData,
        travellerCount: Number(formData.travellerCount),
        packageName: trip.title
      });
      setStatus("Enquiry sent successfully!");
      setFormData({ fullName: "", email: "", phone: "", travelDate: "", travellerCount: "", message: "" });
    } catch (error) {
      setStatus("Failed to send. Try again.");
    }
  };

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  return (
    <main className="w-full bg-white font-sans text-gray-800">
      <Helmet>
        <title>{trip.title} | GoDynamicHolidays</title>
      </Helmet>

      <section className="py-8">
        <div className="max-w-[1100px] mx-auto px-4 sm:px-10">
          <div className="flex flex-col md:flex-row gap-4">
            <div 
              className="w-full md:w-2/3 min-h-[300px] md:min-h-[500px] bg-cover bg-center rounded-lg relative" 
              style={{ backgroundImage: `url('${trip.mainImageUrl}')` }}
            >
              {trip.isTrending && (
                <span className="absolute top-4 left-4 bg-red-600 text-white px-3 py-1 text-xs rounded-full font-bold shadow-md tracking-wider">
                  TRENDING
                </span>
              )}
            </div>
            <div className="w-full md:w-1/3 grid grid-cols-2 md:grid-cols-1 gap-4">
              {images.slice(1, 4).map((img, idx) => (
                <div key={idx} onClick={() => openModal(idx + 1)} className="h-[100px] md:h-[155px] bg-cover bg-center rounded-lg cursor-pointer hover:scale-[1.02] transition-transform" style={{ backgroundImage: `url('${img}')` }}></div>
              ))}
              {images.length > 4 && (
                <div onClick={() => openModal(4)} className="h-[100px] md:h-[155px] bg-cover bg-center rounded-lg cursor-pointer hover:scale-[1.02] transition-transform flex items-end p-3 relative" style={{ backgroundImage: `url('${images[4]}')` }}>
                  <div className="absolute inset-0 bg-black/30 rounded-lg"></div>
                  <button className="relative z-10 bg-white text-gray-800 text-xs px-3 py-1.5 rounded-lg font-medium shadow-md flex items-center gap-2">
                    <i className="ri-image-line"></i> View All Images
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {isModalOpen && (
        <div className="fixed inset-0 z-[9999] bg-black/90 flex items-center justify-center">
          <button onClick={() => setIsModalOpen(false)} className="absolute top-6 right-8 text-white text-4xl hover:text-gray-300 z-50">&times;</button>
          <button onClick={() => setCurrentImage((prev) => (prev === 0 ? images.length - 1 : prev - 1))} className="absolute left-4 md:left-10 text-white text-4xl p-2 z-50 bg-white/10 rounded-full border border-white/20 hover:bg-white/20"><i className="ri-arrow-left-s-line"></i></button>
          <img src={images[currentImage]} alt="Gallery" className="max-h-[85vh] max-w-[90vw] object-contain rounded-lg shadow-2xl" />
          <button onClick={() => setCurrentImage((prev) => (prev === images.length - 1 ? 0 : prev + 1))} className="absolute right-4 md:right-10 text-white text-4xl p-2 z-50 bg-white/10 rounded-full border border-white/20 hover:bg-white/20"><i className="ri-arrow-right-s-line"></i></button>
        </div>
      )}

      <section className="py-4">
        <div className="max-w-[1100px] mx-auto px-4 sm:px-10 flex flex-col md:flex-row gap-8">
          <div className="flex-1 md:w-3/5">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 leading-snug mb-4">{trip.title}</h1>
            <div className="mb-6">
              <span className="bg-orange-500 text-white px-4 py-1.5 text-sm rounded-full font-semibold inline-block mb-3">
                {trip.duration.days} DAY / {trip.duration.nights} NIGHT
              </span>
            </div>

            <hr className="border-gray-200 my-8" />

            {trip.route && trip.route.length > 0 && (
              <>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Destination Route</h3>
                <div className="border border-orange-500 bg-orange-50 px-4 py-3 rounded-lg text-sm font-medium text-gray-800 inline-flex flex-wrap items-center mb-8">
                  {trip.route.map((r, idx) => (
                    <span key={idx} className="flex items-center">
                      {r}
                      {idx < trip.route.length - 1 && <span className="text-orange-500 mx-2">&rarr;</span>}
                    </span>
                  ))}
                </div>
              </>
            )}

            {trip.highlights && trip.highlights.length > 0 && (
              <>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Trip Highlights</h3>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-8">
                  {trip.highlights.map((highlight, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm text-gray-700">
                      <i className="ri-star-s-fill text-orange-500 mt-0.5 text-lg"></i> {highlight}
                    </li>
                  ))}
                </ul>
              </>
            )}

            <h3 className="text-xl font-semibold text-gray-900 mb-4">Inclusions & Exclusions</h3>
            <div className="flex flex-col sm:flex-row gap-5 mb-8">
              <div className="flex-1 bg-green-50 border border-green-100 p-5 rounded-xl">
                <h4 className="text-green-800 font-semibold flex items-center gap-2 mb-4"><i className="ri-checkbox-circle-fill"></i> What's Included</h4>
                <ul className="space-y-2 text-sm text-gray-700">
                  {trip.inclusions.map((inc, idx) => (
                    <li key={idx} className="flex gap-2 items-start"><span className="text-green-600">&bull;</span> {inc}</li>
                  ))}
                </ul>
              </div>
              <div className="flex-1 bg-red-50 border border-red-100 p-5 rounded-xl">
                <h4 className="text-red-800 font-semibold flex items-center gap-2 mb-4"><i className="ri-close-circle-fill"></i> What's Excluded</h4>
                <ul className="space-y-2 text-sm text-gray-700">
                  {trip.exclusions.map((exc, idx) => (
                    <li key={idx} className="flex gap-2 items-start"><span className="text-red-600">&bull;</span> {exc}</li>
                  ))}
                </ul>
              </div>
            </div>

            {trip.thingsToCarry && trip.thingsToCarry.length > 0 && (
              <>
                <h3 className="text-xl font-semibold text-gray-900 mb-4 mt-8">Things To Carry</h3>
                <div className="bg-orange-50 border border-orange-100 p-5 rounded-xl mb-8">
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-gray-800">
                    {trip.thingsToCarry.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <i className="ri-checkbox-circle-line text-orange-500 text-lg"></i> {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </>
            )}
            
            {trip.faqs && trip.faqs.length > 0 && (
              <>
                <h3 className="text-xl font-semibold text-gray-900 mb-4 mt-8">Frequently Asked Questions</h3>
                <div className="flex flex-col gap-4 mb-8">
                  {trip.faqs.map((faq, idx) => (
                    <div key={idx} className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                      <h4 className="font-semibold text-gray-900 text-sm mb-2">{faq.question}</h4>
                      <p className="text-sm text-gray-600">{faq.answer}</p>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>

          <div className="md:w-2/5">
            <div className="border border-gray-200 p-6 rounded-xl bg-white sticky top-24 shadow-sm">
              <h4 className="text-base font-semibold mb-2">{trip.title}</h4>
              <p className="text-gray-900 text-[15px] mb-5 flex flex-wrap items-center">
                <span className="font-bold mr-2">₹ {trip.pricing.newPrice.toLocaleString('en-IN')}</span>
                {trip.pricing.oldPrice > trip.pricing.newPrice && (
                  <>
                    <del className="text-gray-400 mr-2">₹ {trip.pricing.oldPrice.toLocaleString('en-IN')}</del>
                    <span className="bg-green-50 text-green-700 font-semibold text-[10px] px-2 py-1 rounded-md border border-green-100 whitespace-nowrap">
                      SAVE ₹ {(trip.pricing.oldPrice - trip.pricing.newPrice).toLocaleString('en-IN')}
                    </span>
                  </>
                )}
              </p>
              
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} placeholder="Full Name*" required className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-md text-sm outline-none focus:border-orange-500 focus:bg-white transition-colors" />
                <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email*" required className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-md text-sm outline-none focus:border-orange-500 focus:bg-white transition-colors" />
                <div className="flex">
                  <span className="bg-gray-100 border border-gray-300 border-r-0 px-4 flex items-center justify-center rounded-l-md text-sm text-gray-700 font-medium">+91</span>
                  <input type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="Your Phone*" required className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-r-md text-sm outline-none focus:border-orange-500 focus:bg-white transition-colors" />
                </div>
                <div className="flex gap-4">
                  <input type="text" name="travelDate" value={formData.travelDate} onChange={handleChange} placeholder="Travel Date*" required className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-md text-sm outline-none focus:border-orange-500 focus:bg-white transition-colors" />
                  <input type="number" name="travellerCount" value={formData.travellerCount} onChange={handleChange} placeholder="Traveller Count*" required className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-md text-sm outline-none focus:border-orange-500 focus:bg-white transition-colors" />
                </div>
                <textarea name="message" value={formData.message} onChange={handleChange} placeholder="Message" className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-md text-sm outline-none focus:border-orange-500 focus:bg-white min-h-[100px] resize-y transition-colors"></textarea>
                
                <button type="submit" disabled={status === "Sending..."} className="w-full bg-orange-500 text-white font-semibold py-3 rounded-md hover:bg-orange-600 transition-colors disabled:bg-orange-300">
                  {status === "Sending..." ? "Sending..." : "Send Enquiry"}
                </button>
                {status && <p className={`text-sm mt-1 ${status.includes("success") ? "text-green-600" : "text-orange-500"}`}>{status}</p>}
              </form>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}