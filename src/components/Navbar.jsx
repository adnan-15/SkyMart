import React, { useContext, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { Auth } from "../context/AuthContext";

// Fonts (Syne + DM Sans) and animation used by the classes below
const pageStyles = `
  @import url("https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600&family=Syne:wght@600;700;800&display=swap");
  @keyframes dropdown { from { opacity: 0; transform: translateY(-10px) scale(0.98) } to { opacity: 1; transform: none } }
  @media (prefers-reduced-motion: reduce) { * { animation: none !important; transition: none !important } }
`;

// Props shared by every icon
const icon = {
  width: 20,
  height: 20,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round",
  strokeLinejoin: "round",
};

// Pages shown in the navbar (change the paths to match your routes)
// iconPath is only used in the mobile menu
const links = [
  {
    label: "Home",
    path: "/main",
    iconPath: (
      <>
        <path d="m3 11 9-7.5L21 11" />
        <path d="M5 9.5V20h14V9.5" />
        <path d="M10 20v-5h4v5" />
      </>
    ),
  },
  {
    label: "Shop",
    path: "/main/products",
    iconPath: (
      <>
        <path d="M5 8h14l-1 12H6L5 8Z" />
        <path d="M9 8V6.5a3 3 0 0 1 6 0V8" />
      </>
    ),
  },
  {
    label: "About",
    path: "/main/about",
    iconPath: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 11v5" />
        <path d="M12 8h.01" />
      </>
    ),
  },
];

// Shared Tailwind classes
// Hover styles use [@media(hover:hover)] so they only apply on devices with a mouse.
// On touch screens, active: gives the "pressed" feedback instead.
const iconButtonClass =
  "grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-white/10 bg-white/[0.04] text-white transition duration-300 active:scale-95 [@media(hover:hover)]:hover:border-[#c8f400]/60 [@media(hover:hover)]:hover:bg-[#c8f400]/10 [@media(hover:hover)]:hover:text-[#c8f400] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#c8f400]";
const logoutButtonClass =
  "grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-white/10 bg-white/[0.04] text-white transition duration-300 active:scale-95 [@media(hover:hover)]:hover:border-red-400/50 [@media(hover:hover)]:hover:bg-red-400/10 [@media(hover:hover)]:hover:text-red-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-red-400";

