import { Link } from "react-router-dom";

const AboutPage = ({ onOpenTrial }) => {
  const pillars = [
    {
      title: "Structured Programming",
      desc: "Every member receives clear training pathways across strength, conditioning, and mobility rather than guesswork.",
    },
    {
      title: "Certified Coaching Team",
      desc: "Qualified trainers focused on safe movement mechanics, progressive overload, and sustainable habits.",
    },
    {
      title: "Clean & Accessible Facility",
      desc: "Scheduled equipment sanitization, open floor spacing, locker rooms, and accessible entryways.",
    },
  ];
  return (
    <div className="mx-auto max-w-7xl border-b border-neutral-800 text-white px-4 py-14 space-y-14 bg-gradient-to-b from-neutral-900 to-neutral-950">
      <section className="max-w-3xl">
        <span className="text-xs font-semibold uppercase tracking-wider text-amber-400">
          About IronPulse Fitness
        </span>
        <h1 className="mt-2 text-3xl font-extrabold sm:text-4xl">
          Built for Consistent Training and Measurable Progress.
        </h1>
        <p className="mt-4 text-base text-neutral-300 leading-relaxed">
          IronPulse Fitness was founded to combine commercial-grade strength and
          conditioning equipment with the accountability of personal coaching
          and small-group classes. Whether you are stepping into a gym for the
          first time or preparing for a performance goal, our team provides a
          welcoming, structured environment.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={onOpenTrial}
            className="rounded-lg bg-amber-400 px-5 py-2.5 text-sm font-semibold text-neutral-950 hover:bg-amber-300"
          >
            Book a Free Trial
          </button>
          <Link
            to="/post-memberShip"
            className="rounded-lg border border-neutral-700 px-5 py-2.5 text-sm font-semibold text-white hover:border-neutral-500"
          >
            View Membership Plans
          </Link>
        </div>
      </section>

      <section className="grid gap-6 md:grid-cols-3">
        {pillars.map((item) => (
          <div
            key={item.title}
            className="rounded-2xl border border-neutral-800 bg-neutral-900 p-6"
          >
            <h2 className="text-lg font-bold text-white">{item.title}</h2>
            <p className="mt-2 text-sm text-neutral-400">{item.desc}</p>
          </div>
        ))}
      </section>

      <section className="rounded-2xl border border-neutral-800 bg-neutral-900/70 p-6 text-sm text-neutral-300">
        <h2 className="font-semibold text-white">
          Safety & Accessibility Notice
        </h2>
        <p className="mt-2 text-neutral-400">
          Our fitness programs support general health, strength, and
          conditioning and do not constitute medical diagnosis or treatment. If
          you have accessibility needs or require equipment accommodations, let
          our reception team know when booking your visit.
        </p>
      </section>
    </div>
  );
};

export default AboutPage;
