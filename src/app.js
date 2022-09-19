import { React, useState, useEffect } from "react";
import API from "../src/api";
import SearchStatus from "./components/searchStatus";
import Users from "./components/users";

function App() {
    const [users, setUsers] = useState(API.users.fetchAll());

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

    useEffect(() => {
        setUsers(users);
    }, [users]);

    return (
        <div className="container mt-4 mb-4">
            <SearchStatus length={users.length} />
            <Users
                users={users}
                onDelete={handleDelete}
                onBookmarkToggle={handleToggleBookmark}
            />
        </div>
    );
}

export default App;
