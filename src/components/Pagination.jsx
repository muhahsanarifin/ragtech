const Paginate = ({ meta, handlePrevious, handleNext }) => {
  return (
    <ol className="flex justify-center gap-x-3 text-xs font-medium ml-auto">
      <li>
        <button
          className={`inline-flex h-8 items-center gap-x-2 px-2 rounded border bg-white text-gray-900 border-[#6b6e86] ${
            meta?.currentPage <= 1
              ? "cursor-not-allowed"
              : "transition hover:scale-110 hover:shadow-xl focus:outline-none focus:ring"
          }`}
          onClick={handlePrevious}
          disabled={meta?.currentPage <= 1}
        >
          <svg
            className="h-5 w-5 rotate-180"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M17 8l4 4m0 0l-4 4m4-4H3"
            />
          </svg>
          <span>Previous</span>
        </button>
      </li>

      <li>
        <button
          className={`inline-flex items-center h-8 gap-x-2 px-2 rounded border bg-white text-gray-900 border-[#6b6e86] ${
            meta?.currentPage >= meta?.totalPages
              ? "cursor-not-allowed"
              : "transition hover:scale-110 hover:shadow-xl focus:outline-none focus:ring"
          }`}
          onClick={handleNext}
          disabled={meta?.currentPage >= meta?.totalPages}
        >
          <span>Next Page</span>
          <svg
            className="h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M17 8l4 4m0 0l-4 4m4-4H3"
            />
          </svg>
        </button>
      </li>
    </ol>
  );
};

export default Paginate;
