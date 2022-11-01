import React from "react";
import { useLocation, useParams } from "react-router-dom";
import EditUserPage from "../components/page/editUserPage/editUserPage";
import UserPage from "../components/page/userPage";
import UsersListPage from "../components/page/usersListPage";

const Users = () => {
    const params = useParams();
    const location = useLocation();

    const { pathname } = location;
    const { userId } = params;

    return (
        <>
            {userId
                ? pathname.includes("/edit")
                    ? <EditUserPage userId={userId} />
                    : <UserPage userId={userId} />
                : <UsersListPage />}
        </>
    );
};

export default Users;
