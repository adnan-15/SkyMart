import React from "react";
import {
  ArrowLeft,
  Check,
  ChevronLeft,
  ChevronRight,
  Heart,
  Minus,
  Plus,
  RotateCcw,
  ShieldCheck,
  ShoppingCart,
  Star,
  Truck,
} from "lucide-react";
import { useNavigate, useParams } from "react-router";
import { useContext } from "react";
import { Auth } from "../context/AuthContext";
import { useAuth } from "../hooks/useAuth";
import toast from "react-hot-toast";
import { FaCheck } from "react-icons/fa6";
import { useState } from "react";

const perks = [
  { icon: Truck, title: "Free Delivery", desc: "On orders $50+" },
  { icon: ShieldCheck, title: "Secure Pay", desc: "256-bit SSL" },
  { icon: RotateCcw, title: "Easy Returns", desc: "30-day policy" },
];

const related = [
  {
    title: "Smart Watch Series 5",
    price: "299.99",
    rate: 4,
    count: 85,
    added: true,
  },
  { title: "Professional Camera Lens", price: "599.99", rate: 5, count: 45 },
  { title: "Wireless Gaming Mouse", price: "79.99", rate: 5, count: 95 },
  { title: "4K Ultra HD Monitor", price: "349.99", rate: 5, count: 88 },
  { title: "Mechanical Keyboard", price: "149.99", rate: 5, count: 142 },
];

