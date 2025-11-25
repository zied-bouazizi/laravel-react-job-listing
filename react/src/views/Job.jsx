import { FaArrowLeft, FaMapMarker } from "react-icons/fa";
import { Link, useNavigate, useParams } from "react-router-dom";
import axiosClient from "../axios";
import { useEffect, useState } from "react";
import Spinner from "../components/Spinner";
import NotFound from "./NotFound";
import { useStateContext } from "../contexts/ContextProvider";
import DeleteJobModal from "../components/DeleteJobModal";
import { toast } from "react-toastify";

function Job() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { currentUser } = useStateContext();
  const [listing, setListing] = useState({
    company: {},
  });
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [jobToDelete, setJobToDelete] = useState(null);

  useEffect(() => {
    axiosClient
      .get(`/listings/${id}`)
      .then(({ data }) => {
        setListing(data);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        if (error.response && error.response.status === 404) {
          setNotFound(true);
        }
      });
  }, []);

  if (notFound) {
    return <NotFound />;
  }

  const confirmJobDeletion = (id) => {
    setJobToDelete(id);
  };

  const closeModal = () => {
    setJobToDelete(null);
  };

  const onDeleteClick = () => {
    axiosClient.delete(`/listings/${jobToDelete}`).then(() => {
      navigate("/jobs");
      window.scrollTo({ top: 0, behavior: "smooth" });
      toast.success("Job deleted successfully");
    });
  };

  return (
    <>
      <section className="bg-white">
        <div className="container m-auto py-6 px-6">
          <Link
            to="/jobs"
            className="text-indigo-500 hover:text-indigo-600 flex items-center"
          >
            <FaArrowLeft className="mr-2" /> Back to Job Listings
          </Link>
        </div>
      </section>

      <section>
        <div className="container m-auto py-10 px-6">
          {loading ? (
            <Spinner loading={loading} />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-70/30 w-full gap-6">
              <main>
                <div className="bg-white p-6 rounded-lg shadow-md text-center md:text-left">
                  <div className="text-gray-500 mb-4">{listing.type}</div>
                  <h1 className="text-3xl font-bold mb-4">{listing.title}</h1>
                  <div className="text-gray-500 mb-4 flex align-middle justify-center md:justify-start">
                    <FaMapMarker className="text-orange-700 mr-1" />
                    <p className="text-orange-700">{listing.location}</p>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-md mt-6">
                  <h3 className="text-indigo-800 text-lg font-bold mb-6">
                    Job Description
                  </h3>

                  <p className="mb-4">{listing.description}</p>

                  <h3 className="text-indigo-800 text-lg font-bold mb-2">
                    Salary
                  </h3>

                  <p className="mb-4">{listing.salary} / Year</p>
                </div>
              </main>

              {/* Sidebar */}
              <aside>
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <h3 className="text-xl font-bold mb-6">Company Info</h3>

                  <h2 className="text-2xl">{listing.company.name}</h2>
                  <p className="my-2">{listing.company.description}</p>

                  <hr className="my-4" />

                  <h3 className="text-xl">Contact Email:</h3>
                  <p className="my-2 bg-indigo-100 p-2 font-bold">
                    {listing.company.email}
                  </p>

                  <h3 className="text-xl">Contact Phone:</h3>
                  <p className="my-2 bg-indigo-100 p-2 font-bold">
                    {listing.company.phone}
                  </p>
                </div>

                {currentUser.id == listing.user.id && (
                  <div className="bg-white p-6 rounded-lg shadow-md mt-6">
                    <h3 className="text-xl font-bold mb-6">Manage Job</h3>
                    <Link
                      to={`/manage-jobs/edit-job/${listing.id}`}
                      className="bg-indigo-500 hover:bg-indigo-600 text-white text-center font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline mt-4 block"
                    >
                      Edit Job
                    </Link>
                    <button
                      onClick={() => confirmJobDeletion(listing.id)}
                      className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline mt-4 block"
                    >
                      Delete Job
                    </button>
                  </div>
                )}
              </aside>
            </div>
          )}
        </div>

        <DeleteJobModal
          jobToDelete={jobToDelete}
          closeModal={closeModal}
          onDeleteClick={onDeleteClick}
        />
      </section>
    </>
  );
}

export default Job;
