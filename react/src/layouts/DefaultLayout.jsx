import { Navigate, Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useStateContext } from "../contexts/ContextProvider";

function DefaultLayout() {
  const { userToken } = useStateContext();

  if (!userToken) {
    return <Navigate to="/login" />;
  }

  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}

export default DefaultLayout;
