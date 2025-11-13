import { Navigate, Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useStateContext } from "../contexts/ContextProvider";

function GuestLayout() {
  const { userToken } = useStateContext();

  if (userToken) {
    return <Navigate to="/" />;
  }

  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}

export default GuestLayout;
