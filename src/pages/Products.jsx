import React, { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import { axiosInstance } from "../config/axiosInstance";
import { toast } from "react-toastify";

const Products = () => {
  const [productData, setproductData] = useState();
  const [loading, setloading] = useState(true);
  let getProduct = async () => {
    try {
      let res = await axiosInstance.get("/products");
      setproductData(res.data);
      setloading(false);
    } catch (e) {
      toast.error(e);
    }
  };

  useEffect(() => {
    getProduct();
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#0c0c0c] text-[#c8f400]">
        Loading products...
      </div>
    );
  }
  return (
    <section className="min-h-screen bg-[#0c0c0c] px-5 py-10 text-white sm:px-8">
      <div className="mx-auto max-w-[1460px]">
        {/* Heading */}
        <div className="mb-10">
          <p className="mb-3 text-xs font-bold uppercase tracking-[.25em] text-[#c8f400]">
            Curated for you
          </p>

          <h1 className="font-['Syne'] text-3xl font-extrabold sm:text-4xl">
            All Products
          </h1>

          <p className="mt-2 text-gray-500">Discover products you'll love.</p>
        </div>

        {/* Search and filter UI only */}
        <div className="mb-7 flex flex-col gap-3 rounded-[22px] border border-white/10 bg-[#111111] p-4 md:flex-row">
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
              className="w-full rounded-2xl border border-white/10 bg-[#1d1d1d] py-3.5 pl-12 pr-4 text-sm text-white outline-none transition focus:border-[#c8f400]/60"
            />
          </div>

          <select
            defaultValue="All Categories"
            className="rounded-2xl border border-white/10 bg-[#1d1d1d] px-5 py-3.5 text-sm text-gray-300 outline-none transition focus:border-[#c8f400]/60"
          >
            <option>All Categories</option>
            <option>Electronics</option>
            <option>Accessories</option>
            <option>Footwear</option>
          </select>

          <select
            defaultValue="Featured"
            className="rounded-2xl border border-white/10 bg-[#1d1d1d] px-5 py-3.5 text-sm text-gray-300 outline-none transition focus:border-[#c8f400]/60"
          >
            <option>Featured</option>
            <option>Price: Low to High</option>
            <option>Price: High to Low</option>
            <option>Name: A to Z</option>
          </select>
        </div>

        {/* Product count */}
        <div className="mb-5 flex items-center justify-between">
          <p className="text-sm text-gray-400">
            Showing {productData.length} products
          </p>

          <span className="h-1 w-12 rounded-full bg-[#c8f400]" />
        </div>

        {/* Product grid */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {productData.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>
      </div>

      
    </section>
  );
};

export default Products;
