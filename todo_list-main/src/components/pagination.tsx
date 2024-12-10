import { IoChevronBackOutline, IoChevronForwardOutline } from "react-icons/io5";
import { PaginationProps } from "../interfaces/Todo";



const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  itemsPerPage,
  totalItems,
  onPageChange,
}) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };
if (totalPages !== 0)
  return (
    <div className="paginationContainer">
      <button
        className="paginationButton"
        onClick={handlePrevPage}
        disabled={currentPage === 1}
      >
        <IoChevronBackOutline />
      </button>
      <span className="paginationInfo">
        Page {currentPage} of {totalPages}
      </span>
      <button
        className="paginationButton"
        onClick={handleNextPage}
        disabled={currentPage === totalPages}
      >
        <IoChevronForwardOutline />
      </button>
    </div>
  );

};


export default Pagination;