const Stars = ({ rate = 5, size = 14 }) => (
  <div className="flex items-center gap-0.5">
    {[1, 2, 3, 4, 5].map((n) => (
      <Star
        key={n}
        size={size}
        fill="currentColor"
        className={n <= rate ? "text-amber-400" : "text-gray-700"}
      />
    ))}
  </div>
);
const CardOverview = () => {
  let { id } = useParams();
  let navigate = useNavigate();
  let { productData, setcartOpen, storeProduct } = useContext(Auth);
  let { addToCart, decreaseProduct, increaseProduct } = useAuth();
  id = Number(id);
  let item = productData.find((val) => val.id === id);
  let itemInCart = storeProduct.find((val) => val.id === item.id);
  const [isWishlisted, setIsWishlisted] = useState(false);

  return (
    <section className="font-dm-sans min-h-screen bg-[#0c0c0c] py-8 text-white sm:py-12">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="mb-8 flex items-center gap-2 text-xs text-gray-500">
          <button
            className="flex items-center gap-1 transition hover:text-[#c8f400]"
            onClick={() => {
              navigate("/main/products");
            }}
          >
            <ArrowLeft size={13} /> Products
          </button>
          <span>/</span>
          <button className="transition ">Electronics</button>
          <span>/</span>
          <span className="truncate font-semibold text-gray-300">
            Wireless Bluetooth Headphones
          </span>
        </nav>

        {/* Overview */}
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-14">
          {/* Image */}
          <div className="flex aspect-square items-center justify-center rounded-3xl border border-white/10 bg-white p-10">
            <img
              src={item.image}
              alt={item.title}
              className="h-full w-full object-contain"
            />
          </div>

          {/* Details */}
          <div className="flex flex-col">
            <p className="mb-3 text-xs font-bold uppercase tracking-[.25em] text-[#c8f400]">
              Curated for you
            </p>

            <span className="w-fit rounded-full border border-[#c8f400]/40 bg-[#c8f400]/10 px-3 py-1 text-xs font-medium text-[#c8f400]">
              {item.category}
            </span>

            <h1 className="font-syne mt-4 text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl">
              {item.title}
            </h1>

            <div className="mt-4 flex items-center gap-3">
              <Stars rate={item.rating.rate} />
              <span className="text-sm font-bold text-gray-200">
                {item.rating.rate}
              </span>
              <span className="text-xs text-gray-500">
                ({item.rating.count} reviews)
              </span>
            </div>

            <div className="mt-6 rounded-2xl border border-white/10 bg-[#111111] px-5 py-4">
              <p className="font-syne text-4xl font-extrabold text-[#c8f400]">
                ${item.price}
              </p>
            </div>

            <p className="mt-5 text-sm leading-7 text-gray-400">
              {item.description}
            </p>

            {/* UI ONLY: "In cart" row (wire to your cart state later) */}
            {itemInCart && (
              <div className="mt-6 flex items-center justify-between rounded-2xl border border-white/10 bg-[#111111] px-5 py-3.5">
                <span className="text-xs text-gray-500">In cart:</span>
                <div className="flex items-center gap-3">
                  <button
                    aria-label="Decrease quantity"
                    onClick={() => {
                      decreaseProduct(item.id);
                    }}
                    className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/15 text-gray-300 transition hover:border-[#c8f400]/60 hover:text-[#c8f400]"
                  >
                    <Minus size={14} />
                  </button>
                  <span className="font-syne w-4 text-center text-sm font-bold">
                    {itemInCart.quantity}
                  </span>
                  <button
                    aria-label="Increase quantity"
                    onClick={() => {
                      increaseProduct(item.id);
                    }}
                    className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/15 text-gray-300 transition hover:border-[#c8f400]/60 hover:text-[#c8f400]"
                  >
                    <Plus size={14} />
                  </button>
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="mt-4 flex gap-3">
              {storeProduct.some((val) => val.id === item.id) ? (
                <button
                  aria-label="Wishlist"
                  onClick={()=>{
                     addToCart(item);
                    toast.success("Quantity Updated!", {
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
                  });
                  }}
                  className="font-syne flex flex-1 items-center justify-center gap-2 rounded-2xl border border-green-500/30 bg-green-500/10 py-3.5 text-sm font-bold text-green-400"
                >
                  <Check size={16} /> Added to Cart
                </button>
              ) : (
                <button
                  className="font-syne flex flex-1 items-center justify-center gap-2 rounded-2xl bg-[#c8f400] py-3.5 text-sm font-bold text-black transition duration-300 hover:-translate-y-0.5 hover:bg-[#dcff35] hover:shadow-[0_10px_35px_rgba(200,244,0,0.15)]"
                  onClick={() => {
                    addToCart(item);
                    toast.success("Added to Cart 🛒", {
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
                    });
                  }}
                >
                  <ShoppingCart size={16} /> Add to Cart
                </button>
              )}

              <button
                aria-label="Wishlist"
                onClick={() => setIsWishlisted((prev) => !prev)}
                className={`flex h-[50px] w-[50px] shrink-0 items-center justify-center rounded-2xl border transition ${
                  isWishlisted
                    ? "border-pink-500 bg-pink-500/15 text-pink-500"
                    : "border-white/15 text-gray-400 hover:border-pink-500/60 hover:text-pink-500"
                }`}
              >
                <Heart
                  size={18}
                  fill={isWishlisted ? "currentColor" : "none"}
                />
              </button>
            </div>

            {/* UI ONLY: View Cart */}
            <button
              className="font-syne mt-3 w-full rounded-2xl border border-white/15 py-3 text-sm font-medium text-gray-300 transition hover:border-[#c8f400]/60 hover:text-[#c8f400]"
              onClick={() => {
                setcartOpen(true);
              }}
            >
              View Cart →
            </button>

            {/* Perks */}
            <div className="mt-5 grid grid-cols-3 gap-3">
              {perks.map(({ icon: Icon, title, desc }) => (
                <div
                  key={title}
                  className="flex flex-col items-center rounded-2xl border border-white/10 bg-[#111111] px-2 py-4 text-center transition duration-300 hover:-translate-y-1 hover:border-[#c8f400]/40"
                >
                  <Icon size={16} className="mb-2 text-[#c8f400]" />
                  <p className="text-[11px] font-bold">{title}</p>
                  <p className="mt-0.5 text-[10px] text-gray-600">{desc}</p>
                </div>
              ))}
            </div>

            {/* Prev / Next */}
            <div className="flex gap-3 ">
              <button
                className="font-syne mt-6 flex w-[50%] items-center justify-center gap-2 rounded-2xl border border-white/15 py-3.5 text-sm font-medium text-gray-300 transition hover:border-[#c8f400]/60 hover:text-[#c8f400]"
                onClick={() => {
                  if (id - 1 < 1) {
                    navigate(`/main/${21 - 1}`);
                  } else {
                    navigate(`/main/${id - 1}`);
                  }
                }}
              >
                <ChevronLeft size={16} /> Prev
              </button>
              <button
                className="font-syne mt-6 flex w-[50%] items-center justify-center gap-2 rounded-2xl border border-white/15 py-3.5 text-sm font-medium text-gray-300 transition hover:border-[#c8f400]/60 hover:text-[#c8f400]"
                onClick={() => {
                  if (id + 1 <= 20) {
                    navigate(`/main/${id + 1}`);
                  } else {
                    navigate(`/main/${1}`);
                  }
                }}
              >
                Next <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* Related Products */}
        <div className="mt-16">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="font-syne text-xl font-bold tracking-tight sm:text-2xl">
              Related Products
            </h2>
            <span className="h-1 w-12 rounded-full bg-[#c8f400]" />
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            {productData.map((p) =>
              p.category === item.category && p.title !== item.title ? (
                <article
                  onClick={() => {
                    navigate(`/main/${p.id}`);
                  }}
                  key={p.title}
                  className="group overflow-hidden rounded-2xl border border-white/10 bg-[#111111] transition duration-300 hover:-translate-y-1 hover:border-[#c8f400]/40"
                >
                  <div className="relative flex h-44 items-center justify-center bg-white p-4">
                    <span className="absolute left-3 top-3 rounded-full bg-black/60 px-2.5 py-1 text-[10px] font-medium text-gray-200">
                      {p.category}
                    </span>
                    <img
                      src={p.image}
                      alt={p.title}
                      className="h-full w-full object-contain transition duration-300 group-hover:scale-105"
                    />
                  </div>

                  <div className="p-4">
                    <p className="text-[10px] text-gray-600">{p.category}</p>
                    <h3 className="mt-1 truncate text-sm font-semibold text-white">
                      {p.title}
                    </h3>

                    <div className="mt-2 flex items-center gap-1.5 border-b border-white/10 pb-3">
                      <Stars rate={p.rating.rate} size={11} />
                      <span className="text-[10px] text-gray-500">
                        ({p.rating.count})
                      </span>
                    </div>

                    <div className="mt-3 flex items-center justify-between">
                      <p className="font-syne text-lg font-extrabold text-[#c8f400]">
                        ${p.price}
                      </p>

                      {storeProduct.some((val) => val.id === p.id) ? (
                        <button
                          className="flex items-center gap-1 rounded-lg border border-green-500/30 bg-green-500/10 px-3 py-1.5 text-xs font-bold text-green-400"
                          onClick={(e) => {
                            e.stopPropagation();
                            addToCart(p);
                             toast.success("Quantity Updated!", {
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
                  });
                          }}
                        >
                          <Check size={12} /> Added
                        </button>
                      ) : (
                        <button
                          className="flex items-center gap-1 rounded-lg bg-[#c8f400] px-3 py-1.5 text-xs font-bold text-black transition hover:bg-[#dcff35]"
                          onClick={(e) => {
                            e.stopPropagation();
                            addToCart(p); toast.success("Added to cart! 🛒", {
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
                  });
                          }}
                        >
                          <ShoppingCart size={12} /> Add
                        </button>
                      )}
                    </div>
                  </div>
                </article>
              ) : (
                ""
              ),
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CardOverview;
