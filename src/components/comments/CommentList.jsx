import React, { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import { Link } from "react-router-dom";
import { GET_COMMENTS } from "../../graphql/queries/commentQueries";

const CommentList = () => {
    const [comments, setComments] = useState([]);
    const { loading, error, data } = useQuery(GET_COMMENTS, {
        variables: { page: 0, limit: 10 },
    });

    useEffect(() => {
        if (data) {
            setComments(data.comments);
        }
    }, [data]);

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
                <h2>Comments</h2>
                <Link to="/comments/new" className="button button-link">
                    Add New Comment
                </Link>
            </div>
            <div>
                {comments.map((comment) => (
                    <div key={comment.id} className="card">
                        <p>
                            <strong>
                                {comment.owner.firstName}{" "}
                                {comment.owner.lastName}:
                            </strong>{" "}
                            {comment.message}
                        </p>
                        <p className="text-muted">
                            On post: {comment.post.text.substring(0, 50)}...
                        </p>
                    </div>
                ))}
                {comments.length === 0 && <p>No comments found.</p>}
            </div>
        </div>
    );
};

export default CommentList;
