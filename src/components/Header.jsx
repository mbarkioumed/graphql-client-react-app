import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
    return (
        <header
            style={{ background: "#35424a", color: "white", padding: "15px 0" }}
        >
            <div className="container">
                <h1>GraphQL React App</h1>
                <nav style={{ marginTop: "10px" }}>
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
                </nav>
            </div>
        </header>
    );
};

export default Header;
