import React from "react";
import _ from "lodash";
import PropTypes from "prop-types";

function Pagination({ itemsCount, pageSize, currentPage, onPageChange }) {
    const pageCount = Math.ceil(itemsCount / pageSize);
    if (pageCount <= 1) {
        return null;
    }

    const pages = _.range(1, pageCount + 1);

    return (
        <nav>
            <ul className="pagination">
                {pages.map((page) => {
                    const cls = page === currentPage ? "active" : "";
                    return (
                        <li className={`page-item ${cls}`} key={`page${page}`}>
                            <button
                                className="page-link"
                                onClick={() => onPageChange(page)}
                            >
                                {page}
                            </button>
                        </li>
                    );
                })}
            </ul>
        </nav>
    );
}

Pagination.propTypes = {
    itemsCount: PropTypes.number.isRequired,
    pageSize: PropTypes.number.isRequired,
    currentPage: PropTypes.number.isRequired,
    onPageChange: PropTypes.func.isRequired
};

export default Pagination;
