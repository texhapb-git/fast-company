import React from "react";
import { useParams } from "react-router-dom";
import User from "../components/user";
import Users from "../components/users";

function UsersPage() {
    const { userId } = useParams();

    return (
        <>
            {userId
                ? <User userId={userId} />
                : <Users />
            }
        </>

    );
};

export default UsersPage;
