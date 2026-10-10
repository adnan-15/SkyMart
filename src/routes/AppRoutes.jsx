import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router";
import Register from "../pages/Register";
import Login from "../pages/Login";
import AuthLayout from "../layout/AuthLayout";
import Home from "../pages/Home"
import Products from "../pages/Products"
import About from "../pages/About"

const AppRoutes = () => {
  let router = createBrowserRouter([
    {
      path: "/",
      element: <AuthLayout />,
      children: [
        {
          path: "",
          element: <Login />,
        },
        {
          path: "register",
          element: <Register />,
        },
      ],
    },
    {
      path: "/home",
      element: <Home />,
    },
    ,
    {
      path: "/products",
      element: <Products />,
    },
    {
      path: "/about",
      element: <About/>,
    },
  ]);

  return <RouterProvider router={router} />;
};

export default AppRoutes;
