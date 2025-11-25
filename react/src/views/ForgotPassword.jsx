import { useState } from "react";
import axiosClient from "../axios";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState(null);
  const [error, setError] = useState({ __html: "" });

  const onSubmit = (ev) => {
      ev.preventDefault();
      setError({ __html: "" });
      setStatus(null);

      axiosClient.post('/forgot-password', { email })
      .then(({data}) => {
          setStatus(data.status);
      })
      .catch((error) => {
        if (error.response) {
          const finalErrors = Object.values(error.response.data.errors).reduce((accum, next) => [...accum, ...next], []);
          setError({__html: finalErrors.join('<br>')});
        }
    });
  };

  return (
    <section>
      <div className="container m-auto max-w-md py-24">
        <div className="bg-white px-6 py-8 shadow-md rounded-md border m-4 md:m-0">
            {error.__html && (
              <div className="bg-red-500 rounded py-2 px-3 mb-4 text-white" dangerouslySetInnerHTML={error}></div>
            )}

            {status && <div className="bg-green-500 rounded py-2 px-3 mb-4 text-white">{status}</div>}

            <form onSubmit={onSubmit}>
                <h2 className="text-3xl text-center font-semibold mb-6">Forgot Password</h2>

                <div className="mb-4">
                    <label htmlFor="email" className="block text-gray-700 font-bold mb-2">
                        Email Address
                    </label>
                    <input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="border rounded w-full py-2 px-3 mb-2 focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-indigo-500"
                        required
                    />
                </div>

                <button
                type="submit"
                className="bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline"
                >
                Send Reset Link
                </button>
            </form>
        </div>
      </div>
    </section>
  );
}

export default ForgotPassword