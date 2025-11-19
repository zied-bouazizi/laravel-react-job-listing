import { useState } from "react";
import axiosClient from "../axios";
import { toast } from "react-toastify";

function UpdatePasswordForm() {
  const [form, setForm] = useState({
    current_password: "",
    password: "",
    password_confirmation: "",
  });
  const [error, setError] = useState({ __html: "" });

  const onSubmit = (ev) => {
    ev.preventDefault();
    setError({ __html: "" });

    axiosClient
      .put("/profile/password", form)
      .then(({ data }) => {
        setForm({
          current_password: "",
          password: "",
          password_confirmation: "",
        });
        toast.success(data.message);
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
    <div className="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0">
      {error.__html && (
        <div
          className="bg-red-500 rounded py-2 px-3 mb-4 text-white"
          dangerouslySetInnerHTML={error}
        ></div>
      )}
      <form onSubmit={onSubmit}>
        <h2 className="text-3xl font-semibold">Update Password</h2>

        <p className="text-gray-600 mb-6">
          Ensure your account is using a long, random password to stay secure.
        </p>

        <div className="mb-4">
          <label
            htmlFor="current_password"
            className="block text-gray-700 font-bold mb-2"
          >
            Current Password
          </label>
          <input
            type="password"
            id="current_password"
            name="current_password"
            value={form.current_password}
            onChange={(ev) =>
              setForm({ ...form, current_password: ev.target.value })
            }
            className="border rounded w-full py-2 px-3 mb-2 focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-indigo-500"
            required
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="password"
            className="block text-gray-700 font-bold mb-2"
          >
            New Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={form.password}
            onChange={(ev) => setForm({ ...form, password: ev.target.value })}
            className="border rounded w-full py-2 px-3 mb-2 focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-indigo-500"
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
            value={form.password_confirmation}
            onChange={(ev) =>
              setForm({ ...form, password_confirmation: ev.target.value })
            }
            className="border rounded w-full py-2 px-3 focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-indigo-500"
            required
          />
        </div>

        <div className="mb-4">
          <button
            type="submit"
            className="bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
}

export default UpdatePasswordForm;
