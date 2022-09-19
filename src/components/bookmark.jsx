import React from "react";
import PropTypes from "prop-types";

function Bookmark({ id, bookmark, onBookmarkToggle }) {
    const cls = bookmark ? "bi-bookmark-star-fill" : "bi-bookmark";

    return (
        <button className="bookmark" onClick={() => onBookmarkToggle(id)}>
            <i className={`bi ${cls}`}></i>
        </button>
    );
}

Bookmark.propTypes = {
    id: PropTypes.string.isRequired,
    bookmark: PropTypes.bool.isRequired,
    onBookmarkToggle: PropTypes.func.isRequired
};

export default Bookmark;
