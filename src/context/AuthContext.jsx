import { createContext, useEffect, useState } from "react";
import { axiosInstance } from "../config/axiosInstance";
import { toast } from "react-hot-toast";
import { FaCheck } from "react-icons/fa";
import { FaXmark } from "react-icons/fa6";
export const Auth = createContext();

export const AuthProvider = ({ children }) => {
  const [registerU, setRegister] = useState(
    JSON.parse(localStorage.getItem("register")) || [],
  );

  const [login, setLogin] = useState(JSON.parse(localStorage.getItem("login")));

  const [product, setproduct] = useState();

  let getProduct = async () => {
    try {
      let res = await axiosInstance.get("/products");
      setproduct(res.data);
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
    }
  };
  useEffect(() => {
    getProduct();
  }, []);

  console.log("Login : ", login);
  console.log("Register : ", registerU);

  const [productData, setproductData] = useState([]);
  const [loading, setloading] = useState(true);
  const [category, setcategory] = useState("All Categories");
  const [searchItem, setsearchItem] = useState("");
  const [sortBy, setsortBy] = useState("all");
  const [storeProduct, setstoreProduct] = useState([]);
  const [loadedEmail, setloadedEmail] = useState(null);
  useEffect(() => {
    if (login) {
      try {
        const cart = JSON.parse(localStorage.getItem(login.email) || "[]");
        setstoreProduct(Array.isArray(cart) ? cart : []);
        setloadedEmail(login.email);
      } catch (e) {
        console.log(e);
        setstoreProduct([]);
        setloadedEmail(login.email);
      }
    } else {
      setstoreProduct([]);
      setloadedEmail(null);
    }
  }, [login]);

  useEffect(() => {
    if (login && loadedEmail === login.email) {
      localStorage.setItem(login.email, JSON.stringify(storeProduct));
    }
  }, [storeProduct, login, loadedEmail]);

  const [cartOpen, setcartOpen] = useState(false);
  return (
    <Auth.Provider
      value={{
        registerU,
        setRegister,
        cartOpen,
        setcartOpen,
        login,
        setLogin,
        product,
        storeProduct,
        setstoreProduct,
        setproduct,
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
      }}
    >
      {children}
    </Auth.Provider>
  );
};
