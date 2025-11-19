import { useState, useEffect } from "react";
import UpdatePasswordForm from "../components/UpdatePasswordForm";
import UpdateProfileInformationForm from "../components/UpdateProfileInformationForm";
import axiosClient from "../axios";
import Spinners from "../components/Spinners";

function Profile() {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axiosClient.get("/profile").then(({ data }) => {
      setUser({
        id: data.id,
        name: data.name,
        email: data.email,
      });
      setLoading(false);
    });
  }, []);

  return (
    <section className="bg-indigo-50">
      <div className="container m-auto max-w-2xl py-24 space-y-6">
        {loading ? (
          <Spinners loading={loading} />
        ) : (
          <>
            <UpdateProfileInformationForm user={user} />

            <UpdatePasswordForm />
          </>
        )}
      </div>
    </section>
  );
}

export default Profile;
