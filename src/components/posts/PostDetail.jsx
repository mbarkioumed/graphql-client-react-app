import React, { useEffect, useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { GET_POST } from "../../graphql/queries/postQueries";
import {
    DELETE_POST,
    UPDATE_POST,
} from "../../graphql/mutations/postMutations";
import { useParams, useHistory, Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

const PostDetail = ({ postId: propPostId }) => {
    // Get postId from URL if not passed as prop
    const { id: paramPostId } = useParams();
    const postId = propPostId || paramPostId;
    const history = useHistory();
    const { currentUser } = useAuth();

    // For edit mode
    const [isEditing, setIsEditing] = useState(false);
    const [text, setText] = useState("");

    // Add logging to debug the postId
    console.log("PostDetail rendering with postId:", postId);

    const { loading, error, data } = useQuery(GET_POST, {
        variables: { id: postId },
        skip: !postId, // Skip query if no postId is available
        fetchPolicy: "network-only", // Force network request
    });

    // Delete mutation
    const [deletePost] = useMutation(DELETE_POST, {
        onCompleted: () => {
            alert("Post deleted successfully");
            history.push("/posts");
        },
        onError: (error) => {
            console.error("Error deleting post:", error);
        },
    });

    // Update mutation
    const [updatePost] = useMutation(UPDATE_POST, {
        onCompleted: () => {
            setIsEditing(false);
            alert("Post updated successfully");
        },
        onError: (error) => {
            console.error("Error updating post:", error);
        },
        refetchQueries: [{ query: GET_POST, variables: { id: postId } }],
    });

    // Set initial text value for editing
    useEffect(() => {
        if (data && data.post) {
            setText(data.post.text);
        }
    }, [data]);

    // Log query status
    useEffect(() => {
        console.log("Query status:", { loading, error, data });
    }, [loading, error, data]);

    const handleDelete = () => {
        if (window.confirm("Are you sure you want to delete this post?")) {
            deletePost({ variables: { id: postId } });
        }
    };

    const handleUpdate = (e) => {
        e.preventDefault();
        updatePost({ variables: { id: postId, text } });
    };

    if (!postId) return <p>Error: No post ID provided</p>;
    if (loading)
        return (
            <div className="card">
                <p>Loading post details...</p>
            </div>
        );
    if (error)
        return (
            <div className="card">
                <h2>Error Loading Post</h2>
                <p>Could not load post details: {error.message}</p>
            </div>
        );
    if (!data || !data.post)
        return (
            <div className="card">
                <h2>Post Not Found</h2>
                <p>The requested post could not be found.</p>
            </div>
        );

    const { post } = data;
    const isOwner =
        currentUser && post.owner && currentUser.id === post.owner.id;

    return (
        <div className="card">
            {!isEditing ? (
                <>
                    <h2>{post.text}</h2>
                    {post.image && (
                        <div className="post-image">
                            <img
                                src={post.image}
                                alt="Post"
                                style={{
                                    maxWidth: "100%",
                                    marginBottom: "15px",
                                }}
                            />
                        </div>
                    )}
                    <div className="post-meta">
                        <p>
                            <strong>Published by:</strong>{" "}
                            {post.owner?.firstName || "Unknown"}{" "}
                            {post.owner?.lastName || ""}
                        </p>
                        <p>
                            <strong>Likes:</strong> {post.likes || 0}
                        </p>
                        {post.tags && post.tags.length > 0 && (
                            <p>
                                <strong>Tags:</strong> {post.tags.join(", ")}
                            </p>
                        )}
                        {post.publishDate && (
                            <p>
                                <strong>Published on:</strong>{" "}
                                {new Date(
                                    post.publishDate
                                ).toLocaleDateString()}
                            </p>
                        )}
                    </div>
                </>
            ) : (
                <form onSubmit={handleUpdate}>
                    <div className="form-group">
                        <label htmlFor="postText">Edit Post:</label>
                        <textarea
                            id="postText"
                            className="form-control"
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                            required
                            rows="4"
                        />
                    </div>
                    <div style={{ display: "flex", gap: "10px" }}>
                        <button type="submit" className="button">
                            Save Changes
                        </button>
                        <button
                            type="button"
                            className="button"
                            onClick={() => setIsEditing(false)}
                            style={{ background: "#666" }}
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            )}

            {!isEditing && (
                <div
                    style={{ marginTop: "20px", display: "flex", gap: "10px" }}
                >
                    <Link to="/posts" className="button button-link">
                        Back to Posts
                    </Link>

                    {isOwner && (
                        <>
                            <button
                                className="button"
                                onClick={() => setIsEditing(true)}
                                style={{ background: "#4a90e2" }}
                            >
                                Edit Post
                            </button>
                            <button
                                className="button"
                                onClick={handleDelete}
                                style={{ background: "#e53935" }}
                            >
                                Delete Post
                            </button>
                        </>
                    )}
                </div>
            )}
        </div>
    );
};

export default PostDetail;
