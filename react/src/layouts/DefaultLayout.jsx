import { Navigate, Outlet } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";
import axiosClient from "../axios";

function DefaultLayout() {
  const { userToken, setCurrentUser } = useStateContext();

  if (!userToken) {
    return <Navigate to="/login" />;
  }

  useEffect(() => {
    axiosClient.get("/profile/user").then(({ data }) => {
      setCurrentUser(data);
    });
  }, []);

  return (
    <>
      <Outlet />
    </>
  );
}

export default DefaultLayout;
