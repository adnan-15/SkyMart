import React, { useContext, useState } from "react";
import { useAuth } from "../hooks/useAuth";

// Fonts (Syne + DM Sans) and animations used by the classes below
const pageStyles = `
  @import url("https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600&family=Syne:wght@600;700;800&display=swap");
  @keyframes float { 0%,100% { transform: translateY(0) } 50% { transform: translateY(-14px) } }
  @keyframes drift { 0%,100% { transform: translate(0,0) scale(1) } 50% { transform: translate(50px,-40px) scale(1.18) } }
  @keyframes rise  { from { opacity: 0; transform: translateY(20px) } to { opacity: 1; transform: none } }
  @media (prefers-reduced-motion: reduce) { * { animation: none !important; transition: none !important } }
`;

// Props shared by every icon
const icon = {
  width: 18,
  height: 18,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round",
  strokeLinejoin: "round",
};

// Shared Tailwind classes
const inputClass =
  "peer h-12 w-full rounded-xl border border-white/10 bg-white/[0.04] pb-0 pl-11 pr-11 pt-5 text-sm text-white outline-none transition duration-300 hover:border-white/20 focus:border-[#c8f400]/70 focus:bg-white/[0.07] focus:shadow-[0_0_0_3px_rgba(200,244,0,0.12)]";
const labelClass =
  "pointer-events-none absolute left-11 top-1/2 -translate-y-1/2 text-sm text-[#7a7a7a] transition-all duration-200 peer-focus:top-[32%] peer-focus:text-[11px] peer-focus:text-[#c8f400] peer-[:not(:placeholder-shown)]:top-[32%] peer-[:not(:placeholder-shown)]:text-[11px]";
const leftIconClass =
  "pointer-events-none absolute left-4 top-1/2 z-10 -translate-y-1/2 text-[#6f6f6f] transition-colors duration-300 group-focus-within:text-[#c8f400]";
const eyeButtonClass =
  "absolute right-2 top-1/2 z-10 grid h-8 w-8 -translate-y-1/2 place-items-center rounded-lg text-[#7a7a7a] transition hover:bg-white/10 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#c8f400]";
const submitButtonClass =
  "group/btn relative mt-5 flex h-12 w-full items-center justify-center gap-2 overflow-hidden rounded-xl bg-gradient-to-r from-[#d4ff1f] to-[#b6e600] font-['Syne'] text-base font-bold text-[#0b0b0b] shadow-[0_8px_26px_rgba(200,244,0,0.22)] transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_12px_34px_rgba(200,244,0,0.35)] active:translate-y-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white";
const errorClass = "px-1 pt-1 text-xs text-red-400";

