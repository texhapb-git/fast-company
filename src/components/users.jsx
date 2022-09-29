import { React, useState, useEffect } from "react";
import Pagination from "./pagination";
import User from "./user";
import SearchStatus from "./searchStatus";
import { paginate } from "../utils/paginate";
import PropTypes from "prop-types";
import GroupList from "./groupList";
import API from "../api";

function Users({ users, onDelete, onBookmarkToggle }) {
    const [currentPage, setCurrentPage] = useState(1);

    const pageSize = 4;

    const [professions, setProfessions] = useState();
    const [selectedProf, setSelectedProf] = useState();

    const handlePageChange = (pageIndex) => {
        setCurrentPage(pageIndex);
    };

    useEffect(() => {
        setCurrentPage(1);
    }, [selectedProf]);

    const handleProfessionSelect = item => {
        setSelectedProf(item);
    };

    useEffect(() => {
        API.professions.fetchAll()
            .then(data => setProfessions(data));
    }, []);

    const filteredUsers = selectedProf
        ? users.filter(user => user.profession._id === selectedProf._id)
        : users;
    const itemsCount = filteredUsers.length;
    const usersCrop = paginate(filteredUsers, currentPage, pageSize);

    const clearFilter = () => {
        setCurrentPage(1);
        setSelectedProf();
    };

    return (
        <div className="d-flex">

            {professions &&
                <div className="d-flex flex-column flex-shrink-0 p-3">
                    <GroupList
                        items={professions}
                        onItemSelect={handleProfessionSelect}
                        selectedItem={selectedProf}
                    />
                    <button className="btn btn-secondary mt-2" onClick={clearFilter}>Сброс</button>
                </div>
            }

            <div className="d-flex flex-column">

                <SearchStatus length={itemsCount} />
                {itemsCount > 0 && (
                    <>
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

                        <div className="d-flex justify-content-center">
                            <Pagination
                                currentPage={currentPage}
                                itemsCount={itemsCount}
                                pageSize={pageSize}
                                onPageChange={handlePageChange}
                            />
                        </div>
                    </>

                )}
            </div>

        </div>
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
