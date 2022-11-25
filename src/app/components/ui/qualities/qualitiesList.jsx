import React from "react";
import { useQualities } from "../../../hooks/useQuality";
import PropTypes from "prop-types";
import Quality from "./quality";

const QualitiesList = ({ qualities }) => {
    const { isLoading, getQuality } = useQualities();

    if (!isLoading) {
        return (
            <>
                {qualities.map((qual) => {
                    const quality = getQuality(qual);
                    return <Quality key={qual} {...quality} />;
                })}
            </>
        );
    } else return "Loading...";
};

QualitiesList.propTypes = {
    qualities: PropTypes.array
};

export default QualitiesList;
