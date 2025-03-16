import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { CREATE_POST } from "../../graphql/mutations/postMutations";
import { GET_POSTS } from "../../graphql/queries/postQueries";
import { useAuth } from "../../contexts/AuthContext";
import { useHistory } from "react-router-dom";

const PostForm = () => {
    const [text, setText] = useState("");
    const { currentUser } = useAuth();
    const history = useHistory();

    const [createPost] = useMutation(CREATE_POST, {
        onCompleted: () => {
            setText("");
            alert("Post created successfully!");
            history.push("/posts");
        },
        onError: (error) => {
            console.error("Error creating post:", error);
        },
        refetchQueries: [
            { query: GET_POSTS, variables: { page: 0, limit: 10 } },
        ],
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        createPost({ variables: { text, ownerId: currentUser.id } });
    };

    if (!currentUser) {
        return (
            <div className="card">
                <h2>Create New Post</h2>
                <p>You must be logged in to create a post.</p>
                <button
                    onClick={() => history.push("/login")}
                    className="button"
                >
                    Login
                </button>
            </div>
        );
    }

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
                    <label htmlFor="ownerId">Author:</label>
                    <input
                        id="ownerId"
                        className="form-control"
                        type="text"
                        value={`${currentUser.firstName} ${currentUser.lastName} (ID: ${currentUser.id})`}
                        disabled
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
