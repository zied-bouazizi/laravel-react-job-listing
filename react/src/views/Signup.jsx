import { Link } from "react-router-dom";
import { useState } from "react";
import axiosClient from "../axios";
import { useStateContext } from "../contexts/ContextProvider";
import CompanyInfo from "../components/CompanyInfo";

function Signup() {
  const { setCurrentUser, setUserToken } = useStateContext();
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
    company: {
      name: "",
      description: "",
      email: "",
      phone: "",
    },
  });
  const [error, setError] = useState({ __html: "" });

  const onChangeCompany = (companyData) => {
    setUserData({ ...userData, company: companyData });
  };

  const onSubmit = (ev) => {
    ev.preventDefault();
    setError({ __html: "" });

    axiosClient
      .post("/register", {
        name: userData.name,
        email: userData.email,
        password: userData.password,
        password_confirmation: userData.password_confirmation,
        company: userData.company,
      })
      .then(({ data }) => {
        setCurrentUser(data.user);
        setUserToken(data.token);
      })
      .catch((error) => {
        if (error.response) {
          const finalErrors = Object.values(error.response.data.errors).reduce(
            (accum, next) => [...accum, ...next],
            []
          );
          setError({ __html: finalErrors.join("<br>") });
        }
      });
  };

  return (
    <section className="bg-indigo-50">
      <div className="container m-auto max-w-2xl py-24">
        <div className="bg-white px-6 py-8 shadow-md rounded-md border m-4 md:m-0">
          {error.__html && (
            <div
              className="bg-red-500 rounded py-2 px-3 mb-2 text-white"
              dangerouslySetInnerHTML={error}
            ></div>
          )}

          <form onSubmit={onSubmit}>
            <h2 className="text-3xl text-center font-semibold mb-6">
              Create Account
            </h2>

            <div className="mb-4">
              <label
                htmlFor="name"
                className="block text-gray-700 font-bold mb-2"
              >
                Full Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={userData.name}
                onChange={(ev) =>
                  setUserData({ ...userData, name: ev.target.value })
                }
                className="border rounded w-full py-2 px-3 mb-2 focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-indigo-500"
                placeholder="Your full name"
                required
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-gray-700 font-bold mb-2"
              >
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={userData.email}
                onChange={(ev) =>
                  setUserData({ ...userData, email: ev.target.value })
                }
                className="border rounded w-full py-2 px-3 mb-2 focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-indigo-500"
                placeholder="you@example.com"
                required
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="password"
                className="block text-gray-700 font-bold mb-2"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={userData.password}
                onChange={(ev) =>
                  setUserData({ ...userData, password: ev.target.value })
                }
                className="border rounded w-full py-2 px-3 mb-2 focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-indigo-500"
                placeholder="Create a password"
                required
              />
            </div>

            <div className="mb-6">
              <label
                htmlFor="password_confirmation"
                className="block text-gray-700 font-bold mb-2"
              >
                Confirm Password
              </label>
              <input
                type="password"
                id="password_confirmation"
                name="password_confirmation"
                value={userData.password_confirmation}
                onChange={(ev) =>
                  setUserData({
                    ...userData,
                    password_confirmation: ev.target.value,
                  })
                }
                className="border rounded w-full py-2 px-3 focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-indigo-500"
                placeholder="Confirm your password"
                required
              />
            </div>

            <CompanyInfo
              userCompany={userData.company}
              onChangeCompany={onChangeCompany}
            />

            <div className="mb-4">
              <button
                type="submit"
                className="bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline"
              >
                Sign Up
              </button>
            </div>

            <p className="text-center text-gray-600">
              Already have an account?
              <Link
                to="/login"
                className="text-indigo-500 hover:text-indigo-600 font-semibold ml-1"
              >
                Login
              </Link>
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}

export default Signup;
