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
const Cart = () => {
      let navigate = useNavigate();
      let {
        
        cartOpen,
        setcartOpen,
        storeProduct,
        setstoreProduct,
      } = useContext(Auth);
    
  let {increaseProduct,decreaseProduct} = useAuth()
  

  const dltProduct = (id) => {
    setstoreProduct((prev) => prev.filter((val) => val.id !== id));
  };
  return (
    <div>{cartOpen && (
        <div className="font-dm-sans fixed inset-0 z-[100] flex justify-end">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/30 backdrop-blur-[5px]"
            onClick={()=>setcartOpen(false)}
          />

          {/* Cart Drawer */}
          <aside className="relative flex h-full w-full max-w-[455px] flex-col border-l border-white/10 bg-[#111111] text-white shadow-2xl">
            {/* Header */}
            <header className="flex items-center justify-between border-b border-white/10 px-6 py-5">
              <div className="flex items-center gap-3">
                <ShoppingBag size={24} className="text-[#c8f400]" />
                <h2 className="font-syne text-xl font-bold">Cart</h2>
                <span className="rounded-full bg-[#c8f400]/15 px-3 py-1 text-xs font-medium text-[#c8f400]">
                  {storeProduct.length} items
                </span>
              </div>

              <button
                aria-label="Close cart"
                onClick={()=>setcartOpen(false)}
                className="flex h-9 w-9 items-center justify-center rounded-xl text-gray-400 transition hover:bg-white/5 hover:text-white"
                
              >
                <X size={20} />
              </button>
            </header>

            {/* Cart Products */}
            <div className="flex-1 space-y-4 overflow-y-auto px-6 py-6">
              {storeProduct.length === 0 ? (
                <div className="flex h-full flex-col items-center justify-center text-center">
                  <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-[28px] border border-white/10 bg-white/[0.04]">
                    <PackageOpen size={40} className="text-gray-600" />
                  </div>

                  <h3 className="text-xl font-medium text-gray-300">
                    Cart is empty
                  </h3>

                  <p className="mt-2 text-sm text-gray-500">
                    Go shop something cool!
                  </p>

                  <button
                    onClick={() => {
                      setcartOpen(false)
                      navigate("/main/products");
                    }}
                    className="mt-7 rounded-2xl bg-[#c8f400] px-7 py-4 font-semibold text-black transition hover:bg-[#d8ff00]"
                  >
                    Browse Products
                  </button>
                </div>
              ) : (
                storeProduct.map((val) => (
                  <article
                    key={val.id}
                    className="flex gap-4 rounded-2xl border border-white/10 bg-white/[0.02] p-4 transition hover:border-[#c8f400]/40"
                  >
                    <div className="flex h-[90px] w-[90px] shrink-0 items-center justify-center rounded-2xl bg-white p-2">
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

                      <p className="font-syne mt-1 text-lg font-bold text-[#c8f400]">
                        ${(Number(val.price) * (val.quantity || 1)).toFixed(2)}
                      </p>

                      <p className="text-xs text-gray-500">
                        ${Number(val.price).toFixed(2)} each
                      </p>

                      <div className="mt-3 flex items-center gap-3">
                        <button
                          aria-label="Decrease quantity"
                          onClick={() => {
                            decreaseProduct(val.id);
                          }}
                          className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/15 text-gray-300 transition hover:border-[#c8f400]/60 hover:text-[#c8f400]"
                        >
                          <Minus size={14} />
                        </button>

                        <span className="w-4 text-center text-sm font-bold">
                          {val.quantity || 1}
                        </span>

                        <button
                          aria-label="Increase quantity"
                          onClick={() => {
                            increaseProduct(val.id);
                          }}
                          className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/15 text-gray-300 transition hover:border-[#c8f400]/60 hover:text-[#c8f400]"
                        >
                          <Plus size={14} />
                        </button>

                        <button
                          aria-label="Remove item"
                          className="ml-auto flex h-8 w-8 items-center justify-center rounded-lg text-red-400/80 transition hover:bg-red-500/10 hover:text-red-400"
                          onClick={() => {
                            dltProduct(val.id);
                          }}
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  </article>
                ))
              )}
            </div>

            {/* Footer */}
            {storeProduct.length > 0 && (
              <footer className="border-t border-white px-6 pb-3 pt-3">
                <div className="mb-3 flex items-center justify-between">
                  <span className="text-sm text-gray-400">Total</span>
                  <span className="font-syne text-xl font-extrabold">
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

                    toast.success("Order Placed! 🎉", {
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
                  className="font-syne flex w-full items-center justify-center gap-3 rounded-2xl bg-[#c8f400] py-3 text-base font-bold text-black transition duration-300 hover:-translate-y-0.5 hover:bg-[#dcff35] hover:shadow-[0_10px_35px_rgba(200,244,0,0.15)]"
                >
                  Checkout <ArrowRight size={18} />
                </button>

                <button
                  className="mt-4 w-full text-center text-sm text-gray-500 transition hover:text-red-400"
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