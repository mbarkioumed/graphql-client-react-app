import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { CREATE_COMMENT } from "../../graphql/mutations/commentMutations";

const CommentForm = ({ postId, onCommentAdded }) => {
    const [message, setMessage] = useState("");
    const [ownerId, setOwnerId] = useState("1"); // Default user ID

    const [createComment] = useMutation(CREATE_COMMENT, {
        onCompleted: (data) => {
            onCommentAdded && onCommentAdded(data.createComment);
            setMessage("");
        },
        onError: (error) => {
            console.error("Error creating comment:", error);
        },
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        createComment({
            variables: {
                message,
                ownerId,
                postId,
            },
        });
    };

    return (
        <div className="card">
            <h2>Add a Comment</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="commentText">Your Comment:</label>
                    <textarea
                        id="commentText"
                        className="form-control"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Write a comment..."
                        required
                        rows="3"
                    />
                </div>
                {!postId && (
                    <div className="form-group">
                        <label htmlFor="postId">Post ID:</label>
                        <input
                            id="postId"
                            className="form-control"
                            type="text"
                            value={postId || ""}
                            onChange={(e) => setPostId(e.target.value)}
                            required={!postId}
                        />
                    </div>
                )}
                <button type="submit" className="button">
                    Add Comment
                </button>
            </form>
        </div>
    );
};

export default CommentForm;
