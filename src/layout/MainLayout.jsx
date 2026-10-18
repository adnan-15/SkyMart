import React from "react";
import Navbar from "../components/Navbar";
import { Outlet } from "react-router";
import Cart from "../components/Cart";
import { useContext } from "react";
import { Auth } from "../context/AuthContext";

const MainLayout = () => {
  let { cartOpen } = useContext(Auth);
  return (
    <div className="flex min-h-screen flex-col overflow-x-hidden bg-[#0c0c0c] text-white">
      {/* Fixed Navbar */}
      <div className="fixed inset-x-0 top-0 z-50">
        <Navbar />
      </div>

      {/* Main Content (pt-16 = navbar height, so content doesn't hide under it) */}
      <main className="flex-1 pt-16">
        <Outlet />
        {cartOpen && <Cart />}
      </main>

      {/* Footer */}
      <footer className="mt-auto border-t border-white/10 bg-[#0c0c0c] px-4 py-5 sm:px-6">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-1.5 text-center sm:flex-row sm:text-left">
          <h2 className="font-syne text-base font-bold tracking-tight text-[#c8f400]">
            SkyMart
          </h2>
          <p className="text-xs text-gray-500">
            © {new Date().getFullYear()} SkyMart • Built with React + Tailwind
          </p>
        </div>
      </footer>
    </div>
  );
};

export default MainLayout;
