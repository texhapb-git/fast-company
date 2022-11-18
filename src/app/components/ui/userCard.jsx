import React from "react";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";

import { getAvatarPath } from "../../utils/randomAvatar";

const UserCard = ({ userId, name, profession, rate }) => {
    const history = useHistory();

    const handleClick = () => {
        history.push(`/users/${userId}/edit`);
    };

    return (
        <div className="card mb-3">
            <div className="card-body">
                <button
                    className="
                        position-absolute
                        top-0
                        end-0
                        btn btn-light btn-sm
                    "
                    onClick={handleClick}
                >
                    <i className="bi bi-gear"></i>
                </button>
                <div
                    className="
                        d-flex
                        flex-column
                        align-items-center
                        text-center
                        position-relative
                    "
                >
                    <img
                        src={getAvatarPath()}
                        className="rounded-circle"
                        width="150"
                    />
                    <div className="mt-3">
                        <h4>{name}</h4>
                        <p className="text-secondary mb-1">{profession}</p>
                        <div className="text-muted">
                            <i
                                className="
                                                bi bi-caret-down-fill
                                                text-primary
                                            "
                                role="button"
                            ></i>
                            <i
                                className="
                                                bi bi-caret-up
                                                text-secondary
                                            "
                                role="button"
                            ></i>
                            <span className="ms-2">{rate}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

UserCard.propTypes = {
    userId: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    profession: PropTypes.string,
    rate: PropTypes.number
};

export default UserCard;
