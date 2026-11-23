import React from "react";

const Facilities = () => {
  const facilities = [
    {
      title: "Strength & Free Weights",
      desc: "Olympic lifting platforms, calibrated plates, squat racks, and dumbbells up to 60 kg.",
    },
    {
      title: "Cardio & Conditioning Deck",
      desc: "Curved treadmills, Concept2 rowers, ski ergs, and air bikes with heart-rate tracking.",
    },
    {
      title: "Functional & Mobility Studio",
      desc: "Dedicated turf lane, kettlebells, sleds, and recovery stretching zone.",
    },
  ];

  return (
    <section className="mx-auto max-w-7xl px-4 py-16">
      <h2 className="text-2xl font-bold">Facilities & Training Zones</h2>
      <p className="mt-1 text-sm text-neutral-400">
        Sanitized hourly, climate-controlled, and open 7 days a week.
      </p>
      <div className="mt-6 grid gap-6 md:grid-cols-3">
        {facilities.map((zone) => (
          <div
            key={zone.title}
            className="rounded-2xl border border-neutral-800 bg-neutral-900 p-6"
          >
            <h3 className="text-lg font-semibold text-white">{zone.title}</h3>
            <p className="mt-2 text-sm text-neutral-400">{zone.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Facilities;
