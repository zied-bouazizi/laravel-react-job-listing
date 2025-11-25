import { Link } from "react-router-dom";

function ViewAllJobs() {
  return (
    <section className="px-6 py-10 bg-white flex justify-center">
      <Link
        to="/jobs"
        className="max-w-lg w-full text-center bg-black text-white py-4 px-6 rounded-xl hover:bg-gray-700"
      >
        View All Jobs
      </Link>
    </section>
  );
}

export default ViewAllJobs;
