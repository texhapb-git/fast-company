import { React, useState, useEffect } from "react";
import API from "../src/api";
import Users from "./components/users";

function App() {
    const [users, setUsers] = useState();

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
        API.users.fetchAll().then(data => setUsers(data));
    }, []);

    return (
        <div className="container mt-4 mb-4">
            {users && <Users
                users={users}
                onDelete={handleDelete}
                onBookmarkToggle={handleToggleBookmark}
            />}

        </div>
    );
}

export default App;
