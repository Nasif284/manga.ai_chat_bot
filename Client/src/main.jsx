import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ChatPage, Dashboard, HomePage, Login, SignUp } from "./Pages/index.js";
import RootLayout from "./Layouts/RootLayout/RootLayout.jsx";
import DashboardLayout from "./Layouts/DashboardLayout/DashboardLayout.jsx";
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error("Add your Clerk Publishable Key to the .env file");
}

const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        element: <DashboardLayout />,
        children: [
          {
            path: "/dashboard",
            element: <Dashboard />,
          },
          {
            path: "/chat/:id",
            element: <ChatPage />,
          },
        ],
      },
      {
        path: "/login/*",
        element: <Login />,
      },
      {
        path: "/signUp/*",
        element: <SignUp />,
      },
    ],
  },
]);
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
