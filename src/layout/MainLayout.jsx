import React from "react";
import Navbar from "../components/Navbar";
import { Outlet } from "react-router";

const MainLayout = () => {
  return (
    <div className="flex min-h-screen flex-col bg-[#0c0c0c] text-white">
      {/* Fixed Navbar */}
      <header className="fixed inset-x-0 top-0 z-50  bg-[#0c0c0c]/70 backdrop-blur-md opacity-90">
        <Navbar />
      </header>

      {/* Main Content (pt-20 = navbar height, so content doesn't hide under it) */}
      <main className="flex-1 pt-20">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="mt-auto border-t border-white/70 bg-[#0c0c0c] px-5 py-6">
        <div className="mx-auto flex flex-col items-center justify-center text-center">
          <h2 className="text-xl font-medium tracking-tight text-[#c8f400]">
            SkyMart
          </h2>

          <p className="mt-2 text-xs text-gray-500 sm:text-sm">
            © {new Date().getFullYear()} SkyMart • Built with React + Tailwind
          </p>
        </div>
      </footer>
    </div>
  );
};

export default MainLayout;