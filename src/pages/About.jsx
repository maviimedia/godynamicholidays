export default function About() {
  return (
    <main className="w-full bg-white font-sans text-gray-800 py-10">
      <div className="max-w-[1100px] mx-auto px-4 sm:px-10">
        
        <div className="mb-8">
          <h1 className="text-3xl font-semibold m-0 text-gray-900">
            About <span className="text-orange-500">GoDynamicHolidays</span>
          </h1>
          <p className="text-sm text-gray-500 mt-2 border-b-2 border-orange-500 inline-block pb-1">
            The vision behind every bespoke itinerary
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-10 items-center mb-16">
          <div>
            <p className="text-sm text-gray-700 leading-relaxed mb-4">
              Founded with the single purpose of eliminating boilerplate tourism, GoDynamicHolidays has grown into India's foremost destination management collective. We combine intimate local knowledge with global operational standards to bring you seamless exploration.
            </p>
            <p className="text-sm text-gray-700 leading-relaxed mb-6">
              From private excursions to the icy summits of Mount Titlis to sunset cruises across the Mediterranean, each itinerary is engineered with precision. Our private concierge teams, on-ground tour directors, and certified destination architects ensure every nuance is considered.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-5">
              <div className="border border-gray-200 bg-gray-50 p-3 rounded-lg text-center">
                <h4 className="text-lg font-bold text-orange-500 m-0">50K+</h4>
                <span className="text-[11px] font-medium text-gray-500 uppercase">Travelers</span>
              </div>
              <div className="border border-gray-200 bg-gray-50 p-3 rounded-lg text-center">
                <h4 className="text-lg font-bold text-orange-500 m-0">120+</h4>
                <span className="text-[11px] font-medium text-gray-500 uppercase">Destinations</span>
              </div>
              <div className="border border-gray-200 bg-gray-50 p-3 rounded-lg text-center">
                <h4 className="text-lg font-bold text-orange-500 m-0">450+</h4>
                <span className="text-[11px] font-medium text-gray-500 uppercase">Partners</span>
              </div>
              <div className="border border-gray-200 bg-gray-50 p-3 rounded-lg text-center">
                <h4 className="text-lg font-bold text-orange-500 m-0">10+</h4>
                <span className="text-[11px] font-medium text-gray-500 uppercase">Years Exp.</span>
              </div>
            </div>
          </div>
          <div>
            <img 
              src="/assets/images/Switzerland.avif" 
              alt="Our Journey" 
              className="w-full aspect-square object-cover rounded-xl shadow-md"
            />
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-semibold m-0 text-gray-900">
            Our Core <span className="text-orange-500">Principles</span>
          </h2>
          <p className="text-sm text-gray-500 mt-2 border-b-2 border-orange-500 inline-block pb-1">
            Why discerning travelers choose us
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-16">
          <div className="border border-gray-200 bg-white p-5 rounded-lg transition-transform hover:-translate-y-1 hover:shadow-sm">
            <i className="ri-vip-diamond-fill text-2xl text-orange-500 mb-3 block"></i>
            <h4 className="text-[15px] font-semibold mb-2">Curated Luxury</h4>
            <p className="text-[13px] text-gray-500 leading-relaxed m-0">Direct alliances with premium properties to ensure exceptional comfort and locations.</p>
          </div>
          <div className="border border-gray-200 bg-white p-5 rounded-lg transition-transform hover:-translate-y-1 hover:shadow-sm">
            <i className="ri-compass-3-fill text-2xl text-orange-500 mb-3 block"></i>
            <h4 className="text-[15px] font-semibold mb-2">Tailor-Made</h4>
            <p className="text-[13px] text-gray-500 leading-relaxed m-0">Every itinerary is customized to match your individual rhythm and preferences.</p>
          </div>
          <div className="border border-gray-200 bg-white p-5 rounded-lg transition-transform hover:-translate-y-1 hover:shadow-sm">
            <i className="ri-customer-service-2-fill text-2xl text-orange-500 mb-3 block"></i>
            <h4 className="text-[15px] font-semibold mb-2">24/7 Support</h4>
            <p className="text-[13px] text-gray-500 leading-relaxed m-0">A dedicated travel manager remains on call around the clock for any assistance.</p>
          </div>
        </div>

      </div>
    </main>
  );
}