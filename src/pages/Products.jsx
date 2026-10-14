import React, { useContext, useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import { axiosInstance } from "../config/axiosInstance";
import { toast } from "react-toastify";
import { Auth } from "../context/AuthContext";
import {
  X,
  PackageSearch,
  ArrowRight,
  ShoppingBag,
  Plus,
  Minus,
  PackageOpen,
  Trash2,
} from "lucide-react";

const inputBase =
  "rounded-2xl border border-white/10 bg-[#1d1d1d] text-sm outline-none transition focus:border-[#c8f400]/60";

const Products = () => {
  let {
    productData,
    setproductData,
    loading,
    setloading,
    category,
    setcategory,
    searchItem,
    setsearchItem,
    sortBy,
    setsortBy,
    cartOpen,
    setcartOpen,
    storeProduct,
    setstoreProduct,
  } = useContext(Auth);

  console.log(storeProduct);

  let displayProduct = () => {
    let arr = productData.filter((n) =>
      n.title.toLowerCase().includes(searchItem.toLowerCase()),
    );
    if (sortBy === "low-to-high") {
      arr.sort((a, b) => a.price - b.price);
    } else if (sortBy === "high-to-low") {
      arr.sort((a, b) => b.price - a.price);
    } else if (sortBy === "name-a-z") {
      arr.sort((a, b) => a.title.localeCompare(b.title));
    }
    return arr;
  };

  let displayProducts = displayProduct();

  // Active filter chips (UI helpers)
  const categoryLabels = {
    electronics: "Electronics",
    jewelery: "Jewelry",
    "men's clothing": "Men's Clothing",
    "women's clothing": "Women's Clothing",
  };
  const sortLabels = {
    "low-to-high": "Price: Low → High",
    "high-to-low": "Price: High → Low",
    "name-a-z": "Name: A → Z",
  };
  const hasCategory = category && category !== "All Categories";
  const hasSearch = (searchItem || "").trim() !== "";
  const hasSort = sortBy && sortBy !== "all";
  const hasFilters = hasCategory || hasSearch || hasSort;
  const clearAll = () => {
    setcategory("All Categories");
    setsearchItem("");
    setsortBy("all");
  };
  const chip =
    "inline-flex items-center gap-1.5 rounded-full border border-[#c8f400]/40 bg-[#c8f400]/10 px-3 py-1 text-xs font-medium text-[#c8f400]";

  let getProduct = async () => {
    try {
      setloading(true);
      let res;
      if (
        category === "jewelery" ||
        category === "electronics" ||
        category === "men's clothing" ||
        category === "women's clothing"
      ) {
        res = await axiosInstance.get(`/products/category/${category}`);
      } else {
        res = await axiosInstance.get("/products");
      }
      setproductData(res.data);
    } catch (e) {
      toast.error(e);
    } finally {
      setloading(false);
    }
  };
  useEffect(() => {
    getProduct();
  }, [category]);

  const filterBar =
    "mb-8 flex flex-col gap-3 rounded-3xl border border-white/10 bg-[#111111] p-4 md:flex-row";

  const increaseProduct = (id) => {
    setstoreProduct((prev) =>
      prev
        .map((val) =>
          val.id === id ? { ...val, quantity: (val.quantity ?? 1) + 1 } : val,
        )
        .filter((val) => val.quantity > 0),
    );
  };

  const decreaseProduct = (id) => {
    setstoreProduct((prev) =>
      prev.map((val) =>
        val.id === id ? { ...val, quantity: (val.quantity ?? 1) - 1 } : val,
      ),
    ).filter((val) => val.quantity > 0);
  };

  const dltProduct = (id) => {
    setstoreProduct((prev) => prev.filter((val) => val.id !== id));
  };

  if (loading) {
    return (
      <section className="font-dm-sans min-h-screen bg-[#0c0c0c] py-8 text-white sm:py-12">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10">
            <p className="mb-3 text-xs font-bold uppercase tracking-[.25em] text-[#c8f400]">
              Curated for you
            </p>
            <h1 className="font-syne text-3xl font-extrabold tracking-tight sm:text-4xl">
              All Products
            </h1>
            <p className="mt-2 text-gray-500">Discover products you'll love.</p>
          </div>

          {/* Search and filter UI only */}
          <div className={filterBar}>
            <div className="relative flex-1">
              <svg
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
                width="19"
                height="19"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <circle cx="11" cy="11" r="7" />
                <path d="m16 16 4 4" />
              </svg>
              <input
                type="text"
                placeholder="Search products..."
                className={`${inputBase} w-full py-3.5 pl-12 pr-4 text-white`}
              />
            </div>

            <select
              defaultValue="All Categories"
              className={`${inputBase} px-5 py-3.5 text-gray-300`}
            >
              <option>All Categories</option>
              <option>Electronics</option>
              <option>Accessories</option>
              <option>Footwear</option>
            </select>

            <select
              defaultValue="Featured"
              className={`${inputBase} px-5 py-3.5 text-gray-300`}
            >
              <option>Featured</option>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
              <option>Name: A to Z</option>
            </select>
          </div>

          <div className="flex justify-center py-32 text-[#c8f400]">
            Loading products...
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="font-dm-sans min-h-screen bg-[#0c0c0c] py-8 text-white sm:py-12">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10">
          <p className="mb-3 text-xs font-bold uppercase tracking-[.25em] text-[#c8f400]">
            Curated for you
          </p>
          <h1 className="font-syne text-3xl font-extrabold tracking-tight sm:text-4xl">
            All Products
          </h1>
          <p className="mt-2 text-gray-500">Discover products you'll love.</p>
        </div>

        {/* Search and filter */}
        <div className="mb-8 rounded-3xl border border-white/10 bg-[#111111] p-4">
          <div className="flex flex-col gap-3 md:flex-row">
            <div className="relative flex-1">
              <svg
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
                width="19"
                height="19"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <circle cx="11" cy="11" r="7" />
                <path d="m16 16 4 4" />
              </svg>
              <input
                type="text"
                placeholder="Search products..."
                value={searchItem}
                className={`${inputBase} w-full py-3.5 pl-12 pr-11 text-white`}
                onChange={(val) => {
                  setsearchItem(val.target.value);
                }}
              />
              {hasSearch && (
                <button
                  type="button"
                  aria-label="Clear search"
                  onClick={() => setsearchItem("")}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 transition hover:text-white"
                >
                  <X size={16} />
                </button>
              )}
            </div>

            <select
              value={category || "All Categories"}
              className={`${inputBase} px-5 py-3.5 text-gray-300`}
              onChange={(val) => {
                setcategory(val.target.value);
              }}
            >
              <option value="All Categories">All Categories</option>
              <option value="electronics">Electronics</option>
              <option value="jewelery">Jewelry</option>
              <option value="men's clothing">Men's Clothing</option>
              <option value="women's clothing">Women's Clothing</option>
            </select>

            <select
              value={sortBy || "all"}
              className={`${inputBase} px-5 py-3.5 text-gray-300`}
              onChange={(val) => {
                setsortBy(val.target.value);
              }}
            >
              <option value={"all"}>Featured</option>
              <option value={"low-to-high"}>Price: Low to High</option>
              <option value={"high-to-low"}>Price: High to Low</option>
              <option value={"name-a-z"}>Name: A to Z</option>
            </select>

            {hasFilters && (
              <button
                type="button"
                onClick={clearAll}
                className="flex items-center justify-center gap-2 rounded-2xl border border-red-500/30 bg-red-500/10 px-5 py-3.5 text-sm font-medium text-red-400 transition hover:bg-red-500/20"
              >
                <X size={15} /> Clear
              </button>
            )}
          </div>

          {hasFilters && (
            <div className="mt-4 flex flex-wrap items-center gap-2 border-t border-white/10 pt-4">
              {hasCategory && (
                <span className={chip}>
                  {categoryLabels[category] || category}
                  <button
                    type="button"
                    aria-label="Remove category"
                    onClick={() => setcategory("All Categories")}
                  >
                    <X size={12} />
                  </button>
                </span>
              )}
              {hasSearch && (
                <span className={chip}>
                  "{searchItem}"
                  <button
                    type="button"
                    aria-label="Remove search"
                    onClick={() => setsearchItem("")}
                  >
                    <X size={12} />
                  </button>
                </span>
              )}
              {hasSort && (
                <span className={chip}>
                  {sortLabels[sortBy]}
                  <button
                    type="button"
                    aria-label="Remove sort"
                    onClick={() => setsortBy("all")}
                  >
                    <X size={12} />
                  </button>
                </span>
              )}
            </div>
          )}
        </div>

        {/* Product count */}
        <div className="mb-6 flex items-center justify-between">
          <p className="text-sm text-gray-400">
            Showing {displayProducts.length} products
          </p>

          <span className="h-1 w-12 rounded-full bg-[#c8f400]" />
        </div>

        {/* Product grid / empty state */}
        {displayProducts.length > 0 ? (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {displayProducts.map((product, index) => (
              <ProductCard key={product.id} product={product} index={index} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center px-4 py-24 text-center">
            <PackageSearch
              size={72}
              strokeWidth={1.25}
              className="mb-6 text-white/20"
            />
            <h2 className="font-syne text-2xl font-extrabold text-gray-400 sm:text-3xl">
              No products found
            </h2>
            <p className="mt-3 text-sm text-gray-600 sm:text-base">
              {hasSearch
                ? `No results for "${searchItem}"`
                : "Try changing your filters"}
            </p>
            <button
              type="button"
              onClick={clearAll}
              className="mt-8 rounded-2xl border border-white/15 px-7 py-3.5 text-sm font-medium text-gray-300 transition hover:border-[#c8f400]/60 hover:text-[#c8f400]"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>
      {cartOpen && (
        <div className="font-dm-sans fixed inset-0 z-[100] flex justify-end">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/80 backdrop-blur-[5px]"
            onClick={() => setcartOpen(false)}
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
                className="flex h-9 w-9 items-center justify-center rounded-xl text-gray-400 transition hover:bg-white/5 hover:text-white"
                onClick={() => setcartOpen(false)}
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
                    onClick={() => setcartOpen(false)}
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
                            toast.success("Quantity Updated")

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
                            toast.success("Quantity Updated")
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
                            toast.success("Product Removed")

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

                <button className="font-syne flex w-full items-center justify-center gap-3 rounded-2xl bg-[#c8f400] py-3 text-base font-bold text-black transition duration-300 hover:-translate-y-0.5 hover:bg-[#dcff35] hover:shadow-[0_10px_35px_rgba(200,244,0,0.15)]">
                  Checkout <ArrowRight size={18} onClick={()=>{
                    setcartOpen(false)
                    setstoreProduct()
                    toast.success("Order Placed Successfully 🎉")
                  }}/>
                </button>

                <button
                  className="mt-4 w-full text-center text-sm text-gray-500 transition hover:text-red-400"
                  onClick={() => {setstoreProduct([])
                    toast.success("All Products Removed Successfully")
                  }}

                >
                  Clear cart
                </button>
              </footer>
            )}
          </aside>
        </div>
      )}{" "}
    </section>
  );
};

export default Products;
