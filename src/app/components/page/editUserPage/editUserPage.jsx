import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import api from "../../../api";
import EditForm from "../../ui/editForm";

const EditUserPage = ({ userId }) => {
    const [user, setUser] = useState();
    useEffect(() => {
        api.users.getById(userId).then((data) => setUser(data));
    }, []);

    if (user) {
        return (
            <EditForm user={user} />
        );
    } else {
        return <h1>Loading</h1>;
    }
};

EditUserPage.propTypes = {
    userId: PropTypes.string.isRequired
};

export default EditUserPage;
