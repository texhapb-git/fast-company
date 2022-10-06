import React from "react";
import Quality from "./quality";
import PropTypes from "prop-types";

function QualitiesList({ qualities }) {
    return (
        <>
            {qualities.map((quality) => (
                <Quality key={quality._id} quality={quality} />
            ))}
        </>
    );
};

QualitiesList.propTypes = {
    qualities: PropTypes.array
};

export default QualitiesList;
