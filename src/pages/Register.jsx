import React, { useContext, useState } from "react";
import { useAuth } from "../hooks/useAuth";

// Fonts (Syne + DM Sans) and animations used by the classes below
const pageStyles = `
  @import url("https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600&family=Syne:wght@600;700;800&display=swap");
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

// Look of each strength level (1 = weak, 2 = medium, 3 = strong)
const strengthStyles = {
  1: {
    label: "Weak",
    bar: "bg-[#ff5a4f] shadow-[0_0_12px_rgba(255,90,79,0.7)]",
    text: "text-[#ff5a4f]",
  },
  2: {
    label: "Medium",
    bar: "bg-[#ffb020] shadow-[0_0_12px_rgba(255,176,32,0.7)]",
    text: "text-[#ffb020]",
  },
  3: {
    label: "Strong",
    bar: "bg-[#c8f400] shadow-[0_0_12px_rgba(200,244,0,0.8)]",
    text: "text-[#c8f400]",
  },
};

const RegisterPage = () => {
  // Live value of the password input (used for the strength line and for confirm check)

  const {
    navigate,
    register,
    handleSubmit,
    watch,
    errors,
    registerFormSubmit,
  } = useAuth();
  const password = watch("password") || "";

  // Show / hide password (one for each password field)
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  // Strength: one point for each rule the password satisfies
  //   - 8 or more characters
  //   - lowercase and uppercase letters
  //   - a number
  //   - a symbol
  // 3 or 4 points = Strong (3), 2 points = Medium (2), otherwise Weak (1), empty = 0
  const points = [
    password.length >= 8,
    /[a-z]/.test(password) && /[A-Z]/.test(password),
    /\d/.test(password),
    /[^A-Za-z0-9]/.test(password),
  ].filter(Boolean).length;
  const level = !password ? 0 : points >= 3 ? 3 : points === 2 ? 2 : 1;
  const strength = strengthStyles[level];

  const eyeOff = (
    <svg {...icon}>
      <path d="M9.9 5.2A10 10 0 0 1 12 5c6.4 0 10 7 10 7a17 17 0 0 1-3.2 4.1" />
      <path d="M6.6 6.6A17 17 0 0 0 2 12s3.6 7 10 7a9.7 9.7 0 0 0 4.4-1" />
      <path d="M9.9 9.9a3 3 0 0 0 4.2 4.2" />
      <path d="m3 3 18 18" />
    </svg>
  );
  const eyeOn = (
    <svg {...icon}>
      <path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12Z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
  const lockIcon = (
    <svg {...icon}>
      <rect x="4" y="11" width="16" height="10" rx="2" />
      <path d="M8 11V7a4 4 0 0 1 8 0v4" />
    </svg>
  );

  return (
    <div className="relative flex min-h-[100dvh] flex-col items-center justify-center overflow-hidden bg-[#070707] px-4 py-8 font-['DM_Sans'] text-white antialiased sm:px-6">
      <style>{pageStyles}</style>

      {/* Background: moving glows + faint grid */}
      <div className="pointer-events-none absolute -left-40 top-[10%] h-[420px] w-[420px] animate-[drift_14s_ease-in-out_infinite] rounded-full bg-[#c8f400]/20 blur-[130px]" />
      <div className="pointer-events-none absolute -right-32 bottom-[5%] h-[380px] w-[380px] animate-[drift_18s_ease-in-out_infinite_reverse] rounded-full bg-[#19d38a]/20 blur-[130px]" />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.14]"
        style={{
          backgroundImage:
            "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
          backgroundSize: "56px 56px",
          maskImage:
            "radial-gradient(ellipse at 50% 45%, #000 0%, transparent 70%)",
          WebkitMaskImage:
            "radial-gradient(ellipse at 50% 45%, #000 0%, transparent 70%)",
        }}
      />

      {/* Logo */}
      <div className="relative mb-5 flex items-center gap-2.5 font-['Syne'] text-xl font-bold">
        <div className="grid h-10 w-10 place-items-center rounded-xl  from-[#d9ff2e] to-[#a6d400] text-[#0b0b0b] ">
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

      {/* Gradient border wrapper */}
      <div className="relative w-full max-w-[440px] animate-[rise_0.8s_ease-out_both] rounded-3xl bg-gradient-to-b from-[#c8f400]/45 via-white/10 to-white/[0.03] p-px shadow-[0_30px_80px_rgba(0,0,0,0.7)]">
        {/* noValidate: lets react-hook-form show the errors instead of the browser's popups */}
        <form
          noValidate
          className="rounded-[23px] bg-[#0f0f0f]/95 p-6 backdrop-blur-2xl sm:p-8"
          onSubmit={handleSubmit(registerFormSubmit)}
        >
          {/* Heading */}
          <h2 className="font-['Syne'] text-2xl font-bold leading-tight tracking-[-0.02em]">
            Create account
          </h2>
          <p className="mb-5 mt-1 text-sm text-[#8a8a8a]">
            Join SkyMart and start shopping
          </p>

          <div className="space-y-3">
            {/* Full name */}
            <div>
              <div className="group relative">
                <span className={leftIconClass}>
                  <svg {...icon}>
                    <circle cx="12" cy="8" r="4" />
                    <path d="M4 21a8 8 0 0 1 16 0" />
                  </svg>
                </span>
                <input
                  type="text"
                  placeholder=" "
                  className={inputClass}
                  {...register("name", { required: "Name is required" })}
                />
                <label className={labelClass}>Full name</label>
              </div>
              {errors.name && (
                <p className={errorClass}>{errors.name.message}</p>
              )}
            </div>

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
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^\S+@\S+\.\S+$/,
                      message: "Enter a valid email",
                    },
                  })}
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
                <span className={leftIconClass}>{lockIcon}</span>
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder=" "
                  className={inputClass}
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 8,
                      message: "Minimum 8 characters required",
                    },
                  })}
                />
                <label className={labelClass}>Password (min 8 chars)</label>

                {/* Eye button: click to show, click again to hide */}
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  className={eyeButtonClass}
                >
                  {showPassword ? eyeOff : eyeOn}
                </button>
              </div>
              {errors.password && (
                <p className={errorClass}>{errors.password.message}</p>
              )}
            </div>

            {/* Password strength line: only exists while the password is not empty */}
            {level > 0 && (
              <div className="flex items-center gap-3 px-1">
                <div className="flex flex-1 gap-2">
                  {[1, 2, 3].map((bar) => (
                    <span
                      key={bar}
                      className={`h-1.5 flex-1 rounded-full transition-all duration-300 ${
                        level >= bar ? strength.bar : "bg-white/10"
                      }`}
                    />
                  ))}
                </div>
                <span
                  className={`min-w-[54px] text-right text-xs font-semibold ${strength.text}`}
                >
                  {strength.label}
                </span>
              </div>
            )}

            {/* Confirm password */}
            <div>
              <div className="group relative">
                <span className={leftIconClass}>{lockIcon}</span>
                <input
                  type={showConfirm ? "text" : "password"}
                  placeholder=" "
                  className={inputClass}
                  {...register("confirmPassword", {
                    required: "Please confirm your password",
                    validate: (value) =>
                      value === password || "Passwords do not match",
                  })}
                />
                <label className={labelClass}>Confirm password</label>

                {/* Eye button: click to show, click again to hide */}
                <button
                  type="button"
                  onClick={() => setShowConfirm(!showConfirm)}
                  aria-label={showConfirm ? "Hide password" : "Show password"}
                  className={eyeButtonClass}
                >
                  {showConfirm ? eyeOff : eyeOn}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className={errorClass}>{errors.confirmPassword.message}</p>
              )}
            </div>
          </div>

          {/* Create account button */}
          <button type="submit" className={submitButtonClass}>
            <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/50 to-transparent transition-transform duration-700 group-hover/btn:translate-x-full" />
            <span className="relative">Create Account</span>
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

          {/* Login link */}
          <p className="mt-5 text-center text-sm text-[#8a8a8a]">
            Already have an account?{" "}
            <button
              type="button"
              onClick={() => navigate("/")}
              className="cursor-pointer font-semibold text-[#c8f400] underline-offset-4 transition hover:underline"
            >
              Sign in
            </button>
          </p>
        </form>
      </div>

      {/* Perks (hidden on short screens so the page stays compact) */}
      <div className="relative mt-5 flex flex-wrap justify-center gap-x-6 gap-y-2 text-xs text-[#8a8a8a] sm:text-sm [@media(max-height:760px)]:hidden">
        {["Free delivery", "Easy returns", "Secure checkout"].map((perk) => (
          <span key={perk} className="flex items-center gap-2">
            <span className="grid h-5 w-5 place-items-center rounded-full bg-[#c8f400]/15 text-[#c8f400]">
              <svg {...icon} width="14" height="14" strokeWidth="2.8">
                <path d="m5 12.5 4.5 4.5L19 7.5" />
              </svg>
            </span>
            {perk}
          </span>
        ))}
      </div>
    </div>
  );
};

export default RegisterPage;
