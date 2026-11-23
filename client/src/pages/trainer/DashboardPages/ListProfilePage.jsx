import React, { useState } from "react";

const initialProfiles = [
  {
    id: 1,
    name: "Ayesha Rahman",
    role: "Product Designer",
    phone: "+0123456787,",
    department: "Design",
    email: "ayesha.rahman@example.com",
    status: "Active",
    avatar: "https://pravatar.cc",
  },
  {
    id: 2,
    name: "Tanvir Ahmed",
    phone: "+0123456787,",
    department: "Engineering",
    email: "tanvir.ahmed@example.com",
    status: "Active",
    avatar: "https://pravatar.cc",
  },
  {
    id: 3,
    name: "Nusrat Jahan",
    phone: "+0123456787",
    department: "Operations",
    email: "nusrat.jahan@example.com",
    status: "Offline",
    avatar: "https://pravatar.cc",
  },
  {
    id: 4,
    name: "rafiqul Islam",
    phone: "+0123456787",
    department: "Engineering",
    email: "rafiqul.islam@example.com",
    status: "Active",
    avatar: "https://pravatar.cc",
  },
];

const ListProfilePage = () => {
  return (
    <div className="w-full max-w-6xl mx-auto p-6">
      {/* Header Section */}
      <div className="sm:flex sm:items-center sm:justify-between mb-6">
        <div>
          <h2 className="text-xl font-semibold text-white">Profile Member</h2>
          <p className="mt-1 text-sm text-gray-500">
            A list of all Member Profile
          </p>
        </div>
      </div>

      {/* Table Container */}
      <div className="overflow-x-auto rounded-xl shadow-sm border border-neutral-800">
        <table className="min-w-full divide-y divide-neutral-800 text-left text-sm">
          <thead className="text-white font-medium text-center">
            <tr>
              <th scope="col" className="px-6 py-3.5">
                Name
              </th>
              <th scope="col" className="px-6 py-3.5">
                Number
              </th>

              <th scope="col" className="px-6 py-3.5">
                Email
              </th>
              <th scope="col" className="px-6 py-3.5 ">
                Delete
              </th>
            </tr>
          </thead>

          {/* 4. Map through plans */}
          <tbody className="divide-y divide-gray-200 text-center text-white">
            {initialProfiles.map((plan) => {
              const planId = plan._id || plan.id;
              return (
                <tr key={planId}>
                  <td className="px-6 py-4 font-medium">{plan.name}</td>
                  <td className="px-6 py-4">{plan.phone}</td>
                  <td className="px-6 py-4">${plan.email}</td>

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
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ListProfilePage;
