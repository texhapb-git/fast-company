import React from "react";
import Bookmark from "./bookmark";
import Quality from "./quality";
import PropTypes from "prop-types";

function User({ user, onDelete, onBookmarkToggle }) {
    return (
        <tr>
            <td>{user.name}</td>
            <td>
                {user.qualities.map((quality) => (
                    <Quality key={quality._id} quality={quality} />
                ))}
            </td>
            <td>{user.profession.name}</td>
            <td>{user.completedMeetings}</td>
            <td>{user.rate}/5</td>
            <td>
                <Bookmark
                    id={user._id}
                    bookmark={user.bookmark}
                    onBookmarkToggle={onBookmarkToggle}
                />
            </td>
            <td>
                <button
                    className="btn btn-danger"
                    onClick={() => onDelete(user._id)}
                >
                    Delete
                </button>
            </td>
        </tr>
    );
}

User.propTypes = {
    user: PropTypes.shape({
        _id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        qualities: PropTypes.arrayOf(PropTypes.shape({
            _id: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired,
            color: PropTypes.string
        })),
        profession: PropTypes.shape({
            _id: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired
        }),
        completedMeetings: PropTypes.number.isRequired,
        rate: PropTypes.number.isRequired,
        bookmark: PropTypes.bool
    }),
    onDelete: PropTypes.func.isRequired,
    onBookmarkToggle: PropTypes.func.isRequired
};

export default User;
