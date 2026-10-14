import { createContext, useEffect, useState } from "react";
import { axiosInstance } from "../config/axiosInstance";
import { toast } from "react-toastify";

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
      toast.error(e);
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
const [storeProduct, setstoreProduct] = useState([])

  const [cartOpen, setcartOpen] = useState(false)
  return (
    <Auth.Provider
      value={{ registerU, setRegister,cartOpen, setcartOpen, login, setLogin, product,storeProduct, setstoreProduct, setproduct,productData, setproductData ,loading, setloading,category, setcategory,searchItem, setsearchItem,sortBy, setsortBy}}
    >
      {children}
    </Auth.Provider>
  );
};
