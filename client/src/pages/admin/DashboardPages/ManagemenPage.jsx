import React, { useState } from "react";

const initialUsers = [
  {
    id: 1,
    name: "Ariful Islam",
    email: "ariful.islam@example.com",
    role: "Admin",
    status: "Active",
    avatar: "https://pravatar.cc",
  },
  {
    id: 2,
    name: "Nusrat Jahan",
    email: "nusrat.jahan@example.com",
    role: "Editor",
    status: "Active",
    avatar: "https://pravatar.cc",
  },
  {
    id: 3,
    name: "Tanvir Ahmed",
    email: "tanvir.ahmed@example.com",
    role: "Viewer",
    status: "Inactive",
    avatar: "https://pravatar.cc",
  },
  {
    id: 4,
    name: "Sadia Rahman",
    email: "sadia.rahman@example.com",
    role: "Editor",
    status: "Pending",
    avatar: "https://pravatar.cc",
  },
];

const ManagemenPage = () => {
  const [users, setUsers] = useState(initialUsers);
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("All");

  // Filter users by search term and role
  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === "All" || user.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  // Delete user handler
  const handleDelete = (id) => {
    setUsers(users.filter((user) => user.id !== id));
  };

  // Badge color helper
  const getStatusBadge = (status) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-700 border-green-200";
      case "Inactive":
        return "bg-red-100 text-red-700 border-red-200";
      default:
        return "bg-yellow-100 text-yellow-700 border-yellow-200";
    }
  };

  return (
    <div className="">
      <div className="w-full max-w-6xl mx-auto p-6">
        {/* Header & Controls */}
        <div className="sm:flex sm:items-center sm:justify-between mb-6">
          <div>
            <h1 className="text-xl font-semibold text-white">
              User Management
            </h1>
            <p className="text-sm text-gray-500">
              Manage team members, roles, and account statuses.
            </p>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto rounded-xl shadow-sm border border-neutral-800">
          <table className="min-w-full divide-y divide-neutral-800 text-left text-sm">
            <thead className="text-white font-medium text-center">
              <tr className="border-b border-gray-200 bg-gray-50 text-xs font-semibold uppercase tracking-wider text-gray-500">
                <th className="px-6 py-3.5">User</th>
                <th className="px-6 py-3.5">Role</th>
                <th className="px-6 py-3.5">Status</th>
                <th className="px-6 py-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 text-center text-white">
              {filteredUsers.length > 0 ? (
                filteredUsers.map((user) => (
                  <tr key={user.id} className="transition">
                    {/* User Info */}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={user.avatar}
                          alt={user.name}
                          className="h-10 w-10 rounded-full object-cover"
                        />
                        <div>
                          <div className="font-medium text-gray-900">
                            {user.name}
                          </div>
                          <div className="text-gray-500">{user.email}</div>
                        </div>
                      </div>
                    </td>

                    {/* Role */}
                    <td className="px-6 py-4 text-gray-700">{user.role}</td>

                    {/* Status Badge */}
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex rounded-full border px-2.5 py-0.5 text-xs font-medium ${getStatusBadge(
                          user.status,
                        )}`}
                      >
                        {user.status}
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => alert(`Edit ${user.name}`)}
                          className="rounded-md px-2.5 py-1.5 text-xs font-medium text-blue-600 transition hover:bg-blue-50"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(user.id)}
                          className="rounded-md px-2.5 py-1.5 text-xs font-medium text-red-600 transition hover:bg-red-50"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="4"
                    className="px-6 py-8 text-center text-gray-500"
                  >
                    No users found matching your filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ManagemenPage;
