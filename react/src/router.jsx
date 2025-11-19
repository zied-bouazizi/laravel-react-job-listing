import { createBrowserRouter, Navigate } from "react-router-dom";
import Home from "./views/Home";
import Jobs from "./views/Jobs";
import AddJob from "./views/AddJob";
import Login from "./views/Login";
import Signup from "./views/Signup";
import ForgotPassword from "./views/ForgotPassword";
import ResetPassword from "./views/ResetPassword";
import NotFound from "./views/NotFound";
import DefaultLayout from "./layouts/DefaultLayout";
import GuestLayout from "./layouts/GuestLayout";
import SharedLayout from "./layouts/SharedLayout";
import Job from "./views/Job";
import Profile from "./views/Profile";
import RootLayout from "./layouts/RootLayout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        element: <SharedLayout />,
        children: [
          {
            path: "/home",
            element: <Navigate to="/" />,
          },
          {
            path: "/",
            element: <Home />,
          },
          {
            path: "/jobs",
            element: <Jobs />,
          },
          {
            path: "/jobs/:id",
            element: <Job />,
          },
        ],
      },
      {
        element: <DefaultLayout />,
        children: [
          {
            path: "/add-job",
            element: <AddJob />,
          },
          {
            path: "/profile",
            element: <Profile />,
          },
        ],
      },
      {
        element: <GuestLayout />,
        children: [
          {
            path: "/login",
            element: <Login />,
          },
          {
            path: "/register",
            element: <Signup />,
          },
          {
            path: "/forgot-password",
            element: <ForgotPassword />,
          },
          {
            path: "/password-reset/:token",
            element: <ResetPassword />,
          },
        ],
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
]);

export default router;
