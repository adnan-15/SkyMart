import React, { useContext } from "react";
import { Auth } from "../context/AuthContext";
import { useNavigate } from "react-router";
import { useAuth } from "../hooks/useAuth";
import toast from "react-hot-toast";
import { FaCheck } from "react-icons/fa6";
import { Check } from "lucide-react";

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

const ProductCard = ({ product, index = 0 }) => {
  let { image, title, category, price, rating, id } = product;

  let { addToCart } = useAuth();
  let { setcartOpen, storeProduct } = useContext(Auth);

  let navigate = useNavigate();

  return (
    <>
      <style>{`
        @keyframes card-enter {
          from { opacity: 0; transform: translateY(16px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes lime-pulse {
          0%, 100% { opacity: .4; transform: scale(.9); }
          50% { opacity: .8; transform: scale(1.15); }
        }

        .product-enter {
          animation: card-enter 550ms cubic-bezier(.22,1,.36,1) both;
          animation-delay: var(--delay, 0ms);
        }

        .product-glow {
          animation: lime-pulse 5s ease-in-out infinite;
        }

        @media (prefers-reduced-motion: reduce) {
          .product-enter, .product-glow {
            animation: none !important;
          }
          .product-card, .product-card * {
            transition-duration: .01ms !important;
          }
        }
      `}</style>

      <article
        style={{ "--delay": `${Math.min(index, 10) * 55}ms` }}
        onClick={() => {
          navigate(`/main/${id}`);
        }}
        className="product-enter product-card group flex cursor-pointer flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#111111] transition-[transform,border-color,box-shadow] duration-300 hover:-translate-y-1 hover:border-[#c8f400]/40 hover:shadow-[0_16px_36px_rgba(0,0,0,.4)]"
      >
        {/* Image */}
        <div className="relative m-2 flex h-44 items-center justify-center overflow-hidden rounded-xl bg-gradient-to-br from-white via-[#fafafa] to-[#e9e9e9] p-5 sm:h-48">
          <div className="product-glow pointer-events-none absolute h-28 w-28 rounded-full bg-[#c8f400]/15 blur-3xl" />

          {image ? (
            <img
              src={image}
              alt={title}
              loading="lazy"
              className="relative z-10 h-full w-full object-contain transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="text-sm text-gray-400">Product Image</div>
          )}

          <span className="absolute left-2.5 top-2.5 z-20 max-w-[75%] truncate rounded-full border border-black/5 bg-white/90 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-[#333] shadow-sm backdrop-blur-md">
            {category}
          </span>
        </div>

        {/* Details */}
        <div className="flex flex-1 flex-col px-3.5 pb-4 pt-1.5">
          <h2 className="mb-1.5 line-clamp-2 min-h-[40px] text-sm font-semibold leading-5 text-white transition-colors duration-300 group-hover:text-[#c8f400]">
            {title}
          </h2>

          {/* Rating UI */}
          <div className="mb-3 flex min-h-5 items-center gap-1.5">
            {rating?.rate != null && Number.isFinite(Number(rating.rate)) ? (
              <>
                <div className="flex gap-0.5 text-xs text-[#ffc400]">
                  {Array.from({ length: 5 }, (_, i) => (
                    <span key={i}>
                      {i < Math.round(Number(rating.rate)) ? "★" : "☆"}
                    </span>
                  ))}
                </div>

                <span className="text-xs text-gray-400">
                  {Number(rating.rate).toFixed(1)}
                </span>

                <span className="text-xs text-gray-600">({rating.count})</span>
              </>
            ) : (
              <span className="text-xs text-gray-500">No ratings yet</span>
            )}
          </div>

          {/* Price and button UI */}
          <div className="mt-auto flex items-center justify-between gap-2 border-t border-white/10 pt-3">
            <p className="min-w-0 truncate font-syne text-lg font-extrabold tracking-tight text-[#c8f400]">
              ${Number(price ?? 0).toFixed(2)}
            </p>

            {storeProduct.some((val) => val.id === id) ? (
              <button
                aria-label="Update quantity"
                onClick={(e) => {
                  e.stopPropagation();
                  addToCart(product);
                  setcartOpen(true);
                  toast.success("Quantity Updated!", toastBase);
                }}
                className="flex shrink-0 items-center gap-1.5 rounded-lg border border-green-400/30 bg-green-400/10 px-3 py-2 text-xs font-bold text-green-400 transition duration-300 hover:bg-green-400/20 active:scale-95"
              >
                <Check size={14} /> Added
              </button>
            ) : (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  addToCart(product);
                  setcartOpen(true);
                  toast.success("Added to Cart 🛒", toastBase);
                }}
                className="group/add relative flex shrink-0 items-center gap-1.5 overflow-hidden rounded-lg bg-[#c8f400] px-3.5 py-2 text-xs font-bold text-black transition duration-300 hover:bg-[#dcff35] hover:shadow-[0_4px_16px_rgba(200,244,0,.25)] active:scale-95"
              >
                <span className="pointer-events-none absolute inset-0 -translate-x-[150%] skew-x-[-20deg] bg-white/40 transition-transform duration-700 group-hover/add:translate-x-[180%]" />

                <svg
                  className="relative"
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="9" cy="21" r="1" />
                  <circle cx="20" cy="21" r="1" />
                  <path d="M1 1h4l2.7 13.4a2 2 0 0 0 2 1.6h9.7a2 2 0 0 0 2-1.6L23 6H6" />
                </svg>

                <span className="relative">Add</span>
              </button>
            )}
          </div>
        </div>
      </article>
    </>
  );
};

export default ProductCard;