import { useCallback, useEffect, useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import axiosClient from "../axios";
import Spinner from "../components/Spinner";
import InfiniteScroll from "../components/InfiniteScroll";
import { toast } from "react-toastify";
import DeleteJobModal from "../components/DeleteJobModal";

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
    <section className="px-4 py-16">
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
                  <tr key={listing.id} className="bg-white border-indigo-300">
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

      <DeleteJobModal
        jobToDelete={jobToDelete}
        closeModal={closeModal}
        onDeleteClick={onDeleteClick}
      />
    </section>
  );
}

export default ManageJobs;
