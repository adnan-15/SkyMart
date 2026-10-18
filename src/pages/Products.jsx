import React, { useContext, useEffect } from "react";
import ProductCard from "../components/ProductCard";
import { axiosInstance } from "../config/axiosInstance";
import { toast } from "react-hot-toast";
import { Auth } from "../context/AuthContext";
import { FaXmark } from "react-icons/fa6";
import {
  X,
  PackageSearch,
} from "lucide-react";
import {  useParams } from "react-router";
import CardOverview from "../components/CardOverview";
const inputBase =
  "rounded-xl border border-white/10 bg-[#1d1d1d] text-sm outline-none transition [color-scheme:dark] focus:border-[#c8f400]/60";
const selectClass = `${inputBase} w-full px-4 py-3 text-gray-300 md:w-auto`;

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
    setsortBy
  } = useContext(Auth);
  let {id} = useParams()


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
    "inline-flex items-center gap-1.5 rounded-full border border-[#c8f400]/40 bg-[#c8f400]/10 px-2.5 py-1 text-xs font-medium text-[#c8f400]";

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
      toast.error(e, {
  duration: 2500,
  position: "bottom-right",
  icon: (
    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#ff4d4f]">
      <FaXmark className="text-sm text-white" />
    </div>
  ),
  style: {
    background: "#141414",
    color: "#fff",
    border: "1px solid #ff4d4f",
    borderRadius: "10px",
    padding: "10px 15px",
    fontSize: "14px",
    fontWeight: "600",
    boxShadow: "0 8px 30px rgba(255, 77, 79, 0.15)",
  },
});
    } finally {
      setloading(false);
    }
  };
  
  useEffect(() => {
    getProduct();
  }, [category]);

  const filterBar =
    "mb-6 flex flex-col gap-2.5 rounded-2xl border border-white/10 bg-[#111111] p-3 sm:p-4 md:flex-row md:items-center";

  const pageHeader = (
    <div className="mb-6">
      <p className="mb-2 text-[11px] font-bold uppercase tracking-[.2em] text-[#c8f400]">
        Curated for you
      </p>
      <h1 className="font-syne text-2xl font-extrabold tracking-tight sm:text-3xl">
        All Products
      </h1>
      <p className="mt-1.5 text-sm text-gray-500">Discover products you'll love.</p>
    </div>
  );

  const searchIcon = (
    <svg
      className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <circle cx="11" cy="11" r="7" />
      <path d="m16 16 4 4" />
    </svg>
  );

  if (loading) {
    return (
      <section className="font-dm-sans min-h-screen bg-[#0c0c0c] py-6 text-white sm:py-10">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          {pageHeader}

          {/* Search and filter UI only */}
          <div className={filterBar}>
            <div className="relative flex-1">
              {searchIcon}
              <input
                type="text"
                placeholder="Search products..."
                className={`${inputBase} w-full py-3 pl-11 pr-4 text-white`}
              />
            </div>

            <select
              defaultValue="All Categories"
              className={selectClass}
            >
              <option>All Categories</option>
              <option>Electronics</option>
              <option>Accessories</option>
              <option>Footwear</option>
            </select>

            <select
              defaultValue="Featured"
              className={selectClass}
            >
              <option>Featured</option>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
              <option>Name: A to Z</option>
            </select>
          </div>

          <div className="flex justify-center py-20 text-sm text-[#c8f400]">
            Loading products...
          </div>
        </div>
      </section>
    );
  }

  if(id) return <CardOverview/>
  return (
    
    <section className="font-dm-sans min-h-screen bg-[#0c0c0c] py-6 text-white sm:py-10">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        {pageHeader}

        {/* Search and filter */}
        <div className="mb-6 rounded-2xl border border-white/10 bg-[#111111] p-3 sm:p-4">
          <div className="flex flex-col gap-2.5 md:flex-row md:items-center">
            <div className="relative flex-1">
              {searchIcon}
              <input
                type="text"
                placeholder="Search products..."
                value={searchItem}
                className={`${inputBase} w-full py-3 pl-11 pr-10 text-white`}
                onChange={(val) => {
                  setsearchItem(val.target.value);
                }}
              />
              {hasSearch && (
                <button
                  type="button"
                  aria-label="Clear search"
                  onClick={() => setsearchItem("")}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-500 transition hover:text-white"
                >
                  <X size={16} />
                </button>
              )}
            </div>

            <select
              value={category || "All Categories"}
              className={selectClass}
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
              className={selectClass}
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
                className="flex items-center justify-center gap-2 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm font-medium text-red-400 transition hover:bg-red-500/20"
              >
                <X size={14} /> Clear
              </button>
            )}
          </div>

          {hasFilters && (
            <div className="mt-3 flex flex-wrap items-center gap-2 border-t border-white/10 pt-3">
              {hasCategory && (
                <span className={chip}>
                  {category}
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
                <span className={`${chip} max-w-full`}>
                  <span className="truncate">"{searchItem}"</span>
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
                  {sortBy}
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

        <div className="mb-4 flex items-center justify-between">
          <p className="text-sm text-gray-400">
            Showing {displayProducts.length} products
          </p>

          <span className="h-1 w-10 rounded-full bg-[#c8f400]" />
        </div>

        {displayProducts.length > 0 ? (
          <div className="grid grid-cols-1 gap-4 min-[520px]:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {displayProducts.map((product, index) => (
              <ProductCard key={product.id} product={product} index={index} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center px-4 py-16 text-center">
            <PackageSearch
              size={56}
              strokeWidth={1.25}
              className="mb-4 text-white/20"
            />
            <h2 className="font-syne text-xl font-extrabold text-gray-400 sm:text-2xl">
              No products found
            </h2>
            <p className="mt-2 max-w-full break-words text-sm text-gray-600">
              {hasSearch
                ? `No results for "${searchItem}"`
                : "Try changing your filters"}
            </p>
            <button
              type="button"
              onClick={clearAll}
              className="mt-6 rounded-xl border border-white/15 px-5 py-2.5 text-sm font-medium text-gray-300 transition hover:border-[#c8f400]/60 hover:text-[#c8f400]"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default Products;