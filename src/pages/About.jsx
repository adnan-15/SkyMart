import React from "react";
import { useNavigate } from "react-router";

const About = () => {
  const navigate = useNavigate();

  const stats = [
    { icon: "⬡", value: "20K+", label: "Products" },
    { icon: "♙", value: "50K+", label: "Happy Customers" },
    { icon: "☆", value: "4.9", label: "Avg. Rating" },
    { icon: "♧", value: "99%", label: "On-time Delivery" },
  ];

  const values = [
    {
      icon: "♧",
      title: "Trust",
      description:
        "Every product is verified for quality and authenticity before listing.",
    },
    {
      icon: "♧",
      title: "Speed",
      description:
        "We focus on delivery times so your orders arrive when promised.",
    },
    {
      icon: "♡",
      title: "Community",
      description:
        "Built around real customer feedback, not just business metrics.",
    },
    {
      icon: "☆",
      title: "Quality",
      description:
        "We curate the best products, with no filler and no unnecessary noise.",
    },
  ];

  const team = [
    { name: "Aryan Shah", role: "Founder & CEO", initial: "A", color: "bg-[#c8f400]" },
    { name: "Priya Mehta", role: "Head of Product", initial: "P", color: "bg-blue-500" },
    { name: "Rohan Verma", role: "Lead Engineer", initial: "R", color: "bg-purple-500" },
    { name: "Sneha Kapoor", role: "Design Director", initial: "S", color: "bg-rose-500" },
  ];

  const card =
    "rounded-2xl border border-white/10 bg-[#111111] transition duration-300 hover:-translate-y-0.5 hover:border-[#c8f400]/40";
  const sectionTitle = "font-syne text-lg font-bold tracking-tight sm:text-xl";

  return (
    <main className="font-dm-sans min-h-screen bg-[#0c0c0c] py-6 text-white sm:py-10">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Hero */}
        <section className="relative mb-8 overflow-hidden rounded-2xl border border-white/10 bg-[#111111] px-5 py-8 text-center sm:px-8 sm:py-12">
          <div
            className="pointer-events-none absolute inset-0 opacity-40"
            style={{
              backgroundImage:
                "linear-gradient(rgba(200,244,0,.06) 1px, transparent 1px), linear-gradient(90deg, rgba(200,244,0,.06) 1px, transparent 1px)",
              backgroundSize: "40px 40px",
            }}
          />

          <div className="relative">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#c8f400] text-black shadow-[0_0_30px_rgba(200,244,0,0.15)]">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                <path d="M13.5 2 5 13.5h6L10 22l9-12h-6.2L13.5 2Z" />
              </svg>
            </div>

            <h1 className="font-syne text-3xl font-extrabold tracking-tight sm:text-4xl">
              About <span className="text-[#c8f400]">SkyMart</span>
            </h1>

            <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-gray-400 sm:text-base sm:leading-7">
              SkyMart is a next-generation e-commerce platform built to make
              online shopping fast, fair, and enjoyable for everyone.
            </p>
          </div>
        </section>

        {/* Statistics */}
        <section className="mb-8 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className={`${card} group flex min-h-[104px] flex-col items-center justify-center p-4 text-center`}
            >
              <span className="mb-2 text-xl text-[#c8f400] transition-transform duration-300 group-hover:scale-110">
                {stat.icon}
              </span>
              <h2 className="font-syne text-xl font-extrabold sm:text-2xl">
                {stat.value}
              </h2>
              <p className="mt-1 text-xs text-gray-500">{stat.label}</p>
            </div>
          ))}
        </section>

        {/* Our Story */}
        <section className="mb-8 rounded-2xl border border-white/10 bg-[#111111] p-5 sm:p-7">
          <div className="mb-4 flex items-center gap-3">
            <span className="h-6 w-1 rounded-full bg-[#c8f400]" />
            <h2 className={sectionTitle}>Our Story</h2>
          </div>

          <div className="space-y-3 text-sm leading-6 text-gray-400 sm:leading-7">
            <p>
              SkyMart started in 2022 as a small side project. We wanted to
              build something better than the bloated, confusing online
              shopping experiences people had grown used to.
            </p>

            <p>
              Our goal was simple: make it easier to discover quality
              products, compare prices, and shop without unnecessary hassle.
              Every part of the experience should feel straightforward.
            </p>

            <p>
              Today, we continue to focus on speed, transparency, and helping
              customers feel confident about every purchase they make.
            </p>
          </div>
        </section>

        {/* Values */}
        <section className="mb-8">
          <div className="mb-4 flex items-center gap-3">
            <span className="h-6 w-1 rounded-full bg-[#c8f400]" />
            <h2 className={sectionTitle}>What We Stand For</h2>
          </div>

          <div className="grid grid-cols-1 gap-3 sm:gap-4 md:grid-cols-2">
            {values.map((item) => (
              <article key={item.title} className={`${card} group flex gap-3.5 p-4 sm:p-5`}>
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#c8f400]/10 text-lg text-[#c8f400] transition duration-300 group-hover:bg-[#c8f400] group-hover:text-black">
                  {item.icon}
                </div>

                <div className="min-w-0">
                  <h3 className="mb-1 text-sm font-bold">{item.title}</h3>
                  <p className="text-sm leading-6 text-gray-500">
                    {item.description}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Team */}
        <section className="mb-8">
          <div className="mb-4 flex items-center gap-3">
            <span className="h-6 w-1 rounded-full bg-[#c8f400]" />
            <h2 className={sectionTitle}>Meet the Team</h2>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
            {team.map((member) => (
              <article
                key={member.name}
                className={`${card} group flex flex-col items-center px-3 py-5 text-center`}
              >
                <div
                  className={`mb-3 flex h-12 w-12 items-center justify-center rounded-xl text-lg font-bold text-black transition duration-300 group-hover:rotate-3 group-hover:scale-105 ${member.color}`}
                >
                  {member.initial}
                </div>

                <h3 className="text-sm font-bold">{member.name}</h3>
                <p className="mt-0.5 text-xs text-gray-500">{member.role}</p>
              </article>
            ))}
          </div>
        </section>

        {/* Call to Action */}
        <section className="rounded-2xl border border-[#c8f400]/20 bg-gradient-to-b from-[#c8f400]/[0.06] to-transparent px-5 py-8 text-center sm:py-10">
          <p className="mb-2 text-[11px] font-bold uppercase tracking-[.2em] text-[#c8f400]">
            Your next great find
          </p>

          <h2 className="font-syne text-xl font-extrabold sm:text-2xl">
            Ready to shop?
          </h2>

          <p className="mt-2 text-sm text-gray-500">
            Explore products and discover something you'll love.
          </p>

          <button
            onClick={() => navigate("/main/products")}
            className="mt-5 inline-flex items-center gap-2 rounded-xl bg-[#c8f400] px-5 py-3 text-sm font-bold text-black transition duration-300 hover:-translate-y-0.5 hover:bg-[#dcff35] hover:shadow-[0_10px_35px_rgba(200,244,0,0.15)] active:scale-95"
          >
            Browse Products
            <span className="text-base">→</span>
          </button>
        </section>
      </div>
    </main>
  );
};

export default About;