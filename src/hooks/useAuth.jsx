import React, { useContext } from "react";
import { useNavigate } from "react-router";
import { Auth } from "../context/AuthContext";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { FaCheck } from "react-icons/fa";
import { FaXmark } from "react-icons/fa6";
export const useAuth = () => {
  const { registerU, setRegister, login, setLogin } = useContext(Auth);

  let navigate = useNavigate();

  let {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm();

  let registerFormSubmit = (data) => {
    let userr = registerU.find((val) => {
      return val.email === data.email;
    });
    if (userr) {
      toast.error("Email already Exist!", {
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
      return;
    }
    const { confirmPassword, ...user } = data;
    let arr = [...registerU, user];
    setRegister(arr);
    setLogin(user);
    localStorage.setItem("register", JSON.stringify(arr));
    localStorage.setItem("login", JSON.stringify(user));
    toast.success("User register successfully", {
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
    navigate("/main");
    reset();
  };

  const loginFormSubmit = (data) => {
    // Compare emails ignoring capital letters and extra spaces
    const email = data.email.trim().toLowerCase();

    let user = registerU.find((val) => {
      return (
        val.email.toLowerCase() === email && val.password === data.password
      );
    });

    if (!user) {
      toast.error("Invalid credentials or user not found", {
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
      reset();
      return;
    }

    setLogin(user);
    localStorage.setItem("login", JSON.stringify(user));
    toast.success("User logged in successfully", {
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
    navigate("/home");
    reset();
  };
  return {
    navigate,
    register,
    handleSubmit,
    reset,
    errors,
    watch,
    loginFormSubmit,
    registerFormSubmit,
  };
};
