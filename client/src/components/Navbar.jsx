import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { userAuthStore } from "../store/authStore";

const Navbar = ({ onOpenTrial }) => {
  const dashboardPathByRole = {
    member: "/dashboard/member",
    trainer: "/dashboard/trainer",
    receptionist: "/dashboard/reception",
    admin: "/dashboard/admin",
  };
  const { logout, user, checkAuth } = userAuthStore();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Gallery", path: "/gallery" },
    { name: "Plans", path: "/post-memberShip" },
    { name: "Classes", path: "/classes" },
    { name: "About", path: "/about" },
    // { name: "Contact Us", path: "/contact-us" },
  ];

  const closeMenu = () => setIsMobileMenuOpen(false);

  return (
    <header className="sticky top-0 z-30 border-b border-neutral-800 bg-neutral-950/95 text-white backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:py-6">
        {/* Logo */}
        <Link
          to="/"
          onClick={closeMenu}
          className="text-xl sm:text-2xl font-bold tracking-tight text-white"
        >
          MY<span className="text-amber-400">WORKOUT</span>
        </Link>

        {/* Desktop Navigation */}
        <nav
          aria-label="Primary Navigation"
          className="hidden lg:flex items-center gap-6 text-sm text-neutral-300"
        >
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className="hover:text-white text-lg transition-colors"
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Desktop Actions & Mobile Hamburger Button */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Desktop Action Buttons */}
          <div className="hidden sm:flex items-center gap-3">
            <button
              type="button"
              onClick={onOpenTrial}
              className="rounded-lg border border-neutral-700 px-3.5 py-2 text-sm font-medium text-neutral-200 hover:border-neutral-500 transition-colors"
            >
              Book a Trial
            </button>

            {user ? (
              <>
                <Link
                  to={dashboardPathByRole[user.role] || "/"}
                  className="rounded-lg bg-amber-400 px-3.5 py-2 text-sm font-semibold text-neutral-950 hover:bg-amber-300 transition-colors"
                >
                  Dashboard
                </Link>
                <button
                  type="button"
                  onClick={logout}
                  className="rounded-lg px-3 py-2 text-sm text-neutral-400 hover:text-white transition-colors"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <Link
                to="/login"
                className="rounded-lg bg-amber-400 px-3.5 py-2 text-sm font-semibold text-neutral-950 hover:bg-amber-300 transition-colors"
              >
                Join / Sign In
              </Link>
            )}
          </div>

          {/* Mobile Menu Toggle Button */}
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-expanded={isMobileMenuOpen}
            aria-label="Toggle navigation menu"
            className="inline-flex items-center justify-center rounded-lg p-2 text-neutral-400 hover:bg-neutral-800 hover:text-white lg:hidden"
          >
            {isMobileMenuOpen ? (
              /* Close (X) Icon */
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              /* Hamburger Icon */
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {isMobileMenuOpen && (
        <div className="border-t border-neutral-800 bg-neutral-950 px-4 pt-4 pb-6 lg:hidden">
          <nav className="flex flex-col space-y-3 text-left">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={closeMenu}
                className="rounded-lg px-3 py-2 text-base font-medium text-neutral-300 hover:bg-neutral-900 hover:text-white"
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Mobile Action Buttons */}
          <div className="mt-6 flex flex-col gap-3 border-t border-neutral-800 pt-4 sm:hidden">
            <button
              type="button"
              onClick={closeMenu}
              className="w-full rounded-lg border border-neutral-700 px-3.5 py-2.5 text-center text-sm font-medium text-neutral-200 hover:border-neutral-500"
            >
              Book a Trial
            </button>

            {user ? (
              <>
                <Link
                  to="/dashboard"
                  onClick={closeMenu}
                  className="w-full rounded-lg bg-amber-400 px-3.5 py-2.5 text-center text-sm font-semibold text-neutral-950 hover:bg-amber-300"
                >
                  Dashboard
                </Link>
                <button
                  type="button"
                  onClick={() => {
                    logout();
                    closeMenu();
                  }}
                  className="w-full rounded-lg border border-neutral-800 px-3.5 py-2.5 text-center text-sm text-neutral-400 hover:text-white"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <Link
                to="/login"
                onClick={closeMenu}
                className="w-full rounded-lg bg-amber-400 px-3.5 py-2.5 text-center text-sm font-semibold text-neutral-950 hover:bg-amber-300"
              >
                Join / Sign In
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
