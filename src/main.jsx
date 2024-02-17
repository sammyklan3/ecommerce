import './index.css';
import React from 'react';
import * as ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { Home } from "./pages/home/Home";
import { Checkout } from "./pages/checkout/Checkout";
import { Cart } from "./pages/cart/Cart";
import { NoPage } from './pages/nopage/NoPage';
import { Login } from './pages/login/Login';
import { Signup } from "./pages/signup/Signup";
import { Admin } from "./admin/pages/home/Admin";
import { Account } from "./pages/Account/Account";
import { ProductCreation } from './admin/productCreation/ProductCreation';
import { Products } from "./admin/pages/products/Products";
import { ProductDetail } from "./pages/product/product";
import { CartProvider } from './context/Cart.jsx';
import { AuthProvider } from './context/AuthContext.jsx';
import { Analytics } from '@vercel/analytics/react';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/product/:ProductID",
    element: <ProductDetail />,
  },
  {
    path: "/adminDashboard",
    element: <Admin />,
  },
  {
    path: "/checkout",
    element: <Checkout />,
  },
  {
    path: "/cart",
    element: <Cart />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/account",
    element: <Account />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/admin/createproduct",
    element: < ProductCreation />,
  },
  {
    path: "/admin/products",
    element: < Products />,
  },
  {
    path: "*",
    element: <NoPage />,
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <AuthProvider>
        <CartProvider>
          <Analytics />
          <RouterProvider router={router} />
        </CartProvider>
      </AuthProvider>
  </React.StrictMode>,
)
