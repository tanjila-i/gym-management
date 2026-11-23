export const CLASSES_LIST = [
  {
    id: "c-1",
    title: "HIIT & Conditioning",
    trainer: "Jordan Vance",
    dayTime: "Mon / Wed · 07:00 AM",
    level: "Intermediate",
  },
  {
    id: "c-2",
    title: "Foundations Strength",
    trainer: "Jordan Vance",
    dayTime: "Tue / Thu · 06:00 PM",
    level: "Beginner",
  },
  {
    id: "c-3",
    title: "Mobility & Core",
    trainer: "Jordan Vance",
    dayTime: "Sat · 09:30 AM",
    level: "All Levels",
  },
];

const ClassBookingPage = () => {
  return (
    <div className="w-full max-w-6xl mx-auto p-6">
      <div className="sm:flex sm:items-center sm:justify-between mb-6">
        <div>
          <h2 className="text-xl font-semibold text-white">Classes</h2>
          <p className="mt-1 text-sm text-gray-500">A list of all classes</p>
        </div>
      </div>

      <div className="overflow-x-auto rounded-xl shadow-sm border border-neutral-800">
        <table className="min-w-full divide-y divide-neutral-800 text-left text-sm">
          <thead className="text-white font-medium text-center">
            <tr>
              <th scope="col" className="px-6 py-3.5">
                Title
              </th>
              <th scope="col" className="px-6 py-3.5">
                Trainer
              </th>
              <th scope="col" className="px-6 py-3.5">
                DayTime
              </th>
              <th scope="col" className="px-6 py-3.5">
                level
              </th>
              <th scope="col" className="px-6 py-3.5 ">
                Cancelled
              </th>
            </tr>
          </thead>

          {/* 4. Map through plans */}
          <tbody className="divide-y divide-gray-200 text-center text-white">
            {CLASSES_LIST.map((plan, index) => {
              return (
                <tr key={index}>
                  <td className="px-6 py-4 font-medium">{plan.title}</td>
                  <td className="px-6 py-4">{plan.trainer}</td>
                  <td className="px-6 py-4">${plan.dayTime}</td>
                  <td className="px-6 py-4">{plan.level}</td>

                  <td className="px-6 py-4 ">
                    {/* Fixed: Changed onSubmit to onClick and passed planId */}
                    <button
                      type="button"
                      className="text-red-600 hover:underline"
                    >
                      Cancelled
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ClassBookingPage;
