import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

function Name({ user }) {
    return (
        <Link to={"/users/" + user._id}>{user.name}</Link>
    );
};

Name.propTypes = {
    user: PropTypes.object.isRequired
};

export default Name;
