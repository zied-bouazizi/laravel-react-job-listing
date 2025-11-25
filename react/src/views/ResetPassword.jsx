import { useState } from "react";
import { useParams, useSearchParams, useNavigate } from "react-router-dom";
import axiosClient from "../axios";

function ResetPassword() {
  const { token } = useParams(); 
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const emailFromUrl = searchParams.get("email");
  const [email, setEmail] = useState(emailFromUrl || "");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [error, setError] = useState({});

  const onSubmit = (ev) => {
      ev.preventDefault();
      setError({ __html: "" });

      axiosClient.post('/reset-password', { 
            token,
            email,
            password,
            password_confirmation: passwordConfirmation
       })
      .then(({ data }) => {
            navigate("/login", {
                state: { message: data.status },
            });
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

            <form onSubmit={onSubmit}>
                <h2 className="text-3xl text-center font-semibold mb-6">Reset Password</h2>

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

                <div className="mb-4">
                    <label htmlFor="password" className="block text-gray-700 font-bold mb-2">
                        Password
                    </label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={password}
                        onChange={ev => setPassword(ev.target.value)}
                        className="border rounded w-full py-2 px-3 mb-2 focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-indigo-500"
                        placeholder="Create a password"
                        required
                    />
                </div>

                <div className="mb-6">
                    <label htmlFor="password_confirmation" className="block text-gray-700 font-bold mb-2">
                        Confirm Password
                    </label>
                    <input
                        type="password"
                        id="password_confirmation"
                        name="password_confirmation"
                        value={passwordConfirmation}
                        onChange={ev => setPasswordConfirmation(ev.target.value)}
                        className="border rounded w-full py-2 px-3 focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-indigo-500"
                        placeholder="Confirm your password"
                        required
                    />
                </div>

                <button
                type="submit"
                className="bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline"
                >
                Reset Password
                </button>
            </form>
        </div>
      </div>
    </section>
  );
}

export default ResetPassword