const Navbar = () => {
  const { login, setLogin } = useContext(Auth);

  let navigate = useNavigate();
  let location = useLocation();

  // Mobile menu open / closed
  const [menuOpen, setMenuOpen] = useState(false);

  // User name and the first letter shown in the avatar
  const userName = login?.name || "Guest";
  const initial = userName.charAt(0).toUpperCase();

  // Is this link the current page? ("/main" must match exactly, the others also match inner pages)
  const isActive = (path) =>
    path === "/main"
      ? location.pathname === path
      : location.pathname.startsWith(path);

  // Go to a page and close the mobile menu
  const goTo = (path) => {
    navigate(path);
    setMenuOpen(false);
  };

  // Log the user out (edit this to match your own logic)
  const handleLogout = () => {
    setLogin(null);
    localStorage.removeItem("login");
    setMenuOpen(false);
    navigate("/");
  };

  return (
    <header className="sticky top-0 z-50 border-b border-white/5 bg-black font-['DM_Sans'] text-white">
      <style>{pageStyles}</style>

      {/* Thin lime glow along the bottom edge */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[#c8f400]/35 to-transparent" />

      <nav className="mx-auto flex h-[76px] max-w-[1540px] items-center justify-between px-5 sm:px-8 md:grid md:grid-cols-[1fr_auto_1fr]">
        {/* ============ LEFT: LOGO ============ */}
        <button
          type="button"
          onClick={() => goTo("/main")}
          aria-label="SkyMart home"
          className="group flex items-center gap-3 justify-self-start font-['Syne'] text-2xl font-bold"
        >
          <span className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-[#d9ff2e] to-[#a6d400] text-[#0b0b0b] shadow-[0_6px_24px_rgba(200,244,0,0.4)] transition duration-300 [@media(hover:hover)]:group-hover:-rotate-6 [@media(hover:hover)]:group-hover:scale-105">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M13.5 2 5 13.5h6L10 22l9-12h-6.2L13.5 2Z" />
            </svg>
          </span>
          <span>
            Sky<span className="text-[#c8f400]">Mart</span>
          </span>
        </button>

        {/* ============ CENTER: LINKS (desktop) ============ */}
        <ul className="hidden items-center gap-1 rounded-full border border-white/10 bg-white/[0.04] p-1 md:flex">
          {links.map((link) => (
            <li key={link.path}>
              <button
                type="button"
                onClick={() => goTo(link.path)}
                className={`relative rounded-full px-5 py-2 text-[15px] font-medium transition-all duration-300 ${
                  isActive(link.path)
                    ? "bg-[#c8f400]/10 text-[#c8f400] shadow-[inset_0_0_0_1px_rgba(200,244,0,0.28),0_0_22px_rgba(200,244,0,0.14)]"
                    : "text-[#a3a3a3] [@media(hover:hover)]:hover:bg-white/5 [@media(hover:hover)]:hover:text-white"
                }`}
              >
                {link.label}
              </button>
            </li>
          ))}
        </ul>

        {/* ============ RIGHT: USER, CART, LOGOUT ============ */}
        <div className="flex items-center gap-2.5 justify-self-end sm:gap-3">
          {/* User chip */}
          <div className="flex h-11 items-center gap-2.5 rounded-xl border border-white/10 bg-white/[0.04] p-1.5 sm:pr-4">
            <span className="relative grid h-8 w-8 place-items-center rounded-lg bg-gradient-to-br from-[#d9ff2e] to-[#a6d400] font-['Syne'] text-sm font-bold text-[#0b0b0b]">
              {initial}
              {/* small green "online" dot */}
              <span className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full border-2 border-black bg-[#19d38a]" />
            </span>
            <span className="hidden max-w-[140px] truncate text-[15px] font-medium sm:block">
              {userName}
            </span>
          </div>

          {/* Cart */}
          <button
            type="button"
            onClick={() => goTo("/cart")}
            aria-label="Open cart"
            className={iconButtonClass}
          >
            <svg {...icon}>
              <circle cx="9" cy="20" r="1.4" />
              <circle cx="18" cy="20" r="1.4" />
              <path d="M2 3h3l2.6 12.2a1.5 1.5 0 0 0 1.5 1.2h8.6a1.5 1.5 0 0 0 1.5-1.1L21 7H6" />
            </svg>
          </button>

          {/* Logout */}
          <button
            type="button"
            onClick={handleLogout}
            aria-label="Log out"
            className={logoutButtonClass}
          >
            <svg {...icon}>
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
              <path d="m16 17 5-5-5-5" />
              <path d="M21 12H9" />
            </svg>
          </button>

          {/* Hamburger (mobile only): no hover styles, only a pressed effect */}
          <button
            type="button"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            className={`grid h-11 w-11 shrink-0 place-items-center rounded-xl border transition duration-300 active:scale-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#c8f400] md:hidden ${
              menuOpen
                ? "border-[#c8f400]/60 bg-[#c8f400]/10 text-[#c8f400]"
                : "border-white/10 bg-white/[0.04] text-white"
            }`}
          >
            {/* Three lines that turn into an X when the menu is open */}
            <span className="flex flex-col gap-1.5">
              <span
                className={`block h-[2px] w-5 rounded-full bg-current transition duration-300 ${
                  menuOpen ? "translate-y-2 rotate-45" : ""
                }`}
              />
              <span
                className={`block h-[2px] w-5 rounded-full bg-current transition duration-300 ${
                  menuOpen ? "scale-x-0 opacity-0" : ""
                }`}
              />
              <span
                className={`block h-[2px] w-5 rounded-full bg-current transition duration-300 ${
                  menuOpen ? "-translate-y-2 -rotate-45" : ""
                }`}
              />
            </span>
          </button>
        </div>
      </nav>

      {/* ============ MOBILE MENU (no hover styles, pressed effect only) ============ */}
      {menuOpen && (
        <div className="animate-[dropdown_0.25s_ease-out_both] px-4 pb-4 md:hidden">
          <div className="rounded-2xl border border-white/10 bg-[#0d0d0d] p-2 shadow-[0_20px_50px_rgba(0,0,0,0.6)]">
            {/* User info (the navbar only shows the avatar on small phones) */}
            <div className="mb-1 flex items-center gap-3 rounded-xl bg-white/[0.04] px-4 py-3 sm:hidden">
              <span className="grid h-9 w-9 place-items-center rounded-lg bg-gradient-to-br from-[#d9ff2e] to-[#a6d400] font-['Syne'] text-sm font-bold text-[#0b0b0b]">
                {initial}
              </span>
              <div className="min-w-0">
                <div className="truncate text-[15px] font-medium">{userName}</div>
                <div className="text-xs text-[#8a8a8a]">Signed in</div>
              </div>
            </div>

            <ul>
              {links.map((link) => (
                <li key={link.path}>
                  <button
                    type="button"
                    onClick={() => goTo(link.path)}
                    className={`flex w-full items-center gap-3 rounded-xl px-4 py-3.5 text-left text-base font-medium transition duration-200 active:scale-[0.98] ${
                      isActive(link.path)
                        ? "bg-[#c8f400]/10 text-[#c8f400]"
                        : "text-[#a3a3a3] active:bg-white/10 active:text-white"
                    }`}
                  >
                    <svg {...icon} width="20" height="20">
                      {link.iconPath}
                    </svg>
                    <span className="flex-1">{link.label}</span>
                    {isActive(link.path) && (
                      <span className="h-1.5 w-1.5 rounded-full bg-[#c8f400] shadow-[0_0_10px_#c8f400]" />
                    )}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;