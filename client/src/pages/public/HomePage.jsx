import { Link } from "react-router-dom";
import Facilitie from "../../components/homePageLayout/Facilitie";
import HeroSection from "../../components/homePageLayout/HeroSection";
import { useEffect, useState } from "react";
import { useMemberShipPlanStore } from "../../store/MemberShipPlanStore";

export const MEMBERSHIP_PLANS = [
  {
    id: "plan-basic",
    name: "Essential",
    price: "$39",
    billing: "/ month",
    duration: "1 Month",
    popular: false,
    features: [
      "Gym floor & cardio access",
      "Standard opening hours",
      "Locker room access",
    ],
  },
  {
    id: "plan-pro",
    name: "Pro Monthly",
    price: "$69",
    billing: "/ month",
    duration: "1 Month",
    popular: true,
    features: [
      "All gym zones & functional area",
      "Group class bookings",
      "1 initial fitness assessment",
    ],
  },
  {
    id: "plan-annual",
    name: "Annual All-Access",
    price: "$649",
    billing: "/ year",
    duration: "12 Months",
    popular: false,
    features: [
      "Unlimited classes & priority booking",
      "2 months free equivalent",
      "Guest pass allowance",
    ],
  },
];

export const CLASSES_LIST = [
  {
    id: "c-1",
    title: "HIIT & Conditioning",
    trainer: "Jordan Vance",
    dayTime: "Mon / Wed · 07:00 AM",
    level: "Intermediate",
    spotsLeft: 5,
    capacity: 20,
  },
  {
    id: "c-2",
    title: "Foundations Strength",
    trainer: "Jordan Vance",
    dayTime: "Tue / Thu · 06:00 PM",
    level: "Beginner",
    spotsLeft: 8,
    capacity: 16,
  },
  {
    id: "c-3",
    title: "Mobility & Core",
    trainer: "Jordan Vance",
    dayTime: "Sat · 09:30 AM",
    level: "All Levels",
    spotsLeft: 0,
    capacity: 18,
  },
];

const HomePage = ({ onOpenTrial }) => {
  const { plans, getSeedPlan, isLoading, error } = useMemberShipPlanStore();
  useEffect(() => {
    getSeedPlan();
  }, [getSeedPlan]);
  const [enquirySent, setEnquirySent] = useState(false);
  return (
    <div className="text-white">
      <HeroSection onOpenTrial={onOpenTrial} />
      <Facilitie />
      {/* Featured Plans Preview */}
      <section className="border-y border-neutral-800 bg-neutral-900/50 py-16">
        <div className="mx-auto max-w-7xl px-4">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold">Membership Plans</h2>
              <p className="mt-1 text-sm text-neutral-400">
                Transparent pricing with online or reception activation.
              </p>
            </div>
            <Link
              to="/memberships"
              className="text-sm font-medium text-amber-400 hover:underline"
            >
              Compare full plan terms →
            </Link>
          </div>

          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {plans?.map((plan) => (
              <div
                key={plan._id}
                className={`rounded-2xl border p-6 ${
                  plan.badge
                    ? "border-amber-400 bg-neutral-900"
                    : "border-neutral-800 bg-neutral-950"
                }`}
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-bold">{plan.name}</h3>
                  {plan.badge && (
                    <span className="rounded-full bg-amber-400/20 px-2.5 py-0.5 text-xs font-semibold text-amber-400">
                      Most Popular
                    </span>
                  )}
                </div>
                <p className="mt-4 text-3xl font-extrabold">
                  ${plan.price}{" "}
                  <span className="text-sm font-normal text-neutral-400">
                    {plan.billingCycle}
                  </span>
                </p>
                <ul className="mt-5 space-y-2 text-sm text-neutral-300">
                  {plan.features.map((feat) => (
                    <li key={feat}>• {feat}</li>
                  ))}
                </ul>
                <Link
                  to={`/register?plan=${plan.id}`}
                  className="mt-6 block rounded-lg bg-amber-400 py-2.5 text-center text-sm font-semibold text-neutral-950 hover:bg-amber-300"
                >
                  Select {plan.buttonText}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Class Preview & Quick Enquiry */}
      <section className="mx-auto grid max-w-7xl gap-10 px-4 py-16 lg:grid-cols-2">
        <div>
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">Upcoming Classes</h2>
            <Link
              to="/classes"
              className="text-sm font-medium text-amber-400 hover:underline"
            >
              Full Timetable →
            </Link>
          </div>
          <div className="mt-5 space-y-3">
            {CLASSES_LIST.map((cls) => (
              <div
                key={cls.id}
                className="flex items-center justify-between rounded-xl border border-neutral-800 bg-neutral-900 p-4"
              >
                <div>
                  <p className="font-semibold">{cls.title}</p>
                  <p className="text-xs text-neutral-400">
                    {cls.dayTime} · Coach {cls.trainer} ({cls.level})
                  </p>
                </div>
                <span className="text-xs font-medium text-neutral-300">
                  {cls.spotsLeft > 0
                    ? `${cls.spotsLeft} spots left`
                    : "Waitlist"}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-neutral-800 bg-neutral-900 p-6">
          <h2 className="text-xl font-bold">Visit or Ask a Question</h2>
          <p className="mt-1 text-sm text-neutral-400">
            120 Fitness Avenue · Open Mon–Sun, 05:30 AM – 10:00 PM
          </p>

          {enquirySent ? (
            <div className="mt-4 rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-4 text-sm text-emerald-300">
              Enquiry received. Our front-desk staff will respond within one
              business day.
            </div>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setEnquirySent(true);
              }}
              className="mt-4 space-y-3 text-sm"
            >
              <input
                type="text"
                required
                placeholder="Your Name"
                aria-label="Your Name"
                className="w-full rounded-lg border border-neutral-700 bg-neutral-950 px-3 py-2 text-white"
              />
              <input
                type="email"
                required
                placeholder="Email or Phone"
                aria-label="Email or Phone"
                className="w-full rounded-lg border border-neutral-700 bg-neutral-950 px-3 py-2 text-white"
              />
              <textarea
                rows={3}
                required
                placeholder="How can we help you?"
                aria-label="Message"
                className="w-full rounded-lg border border-neutral-700 bg-neutral-950 px-3 py-2 text-white"
              />
              <button
                type="submit"
                className="rounded-lg bg-amber-400 px-5 py-2.5 font-semibold text-neutral-950 hover:bg-amber-300"
              >
                Send Enquiry
              </button>
            </form>
          )}
        </div>
      </section>
    </div>
  );
};

export default HomePage;
