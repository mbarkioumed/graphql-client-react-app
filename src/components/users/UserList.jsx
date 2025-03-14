import React from "react";
import { useQuery } from "@apollo/client";
import { Link } from "react-router-dom";
import { GET_USERS } from "../../graphql/queries/userQueries";

const UserList = () => {
    const { loading, error, data } = useQuery(GET_USERS, {
        variables: { page: 0, limit: 10 },
    });

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    return (
        <div className="list-container">
            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                }}
            >
                <h2>User List</h2>
                <Link to="/users/new" className="button button-link">
                    Create New User
                </Link>
            </div>
            <div>
                {data.users.map((user) => (
                    <div key={user.id} className="card">
                        <h3>
                            {user.firstName} {user.lastName}
                        </h3>
                        <p>Email: {user.email}</p>
                        <Link
                            to={`/users/${user.id}`}
                            className="button button-link"
                        >
                            View Details
                        </Link>
                    </div>
                ))}
                {data.users.length === 0 && <p>No users found.</p>}
            </div>
        </div>
    );
};

export default UserList;
