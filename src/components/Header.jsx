import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const Header = () => {
    const { currentUser, logout } = useAuth();

    return (
        <header
            style={{ background: "#35424a", color: "white", padding: "15px 0" }}
        >
            <div className="container">
                <div
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                    }}
                >
                    <h1>GraphQL React App</h1>
                    <div>
                        {currentUser ? (
                            <span
                                style={{ color: "white", marginRight: "15px" }}
                            >
                                Welcome, {currentUser.firstName}!
                            </span>
                        ) : null}
                    </div>
                </div>
                <nav
                    style={{
                        marginTop: "10px",
                        display: "flex",
                        justifyContent: "space-between",
                    }}
                >
                    <ul className="nav-links">
                        <li>
                            <Link to="/">Home</Link>
                        </li>
                        <li>
                            <Link to="/users">Users</Link>
                        </li>
                        <li>
                            <Link to="/posts">Posts</Link>
                        </li>
                        <li>
                            <Link to="/comments">Comments</Link>
                        </li>
                        <li>
                            <Link to="/locations">Locations</Link>
                        </li>
                        <li>
                            <Link to="/tags">Tags</Link>
                        </li>
                    </ul>
                    <div>
                        {currentUser ? (
                            <button
                                className="button"
                                onClick={logout}
                                style={{ padding: "5px 10px" }}
                            >
                                Logout
                            </button>
                        ) : (
                            <Link
                                to="/login"
                                className="button"
                                style={{ padding: "5px 10px" }}
                            >
                                Login
                            </Link>
                        )}
                    </div>
                </nav>
            </div>
        </header>
    );
};

export default Header;
