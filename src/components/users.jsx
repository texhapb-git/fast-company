import { React, useState } from "react";
import Pagination from "./pagination";
import User from "./user";
import { paginate } from "../utils/paginate";
import PropTypes from "prop-types";

function Users({ users, onDelete, onBookmarkToggle }) {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsCount = users.length;
    const pageSize = 4;

    const handlePageChange = (pageIndex) => {
        setCurrentPage(pageIndex);
    };

    const usersCrop = paginate(users, currentPage, pageSize);

    return (
        <>
            {itemsCount > 0 && (
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">Имя</th>
                            <th scope="col">Качества</th>
                            <th scope="col">Профессия</th>
                            <th scope="col">Встретился, раз</th>
                            <th scope="col">Оценка</th>
                            <th scope="col">Избранное</th>
                            <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {usersCrop.map((user) => (
                            <User
                                key={user._id}
                                user={user}
                                onDelete={onDelete}
                                onBookmarkToggle={onBookmarkToggle}
                            />
                        ))}
                    </tbody>
                </table>
            )}

            <Pagination
                currentPage={currentPage}
                itemsCount={itemsCount}
                pageSize={pageSize}
                onPageChange={handlePageChange}
            />
        </>
    );
}

Users.propTypes = {
    users: PropTypes.arrayOf(PropTypes.shape({
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
    })),
    onDelete: PropTypes.func.isRequired,
    onBookmarkToggle: PropTypes.func.isRequired
};

export default Users;
