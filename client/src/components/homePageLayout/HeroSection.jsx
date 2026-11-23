import React from "react";
import { Link } from "react-router-dom";
import heroBg from "../../assets/gym.jpg";
// Optional: Import a local image from your assets folder

const HeroSection = ({ onOpenTrial }) => {
  return (
    <div>
      <section
        className="relative border-b border-neutral-800 bg-cover bg-center bg-no-repeat py-20"
        style={{
          // Use a URL or your imported variable (e.g., `url(${heroBg})`)
          backgroundImage: `url(${heroBg})`,
        }}
      >
        {/* Dark Overlay to keep text readable */}
        <div className="absolute inset-0 bg-neutral-950/75" />

        {/* Content (relative & z-10 puts it above the dark overlay) */}
        <div className="relative z-10 mx-auto max-w-7xl px-4">
          <span className="inline-block rounded-full border border-amber-400/30 bg-amber-400/10 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-amber-400">
            Modern Strength & Conditioning Club
          </span>

          <h1 className="mt-4 max-w-3xl text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
            Train with Structure, Expert Coaching, and Zero Guesswork.
          </h1>

          <p className="mt-4 max-w-2xl text-base text-neutral-300 sm:text-lg">
            Flexible memberships, small-group classes, certified trainers, and a
            personal member portal to track bookings and workouts.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              to="/classes"
              className="rounded-lg bg-amber-400 px-6 py-3 text-sm font-semibold text-neutral-950 hover:bg-amber-300"
            >
              Join Now
            </Link>

            <button
              type="button"
              onClick={onOpenTrial}
              className="rounded-lg border border-neutral-700 bg-neutral-950/50 px-6 py-3 text-sm font-semibold text-white backdrop-blur-xs hover:border-neutral-500"
            >
              Book a Trial
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HeroSection;
