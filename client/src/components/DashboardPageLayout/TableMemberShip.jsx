import React, { useState, useEffect } from "react";
import CreateMemberShip from "./CreateMemberShip";
import { useMemberShipPlanStore } from "../../store/MemberShipPlanStore";
import toast from "react-hot-toast";

const TableMemberShip = ({ onOpenTrial }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // 1. Destructure store state and actions
  const { plans, getAllPlan, isLoading, error, deletePlan } =
    useMemberShipPlanStore();

  // 2. Fetch plans on mount
  useEffect(() => {
    getAllPlan();
  }, [getAllPlan]);

  // Fixed: Added await and kept consistent naming
  const handleDelete = async (id) => {
    if (!id) return;
    await deletePlan(id);
    toast.success("Deleted Successfully!");
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
    if (onOpenTrial) onOpenTrial();
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-6">
      {/* Header Section */}
      <div className="sm:flex sm:items-center sm:justify-between mb-6">
        <div>
          <h2 className="text-xl font-semibold text-white">Memberships</h2>
          <p className="mt-1 text-sm text-gray-500">
            A list of all active and past members including their plan tier and
            billing status.
          </p>
        </div>

        <div className="mt-4 sm:mt-0">
          <button
            type="button"
            onClick={handleOpenModal}
            className="rounded-lg border border-neutral-700 px-3.5 py-2 text-sm font-medium text-neutral-200 hover:border-neutral-500 transition-colors"
          >
            Post MemberShip
          </button>

          <CreateMemberShip
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
          />
        </div>
      </div>

      {/* 3. Loading and Error States */}
      {isLoading && <p className="text-neutral-300 mb-4">Loading plans...</p>}
      {error && <p className="text-red-500 mb-4">{error}</p>}

      {/* Table Container */}
      <div className="overflow-x-auto rounded-xl shadow-sm border border-neutral-800">
        <table className="min-w-full divide-y divide-neutral-800 text-left text-sm">
          <thead className="text-white font-medium text-center">
            <tr>
              <th scope="col" className="px-6 py-3.5">
                Title
              </th>
              <th scope="col" className="px-6 py-3.5">
                Slug
              </th>
              <th scope="col" className="px-6 py-3.5">
                Price
              </th>
              <th scope="col" className="px-6 py-3.5">
                Billing Cycle
              </th>
              <th scope="col" className="px-6 py-3.5 ">
                Delete
              </th>
            </tr>
          </thead>

          {/* 4. Map through plans */}
          <tbody className="divide-y divide-gray-200 text-center text-white">
            {plans?.length > 0
              ? plans.map((plan) => {
                  const planId = plan._id || plan.id;
                  return (
                    <tr key={planId}>
                      <td className="px-6 py-4 font-medium">{plan.name}</td>
                      <td className="px-6 py-4">{plan.slug}</td>
                      <td className="px-6 py-4">${plan.price}</td>
                      <td className="px-6 py-4">{plan.billingCycle}</td>

                      <td className="px-6 py-4 ">
                        {/* Fixed: Changed onSubmit to onClick and passed planId */}
                        <button
                          type="button"
                          className="text-red-600 hover:underline"
                          onClick={() => handleDelete(planId)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  );
                })
              : !isLoading && (
                  <tr>
                    <td
                      colSpan={6}
                      className="px-6 py-4 text-center text-gray-500"
                    >
                      No membership plans found.
                    </td>
                  </tr>
                )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TableMemberShip;
