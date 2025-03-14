import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_POST } from '../../graphql/queries/postQueries';

const PostDetail = ({ postId }) => {
    const { loading, error, data } = useQuery(GET_POST, {
        variables: { id: postId },
    });

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    const { post } = data;

    return (
        <div>
            <h2>{post.text}</h2>
            {post.image && <img src={post.image} alt="Post" />}
            <p>Published by: {post.owner.firstName} {post.owner.lastName}</p>
            <p>Likes: {post.likes}</p>
            <p>Tags: {post.tags.join(', ')}</p>
            <p>Published on: {new Date(post.publishDate).toLocaleDateString()}</p>
        </div>
    );
};

export default PostDetail;