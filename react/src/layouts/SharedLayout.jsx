import { useStateContext } from "../contexts/ContextProvider";
import DefaultLayout from "./DefaultLayout";
import GuestLayout from "./GuestLayout";

function SharedLayout() {
  const { userToken } = useStateContext();
  const Layout = userToken ? DefaultLayout : GuestLayout;

  return <Layout />;
}

export default SharedLayout;
