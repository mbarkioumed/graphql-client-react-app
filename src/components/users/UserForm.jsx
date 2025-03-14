import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import {
    CREATE_USER,
    UPDATE_USER,
} from "../../graphql/mutations/userMutations";

const UserForm = ({ user, onUserSaved }) => {
    const [firstName, setFirstName] = useState(user ? user.firstName : "");
    const [lastName, setLastName] = useState(user ? user.lastName : "");
    const [email, setEmail] = useState(user ? user.email : "");

    const [createUser] = useMutation(CREATE_USER, {
        onCompleted: () => {
            onUserSaved && onUserSaved();
            if (!user) {
                setFirstName("");
                setLastName("");
                setEmail("");
            }
            alert("User saved successfully!");
        },
        onError: (error) => {
            console.error("Error saving user:", error);
        },
    });

    const [updateUser] = useMutation(UPDATE_USER, {
        onCompleted: () => {
            onUserSaved && onUserSaved();
            alert("User updated successfully!");
        },
        onError: (error) => {
            console.error("Error updating user:", error);
        },
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        if (user) {
            updateUser({
                variables: { id: user.id, firstName, lastName, email },
            });
        } else {
            createUser({ variables: { firstName, lastName, email } });
        }
    };

    return (
        <div className="card">
            <h2>{user ? "Edit User" : "Create New User"}</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="firstName">First Name:</label>
                    <input
                        id="firstName"
                        className="form-control"
                        type="text"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="lastName">Last Name:</label>
                    <input
                        id="lastName"
                        className="form-control"
                        type="text"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input
                        id="email"
                        className="form-control"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="button">
                    {user ? "Update User" : "Create User"}
                </button>
            </form>
        </div>
    );
};

export default UserForm;
