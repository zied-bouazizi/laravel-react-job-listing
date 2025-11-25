import JobListing from "./JobListing";
import axiosClient from "../axios";
import { useEffect, useState, useCallback } from "react";
import Spinner from "./Spinner";
import InfiniteScroll from "./InfiniteScroll";
import SearchForm from "./SearchForm";

function JobListings({ isHome = false }) {
  const [listings, setListings] = useState([]);
  const [nextPage, setNextPage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [searchKeywords, setSearchKeywords] = useState("");

  useEffect(() => {
    const url = isHome ? "/listings?limit=3" : "/listings";

    axiosClient.get(url).then(({ data }) => {
      setListings(data.data);
      setNextPage(data.links?.next);
      setLoading(false);
    });
  }, [isHome]);

  const onChangeKeywords = (keywords) => {
    setSearchKeywords(keywords);
  };

  const onSearch = () => {
    setLoading(true);

    axiosClient
      .get(`/listings?search=${encodeURIComponent(searchKeywords)}`)
      .then(({ data }) => {
        setListings(data.data);
        setNextPage(data.links?.next);
        setLoading(false);
      });
  };

  const loadMore = useCallback(() => {
    if (!nextPage || loadingMore || isHome) return;

    setLoadingMore(true);

    const url = searchKeywords
      ? `${nextPage}&search=${encodeURIComponent(searchKeywords)}`
      : nextPage;

    axiosClient.get(url).then(({ data }) => {
      setListings((prev) => [...prev, ...data.data]);
      setNextPage(data.links?.next);
      setLoadingMore(false);
    });
  }, [nextPage, loadingMore, isHome, searchKeywords]);

  return (
    <section className={`px-4 py-10 ${isHome ? "bg-blue-50" : ""}`}>
      <div className="container-xl lg:container m-auto">
        <h2 className="text-3xl font-bold text-indigo-500 mb-6 text-center">
          {isHome ? "Recent Jobs" : "Browse Jobs"}
        </h2>

        {loading ? (
          <Spinner loading={loading} />
        ) : (
          <>
            {!isHome && (
              <SearchForm
                searchKeywords={searchKeywords}
                onChangeKeywords={onChangeKeywords}
                onSearch={onSearch}
              />
            )}

            {listings.length === 0 ? (
              <div className="px-4 py-2 font-bold">
                <p className="text-center">No Jobs Found</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {listings.map((listing) => (
                  <JobListing key={listing.id} listing={listing} />
                ))}
              </div>
            )}

            {!isHome && (
              <>
                <InfiniteScroll onLoadMore={loadMore} disabled={!nextPage} />
                {loadingMore && (
                  <Spinner loading={loadingMore} size={80} margin="50px auto" />
                )}
              </>
            )}
          </>
        )}
      </div>
    </section>
  );
}

export default JobListings;
