import { useStateContext } from "../contexts/ContextProvider";
import DefaultLayout from "./DefaultLayout";
import GuestLayout from "./GuestLayout";

function SharedLayout({ children }) {
  const { userToken } = useStateContext();
  const Layout = userToken ? DefaultLayout : GuestLayout;

  return <Layout>{children}</Layout>;
}

export default SharedLayout;
