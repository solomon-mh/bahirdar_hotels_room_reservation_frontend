export const AvailableDates = [
  {
    startDate: "7/31/2001",
    endDate: "10/2/2030",
    numberOfNights: 12,
    pricePerNight: 673.04,
    room: { $oid: "6793acaefc13ae5d1c9b57f3" },
  },
  {
    startDate: "6/11/2041",
    endDate: "9/19/2003",
    numberOfNights: 13,
    pricePerNight: 690.88,
    room: { $oid: "6793acaefc13ae5d1c9b57f4" },
  },
  {
    startDate: "1/14/2012",
    endDate: "9/26/2011",
    numberOfNights: 28,
    pricePerNight: 182.39,
    room: { $oid: "6793acaefc13ae5d1c9b57f5" },
  },
  {
    startDate: "7/4/2041",
    endDate: "4/21/2024",
    numberOfNights: 28,
    pricePerNight: 603.86,
    room: { $oid: "6793acaefc13ae5d1c9b57f6" },
  },
  {
    startDate: "10/16/2041",
    endDate: "8/26/2044",
    numberOfNights: 17,
    pricePerNight: 34.6,
    room: { $oid: "6793acaefc13ae5d1c9b57f7" },
  },
  {
    startDate: "5/10/2019",
    endDate: "12/13/2039",
    numberOfNights: 11,
    pricePerNight: 90.04,
    room: { $oid: "6793acaefc13ae5d1c9b57f8" },
  },
  {
    startDate: "3/8/2042",
    endDate: "3/18/2020",
    numberOfNights: 28,
    pricePerNight: 664.94,
    room: { $oid: "6793acaefc13ae5d1c9b57f9" },
  },
  {
    startDate: "10/17/2005",
    endDate: "3/21/2009",
    numberOfNights: 5,
    pricePerNight: 783.41,
    room: { $oid: "6793acaefc13ae5d1c9b57fa" },
  },
  {
    startDate: "6/22/2035",
    endDate: "5/26/2043",
    numberOfNights: 14,
    pricePerNight: 281.79,
    room: { $oid: "6793acaefc13ae5d1c9b57fb" },
  },
  {
    startDate: "8/25/2019",
    endDate: "6/27/2023",
    numberOfNights: 23,
    pricePerNight: 214.03,
    room: { $oid: "6793acaefc13ae5d1c9b57fc" },
  },
];

export default function AvailableDatesTable() {
  return (
    <div className="overflow-x-auto h-[20vh] overflow-y-auto">
      <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-lg">
        <thead className="bg-gray-100 border-b border-gray-200">
          <tr>
            <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">Start Date</th>
            <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">End Date</th>
            <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">Nights</th>
            <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">Price/Night</th>
            <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">Room ID</th>
          </tr>
        </thead>
        <tbody>
          {AvailableDates.map((date, index) => (
            <tr
              key={index}
              className={`${
                index % 2 === 0 ? "bg-gray-50" : "bg-white"
              } hover:bg-gray-100`}
            >
              <td className="px-4 py-2 text-sm text-gray-700">{date.startDate}</td>
              <td className="px-4 py-2 text-sm text-gray-700">{date.endDate}</td>
              <td className="px-4 py-2 text-sm text-gray-700">{date.numberOfNights}</td>
              <td className="px-4 py-2 text-sm text-gray-700">${date.pricePerNight.toFixed(2)}</td>
              <td className="px-4 py-2 text-sm text-gray-700">{date.room.$oid}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
