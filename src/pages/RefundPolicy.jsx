import PolicyLayout from "../components/layout/PolicyLayout";

export default function RefundPolicy() {
  const links = [
    { id: "slabs", label: "1. Cancellation Slabs" },
    { id: "non-refundable", label: "2. Non-Refundable Items" },
    { id: "timeline", label: "3. Processing Timelines" },
    { id: "disruptions", label: "4. Disruptions" },
    { id: "noshow", label: "5. No-Shows" },
    { id: "process", label: "6. Request Process" }
  ];

  return (
    <PolicyLayout title="Refund & Cancellation" highlight="Policy" lastUpdated="August 2026" sidebarLinks={links}>
      
      <div id="slabs" className="mb-10 scroll-mt-24">
        <h2 className="text-xl font-semibold text-gray-900 mb-3 pb-2 border-b border-gray-100">
          1. Cancellation Slabs & Retention Fees
        </h2>
        <p className="text-sm text-gray-700 leading-relaxed mb-4">
          Standard land package cancellations are calculated based on the date written notice is officially received by our reservations team prior to the scheduled departure.
        </p>
        <div className="overflow-x-auto border border-gray-200 rounded-lg">
          <table className="w-full border-collapse text-[13px]">
            <thead>
              <tr>
                <th className="bg-gray-50 text-gray-900 font-semibold p-3 text-left border-b border-gray-200">Cancellation Notice Received</th>
                <th className="bg-gray-50 text-gray-900 font-semibold p-3 text-left border-b border-gray-200">Retention Penalty</th>
                <th className="bg-gray-50 text-gray-900 font-semibold p-3 text-left border-b border-gray-200">Refund Amount</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-3 border-b border-gray-100 text-gray-600">45 or more days prior to departure</td>
                <td className="p-3 border-b border-gray-100 text-gray-600">Initial Booking Deposit</td>
                <td className="p-3 border-b border-gray-100 text-gray-600">90% of land package cost</td>
              </tr>
              <tr>
                <td className="p-3 border-b border-gray-100 text-gray-600">30 to 44 days prior to departure</td>
                <td className="p-3 border-b border-gray-100 text-gray-600">25% of total package cost</td>
                <td className="p-3 border-b border-gray-100 text-gray-600">75% of land package cost</td>
              </tr>
              <tr>
                <td className="p-3 border-b border-gray-100 text-gray-600">15 to 29 days prior to departure</td>
                <td className="p-3 border-b border-gray-100 text-gray-600">50% of total package cost</td>
                <td className="p-3 border-b border-gray-100 text-gray-600">50% of land package cost</td>
              </tr>
              <tr>
                <td className="p-3 text-gray-600">Less than 14 days or No-Show</td>
                <td className="p-3 text-gray-600">100% of total package cost</td>
                <td className="p-3 text-gray-600">Strictly Non-refundable</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div id="non-refundable" className="mb-10 scroll-mt-24">
        <h2 className="text-xl font-semibold text-gray-900 mb-3 pb-2 border-b border-gray-100">
          2. Non-Refundable Components
        </h2>
        <p className="text-sm text-gray-700 leading-relaxed mb-4">
          Certain package components are secured under instant non-cancellable terms directly with international suppliers and cannot be refunded under any condition.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white border border-gray-200 p-4 rounded-lg">
            <h4 className="text-[15px] font-semibold mb-2">Aviation & Rail Sectors</h4>
            <p className="text-[13px] text-gray-500 m-0 leading-relaxed">
              Special promotional airfares, charter flight bookings, and European rail passes are subject to 100% cancellation charges.
            </p>
          </div>
          <div className="bg-white border border-gray-200 p-4 rounded-lg">
            <h4 className="text-[15px] font-semibold mb-2">Consular & Visa Fees</h4>
            <p className="text-[13px] text-gray-500 m-0 leading-relaxed">
              Embassy visa application fees and document verification services are non-refundable once submitted.
            </p>
          </div>
          <div className="bg-white border border-gray-200 p-4 rounded-lg">
            <h4 className="text-[15px] font-semibold mb-2">Activity Excursions</h4>
            <p className="text-[13px] text-gray-500 m-0 leading-relaxed">
              Pre-purchased time-slot tickets for attractions cannot be canceled or modified.
            </p>
          </div>
          <div className="bg-white border border-gray-200 p-4 rounded-lg">
            <h4 className="text-[15px] font-semibold mb-2">Peak Season Blocks</h4>
            <p className="text-[13px] text-gray-500 m-0 leading-relaxed">
              Reservations booked for national holidays and major trade exhibition periods are non-refundable.
            </p>
          </div>
        </div>
      </div>

      <div id="timeline" className="mb-10 scroll-mt-24">
        <h2 className="text-xl font-semibold text-gray-900 mb-3 pb-2 border-b border-gray-100">
          3. Processing Timelines & Disbursement
        </h2>
        <p className="text-sm text-gray-700 leading-relaxed mb-4">
          All approved refunds are audited and disbursed directly through formal banking channels. We do not issue cash reimbursements.
        </p>
        <ul className="list-none p-0 m-0 space-y-2">
          <li className="flex items-start gap-2 text-sm text-gray-700">
            <i className="ri-time-line text-orange-500 mt-1"></i> Cancellation verification and supplier reconciliation require 5 to 7 business days.
          </li>
          <li className="flex items-start gap-2 text-sm text-gray-700">
            <i className="ri-bank-line text-orange-500 mt-1"></i> Amounts are credited back to the original source bank account within 10 to 14 business days.
          </li>
          <li className="flex items-start gap-2 text-sm text-gray-700">
            <i className="ri-line-chart-line text-orange-500 mt-1"></i> Refunds for overseas itineraries are settled in Indian Rupees accounting for exchange rate adjustments.
          </li>
        </ul>
      </div>

      <div id="disruptions" className="mb-10 scroll-mt-24">
        <h2 className="text-xl font-semibold text-gray-900 mb-3 pb-2 border-b border-gray-100">
          4. Force Majeure Disruptions
        </h2>
        <p className="text-sm text-gray-700 leading-relaxed">
          If overseas ground operators or airlines issue credit shells or future travel vouchers instead of monetary settlements due to unforeseen events, GoDynamicHolidays will transfer the equivalent credit vouchers directly to the passenger profile.
        </p>
      </div>

      <div id="noshow" className="mb-10 scroll-mt-24">
        <h2 className="text-xl font-semibold text-gray-900 mb-3 pb-2 border-b border-gray-100">
          5. Unused Services & No-Shows
        </h2>
        <p className="text-sm text-gray-700 leading-relaxed">
          No partial adjustments or refunds will be granted for unused itinerary inclusions, including missed hotel breakfasts, skipped guided tours, or unutilized transfers.
        </p>
      </div>

      <div id="process" className="mb-10 scroll-mt-24">
        <h2 className="text-xl font-semibold text-gray-900 mb-3 pb-2 border-b border-gray-100">
          6. Submitting a Refund Request
        </h2>
        <p className="text-sm text-gray-700 leading-relaxed mb-4">
          All cancellation notices must be sent in writing via the primary passenger's registered email address containing the booking ID.
        </p>
        <ul className="list-none p-0 m-0 space-y-2">
          <li className="flex items-center gap-2 text-sm text-gray-700">
            <i className="ri-mail-line text-orange-500"></i> refunds@godynamicholidays.com
          </li>
          <li className="flex items-center gap-2 text-sm text-gray-700">
            <i className="ri-phone-line text-orange-500"></i> +91 98204 02089
          </li>
          <li className="flex items-center gap-2 text-sm text-gray-700">
            <i className="ri-time-line text-orange-500"></i> Monday to Saturday: 10:00 AM to 06:30 PM IST
          </li>
        </ul>
      </div>

    </PolicyLayout>
  );
}