import React, { useContext } from "react";
import { Auth } from "../context/AuthContext";

const ProductCard = ({ product, index = 0 }) => {
  let { image, title, category, price, rating } = product;

  let { setstoreProduct, setcartOpen } = useContext(Auth);

  const addToCart = () => {
    setstoreProduct((prev) => {
      let pro = prev.find((val) => val.id === product.id);
      if (pro) {
        return prev.map((val) => {
          val.id === product.id
            ? { ...val, quantity: (val.quantity || 1) + 1 }
            : val;
        });
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    setcartOpen(true);
  };

  return (
    <>
      <style>{`
        @keyframes card-enter {
          from {
            opacity: 0;
            transform: translateY(22px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes lime-pulse {
          0%, 100% { opacity: .4; transform: scale(.9); }
          50% { opacity: .8; transform: scale(1.15); }
        }

        .product-enter {
          animation: card-enter 650ms cubic-bezier(.22,1,.36,1) both;
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
        style={{ "--delay": `${Math.min(index, 10) * 65}ms` }}
        className="product-enter product-card group overflow-hidden rounded-[26px] border border-white/[0.08] bg-[#141414] transition-[transform,border-color,box-shadow] duration-500 ease-[cubic-bezier(.22,1,.36,1)] hover:-translate-y-2 hover:border-[#c8f400]/40 hover:shadow-[0_20px_45px_rgba(0,0,0,.4)]"
      >
        {/* Image */}
        <div className="relative m-2.5 flex h-[255px] items-center justify-center overflow-hidden rounded-[20px] bg-gradient-to-br from-white via-[#fafafa] to-[#e9e9e9] p-7">
          <div className="product-glow pointer-events-none absolute h-36 w-36 rounded-full bg-[#c8f400]/15 blur-3xl" />

          {image ? (
            <img
              src={image}
              alt={title}
              loading="lazy"
              className="relative z-10 h-full w-full object-contain transition-transform duration-700 ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-[1.09]"
            />
          ) : (
            <div className="text-sm text-gray-400">Product Image</div>
          )}

          <span className="absolute left-3 top-3 z-20 max-w-[75%] truncate rounded-full border border-black/5 bg-white/90 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-[#333] shadow-sm backdrop-blur-md">
            {category}
          </span>

          <span className="absolute bottom-3 left-1/2 z-20 h-1 w-7 -translate-x-1/2 rounded-full bg-black/10 transition-all duration-500 group-hover:w-14 group-hover:bg-[#c8f400]" />
        </div>

        {/* Details */}
        <div className="px-4 pb-5 pt-2 sm:px-5">
          <p className="mb-2 truncate text-[10px] font-bold uppercase tracking-[.18em] text-[#c8f400]/80">
            {category}
          </p>

          <h2 className="mb-2 line-clamp-2 min-h-[44px] text-[15px] font-semibold leading-[1.5] text-white transition-colors duration-500 group-hover:text-[#c8f400]">
            {title}
          </h2>

          {/* Rating UI */}
          <div className="mb-4 flex min-h-5 items-center gap-2">
            {rating.rate != null && Number.isFinite(Number(rating.rate)) ? (
              <>
                <div className="flex gap-0.5 text-sm text-[#ffc400]">
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

          <div className="mb-4 h-px bg-gradient-to-r from-white/20 via-white/10 to-transparent" />

          {/* Price and button UI */}
          <div className="flex items-center justify-between gap-2">
            <div className="min-w-0">
              <p className="mb-1 text-[9px] font-semibold uppercase tracking-widest text-gray-500">
                Price
              </p>

              <p className="truncate text-xl font-extrabold tracking-tight text-[#c8f400]">
                ${Number(price ?? 0).toFixed(2)}
              </p>
            </div>

            <button
              type="button"
              onClick={addToCart}
              className="group/add relative flex shrink-0 items-center gap-2 overflow-hidden rounded-full bg-[#c8f400] px-4 py-2.5 text-xs font-extrabold text-black transition-[transform,background-color,box-shadow] duration-300 ease-out hover:scale-105 hover:bg-[#dcff35] hover:shadow-[0_5px_22px_rgba(200,244,0,.25)] active:scale-95"
            >
              <span className="pointer-events-none absolute inset-0 -translate-x-[150%] skew-x-[-20deg] bg-white/40 transition-transform duration-700 group-hover/add:translate-x-[180%]" />

              <svg
                className="relative transition-transform duration-300 group-hover/add:-rotate-6"
                width="16"
                height="16"
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
          </div>
        </div>
      </article>
    </>
  );
};

export default ProductCard;
