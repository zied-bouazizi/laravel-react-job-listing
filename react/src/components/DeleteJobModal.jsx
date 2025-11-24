import Modal from "../components/Modal";

function DeleteJobModal({ jobToDelete, closeModal, onDeleteClick }) {
  return (
    <Modal show={Boolean(jobToDelete)} onClose={closeModal}>
      <div className="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0">
        <h2 className="text-2xl font-semibold mb-10">
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
  );
}

export default DeleteJobModal;
