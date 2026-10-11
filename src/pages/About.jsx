
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

  return (
    <main className="min-h-screen bg-[#0c0c0c] px-5 py-12 text-white sm:px-8">
      <div className="mx-auto max-w-[1030px]">

        {/* Hero */}
        <section className="mb-16 text-center">
          <div className="mx-auto mb-7 flex h-[68px] w-[68px] items-center justify-center rounded-[25px] bg-[#c8f400] text-8xl font-extrabold text-black shadow-[0_0_40px_rgba(200,244,0,0.12)]">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" >
              <path d="M13.5 2 5 13.5h6L10 22l9-12h-6.2L13.5 2Z" />
            </svg>
          </div>

          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
            About <span className="text-[#c8f400]">SkyMart</span>
          </h1>

          <p className="mx-auto mt-5 max-w-[690px] text-base leading-8 text-gray-500 sm:text-lg">
            SkyMart is a next-generation e-commerce platform built to make
            online shopping fast, fair, and enjoyable for everyone.
          </p>
        </section>

        {/* Statistics */}
        <section className="mb-16 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="group flex min-h-[130px] flex-col items-center justify-center rounded-[20px] border border-white/60 bg-[#111111] p-5 text-center transition duration-300 hover:-translate-y-1 hover:border-[#c8f400]/60"
            >
              <span className="mb-3 text-2xl text-[#c8f400] transition-transform duration-300 group-hover:scale-110">
                {stat.icon}
              </span>
              <h2 className="text-2xl font-extrabold sm:text-3xl">
                {stat.value}
              </h2>
              <p className="mt-2 text-xs text-gray-500 sm:text-sm">
                {stat.label}
              </p>
            </div>
          ))}
        </section>

        {/* Our Story */}
        <section className="mb-14 rounded-[28px] border border-white/60 bg-[#111111] p-6 sm:p-10">
          <div className="mb-5 flex items-center gap-3">
            <span className="h-7 w-1 rounded-full bg-[#c8f400]" />
            <h2 className="text-2xl font-bold sm:text-3xl">Our Story</h2>
          </div>

          <div className="space-y-4 text-sm leading-7 text-gray-400 sm:text-base">
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
        <section className="mb-16">
          <h2 className="mb-8 text-center text-2xl font-bold sm:text-3xl">
            What We Stand For
          </h2>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {values.map((item, index) => (
              <article
                key={item.title}
                className={`group flex gap-4 rounded-[20px] border border-white/60 bg-[#111111] p-6 transition duration-300 hover:-translate-y-1 hover:border-[#c8f400]/50 ${
                  index === 1 ? "md:border-[#c8f400]/30" : ""
                }`}
              >
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[14px] bg-[#c8f400]/10 text-xl text-[#c8f400] transition duration-300 group-hover:bg-[#c8f400] group-hover:text-black">
                  {item.icon}
                </div>

                <div>
                  <h3 className="mb-2 text-base font-bold">{item.title}</h3>
                  <p className="text-sm leading-6 text-gray-500">
                    {item.description}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Team */}
        <section className="mb-16">
          <h2 className="mb-8 text-center text-2xl font-bold sm:text-3xl">
            Meet the Team
          </h2>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {team.map((member) => (
              <article
                key={member.name}
                className="group flex flex-col items-center rounded-[20px] border border-white/60 bg-[#111111] px-4 py-6 text-center transition duration-300 hover:-translate-y-1 hover:border-[#c8f400]/50"
              >
                <div
                  className={`mb-4 flex h-[52px] w-[52px] items-center justify-center rounded-[17px] text-xl font-bold text-black transition duration-300 group-hover:rotate-3 group-hover:scale-105 ${member.color}`}
                >
                  {member.initial}
                </div>

                <h3 className="text-sm font-bold">{member.name}</h3>
                <p className="mt-1 text-xs text-gray-500">{member.role}</p>
              </article>
            ))}
          </div>
        </section>

        {/* Call to Action */}
        <section className="rounded-[28px] border border-[#c8f400]/20 bg-gradient-to-b from-[#c8f400]/[0.04] to-transparent px-6 py-10 text-center sm:py-12">
          <p className="mb-3 text-xs font-bold uppercase tracking-[.22em] text-[#c8f400]">
            Your next great find
          </p>

          <h2 className="text-2xl font-extrabold sm:text-3xl">
            Ready to shop?
          </h2>

          <p className="mt-3 text-sm text-gray-500 sm:text-base">
            Explore products and discover something you'll love.
          </p>

          <button
            onClick={() => navigate("/main/products")}
            className="mt-7 inline-flex items-center gap-3 rounded-2xl bg-[#c8f400] px-7 py-4 text-sm font-bold text-black transition duration-300 hover:-translate-y-1 hover:bg-[#dcff35] hover:shadow-[0_10px_35px_rgba(200,244,0,0.12)] active:scale-95"
          >
            Browse Products
            <span className="text-lg">→</span>
          </button>
        </section>

      </div>
    </main>
  );
};

export default About;