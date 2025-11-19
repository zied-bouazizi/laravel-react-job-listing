import { useEffect, useState } from "react";

function CompanyInfo({ userCompany, onChangeCompany, isUpdate = false }) {
  const [companyData, setCompanyData] = useState({ ...userCompany });

  useEffect(() => {
    onChangeCompany(companyData);
  }, [companyData]);

  return (
    <>
      <h3 className={isUpdate ? "text-3xl font-semibold" : "text-2xl mb-5"}>
        Company Info
      </h3>

      {isUpdate && (
        <p className="text-gray-600 mb-6">Update your company information.</p>
      )}

      <div className="mb-4">
        <label
          htmlFor="company_name"
          className="block text-gray-700 font-bold mb-2"
        >
          Company Name
        </label>
        <input
          type="text"
          id="company_name"
          name="company_name"
          className="border rounded w-full py-2 px-3"
          placeholder="Company Name"
          required
          value={companyData.name}
          onChange={(ev) =>
            setCompanyData({ ...companyData, name: ev.target.value })
          }
        />
      </div>

      <div className="mb-4">
        <label
          htmlFor="company_description"
          className="block text-gray-700 font-bold mb-2"
        >
          Company Description
        </label>
        <textarea
          id="company_description"
          name="company_description"
          className="border rounded w-full py-2 px-3"
          rows="4"
          placeholder="What does your company do?"
          value={companyData.description || ""}
          onChange={(ev) =>
            setCompanyData({ ...companyData, description: ev.target.value })
          }
        ></textarea>
      </div>

      <div className="mb-4">
        <label
          htmlFor="contact_email"
          className="block text-gray-700 font-bold mb-2"
        >
          Contact Email
        </label>
        <input
          type="email"
          id="contact_email"
          name="contact_email"
          className="border rounded w-full py-2 px-3"
          placeholder="Email address for applicants"
          required
          value={companyData.email}
          onChange={(ev) =>
            setCompanyData({ ...companyData, email: ev.target.value })
          }
        />
      </div>

      <div className="mb-4">
        <label
          htmlFor="contact_phone"
          className="block text-gray-700 font-bold mb-2"
        >
          Contact Phone
        </label>
        <input
          type="tel"
          id="contact_phone"
          name="contact_phone"
          className="border rounded w-full py-2 px-3"
          placeholder="Optional phone for applicants"
          value={companyData.phone || ""}
          onChange={(ev) =>
            setCompanyData({ ...companyData, phone: ev.target.value })
          }
        />
      </div>
    </>
  );
}

export default CompanyInfo;
