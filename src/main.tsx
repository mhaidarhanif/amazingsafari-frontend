import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "@/index.css";

import { RootRoute, loader as rootLoader } from "@/routes/root";
import { ErrorPage } from "@/routes/error-page";
import { HomeRoute, loader as homeLoader } from "@/routes/home";
import {
  RegisterRoute,
  loader as registerLoader,
  action as registerAction,
} from "@/routes/register";
import {
  LoginRoute,
  loader as loginLoader,
  action as loginAction,
} from "@/routes/login";
import {
  UserDashboardRoute,
  loader as userDashboardLoader,
  action as userDashboardAction,
} from "@/routes/user-dashboard";
import { CartRoute, loader as cartLoader } from "@/routes/cart";
import { ProductsRoute, loader as productsLoader } from "@/routes/products";
import {
  ProductSlugRoute,
  loader as productSlugLoader,
  action as productSlugAction,
} from "@/routes/product";

const router = createBrowserRouter([
  {
    id: "root",
    path: "/",
    element: <RootRoute />,
    errorElement: <ErrorPage />,
    loader: rootLoader,
    children: [
      {
        path: "/",
        element: <HomeRoute />,
        loader: homeLoader,
      },
      {
        path: "/products",
        element: <ProductsRoute />,
        loader: productsLoader,
      },
      {
        path: "/products/:slug",
        element: <ProductSlugRoute />,
        loader: productSlugLoader,
        action: productSlugAction,
      },
      {
        path: "/register",
        element: <RegisterRoute />,
        loader: registerLoader,
        action: registerAction,
      },
      {
        path: "/login",
        element: <LoginRoute />,
        loader: loginLoader,
        action: loginAction,
      },
      {
        path: "/dashboard",
        element: <UserDashboardRoute />,
        loader: userDashboardLoader,
        action: userDashboardAction,
      },
      {
        path: "/cart",
        element: <CartRoute />,
        loader: cartLoader,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
