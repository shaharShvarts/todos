import { useRef } from "react";
import { TodoState } from "./context/TodoContext";
import "./pagination.css";

const Pagination = () => {
  const { todosPerPage, totalTodos, setCurrentPage } = TodoState();
  const pageNumber = useRef(null);
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalTodos / todosPerPage); i++) {
    pageNumbers.push(i);
  }

  const handleClick = (number) => {
    paginate(number);

    for (let i = 1; i <= pageNumbers.length; i++) {
      pageNumber.current.children[i - 1].classList.remove("active");
    }

    pageNumber.current.children[number - 1].classList.add("active");
  };

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <nav>
      <ul className="pagination" ref={pageNumber}>
        {pageNumbers.map((number) => (
          <li key={number}>
            <a
              href="/#"
              onClick={() => handleClick(number)}
              className="page-link"
            >
              {number}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;
