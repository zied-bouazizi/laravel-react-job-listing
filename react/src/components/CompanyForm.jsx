import { useState } from "react";
import axiosClient from "../axios";
import { toast } from "react-toastify";
import CompanyInfo from "./CompanyInfo";

function CompanyForm({ company }) {
  const [userCompany, setUserCompany] = useState({ ...company });
  const [error, setError] = useState({ __html: "" });

  const onChangeCompany = (companyData) => {
    setUserCompany((prev) => ({ ...prev, ...companyData }));
  };

  const onSubmit = (ev) => {
    ev.preventDefault();
    setError({ __html: "" });

    axiosClient
      .put("/profile/company", userCompany)
      .then(() => {
        toast.success("Company updated successfully.");
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
        <CompanyInfo
          userCompany={userCompany}
          onChangeCompany={onChangeCompany}
          isUpdate={true}
        />

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

export default CompanyForm;
