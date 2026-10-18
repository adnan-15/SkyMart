import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router";
import Register from "../pages/Register";
import Login from "../pages/Login";
import AuthLayout from "../layout/AuthLayout";
import Home from "../pages/Home";
import Products from "../pages/Products";
import About from "../pages/About";
import PublicRoute from "./PublicRoute";
import MainLayout from "../layout/MainLayout";
import ProtectedRoute from "./ProtectedRoute";
import CardOverview from "../components/CardOverview";
import Cart from "../components/Cart";

const AppRoutes = () => {
  let router = createBrowserRouter([
    {
      path: "/",
      element: <PublicRoute />,
      children: [
        {
          path: "",
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
      ],
    },
    {
      path: "/main",
      element: <ProtectedRoute />,
      children: [
        {
          path: "",
          element: <MainLayout />,
          children: [
            {
              path: "",
              element: <Home />,
            },

            {
              path: "products",
              element: <Products />,
            },
            {
              path: ":id",
              element: <CardOverview />,
            },
            {
              path: "about",
              element: <About />,
            },
            {
              path: "cart",
              element: <Cart />,
            },
          ],
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default AppRoutes;
