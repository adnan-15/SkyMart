import React, { useContext } from "react";
import { useNavigate, useParams } from "react-router";
import { Auth } from "../context/AuthContext";
import {
  ArrowRight,
  Package,
  TrendingUp,
  Star,
  Tag,
  Zap,
  ShoppingBag,
} from "lucide-react";
import { useAuth } from "../hooks/useAuth";
import CardOverview from "../components/CardOverview";
import toast from "react-hot-toast";
import { FaCheck } from "react-icons/fa6";
import { useEffect } from "react";

const toastBase = {
  duration: 2500,
  position: "bottom-right",
  icon: (
    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#c8f400]">
      <FaCheck className="text-sm text-[#0c0c0c]" />
    </div>
  ),
  style: {
    background: "#141414",
    color: "#fff",
    border: "1px solid #c8f400",
    borderRadius: "10px",
    padding: "10px 15px",
    fontSize: "14px",
    fontWeight: "600",
    boxShadow: "0 8px 30px rgba(200, 244, 0, 0.15)",
  },
};

const sectionTitle = "font-syne text-lg font-bold tracking-tight sm:text-xl";

const Home = () => {
  const navigate = useNavigate();
  let { id } = useParams();
  const {
    productData = [],
    setcategory,
    setcartOpen,
    storeProduct,
    getProduct,
  } = useContext(Auth);
  let { addToCart } = useAuth();

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

  useEffect(() => {
    getProduct();
  }, []);

  const categories = Object.values(
    productData.reduce((acc, p) => {
      acc[p.category] ??= { name: p.category, image: p.image, count: 0 };
      acc[p.category].count++;
      return acc;
    }, {}),
  );

  const topRated = [...productData]
    .sort((a, b) => (b.rating?.rate ?? 0) - (a.rating?.rate ?? 0))
    .slice(0, 5);

  const newArrivals = [...productData].slice(-5).reverse();

  const stats = [
    {
      icon: Package,
      value: storeProduct.length,
      title: "Cart Items",
      desc: "In your bag",
      color: "text-[#c8f400]",
      bg: "bg-[#c8f400]/10",
    },
    {
      icon: TrendingUp,
      value: storeProduct
        .reduce(
          (total, initial) =>
            total + Number(initial.price) * (initial.quantity || 1),
          0,
        )
        .toFixed(2),
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

  if (id) return <CardOverview />;

  return (
    <main className="font-dm-sans min-h-screen bg-[#0c0c0c] py-6 text-white sm:py-10">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Hero */}
        <section className="relative mb-8 overflow-hidden rounded-2xl border border-white/10 bg-[#111111] px-5 py-7 sm:px-8 sm:py-10">
          <div
            className="pointer-events-none absolute inset-0 opacity-40"
            style={{
              backgroundImage:
                "linear-gradient(rgba(200,244,0,.06) 1px, transparent 1px), linear-gradient(90deg, rgba(200,244,0,.06) 1px, transparent 1px)",
              backgroundSize: "40px 40px",
            }}
          />
          <div className="pointer-events-none absolute -right-20 -top-20 h-60 w-60 rounded-full bg-[#c8f400]/10 blur-3xl" />

          <div className="relative flex flex-col justify-between gap-6 md:flex-row md:items-center">
            <div className="max-w-[560px]">
              <p className="mb-3 text-[11px] font-bold uppercase tracking-[.2em] text-[#c8f400]">
                {getGreeting()} 👋
              </p>

              <h1 className="font-syne text-3xl font-extrabold leading-[1.15] tracking-tight sm:text-4xl lg:text-5xl">
                Welcome back,
                <span className="mt-0.5 block break-words text-[#c8f400]">
                  {getUsername()}!
                </span>
              </h1>

              <p className="mt-3 max-w-md text-sm leading-6 text-gray-400">
                Discover today's picks — hand-curated products across
                electronics, fashion, and more.
              </p>

              <div className="mt-5 flex flex-wrap gap-2.5">
                <button
                  onClick={() => {
                    navigate("products");
                    setcategory();
                  }}
                  className="flex items-center gap-2 rounded-xl bg-[#c8f400] px-5 py-2.5 text-sm font-bold text-black transition duration-300 hover:-translate-y-0.5 hover:bg-[#dcff35] hover:shadow-[0_10px_35px_rgba(200,244,0,0.15)]"
                >
                  Shop Now <ArrowRight size={15} />
                </button>

                <button
                  onClick={() => {
                    navigate("products");
                    setcategory();
                  }}
                  className="rounded-xl border border-white/15 px-5 py-2.5 text-sm font-medium text-gray-300 transition hover:border-[#c8f400]/60 hover:text-[#c8f400]"
                >
                  View All Products
                </button>
              </div>
            </div>

            <div className="flex shrink-0 flex-row gap-3 md:w-44 md:flex-col">
              <div className="flex-1 rounded-xl border border-[#c8f400]/25 bg-[#c8f400]/10 px-4 py-4 text-center">
                <p className="font-syne text-2xl font-extrabold text-[#c8f400]">
                  {productData.length}+
                </p>
                <p className="mt-0.5 text-xs text-gray-400">Products Available</p>
              </div>
              <div className="flex-1 rounded-xl border border-white/10 bg-white/[0.02] px-4 py-4 text-center">
                <p className="font-syne text-xl font-bold">Free</p>
                <p className="mt-0.5 text-xs text-gray-500">Delivery on $50+</p>
              </div>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="mb-8 grid grid-cols-1 gap-3 min-[480px]:grid-cols-2 lg:grid-cols-4">
          {stats.map(({ icon: Icon, ...stat }) => (
            <div
              key={stat.title}
              className="flex items-center gap-3 rounded-2xl border border-white/10 bg-[#111111] p-4 transition duration-300 hover:-translate-y-0.5 hover:border-[#c8f400]/40"
            >
              <div
                className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${stat.bg} ${stat.color}`}
              >
                <Icon size={20} />
              </div>
              <div className="min-w-0">
                <p className="font-syne text-xl font-extrabold">{stat.value}</p>
                <p className="text-sm text-gray-400">{stat.title}</p>
                <p className="text-xs text-gray-600">{stat.desc}</p>
              </div>
            </div>
          ))}
        </section>

        {/* Categories */}
        <section className="mb-8">
          <div className="mb-4 flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <span className="h-6 w-1 rounded-full bg-[#c8f400]" />
              <h2 className={sectionTitle}>Shop by Category</h2>
            </div>
            <button
              onClick={() => {
                navigate("products");
                setcategory();
              }}
              className="flex shrink-0 items-center gap-1 text-sm font-medium text-[#c8f400] transition hover:text-white"
            >
              View All <ArrowRight size={14} />
            </button>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4">
            {categories.map((category) => (
              <button
                key={category.name}
                onClick={() => {
                  setcategory(category.name);
                  navigate("products");
                }}
                className="group flex min-h-[130px] flex-col items-center justify-center rounded-2xl border border-white/10 bg-[#111111] p-4 text-center transition duration-300 hover:-translate-y-0.5 hover:border-[#c8f400]/50"
              >
                <div className="mb-2.5 flex h-14 w-14 items-center justify-center rounded-xl bg-white p-2 transition duration-300 group-hover:scale-105">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="h-full w-full object-contain"
                  />
                </div>
                <span className="text-sm font-semibold capitalize text-white">
                  {category.name}
                </span>
                <span className="mt-0.5 text-xs text-gray-500">
                  {category.count} items
                </span>
              </button>
            ))}
          </div>
        </section>

        {/* Top Rated + New Arrivals */}
        <div className="grid gap-4 lg:grid-cols-2 lg:gap-6">
          {lists.map(({ title, icon: Icon, accent, items }) => (
            <section
              key={title}
              className="rounded-2xl border border-white/10 bg-[#111111] p-4 sm:p-5"
            >
              <div className="mb-4 flex items-center justify-between">
                <h2 className="font-syne flex items-center gap-2.5 text-lg font-bold">
                  <span className={accent}>
                    <Icon size={20} fill="currentColor" />
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

              <div className="space-y-2.5">
                {items.map((item) => (
                  <div
                    key={`${title}-${item.id}`}
                    onClick={() => {
                      navigate(`/main/${item.id}`);
                    }}
                    className="flex cursor-pointer items-center gap-3 rounded-xl border border-white/10 bg-white/[0.02] p-2.5 pr-3 transition duration-300 hover:border-[#c8f400]/40 hover:bg-[#c8f400]/[0.04]"
                  >
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-white p-1.5">
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
                      onClick={(e) => {
                        e.stopPropagation();
                        addToCart(item);
                        setcartOpen(true);
                        if (storeProduct.some((val) => val.id === item.id)) {
                          toast.success("Quantity Updated", toastBase);
                        } else {
                          toast.success("Added to Cart 🛒", toastBase);
                        }
                      }}
                      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#c8f400]/15 text-[#c8f400] transition hover:bg-[#c8f400] hover:text-black"
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
    </main>
  );
};

export default Home;