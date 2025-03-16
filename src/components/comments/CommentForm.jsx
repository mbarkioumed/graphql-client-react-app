import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { CREATE_COMMENT } from "../../graphql/mutations/commentMutations";
import { GET_COMMENTS } from "../../graphql/queries/commentQueries";
import { useAuth } from "../../contexts/AuthContext";
import { useHistory } from "react-router-dom";

const CommentForm = ({ postId: initialPostId, onCommentAdded }) => {
    const [message, setMessage] = useState("");
    const [postId, setPostId] = useState(initialPostId || "");
    const { currentUser } = useAuth();
    const history = useHistory();

    const [createComment] = useMutation(CREATE_COMMENT, {
        onCompleted: (data) => {
            onCommentAdded && onCommentAdded(data.createComment);
            setMessage("");
            if (!initialPostId) setPostId("");
            if (!onCommentAdded) {
                // Only navigate if not used as a nested component
                history.push("/comments");
            }
        },
        onError: (error) => {
            console.error("Error creating comment:", error);
        },
        refetchQueries: [
            { query: GET_COMMENTS, variables: { page: 0, limit: 10 } },
        ],
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!currentUser) {
            alert("You must be logged in to add a comment");
            return;
        }

        createComment({
            variables: {
                message,
                ownerId: currentUser.id,
                postId: initialPostId || postId,
            },
        });
    };

    return (
        <div className="card">
            <h2>Add a Comment</h2>
            {!currentUser && (
                <div className="alert alert-info">
                    Please log in to add a comment
                </div>
            )}
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
                        disabled={!currentUser}
                    />
                </div>
                {!initialPostId && (
                    <div className="form-group">
                        <label htmlFor="postId">Post ID:</label>
                        <input
                            id="postId"
                            className="form-control"
                            type="text"
                            value={postId}
                            onChange={(e) => setPostId(e.target.value)}
                            required
                            disabled={!currentUser}
                        />
                    </div>
                )}
                <button
                    type="submit"
                    className="button"
                    disabled={!currentUser}
                >
                    Add Comment
                </button>
            </form>
        </div>
    );
};

export default CommentForm;
