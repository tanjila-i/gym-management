import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useMemberShipPlanStore } from "../../store/MemberShipPlanStore";

const PostMemberShipPage = () => {
  const { plans, getSeedPlan, isLoading, error } = useMemberShipPlanStore();
  useEffect(() => {
    getSeedPlan();
  }, [getSeedPlan]);

  return (
    <div>
      {" "}
      <section className="border-y text-white border-neutral-800 bg-neutral-900/50 py-16">
        <div className="mx-auto max-w-7xl px-4">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold">Membership Plans</h2>
              <p className="mt-1 text-sm text-neutral-400">
                Transparent pricing with online or reception activation.
              </p>
            </div>
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
    </div>
  );
};

export default PostMemberShipPage;
