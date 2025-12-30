type PaginationProps = {
  limit: number;
  page: number;
  total: number | undefined;
  totalPages: number | undefined;
  setPage: React.Dispatch<React.SetStateAction<number>>;
};

const Pagination = ({
  limit,
  page,
  total,
  totalPages,
  setPage,
}: PaginationProps) => {
  if (!totalPages) return null;

  const maxPagesToShow = 5;

  let start = Math.max(1, page - Math.floor(maxPagesToShow / 2));
  let end = start + maxPagesToShow - 1;

  if (end > totalPages) {
    end = totalPages;
    start = Math.max(1, end - maxPagesToShow + 1);
  }

  const pageNumbers = [];
  for (let i = start; i <= end; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="flex items-center justify-between gap-4">
      <div className="text-sm text-gray-500">
        Showing{" "}
        <span className="font-medium text-gray-900">
          {(page - 1) * limit + 1}
        </span>{" "}
        to{" "}
        <span className="font-medium text-gray-900">
          {Math.min(page * limit, total ?? 0)}
        </span>{" "}
        of <span className="font-medium text-gray-900">{total}</span> units
      </div>

      <div className="flex items-center gap-1">
        {/* Previous */}
        <button
          onClick={() => setPage((p: number) => Math.max(1, p - 1))}
          disabled={page === 1}
          className="h-8 px-3 text-sm rounded-md border border-gray-200 bg-white text-gray-900
                 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none">
          Previous
        </button>

        {/* Page numbers */}
        {pageNumbers.map((num) => (
          <button
            key={num}
            onClick={() => setPage(num)}
            className={`h-8 w-8 text-sm rounded-md border transition
          ${
            num === page
              ? "bg-blue-700 text-white border-blue-700"
              : "bg-white text-blue-700 border-blue-200 hover:bg-blue-100"
          }`}>
            {num}
          </button>
        ))}

        {/* Next */}
        <button
          onClick={() => setPage((p) => Math.min(totalPages ?? 0, p + 1))}
          disabled={page === totalPages}
          className="h-8 px-3 text-sm rounded-md border border-gray-200 bg-white text-gray-900
                 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none">
          Next
        </button>
      </div>
    </div>
  );
};

export default Pagination;
