import React from "react";
import PropTypes from "prop-types";

function Quality({ quality }) {
    return (
        <span className={`me-2 mb-2 badge bg-${quality.color}`}>
            {quality.name}
        </span>
    );
}

Quality.propTypes = {
    quality: PropTypes.shape({
        _id: PropTypes.string,
        name: PropTypes.string.isRequired,
        color: PropTypes.string
    }).isRequired
};

export default Quality;
