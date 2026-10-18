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

const qtyBtn =
  "flex h-8 w-8 items-center justify-center rounded-lg border border-white/15 text-gray-300 transition hover:border-[#c8f400]/60 hover:text-[#c8f400]";
const outlineBtn =
  "font-syne flex flex-1 items-center justify-center gap-2 rounded-xl border border-white/15 py-3 text-sm font-medium text-gray-300 transition hover:border-[#c8f400]/60 hover:text-[#c8f400]";

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
  const [isWishlisted, setIsWishlisted] = useState(false);
  id = Number(id);
  let item = productData?.find((val) => val.id === id);

  if (!item) {
    return <div className="flex justify-center py-24 text-sm text-[#c8f400]">Loading product...</div>;
  }
  let itemInCart = storeProduct?.find((val) => val.id === item.id);

  return (
    <section className="font-dm-sans min-h-screen bg-[#0c0c0c] py-6 text-white sm:py-10">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="mb-5 flex min-w-0 items-center gap-2 text-xs text-gray-500">
          <button
            className="flex shrink-0 items-center gap-1 transition hover:text-[#c8f400]"
            onClick={() => {
              navigate("/main/products");
            }}
          >
            <ArrowLeft size={13} /> Products
          </button>
          <span>/</span>
          <span className="shrink-0 capitalize">{item.category}</span>
          <span>/</span>
          <span className="truncate font-semibold text-gray-300">
            {item.title}
          </span>
        </nav>

        {/* Overview */}
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-10">
          {/* Image */}
          <div className="flex aspect-square w-full items-center justify-center rounded-2xl border border-white/10 bg-white p-6 sm:p-8 lg:max-h-[480px] lg:self-start">
            <img
              src={item.image}
              alt={item.title}
              className="h-full w-full object-contain"
            />
          </div>

          {/* Details */}
          <div className="flex min-w-0 flex-col">
            <p className="mb-2 text-[11px] font-bold uppercase tracking-[.2em] text-[#c8f400]">
              Curated for you
            </p>

            <span className="w-fit rounded-full border border-[#c8f400]/40 bg-[#c8f400]/10 px-3 py-1 text-xs font-medium capitalize text-[#c8f400]">
              {item.category}
            </span>

            <h1 className="font-syne mt-3 text-2xl font-extrabold leading-tight tracking-tight sm:text-3xl">
              {item.title}
            </h1>

            <div className="mt-3 flex flex-wrap items-center gap-2.5">
              <Stars rate={item.rating.rate} />
              <span className="text-sm font-bold text-gray-200">
                {item.rating.rate}
              </span>
              <span className="text-xs text-gray-500">
                ({item.rating.count} reviews)
              </span>
            </div>

            <div className="mt-4 rounded-xl border border-white/10 bg-[#111111] px-4 py-3">
              <p className="font-syne text-2xl font-extrabold text-[#c8f400] sm:text-3xl">
                ${item.price}
              </p>
            </div>

            <p className="mt-4 text-sm leading-6 text-gray-400">
              {item.description}
            </p>

            {/* UI ONLY: "In cart" row (wire to your cart state later) */}
            {itemInCart && (
              <div className="mt-4 flex items-center justify-between rounded-xl border border-white/10 bg-[#111111] px-4 py-3">
                <span className="text-xs text-gray-500">In cart:</span>
                <div className="flex items-center gap-3">
                  <button
                    aria-label="Decrease quantity"
                    onClick={() => {
                      decreaseProduct(item.id);
                    }}
                    className={qtyBtn}
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
                    className={qtyBtn}
                  >
                    <Plus size={14} />
                  </button>
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="mt-4 flex gap-2.5">
              {storeProduct.some((val) => val.id === item.id) ? (
                <button
                  aria-label="Update quantity"
                  onClick={() => {
                    addToCart(item);
                    toast.success("Quantity Updated!", toastBase);
                  }}
                  className="font-syne flex flex-1 items-center justify-center gap-2 rounded-xl border border-green-500/30 bg-green-500/10 py-3 text-sm font-bold text-green-400"
                >
                  <Check size={16} /> Added to Cart
                </button>
              ) : (
                <button
                  className="font-syne flex flex-1 items-center justify-center gap-2 rounded-xl bg-[#c8f400] py-3 text-sm font-bold text-black transition duration-300 hover:-translate-y-0.5 hover:bg-[#dcff35] hover:shadow-[0_10px_35px_rgba(200,244,0,0.15)]"
                  onClick={() => {
                    addToCart(item);
                    toast.success("Added to Cart 🛒", toastBase);
                  }}
                >
                  <ShoppingCart size={16} /> Add to Cart
                </button>
              )}

              <button
                aria-label="Wishlist"
                onClick={() => setIsWishlisted((prev) => !prev)}
                className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border transition ${
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
              className="font-syne mt-2.5 w-full rounded-xl border border-white/15 py-2.5 text-sm font-medium text-gray-300 transition hover:border-[#c8f400]/60 hover:text-[#c8f400]"
              onClick={() => {
                setcartOpen(true);
              }}
            >
              View Cart →
            </button>

            {/* Perks */}
            <div className="mt-4 grid grid-cols-3 gap-2.5">
              {perks.map(({ icon: Icon, title, desc }) => (
                <div
                  key={title}
                  className="flex flex-col items-center rounded-xl border border-white/10 bg-[#111111] px-1.5 py-3 text-center transition duration-300 hover:-translate-y-0.5 hover:border-[#c8f400]/40"
                >
                  <Icon size={16} className="mb-1.5 text-[#c8f400]" />
                  <p className="text-[11px] font-bold">{title}</p>
                  <p className="mt-0.5 text-[10px] text-gray-600">{desc}</p>
                </div>
              ))}
            </div>

            {/* Prev / Next */}
            <div className="mt-4 flex gap-2.5">
              <button
                className={outlineBtn}
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
                className={outlineBtn}
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
        <div className="mt-10">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-syne text-lg font-bold tracking-tight sm:text-xl">
              Related Products
            </h2>
            <span className="h-1 w-10 rounded-full bg-[#c8f400]" />
          </div>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4 xl:grid-cols-5">
            {productData.map((p) =>
              p.category === item.category && p.title !== item.title ? (
                <article
                  onClick={() => {
                    navigate(`/main/${p.id}`);
                  }}
                  key={p.title}
                  className="group cursor-pointer overflow-hidden rounded-2xl border border-white/10 bg-[#111111] transition duration-300 hover:-translate-y-1 hover:border-[#c8f400]/40"
                >
                  <div className="relative flex h-36 items-center justify-center bg-white p-4 sm:h-40">
                    <span className="absolute left-2 top-2 max-w-[80%] truncate rounded-full bg-black/60 px-2 py-0.5 text-[10px] font-medium capitalize text-gray-200">
                      {p.category}
                    </span>
                    <img
                      src={p.image}
                      alt={p.title}
                      className="h-full w-full object-contain transition duration-300 group-hover:scale-105"
                    />
                  </div>

                  <div className="p-3">
                    <h3 className="truncate text-sm font-semibold text-white">
                      {p.title}
                    </h3>

                    <div className="mt-1.5 flex items-center gap-1.5 border-b border-white/10 pb-2.5">
                      <Stars rate={p.rating.rate} size={11} />
                      <span className="text-[10px] text-gray-500">
                        ({p.rating.count})
                      </span>
                    </div>

                    <div className="mt-2.5 flex flex-wrap items-center justify-between gap-2">
                      <p className="font-syne text-base font-extrabold text-[#c8f400]">
                        ${p.price}
                      </p>

                      {storeProduct.some((val) => val.id === p.id) ? (
                        <button
                          className="flex items-center gap-1 rounded-lg border border-green-500/30 bg-green-500/10 px-2.5 py-1.5 text-xs font-bold text-green-400"
                          onClick={(e) => {
                            e.stopPropagation();
                            addToCart(p);
                            toast.success("Quantity Updated!", toastBase);
                          }}
                        >
                          <Check size={12} /> Added
                        </button>
                      ) : (
                        <button
                          className="flex items-center gap-1 rounded-lg bg-[#c8f400] px-2.5 py-1.5 text-xs font-bold text-black transition hover:bg-[#dcff35]"
                          onClick={(e) => {
                            e.stopPropagation();
                            addToCart(p);
                            toast.success("Added to cart! 🛒", toastBase);
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