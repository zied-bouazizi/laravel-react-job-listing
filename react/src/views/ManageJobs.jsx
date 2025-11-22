import { useCallback, useEffect, useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import axiosClient from "../axios";
import Spinner from "../components/Spinner";
import InfiniteScroll from "../components/InfiniteScroll";
import Modal from "../components/Modal";
import { toast } from "react-toastify";

function ManageJobs() {
  const [listings, setListings] = useState([]);
  const [nextPage, setNextPage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [jobToDelete, setJobToDelete] = useState(null);

  useEffect(() => {
    axiosClient.get("/listings/manage").then(({ data }) => {
      setListings(data.data);
      setNextPage(data.links?.next);
      setLoading(false);
    });
  }, []);

  const loadMore = useCallback(() => {
    if (!nextPage || loadingMore) return;

    setLoadingMore(true);

    axiosClient.get(nextPage).then(({ data }) => {
      setListings((prev) => [...prev, ...data.data]);
      setNextPage(data.links?.next);
      setLoadingMore(false);
    });
  }, [nextPage, loadingMore]);

  const confirmJobDeletion = (id) => {
    setJobToDelete(id);
  };

  const closeModal = () => {
    setJobToDelete(null);
  };

  const onDeleteClick = () => {
    axiosClient.delete(`/listings/${jobToDelete}`).then(() => {
      toast.success("Job deleted successfully");
      setListings((prev) => prev.filter((job) => job.id !== jobToDelete));
      closeModal();
    });
  };

  return (
    <section className="px-4 py-24">
      <div className="container m-auto">
        <h2 className="text-3xl text-center font-semibold mb-6">Manage Jobs</h2>

        {loading ? (
          <Spinner loading={loading} />
        ) : (
          <>
            <table className="w-full table-auto rounded-sm">
              <tbody>
                {listings.length === 0 && (
                  <tr className="border-indigo-300">
                    <td className="px-4 py-8 border-t border-b border-indigo-300 font-bold">
                      <p className="text-center">No Jobs Found</p>
                    </td>
                  </tr>
                )}

                {listings.map((listing) => (
                  <tr key={listing.id} className="border-indigo-300">
                    <td className="px-4 py-8 border-t border-b border-indigo-300 font-bold">
                      <Link to={`/jobs/${listing.id}`}>{listing.title}</Link>
                    </td>

                    <td className="px-4 py-8 border-t border-b border-indigo-300 font-bold">
                      <Link
                        to={`/manage-jobs/edit-job/${listing.id}`}
                        className="text-indigo-500 px-6 py-2 rounded-xl flex items-center justify-center gap-2"
                      >
                        <FaEdit /> Edit
                      </Link>
                    </td>

                    <td className="px-4 py-8 border-t border-b border-indigo-300 font-bold">
                      <button
                        onClick={() => confirmJobDeletion(listing.id)}
                        className="text-red-500 flex items-center justify-center gap-2"
                      >
                        <FaTrash /> Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <InfiniteScroll onLoadMore={loadMore} disabled={!nextPage} />

            {loadingMore && (
              <Spinner loading={loadingMore} size={80} margin="50px auto" />
            )}
          </>
        )}
      </div>

      <Modal show={Boolean(jobToDelete)} onClose={closeModal}>
        <div className="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0">
          <h2 className="text-2xl font-semibold mb-6">
            Are you sure you want to delete this job?
          </h2>

          <div className="mb-4 flex gap-2">
            <button
              type="button"
              onClick={closeModal}
              className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-full w-full"
            >
              Cancel
            </button>

            <button
              onClick={onDeleteClick}
              className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-full w-full"
            >
              Delete Job
            </button>
          </div>
        </div>
      </Modal>
    </section>
  );
}

export default ManageJobs;
