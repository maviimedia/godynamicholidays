import PolicyLayout from "../components/layout/PolicyLayout";

export default function PrivacyPolicy() {
  const links = [
    { id: "collection", label: "1. Information We Collect" },
    { id: "usage", label: "2. How We Use Information" },
    { id: "sharing", label: "3. Third-Party Sharing" },
    { id: "security", label: "4. Data Security" },
    { id: "contact", label: "5. Contact Us" }
  ];

  return (
    <PolicyLayout title="Privacy" highlight="Policy" lastUpdated="August 2026" sidebarLinks={links}>
      
      <div id="collection" className="mb-10 scroll-mt-24">
        <h2 className="text-xl font-semibold text-gray-900 mb-3 pb-2 border-b border-gray-100">
          1. Information We Collect
        </h2>
        <p className="text-sm text-gray-700 leading-relaxed mb-4">
          When you book itineraries, submit inquiries, or interact with our travel advisors, we collect various categories of information required to deliver customized travel services.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white border border-gray-200 p-4 rounded-lg">
            <h4 className="text-[15px] font-semibold mb-2">Personal Identifiers</h4>
            <p className="text-[13px] text-gray-500 m-0 leading-relaxed">
              Full legal name, passport copies, date of birth, and nationality required for international bookings.
            </p>
          </div>
          <div className="bg-white border border-gray-200 p-4 rounded-lg">
            <h4 className="text-[15px] font-semibold mb-2">Contact Information</h4>
            <p className="text-[13px] text-gray-500 m-0 leading-relaxed">
              Email address, mobile numbers, emergency contact details, and billing addresses.
            </p>
          </div>
          <div className="bg-white border border-gray-200 p-4 rounded-lg">
            <h4 className="text-[15px] font-semibold mb-2">Travel Preferences</h4>
            <p className="text-[13px] text-gray-500 m-0 leading-relaxed">
              Dietary restrictions, seat preferences, medical assistance requirements, and itinerary history.
            </p>
          </div>
          <div className="bg-white border border-gray-200 p-4 rounded-lg">
            <h4 className="text-[15px] font-semibold mb-2">Technical Data</h4>
            <p className="text-[13px] text-gray-500 m-0 leading-relaxed">
              IP address, browser type, device identifiers, and website navigation patterns.
            </p>
          </div>
        </div>
      </div>

      <div id="usage" className="mb-10 scroll-mt-24">
        <h2 className="text-xl font-semibold text-gray-900 mb-3 pb-2 border-b border-gray-100">
          2. How We Use Your Information
        </h2>
        <p className="text-sm text-gray-700 leading-relaxed mb-4">
          Your data is processed strictly for legitimate operational purposes, including:
        </p>
        <ul className="list-none p-0 m-0 space-y-2">
          <li className="flex items-start gap-2 text-sm text-gray-700">
            <i className="ri-check-line text-orange-500 mt-1"></i> Securing flight tickets, train reservations, hotel check-ins, and activity passes.
          </li>
          <li className="flex items-start gap-2 text-sm text-gray-700">
            <i className="ri-check-line text-orange-500 mt-1"></i> Providing real-time itinerary updates, emergency alerts, and 24/7 concierge assistance.
          </li>
          <li className="flex items-start gap-2 text-sm text-gray-700">
            <i className="ri-check-line text-orange-500 mt-1"></i> Facilitating consular visa appointments and submitting documentation.
          </li>
          <li className="flex items-start gap-2 text-sm text-gray-700">
            <i className="ri-check-line text-orange-500 mt-1"></i> Processing transactions, invoices, refunds, and financial reporting.
          </li>
        </ul>
      </div>

      <div id="sharing" className="mb-10 scroll-mt-24">
        <h2 className="text-xl font-semibold text-gray-900 mb-3 pb-2 border-b border-gray-100">
          3. Information Sharing & Third Parties
        </h2>
        <p className="text-sm text-gray-700 leading-relaxed mb-4">
          We do not sell, rent, or trade your personal data. We share information only with authorized service providers necessary to fulfill your vacation:
        </p>
        <div className="overflow-x-auto border border-gray-200 rounded-lg">
          <table className="w-full border-collapse text-[13px]">
            <thead>
              <tr>
                <th className="bg-gray-50 text-gray-900 font-semibold p-3 text-left border-b border-gray-200">Recipient Category</th>
                <th className="bg-gray-50 text-gray-900 font-semibold p-3 text-left border-b border-gray-200">Purpose of Transfer</th>
                <th className="bg-gray-50 text-gray-900 font-semibold p-3 text-left border-b border-gray-200">Data Shared</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-3 border-b border-gray-100 text-gray-600">Airlines & Consolidators</td>
                <td className="p-3 border-b border-gray-100 text-gray-600">Ticketing & Baggage Processing</td>
                <td className="p-3 border-b border-gray-100 text-gray-600">Passport Details, Names, DOB</td>
              </tr>
              <tr>
                <td className="p-3 border-b border-gray-100 text-gray-600">Hotels & Resorts</td>
                <td className="p-3 border-b border-gray-100 text-gray-600">Room Allocation</td>
                <td className="p-3 border-b border-gray-100 text-gray-600">Names, Stay Dates, Special Requests</td>
              </tr>
              <tr>
                <td className="p-3 border-b border-gray-100 text-gray-600">Embassy & Visa Centers</td>
                <td className="p-3 border-b border-gray-100 text-gray-600">Visa Issuance</td>
                <td className="p-3 border-b border-gray-100 text-gray-600">Government IDs, Financial Proofs</td>
              </tr>
              <tr>
                <td className="p-3 text-gray-600">Local Ground Operators</td>
                <td className="p-3 text-gray-600">Airport Transfers & Tours</td>
                <td className="p-3 text-gray-600">Passenger Names, Contact Phone</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div id="security" className="mb-10 scroll-mt-24">
        <h2 className="text-xl font-semibold text-gray-900 mb-3 pb-2 border-b border-gray-100">
          4. Data Security & Storage
        </h2>
        <p className="text-sm text-gray-700 leading-relaxed">
          We deploy bank-grade encryption protocols (TLS 1.3 / AES-256) across our web infrastructure. Access to sensitive traveler documents (such as passport copies) is restricted strictly to authorized visa desk executives and purged after journey completion according to regulatory standards.
        </p>
      </div>

      <div id="contact" className="mb-10 scroll-mt-24">
        <h2 className="text-xl font-semibold text-gray-900 mb-3 pb-2 border-b border-gray-100">
          5. Contact Our Privacy Desk
        </h2>
        <p className="text-sm text-gray-700 leading-relaxed mb-4">
          If you have any questions or requests regarding this Privacy Policy, please reach out to our dedicated data protection team:
        </p>
        <ul className="list-none p-0 m-0 space-y-2">
          <li className="flex items-center gap-2 text-sm text-gray-700">
            <i className="ri-mail-line text-orange-500"></i> privacy@godynamicholidays.com
          </li>
          <li className="flex items-center gap-2 text-sm text-gray-700">
            <i className="ri-phone-line text-orange-500"></i> +91 98204 02089
          </li>
          <li className="flex items-center gap-2 text-sm text-gray-700">
            <i className="ri-map-pin-line text-orange-500"></i> GoDynamicHolidays Headquarters, Mumbai, India
          </li>
        </ul>
      </div>

    </PolicyLayout>
  );
}