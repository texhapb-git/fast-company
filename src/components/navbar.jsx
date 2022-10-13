import React from "react";
import { NavLink } from "react-router-dom";

function NavBar() {
    const links = [
        { id: 1, link: "/", title: "Main", exact: true },
        { id: 2, link: "/login", title: "Login", exact: false },
        { id: 3, link: "/users", title: "Users", exact: false }
    ];

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid" >
                <div className="collapse navbar-collapse">
                    <ul className="navbar-nav" >
                        {links.map(link => (
                            <li key={link.id} className="nav-item">
                                <NavLink exact={link.exact} className={`nav-link`} to={link.link}>{link.title}</NavLink>
                            </li >
                        ))}
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default NavBar;
