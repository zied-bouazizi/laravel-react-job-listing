import { useState, useEffect } from "react";
import CompanyForm from "../components/CompanyForm";
import UpdatePasswordForm from "../components/UpdatePasswordForm";
import UpdateProfileInformationForm from "../components/UpdateProfileInformationForm";
import axiosClient from "../axios";
import Spinner from "../components/Spinner";
import DeleteUserForm from "../components/DeleteUserForm";

function Profile() {
  const [user, setUser] = useState({});
  const [company, setCompany] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axiosClient.get("/profile").then(({ data }) => {
      setUser({
        id: data.id,
        name: data.name,
        email: data.email,
      });
      setCompany(data.company);
      setLoading(false);
    });
  }, []);

  return (
    <section>
      <div className="container m-auto max-w-2xl py-24 space-y-6">
        {loading ? (
          <Spinner loading={loading} />
        ) : (
          <>
            <UpdateProfileInformationForm user={user} />

            <UpdatePasswordForm />

            <CompanyForm company={company} />

            <DeleteUserForm />
          </>
        )}
      </div>
    </section>
  );
}

export default Profile;
