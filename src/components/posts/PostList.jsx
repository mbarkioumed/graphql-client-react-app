import React, { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import { Link } from "react-router-dom";
import { GET_POSTS } from "../../graphql/queries/postQueries";

const PostList = () => {
    const { loading, error, data } = useQuery(GET_POSTS, {
        variables: { page: 0, limit: 10 },
    });
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        if (data && data.posts) {
            setPosts(data.posts);
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
                <h2>Posts</h2>
                <Link to="/posts/new" className="button button-link">
                    Create New Post
                </Link>
            </div>
            <div>
                {posts.map((post) => (
                    <div key={post.id} className="card">
                        <h3>{post.text}</h3>
                        <p>
                            By: {post.owner.firstName} {post.owner.lastName}
                        </p>
                        <p>Likes: {post.likes || 0}</p>
                        <Link
                            to={`/posts/${post.id}`}
                            className="button button-link"
                        >
                            View Details
                        </Link>
                    </div>
                ))}
                {posts.length === 0 && <p>No posts found.</p>}
            </div>
        </div>
    );
};

export default PostList;
