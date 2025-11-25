import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { ToastContainer } from "react-toastify";

function RootLayout() {
  return (
    <>
      <div className="bg-indigo-50 flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
          <Outlet />
        </main>
        <Footer />
        <ToastContainer />
      </div>
    </>
  );
}

export default RootLayout;
