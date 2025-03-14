import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { CREATE_POST } from "../../graphql/mutations/postMutations";

const PostForm = () => {
    const [text, setText] = useState("");
    const [ownerId, setOwnerId] = useState("");

    const [createPost] = useMutation(CREATE_POST, {
        onCompleted: () => {
            setText("");
            setOwnerId("");
            alert("Post created successfully!");
        },
        onError: (error) => {
            console.error("Error creating post:", error);
        },
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        createPost({ variables: { text, ownerId } });
    };

    return (
        <div className="card">
            <h2>Create New Post</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="postText">Post Content:</label>
                    <textarea
                        id="postText"
                        className="form-control"
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        required
                        rows="4"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="ownerId">Author ID:</label>
                    <input
                        id="ownerId"
                        className="form-control"
                        type="text"
                        value={ownerId}
                        onChange={(e) => setOwnerId(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="button">
                    Create Post
                </button>
            </form>
        </div>
    );
};

export default PostForm;
