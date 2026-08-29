import PolicyLayout from "../components/layout/PolicyLayout";

export default function TermsConditions() {
  const links = [
    { id: "booking", label: "1. Booking Process" },
    { id: "pricing", label: "2. Pricing & Currency" },
    { id: "schedules", label: "3. Payments" }
  ];

  return (
    <PolicyLayout title="Terms &" highlight="Conditions" lastUpdated="August 2026" sidebarLinks={links}>
      <div id="booking" className="mb-10 scroll-mt-24">
        <h2 className="text-xl font-semibold text-gray-900 mb-3 pb-2 border-b border-gray-100">
          1. Booking & Confirmation Process
        </h2>
        <p className="text-sm text-gray-700 leading-relaxed mb-4">
          A booking becomes legally binding once GoDynamicHolidays receives the required initial deposit and issues an official electronic booking voucher.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div className="bg-white border border-gray-200 p-4 rounded-lg">
            <h4 className="text-[15px] font-semibold mb-2">Lead Passenger</h4>
            <p className="text-[13px] text-gray-500 m-0 leading-relaxed">
              The individual making the reservation affirms they possess the legal capacity to accept these terms for all passengers.
            </p>
          </div>
          <div className="bg-white border border-gray-200 p-4 rounded-lg">
            <h4 className="text-[15px] font-semibold mb-2">Documentation</h4>
            <p className="text-[13px] text-gray-500 m-0 leading-relaxed">
              Travelers are responsible for verifying that passenger names match official passport details exactly.
            </p>
          </div>
        </div>
      </div>

      <div id="pricing" className="mb-10 scroll-mt-24">
        <h2 className="text-xl font-semibold text-gray-900 mb-3 pb-2 border-b border-gray-100">
          2. Pricing, Inclusions & Foreign Exchange
        </h2>
        <p className="text-sm text-gray-700 leading-relaxed mb-4">
          All package rates are calculated based on existing airline tariffs, hotel contracts, and foreign exchange rates.
        </p>
        <ul className="list-none p-0 m-0 space-y-2">
          <li className="flex items-start gap-2 text-sm text-gray-700">
            <i className="ri-error-warning-fill text-orange-500 mt-1"></i> We reserve the right to revise quotes if exchange rates fluctuate significantly.
          </li>
          <li className="flex items-start gap-2 text-sm text-gray-700">
            <i className="ri-error-warning-fill text-orange-500 mt-1"></i> Mandatory municipal tourist taxes must be paid directly at destination properties.
          </li>
        </ul>
      </div>
    </PolicyLayout>
  );
}