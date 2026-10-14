import React, { useContext } from "react";
import { useNavigate } from "react-router";
import { Auth } from "../context/AuthContext";
import {
  ArrowRight,
  Package,
  TrendingUp,
  Star,
  Tag,
  Zap,
  ShoppingBag,
  X,
  Plus,
  Minus,
  Trash2,
} from "lucide-react";

const Home = () => {
  const navigate = useNavigate();
  const { product = [], setcategory, cartOpen ,setcartOpen,storeProduct} = useContext(Auth);

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 12) return "Good morning";
    if (hour >= 12 && hour < 17) return "Good afternoon";
    if (hour >= 17 && hour < 21) return "Good evening";
    return "Good night";
  };

  const getUsername = () => {
    try {
      return JSON.parse(localStorage.getItem("login"))?.name || "there";
    } catch {
      return "there";
    }
  };

  const categories = Object.values(
    product.reduce((acc, p) => {
      acc[p.category] ??= { name: p.category, image: p.image, count: 0 };
      acc[p.category].count++;
      return acc;
    }, {}),
  );

  const topRated = [...product]
    .sort((a, b) => (b.rating?.rate ?? 0) - (a.rating?.rate ?? 0))
    .slice(0, 5);

  const newArrivals = [...product].slice(-5).reverse();

  const stats = [
    {
      icon: Package,
      value: "0",
      title: "Cart Items",
      desc: "In your bag",
      color: "text-[#c8f400]",
      bg: "bg-[#c8f400]/10",
    },
    {
      icon: TrendingUp,
      value: "$0.00",
      title: "Cart Value",
      desc: "Ready to checkout",
      color: "text-blue-400",
      bg: "bg-blue-400/10",
    },
    {
      icon: Star,
      value: String(topRated.length),
      title: "Top Products",
      desc: "Highly rated",
      color: "text-amber-400",
      bg: "bg-amber-400/10",
    },
    {
      icon: Tag,
      value: String(categories.length),
      title: "Categories",
      desc: "To explore",
      color: "text-purple-400",
      bg: "bg-purple-400/10",
    },
  ];

  const lists = [
    {
      title: "Top Rated",
      icon: Star,
      accent: "text-yellow-400",
      items: topRated,
    },
    {
      title: "New Arrivals",
      icon: Zap,
      accent: "text-[#c8f400]",
      items: newArrivals,
    },
  ];

  return (
    <main className="font-dm-sans min-h-screen bg-[#0c0c0c] py-8 text-white sm:py-12">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Hero */}
        <section className="relative mb-12 overflow-hidden rounded-3xl border border-white/10 bg-[#111111] px-6 py-10 sm:px-10 sm:py-14">
          <div
            className="pointer-events-none absolute inset-0 opacity-40"
            style={{
              backgroundImage:
                "linear-gradient(rgba(200,244,0,.06) 1px, transparent 1px), linear-gradient(90deg, rgba(200,244,0,.06) 1px, transparent 1px)",
              backgroundSize: "43px 43px",
            }}
          />
          <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[#c8f400]/10 blur-3xl" />

          <div className="relative flex flex-col justify-between gap-10 md:flex-row md:items-center">
            <div className="max-w-[620px]">
              <p className="mb-4 text-xs font-bold uppercase tracking-[.25em] text-[#c8f400]">
                {getGreeting()} 👋
              </p>

              <h1 className="font-syne text-4xl font-extrabold leading-[1.12] tracking-tight sm:text-5xl lg:text-6xl">
                Welcome back,
                <span className="mt-1 block text-[#c8f400]">
                  {getUsername()}!
                </span>
              </h1>

              <p className="mt-5 max-w-lg text-sm leading-7 text-gray-400 sm:text-base">
                Discover today's picks — hand-curated products across
                electronics, fashion, and more.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <button
                  onClick={() => {
                    navigate("products");
                    setcategory();
                  }}
                  className="flex items-center gap-2 rounded-2xl bg-[#c8f400] px-6 py-3.5 text-sm font-bold text-black transition duration-300 hover:-translate-y-0.5 hover:bg-[#dcff35] hover:shadow-[0_10px_35px_rgba(200,244,0,0.15)]"
                >
                  Shop Now <ArrowRight size={16} />
                </button>

                <button
                  onClick={() => {
                    navigate("products");
                    setcategory();
                  }}
                  className="rounded-2xl border border-white/15 px-6 py-3.5 text-sm font-medium text-gray-300 transition hover:border-[#c8f400]/60 hover:text-[#c8f400]"
                >
                  View All Products
                </button>
              </div>
            </div>

            <div className="flex shrink-0 flex-row gap-3 md:w-[190px] md:flex-col">
              <div className="flex-1 rounded-2xl border border-[#c8f400]/25 bg-[#c8f400]/10 px-5 py-5 text-center">
                <p className="font-syne text-3xl font-extrabold text-[#c8f400]">
                  {product.length}+
                </p>
                <p className="mt-1 text-xs text-gray-400">Products Available</p>
              </div>
              <div className="flex-1 rounded-2xl border border-white/10 bg-white/[0.02] px-5 py-5 text-center">
                <p className="font-syne text-2xl font-bold">Free</p>
                <p className="mt-1 text-xs text-gray-500">Delivery on ₹999+</p>
              </div>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="mb-12 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {stats.map(({ icon: Icon, ...stat }) => (
            <div
              key={stat.title}
              className="flex items-center gap-4 rounded-2xl border border-white/10 bg-[#111111] p-5 transition duration-300 hover:-translate-y-1 hover:border-[#c8f400]/40"
            >
              <div
                className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl ${stat.bg} ${stat.color}`}
              >
                <Icon size={22} />
              </div>
              <div>
                <p className="font-syne text-2xl font-extrabold">
                  {stat.value}
                </p>
                <p className="mt-0.5 text-sm text-gray-400">{stat.title}</p>
                <p className="mt-0.5 text-xs text-gray-600">{stat.desc}</p>
              </div>
            </div>
          ))}
        </section>

        {/* Categories */}
        <section className="mb-12">
          <div className="mb-6 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="h-7 w-1 rounded-full bg-[#c8f400]" />
              <h2 className="font-syne text-xl font-bold tracking-tight sm:text-2xl">
                Shop by Category
              </h2>
            </div>
            <button
              onClick={() => {
                navigate("products");
                setcategory();
              }}
              className="flex items-center gap-1 text-sm font-medium text-[#c8f400] transition hover:text-white"
            >
              View All <ArrowRight size={15} />
            </button>
          </div>

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {categories.map((category) => (
              <button
                key={category.name}
                onClick={() => {
                  setcategory(category.name);
                  navigate("products");
                }}
                className="group flex min-h-[170px] flex-col items-center justify-center rounded-2xl border border-white/10 bg-[#111111] p-5 text-center transition duration-300 hover:-translate-y-1 hover:border-[#c8f400]/50"
              >
                <div className="mb-3 flex h-16 w-16 items-center justify-center rounded-2xl bg-white p-2 transition duration-300 group-hover:scale-105">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="h-full w-full object-contain"
                  />
                </div>
                <span className="text-sm font-semibold capitalize text-white">
                  {category.name}
                </span>
                <span className="mt-1 text-xs text-gray-500">
                  {category.count} items
                </span>
              </button>
            ))}
          </div>
        </section>

        {/* Top Rated + New Arrivals */}
        <div className="grid gap-6 lg:grid-cols-2">
          {lists.map(({ title, icon: Icon, accent, items }) => (
            <section
              key={title}
              className="rounded-3xl border border-white/10 bg-[#111111] p-6 sm:p-7"
            >
              <div className="mb-6 flex items-center justify-between">
                <h2 className="font-syne flex items-center gap-3 text-xl font-bold">
                  <span className={accent}>
                    <Icon size={22} fill="currentColor" />
                  </span>
                  {title}
                </h2>
                <button
                  onClick={() => {
                    navigate("products");
                    setcategory();
                  }}
                  className="flex items-center gap-1 text-xs font-medium text-[#c8f400] transition hover:text-white"
                >
                  See all <ArrowRight size={13} />
                </button>
              </div>

              <div className="space-y-3">
                {items.map((item) => (
                  <div
                    key={`${title}-${item.id}`}
                    className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.02] p-3 pr-4 transition duration-300 hover:border-[#c8f400]/40 hover:bg-[#c8f400]/[0.04]"
                  >
                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-white p-1.5">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="h-full w-full object-contain"
                      />
                    </div>

                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-semibold text-white">
                        {item.title}
                      </p>
                      <p className="font-syne mt-0.5 text-sm font-bold text-[#c8f400]">
                        ${Number(item.price).toFixed(2)}
                      </p>
                    </div>

                    <button
                      type="button"
                      aria-label="Add to cart"
                      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#c8f400]/15 text-[#c8f400] transition hover:bg-[#c8f400] hover:text-black"
                    >
                      <ShoppingBag size={16} />
                    </button>
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
      {cartOpen && (
        <div className="fixed inset-0 z-[100] flex justify-end">
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/70 backdrop-blur-[5px]" />

          {/* Cart Drawer */}
          <aside className="relative flex h-full w-full max-w-[490px] flex-col border-l border-white/10 bg-[#111111] text-white shadow-2xl">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-white/70 px-7 py-7">
              <div className="flex items-center gap-3">
                <ShoppingBag size={23} className="text-[#c8f400]" />
                <h2 className="text-xl font-bold">Cart</h2>
                <span className="rounded-full bg-[#c8f400]/15 px-3 py-1 text-xs font-semibold text-[#c8f400]">
                  1 items
                </span>
              </div>

              <button className="text-gray-400 transition hover:text-white" onClick={()=>setcartOpen(false)}>
                <X size={22} />
              </button>
            </div>

            {/* Cart Products */}
            <div className="flex-1 overflow-y-auto p-7">
              <div className="flex gap-4 rounded-[20px] border border-white/70 p-3.5">
                <div className="flex h-[84px] w-[84px] shrink-0 items-center justify-center rounded-2xl bg-white p-2">
                  <img
                    src="https://fakestoreapi.com/img/81t2KVWHzgL._AC_SX679_.jpg"
                    alt="Product"
                    className="h-full w-full object-contain"
                  />
                </div>

                <div className="min-w-0 flex-1">
                  <h3 className="text-sm font-medium text-gray-200">
                    Bookshelf
                  </h3>

                  <p className="mt-2 font-bold text-[#c8f400]">$129.99</p>

                  <p className="text-xs text-gray-500">$129.99 each</p>

                  <div className="mt-3 flex items-center gap-3">
                    <button className="rounded-lg border border-white/10 p-2 hover:bg-gray-900">
                      <Minus size={13} />
                    </button>

                    <span className="text-sm">1</span>

                    <button className="rounded-lg border border-white/10 p-2 hover:bg-gray-900">
                      <Plus size={13} />
                    </button>

                    <button className="ml-auto p-2 text-red-400 hover:text-red-500">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="border-t border-white/70 p-7">
              <div className="mb-5 flex items-center justify-between">
                <span className="text-sm text-gray-400">Total</span>
                <span className="text-2xl font-extrabold">$129.99</span>
              </div>

              <button className="flex w-full items-center justify-center gap-3 rounded-2xl bg-[#c8f400] py-4 font-bold text-black transition hover:bg-[#dcff35]">
                Checkout <ArrowRight size={19} />
              </button>

              <button className="mt-5 w-full text-center text-xs text-gray-500 hover:text-red-500">
                Clear cart
              </button>
            </div>
          </aside>
        </div>
      )}
    </main>
  );
};

export default Home;
