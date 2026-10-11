import React, { useContext } from "react";
import { useNavigate } from "react-router";
import { Auth } from "../context/AuthContext";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

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
      toast.error("Email already exist");
      return;
    }
    const { confirmPassword, ...user } = data;
    let arr = [...registerU, user];
    setRegister(arr);
    setLogin(user);
    localStorage.setItem("register", JSON.stringify(arr));
    localStorage.setItem("login", JSON.stringify(user));
    toast.success("User Registered Successfully");
    navigate("/home");
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
      toast.error("Invalid credentials or user not found");
      reset();
      return;
    }

    setLogin(user);
    localStorage.setItem("login", JSON.stringify(user));
    toast.success("User logged in successfully");
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
