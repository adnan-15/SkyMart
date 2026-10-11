
import React from "react";

const categories = [
  { name: "Electronics", icon: "💻", count: 17 },
  { name: "Clothing", icon: "📦", count: 2 },
  { name: "Furniture", icon: "📦", count: 3 },
  { name: "Home", icon: "📦", count: 14 },
  { name: "Sports", icon: "📦", count: 8 },
  { name: "Accessories", icon: "📦", count: 6 },
];

const topRated = [
  { image: "🍰", price: 599.99 },
  { image: "🪑", price: 199.99 },
  { image: "🖥️", price: 349.99 },
  { image: "🖼️", price: 49.99 },
  { image: "⌨️", price: 149.99 },
];

const newArrivals = [
  { image: "🎧", price: 99.99 },
  { image: "🎤", price: 299.99 },
  { image: "👕", price: 24.99 },
  { image: "🪑", price: 199.99 },
  { image: "🧴", price: 34.99 },
];

const stats = [
  { icon: "⬡", value: "0", title: "Cart Items", desc: "In your bag", color: "text-[#c8f400]", bg: "bg-[#c8f400]/10" },
  { icon: "↗", value: "$0.00", title: "Cart Value", desc: "Ready to checkout", color: "text-blue-400", bg: "bg-blue-400/10" },
  { icon: "☆", value: "5", title: "Top Products", desc: "Highly rated", color: "text-amber-400", bg: "bg-amber-400/10" },
  { icon: "◇", value: "6", title: "Categories", desc: "To explore", color: "text-purple-400", bg: "bg-purple-400/10" },
];

