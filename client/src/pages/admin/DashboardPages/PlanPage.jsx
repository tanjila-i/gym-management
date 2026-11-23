import React, { useState } from "react";
import CreateMemberShip from "../../../components/DashboardPageLayout/CreateMemberShip";
import TableMemberShip from "../../../components/DashboardPageLayout/TableMemberShip";

const PlanPage = ({ onOpenTrial }) => {
  // 1. Start with the modal closed
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
    // Optional: keep calling onOpenTrial if a parent component also needs to know
    if (onOpenTrial) onOpenTrial();
  };

  return (
    <div>
      {/* 2. Trigger the state change on click */}
      {/* <button
        type="button"
        onClick={handleOpenModal}
        className="rounded-lg border border-neutral-700 px-3.5 py-2 text-sm font-medium text-neutral-200 hover:border-neutral-500 transition-colors"
      >
        Post MemberShip
      </button> */}

      {/* 3. Pass the state and close handler to your form/modal */}
      {/* <CreateMemberShip
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      /> */}

      <TableMemberShip />
    </div>
  );
};

export default PlanPage;
