import { React, useState, useEffect } from "react";
import QualitiesList from "./qualitiesList";
import PropTypes from "prop-types";
import API from "../api";
import { useHistory } from "react-router-dom";

function User({ userId }) {
    const [user, setUser] = useState();
    const history = useHistory();

    useEffect(() => {
        API.users.getById(userId).then(data => setUser(data));
    }, []);

    const handleBack = () => {
        history.push("/users");
    };

    if (user) {
        return (
            <div className="mt-2">
                <h1>{user.name}</h1>
                <div>Профессия: {user.profession.name}</div>
                <QualitiesList qualities={user.qualities} />
                <div>Встретился, раз: {user.completedMeetings}</div>
                <div>Рейтинг: {user.rate}</div>
                <br />
                <button onClick={handleBack}>Все пользователи</button>
            </div>

        );
    }

    return "loading...";
};

User.propTypes = {
    userId: PropTypes.string.isRequired
};

export default User;
