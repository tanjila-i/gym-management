import React, { useEffect, useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { userAuthStore } from "../store/authStore";

const DashboardLayout = ({
  title,
  children,
  navItems = [],
  activeTab,
  onSelectTab,
}) => {
  const { user, checkAuth, logout } = userAuthStore();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleSignOut = () => {
    logout();
    navigate("/");
  };

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  return (
    <div className="min-h-screen h-full flex bg-neutral-950 text-white">
      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-64 h-full overflow-y-auto flex flex-col border-r border-neutral-800 bg-neutral-900 p-5 transition-transform lg:static lg:h-auto lg:translate-x-0 ${
          mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between">
          <Link to="/" className="text-lg font-bold tracking-tight">
            MY<span className="text-amber-400">WORKOUT</span>
          </Link>
          <button
            type="button"
            onClick={() => setMobileMenuOpen(false)}
            className="text-neutral-400 lg:hidden"
            aria-label="Close menu"
          >
            ✕
          </button>
        </div>

        <div className="mt-5 rounded-xl border border-neutral-800 bg-neutral-950 p-3 text-xs">
          <p className="font-semibold text-white">{user?.fullName}</p>
          <p className="mt-0.5 capitalize text-amber-400">{user?.role}</p>
        </div>

        <nav aria-label="Dashboard Navigation" className="mt-6 space-y-1">
          {navItems.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => {
                onSelectTab(item.id);
                setMobileMenuOpen(false);
              }}
              className={`w-full rounded-lg px-3.5 py-2.5 text-left text-sm font-medium transition ${
                activeTab === item.id
                  ? "bg-amber-400 text-neutral-950"
                  : "text-neutral-300 hover:bg-neutral-800 hover:text-white"
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>

        <div className="mt-8 border-t border-neutral-800 pt-4 space-y-2 text-sm">
          <Link
            to="/"
            className="block rounded-lg px-3.5 py-2 text-neutral-400 hover:text-white"
          >
            ← Public Website
          </Link>
          <button
            type="button"
            onClick={handleSignOut}
            className="w-full rounded-lg px-3.5 py-2 text-left text-red-400 hover:bg-red-500/10"
          >
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Workspace */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="flex items-center justify-between border-b border-neutral-800 bg-neutral-900/60 px-6 py-4">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              className="rounded-lg border border-neutral-700 px-2.5 py-1.5 text-sm lg:hidden"
              aria-label="Open menu"
            >
              ☰
            </button>
            <h1 className="text-lg font-bold sm:text-xl">{title}</h1>
          </div>
          <span className="text-xs text-neutral-400">{user?.email}</span>
        </header>

        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
};

export default DashboardLayout;
