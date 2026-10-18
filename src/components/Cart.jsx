import React from 'react'
import { useNavigate } from 'react-router';
import { Auth } from '../context/AuthContext';
import { useContext } from 'react';
import { toast } from "react-hot-toast";
import { FaCheck } from "react-icons/fa";
import {
  X,
  ArrowRight,
  ShoppingBag,
  Plus,
  Minus,
  PackageOpen,
  Trash2,
} from "lucide-react";
import { useAuth } from '../hooks/useAuth';

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
  "flex h-7 w-7 items-center justify-center rounded-lg border border-white/15 text-gray-300 transition hover:border-[#c8f400]/60 hover:text-[#c8f400]";

const Cart = () => {
  let navigate = useNavigate();
  let {
    cartOpen,
    setcartOpen,
    storeProduct,
    setstoreProduct,
  } = useContext(Auth);

  let { increaseProduct, decreaseProduct } = useAuth()

  const dltProduct = (id) => {
    setstoreProduct((prev) => prev.filter((val) => val.id !== id));
  };
  return (
    <div>{cartOpen && (
      <div className="font-dm-sans fixed inset-0 z-[100] flex justify-end">
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-black/40 backdrop-blur-[4px]"
          onClick={() => setcartOpen(false)}
        />

        {/* Cart Drawer */}
        <aside className="relative flex h-full w-full max-w-[400px] flex-col border-l border-white/10 bg-[#111111] text-white shadow-2xl">
          {/* Header */}
          <header className="flex items-center justify-between border-b border-white/10 px-4 py-3.5 sm:px-5">
            <div className="flex items-center gap-2.5">
              <ShoppingBag size={20} className="text-[#c8f400]" />
              <h2 className="font-syne text-lg font-bold">Cart</h2>
              <span className="rounded-full bg-[#c8f400]/15 px-2.5 py-0.5 text-xs font-medium text-[#c8f400]">
                {storeProduct.length} items
              </span>
            </div>

            <button
              aria-label="Close cart"
              onClick={() => setcartOpen(false)}
              className="flex h-9 w-9 items-center justify-center rounded-xl text-gray-400 transition hover:bg-white/5 hover:text-white"
            >
              <X size={18} />
            </button>
          </header>

          {/* Cart Products */}
          <div className="flex-1 space-y-3 overflow-y-auto px-4 py-4 sm:px-5">
            {storeProduct.length === 0 ? (
              <div className="flex h-full flex-col items-center justify-center text-center">
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04]">
                  <PackageOpen size={28} className="text-gray-600" />
                </div>

                <h3 className="text-base font-medium text-gray-300">
                  Cart is empty
                </h3>

                <p className="mt-1 text-sm text-gray-500">
                  Go shop something cool!
                </p>

                <button
                  onClick={() => {
                    setcartOpen(false)
                    navigate("/main/products");
                  }}
                  className="mt-5 rounded-xl bg-[#c8f400] px-5 py-2.5 text-sm font-semibold text-black transition hover:bg-[#dcff35]"
                >
                  Browse Products
                </button>
              </div>
            ) : (
              storeProduct.map((val) => (
                <article
                  key={val.id}
                  className="flex gap-3 rounded-xl border border-white/10 bg-white/[0.02] p-3 transition hover:border-[#c8f400]/40"
                >
                  <div className="flex h-[72px] w-[72px] shrink-0 items-center justify-center rounded-lg bg-white p-1.5">
                    <img
                      src={val.image}
                      alt={val.title}
                      className="h-full w-full object-contain"
                    />
                  </div>

                  <div className="flex min-w-0 flex-1 flex-col">
                    <h3 className="truncate text-sm font-medium text-white">
                      {val.title}
                    </h3>

                    <div className="mt-0.5 flex items-baseline gap-2">
                      <p className="font-syne text-base font-bold text-[#c8f400]">
                        ${(Number(val.price) * (val.quantity || 1)).toFixed(2)}
                      </p>
                      <p className="text-[11px] text-gray-500">
                        ${Number(val.price).toFixed(2)} each
                      </p>
                    </div>

                    <div className="mt-2 flex items-center gap-2.5">
                      <button
                        aria-label="Decrease quantity"
                        onClick={() => {
                          decreaseProduct(val.id);
                        }}
                        className={qtyBtn}
                      >
                        <Minus size={13} />
                      </button>

                      <span className="w-4 text-center text-sm font-bold">
                        {val.quantity || 1}
                      </span>

                      <button
                        aria-label="Increase quantity"
                        onClick={() => {
                          increaseProduct(val.id);
                        }}
                        className={qtyBtn}
                      >
                        <Plus size={13} />
                      </button>

                      <button
                        aria-label="Remove item"
                        className="ml-auto flex h-7 w-7 items-center justify-center rounded-lg text-red-400/80 transition hover:bg-red-500/10 hover:text-red-400"
                        onClick={() => {
                          dltProduct(val.id);
                        }}
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </div>
                </article>
              ))
            )}
          </div>

          {/* Footer */}
          {storeProduct.length > 0 && (
            <footer className="border-t border-white/10 bg-[#0e0e0e] px-4 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-3 sm:px-5">
              <div className="mb-3 flex items-center justify-between">
                <span className="text-sm text-gray-400">Total</span>
                <span className="font-syne text-lg font-extrabold">
                  $
                  {storeProduct
                    .reduce(
                      (total, initial) =>
                        total +
                        Number(initial.price) * (initial.quantity || 1),
                      0,
                    )
                    .toFixed(2)}
                </span>
              </div>

              <button
                onClick={() => {
                  setcartOpen(false);
                  setstoreProduct([]);

                  toast.success("Order Placed! 🎉", toastBase);
                }}
                className="font-syne flex w-full items-center justify-center gap-2 rounded-xl bg-[#c8f400] py-3 text-sm font-bold text-black transition duration-300 hover:-translate-y-0.5 hover:bg-[#dcff35] hover:shadow-[0_10px_35px_rgba(200,244,0,0.15)]"
              >
                Checkout <ArrowRight size={16} />
              </button>

              <button
                className="mt-2.5 w-full text-center text-xs text-gray-500 transition hover:text-red-400"
                onClick={() => {
                  setstoreProduct([]);
                }}
              >
                Clear cart
              </button>
            </footer>
          )}
        </aside>
      </div>
    )}{" "}</div>
  )
}

export default Cart