function ProductList({ title, icon, products, accent }) {
  return (
    <section className="rounded-[26px] bg-white p-5 text-black sm:p-7">
      <div className="mb-6 flex items-center justify-between gap-3">
        <h2 className="flex items-center gap-2 text-lg font-bold sm:text-xl">
          <span className={accent}>{icon}</span>
          {title}
        </h2>
        <button className="text-xs font-medium text-[#a8d900] transition hover:text-black">
          See all →
        </button>
      </div>

      <div className="space-y-2">
        {products.map((product, index) => (
          <div
            key={index}
            className={`group flex items-center gap-4 rounded-[18px] border border-gray-200 p-3.5 transition duration-300 hover:border-[#c8f400] hover:bg-[#c8f400]/[0.04] sm:p-4 ${
              index === 0 ? "border-[#c8f400]/40" : ""
            }`}
          >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gray-100 text-xl">
              {product.image}
            </div>

            <p className="flex-1 text-sm font-semibold text-[#a8d900]">
              ${product.price.toFixed(2)}
            </p>

            <button
              aria-label="Add product"
              className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#c8f400]/15 text-sm text-[#9ac700] transition hover:bg-[#c8f400] hover:text-black"
            >
              ♧
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}

const Home = () => {
  return (
    <main className="min-h-screen bg-[#0c0c0c] px-5 py-8 text-white sm:px-8 lg:py-10">
      <div className="mx-auto max-w-[1306px]">

        {/* Welcome Hero */}
        <section className="relative mb-10 overflow-hidden rounded-[28px] border border-white/70 bg-[#111111] px-6 py-10 sm:px-10 sm:py-12 lg:px-12">
          <div
            className="pointer-events-none absolute inset-0 opacity-40"
            style={{
              backgroundImage:
                "linear-gradient(rgba(200,244,0,.06) 1px, transparent 1px), linear-gradient(90deg, rgba(200,244,0,.06) 1px, transparent 1px)",
              backgroundSize: "43px 43px",
            }}
          />

          <div className="relative flex flex-col justify-between gap-10 md:flex-row md:items-center">
            <div className="max-w-[620px]">
              <p className="mb-4 text-xs font-semibold uppercase tracking-[.18em] text-[#a8d900] sm:text-sm">
                Good morning 👋
              </p>

              <h1 className="text-4xl font-extrabold leading-[1.12] tracking-tight sm:text-5xl lg:text-6xl">
                Welcome back,
                <span className="mt-1 block text-[#c8f400]">adnan!</span>
              </h1>

              <p className="mt-5 max-w-lg text-sm leading-6 text-gray-400 sm:text-base">
                Discover today's picks — hand-curated products across
                electronics, fashion, and more.
              </p>

              <div className="mt-7 flex flex-wrap gap-3">
                <button onClick={()=>{navigate('/products')}} className="rounded-2xl bg-[#c8f400] px-6 py-3.5 text-sm font-bold text-black transition duration-300 hover:-translate-y-0.5 hover:bg-[#dcff35]">
                  Shop Now <span className="ml-2">→</span>
                </button>

                <button className="rounded-2xl border border-white/15 px-6 py-3.5 text-sm font-medium text-gray-300 transition hover:border-[#c8f400]/60 hover:text-[#c8f400]">
                  View All Products
                </button>
              </div>
            </div>

            <div className="flex shrink-0 flex-row gap-3 md:w-[165px] md:flex-col">
              <div className="flex-1 rounded-[20px] border border-[#c8f400]/25 bg-[#c8f400]/10 px-5 py-5 text-center">
                <p className="text-3xl font-extrabold text-[#c8f400]">20+</p>
                <p className="mt-1 text-xs text-gray-400">Products Available</p>
              </div>

              <div className="flex-1 rounded-[20px] border border-white/70 px-5 py-5 text-center">
                <p className="text-2xl font-bold">Free</p>
                <p className="mt-1 text-xs text-gray-500">Delivery on ₹999+</p>
              </div>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="mb-11 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {stats.map((stat) => (
            <div
              key={stat.title}
              className="flex items-center gap-4 rounded-[25px] border border-white/70 bg-[#111111] p-5 transition duration-300 hover:-translate-y-1 hover:border-[#c8f400]/50"
            >
              <div className={`flex h-[50px] w-[50px] shrink-0 items-center justify-center rounded-[17px] text-3xl ${stat.bg} ${stat.color}`}>
                {stat.icon}
              </div>

              <div>
                <p className="text-2xl font-extrabold">{stat.value}</p>
                <p className="mt-0.5 text-sm text-gray-400">{stat.title}</p>
                <p className="mt-1 text-xs text-gray-600">{stat.desc}</p>
              </div>
            </div>
          ))}
        </section>

        {/* Categories */}
        <section className="mb-11">
          <div className="mb-5 flex items-center justify-between">
            <h2 className="text-xl font-bold tracking-tight sm:text-2xl">
              Shop by Category
            </h2>
            <button className="text-sm font-medium text-[#c8f400] transition hover:text-white">
              View All →
            </button>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
            {categories.map((category) => (
              <button
                key={category.name}
                className="flex min-h-[140px] flex-col items-center justify-center rounded-[20px] bg-white p-5 text-center text-gray-900 transition duration-300 hover:-translate-y-1 hover:bg-[#f7ffe0] hover:shadow-[0_10px_35px_rgba(200,244,0,.08)]"
              >
                <span className="mb-3 text-3xl">{category.icon}</span>
                <span className="text-sm font-semibold">{category.name}</span>
                <span className="mt-1 text-xs text-gray-500">
                  {category.count} items
                </span>
              </button>
            ))}
          </div>
        </section>

        {/* Top Rated + New Arrivals */}
        <section className="mb-10 grid grid-cols-1 items-start gap-5 xl:grid-cols-2">
          <ProductList
            title="Top Rated"
            icon="★"
            products={topRated}
            accent="text-amber-400"
          />
          <ProductList
            title="New Arrivals"
            icon="ϟ"
            products={newArrivals}
            accent="text-[#c8f400]"
          />
        </section>

        {/* Benefits */}
        <section className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {[
            {
              icon: "ϟ",
              title: "Fast Delivery",
              desc: "Same-day on select items",
              color: "text-[#c8f400]",
            },
            {
              icon: "♢",
              title: "Secure Payments",
              desc: "100% encrypted checkout",
              color: "text-blue-400",
            },
            {
              icon: "◇",
              title: "Best Prices",
              desc: "Price-match guarantee",
              color: "text-emerald-400",
            },
          ].map((item) => (
            <div
              key={item.title}
              className="flex items-center gap-4 rounded-[20px] border border-white/70 bg-[#111111] p-5 transition hover:border-white/40"
            >
              <span className={`text-3xl ${item.color}`}>{item.icon}</span>
              <div>
                <h3 className="text-sm font-semibold">{item.title}</h3>
                <p className="mt-1 text-xs text-gray-500">{item.desc}</p>
              </div>
            </div>
          ))}
        </section>

      </div>
    </main>
  );
};

export default Home;