const LoginPage = () => {
  // Show / hide password
  const [showPassword, setShowPassword] = useState(false);

  const { navigate, register, handleSubmit, errors, loginFormSubmit } =
    useAuth();

  return (
    <div className="grid min-h-[100dvh] grid-cols-1 overflow-x-hidden bg-[#070707] font-['DM_Sans'] text-white antialiased lg:h-[100dvh] lg:grid-cols-[1.05fr_1fr] lg:grid-rows-1 lg:overflow-hidden">
      <style>{pageStyles}</style>

      {/* ================= LEFT: HERO ================= */}
      <section className="relative hidden flex-col justify-between overflow-hidden p-10 lg:flex xl:p-12">
        {/* Moving colour glows */}
        <div className="pointer-events-none absolute -left-32 top-1/4 h-[420px] w-[420px] animate-[drift_14s_ease-in-out_infinite] rounded-full bg-[#c8f400]/25 blur-[120px]" />
        <div className="pointer-events-none absolute -bottom-24 right-0 h-[340px] w-[340px] animate-[drift_18s_ease-in-out_infinite_reverse] rounded-full bg-[#19d38a]/20 blur-[120px]" />

        {/* Faint grid */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.18]"
          style={{
            backgroundImage:
              "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
            backgroundSize: "56px 56px",
            maskImage:
              "radial-gradient(ellipse at 30% 55%, #000 0%, transparent 70%)",
            WebkitMaskImage:
              "radial-gradient(ellipse at 30% 55%, #000 0%, transparent 70%)",
          }}
        />

        {/* Logo */}

        <div className="relative flex items-center gap-2.5 font-['Syne'] text-xl font-bold">
          <div className="grid h-10 w-10 shrink-0 place-items-center overflow-hidden rounded-xl  ">
            <img
              src="/favicon.png"
              alt="SkyMart Logo"
              className="h-full w-full object-contain"
            />
          </div>

          <div>
            Sky<span className="text-[#c8f400]">Mart</span>
          </div>
        </div>

        {/* Floating product card (only on big, tall screens) */}
        <div className="absolute right-10 top-[9%] hidden w-[190px] animate-[float_7s_ease-in-out_infinite] rounded-2xl border border-white/10 bg-white/[0.05] p-3 shadow-[0_24px_60px_rgba(0,0,0,0.5)] backdrop-blur-xl [@media(min-width:1536px)_and_(min-height:820px)]:block">
          <div className="grid h-24 place-items-center rounded-xl bg-gradient-to-br from-[#d9ff2e] via-[#5fe39a] to-[#0d3b2c] text-[#0b0b0b]">
            <svg width="34" height="34" viewBox="0 0 24 24" fill="currentColor">
              <path d="M13.5 2 5 13.5h6L10 22l9-12h-6.2L13.5 2Z" />
            </svg>
          </div>
          <div className="mt-2.5 px-1 pb-1">
            <div className="font-['Syne'] text-sm font-semibold">
              Aero Buds Pro
            </div>
            <div className="mt-1 flex items-center justify-between text-sm">
              <span className="text-[#9a9a9a]">★ 4.9</span>
              <span className="font-semibold text-[#c8f400]">$129</span>
            </div>
          </div>
        </div>

        {/* Floating delivery card (only on big, tall screens) */}
        <div className="absolute right-10 top-[64%] hidden w-[220px] animate-[float_8s_ease-in-out_infinite] items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.05] p-3 shadow-[0_24px_60px_rgba(0,0,0,0.5)] backdrop-blur-xl [animation-delay:1.5s] [@media(min-width:1536px)_and_(min-height:820px)]:flex">
          <div className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[#c8f400] text-[#0b0b0b]">
            <svg {...icon} width="16" height="16" strokeWidth="2.6">
              <path d="m5 12.5 4.5 4.5L19 7.5" />
            </svg>
          </div>
          <div>
            <div className="text-sm font-semibold">Order delivered</div>
            <div className="text-xs text-[#8a8a8a]">Arrived in 12 minutes</div>
          </div>
        </div>

        {/* Headline */}
        <div className="relative py-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#c8f400]/30 bg-[#c8f400]/10 px-3.5 py-1 text-xs font-medium text-[#c8f400]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#c8f400] shadow-[0_0_10px_#c8f400]" />
            Welcome back
          </div>

          <h1 className="my-4 font-['Syne'] text-4xl font-extrabold leading-[1.05] tracking-[-0.03em] xl:text-5xl">
            Shop the future.
            <span className="block bg-gradient-to-r from-[#c8f400] via-[#a8ee3a] to-[#4de8a0] bg-clip-text text-transparent">
              Today.
            </span>
          </h1>

          <p className="max-w-[420px] text-base leading-7 text-[#9a9a9a] [@media(max-height:640px)]:hidden">
            Thousands of products, lightning-fast delivery, and prices that make
            your wallet happy.
          </p>
        </div>

        {/* Stats */}
        <div className="relative grid grid-cols-3 divide-x divide-white/10 rounded-2xl border border-white/10 bg-white/[0.03] py-4 backdrop-blur-md">
          <div className="text-center">
            <b className="block font-['Syne'] text-xl font-bold">20K+</b>
            <small className="text-xs text-[#8a8a8a]">Products</small>
          </div>
          <div className="text-center">
            <b className="block font-['Syne'] text-xl font-bold">50K+</b>
            <small className="text-xs text-[#8a8a8a]">Users</small>
          </div>
          <div className="text-center">
            <b className="block font-['Syne'] text-xl font-bold">4.9★</b>
            <small className="text-xs text-[#8a8a8a]">Rating</small>
          </div>
        </div>
      </section>

      {/* ================= RIGHT: FORM ================= */}
      <section className="relative grid place-items-center overflow-hidden px-4 py-8 sm:px-6 lg:h-full lg:overflow-y-auto">
        {/* Soft glow behind the card */}
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-[420px] w-[420px] max-w-full -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#c8f400]/[0.07] blur-[110px]" />

        {/* Gradient border wrapper */}
        <div className="relative w-full max-w-[440px] animate-[rise_0.8s_ease-out_both] rounded-3xl bg-gradient-to-b from-[#c8f400]/45 via-white/10 to-white/[0.03] p-px shadow-[0_30px_80px_rgba(0,0,0,0.7)]">
          {/* noValidate: lets react-hook-form show the errors instead of the browser's popups */}
          <form
            noValidate
            className="rounded-[23px] bg-[#0f0f0f]/95 p-6 backdrop-blur-2xl sm:p-8"
            onSubmit={handleSubmit(loginFormSubmit)}
          >
            {/* Logo (small screens only, because the hero is hidden there) */}
            <div className="mb-5 flex items-center gap-2.5 font-['Syne'] text-lg font-bold lg:hidden">
              <div className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-[#d9ff2e] to-[#a6d400] text-[#0b0b0b]">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M13.5 2 5 13.5h6L10 22l9-12h-6.2L13.5 2Z" />
                </svg>
              </div>
              <div>
                Sky<span className="text-[#c8f400]">Mart</span>
              </div>
            </div>

            <h2 className="font-['Syne'] text-2xl font-bold leading-tight tracking-[-0.02em]">
              Sign in
            </h2>
            <p className="mb-6 mt-1 text-sm text-[#8a8a8a]">
              Enter your credentials to continue
            </p>

            <div className="space-y-3">
              {/* Email */}
              <div>
                <div className="group relative">
                  <span className={leftIconClass}>
                    <svg {...icon}>
                      <rect x="3" y="5" width="18" height="14" rx="2" />
                      <path d="m3 7 9 6 9-6" />
                    </svg>
                  </span>
                  <input
                    type="email"
                    placeholder=" "
                    className={inputClass}
                    {...register("email", { required: "Email is required" })}
                  />
                  <label className={labelClass}>Email address</label>
                </div>
                {errors.email && (
                  <p className={errorClass}>{errors.email.message}</p>
                )}
              </div>

              {/* Password */}
              <div>
                <div className="group relative">
                  <span className={leftIconClass}>
                    <svg {...icon}>
                      <rect x="4" y="11" width="16" height="10" rx="2" />
                      <path d="M8 11V7a4 4 0 0 1 8 0v4" />
                    </svg>
                  </span>
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder=" "
                    className={inputClass}
                    {...register("password", {
                      required: "Password is required",
                    })}
                  />
                  <label className={labelClass}>Password</label>

                  {/* Eye button: click to show, click again to hide */}
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                    className={eyeButtonClass}
                  >
                    {showPassword ? (
                      <svg {...icon}>
                        <path d="M9.9 5.2A10 10 0 0 1 12 5c6.4 0 10 7 10 7a17 17 0 0 1-3.2 4.1" />
                        <path d="M6.6 6.6A17 17 0 0 0 2 12s3.6 7 10 7a9.7 9.7 0 0 0 4.4-1" />
                        <path d="M9.9 9.9a3 3 0 0 0 4.2 4.2" />
                        <path d="m3 3 18 18" />
                      </svg>
                    ) : (
                      <svg {...icon}>
                        <path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12Z" />
                        <circle cx="12" cy="12" r="3" />
                      </svg>
                    )}
                  </button>
                </div>
                {errors.password && (
                  <p className={errorClass}>{errors.password.message}</p>
                )}
              </div>
            </div>

            {/* Sign in button */}
            <button type="submit" className={submitButtonClass}>
              <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/50 to-transparent transition-transform duration-700 group-hover/btn:translate-x-full" />
              <span className="relative">Sign in</span>
              <svg
                {...icon}
                width="18"
                height="18"
                strokeWidth="2.2"
                className="relative transition-transform duration-300 group-hover/btn:translate-x-1"
              >
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </button>

            {/* Register link */}
            <p className="mt-5 text-center text-sm text-[#8a8a8a]">
              Don&apos;t have an account?{" "}
              <button
                type="button"
                onClick={() => navigate("register")}
                className="cursor-pointer font-semibold text-[#c8f400] underline-offset-4 transition hover:underline"
              >
                Create one
              </button>
            </p>
          </form>
        </div>
      </section>
    </div>
  );
};

export default LoginPage;
