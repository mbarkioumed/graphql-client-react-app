import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { CREATE_TAG } from "../../graphql/mutations/tagMutations";

const TagForm = () => {
    const [name, setName] = useState("");

    const [createTag] = useMutation(CREATE_TAG, {
        onCompleted: () => {
            setName("");
            alert("Tag created successfully!");
        },
        onError: (error) => {
            console.error("Error creating tag:", error);
        },
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        createTag({ variables: { name } });
    };

    return (
        <div className="card">
            <h2>Create New Tag</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="tagName">Tag Name:</label>
                    <input
                        id="tagName"
                        className="form-control"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="button">
                    Create Tag
                </button>
            </form>
        </div>
    );
};

export default TagForm;
