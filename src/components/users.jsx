import { React, useState, useEffect } from "react";
import { paginate } from "../utils/paginate";
import UsersTable from "./usersTable";
import Pagination from "./pagination";
import SearchStatus from "./searchStatus";
import PropTypes from "prop-types";
import GroupList from "./groupList";
import API from "../api";
import _ from "lodash";

function Users() {
    const [currentPage, setCurrentPage] = useState(1);
    const [professions, setProfessions] = useState();
    const [selectedProf, setSelectedProf] = useState();
    const [sortBy, setSortBy] = useState({ path: "name", order: "asc" });
    const [users, setUsers] = useState();

    const pageSize = 4;

    useEffect(() => {
        API.users.fetchAll().then(data => setUsers(data));
    }, []);

    useEffect(() => {
        setCurrentPage(1);
    }, [selectedProf]);

    useEffect(() => {
        API.professions.fetchAll()
            .then(data => setProfessions(data));
    }, []);

    const handleDelete = (userId) => {
        setUsers((prev) => prev.filter((user) => user._id !== userId));
    };

    const handleToggleBookmark = (userId) => {
        setUsers((prev) => {
            return prev.map((user) => {
                if (user._id === userId) {
                    user.bookmark = !user.bookmark;
                }
                return user;
            });
        });
    };

    const handlePageChange = (pageIndex) => {
        setCurrentPage(pageIndex);
    };

    const handleProfessionSelect = item => {
        setSelectedProf(item);
    };

    const handleSort = (item) => {
        setSortBy(item);
    };

    const clearFilter = () => {
        setCurrentPage(1);
        setSelectedProf();
    };

    if (users) {
        const filteredUsers = selectedProf
            ? users.filter(user => user.profession._id === selectedProf._id)
            : users;
        const itemsCount = filteredUsers.length;
        const sortedUsers = _.orderBy(filteredUsers, [sortBy.path], [sortBy.order]);
        const usersCrop = paginate(sortedUsers, currentPage, pageSize);

        return (
            <div className="d-flex container mt-4 mb-4">

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
                            <UsersTable users={usersCrop} onSort={handleSort} selectedSort={sortBy} onDelete={handleDelete} onBookmarkToggle={handleToggleBookmark} />

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

    return "loading...";
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
    }))

};

export default Users;
