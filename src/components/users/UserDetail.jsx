import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_USER } from '../../graphql/queries/userQueries';

const UserDetail = ({ userId }) => {
    const { loading, error, data } = useQuery(GET_USER, {
        variables: { id: userId },
    });

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    const { user } = data;

    return (
        <div>
            <h2>User Details</h2>
            <p><strong>Name:</strong> {user.firstName} {user.lastName}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Gender:</strong> {user.gender}</p>
            <p><strong>Date of Birth:</strong> {user.dateOfBirth}</p>
            <p><strong>Phone:</strong> {user.phone}</p>
            {user.location && (
                <div>
                    <h3>Location</h3>
                    <p><strong>City:</strong> {user.location.city}</p>
                    <p><strong>State:</strong> {user.location.state}</p>
                    <p><strong>Country:</strong> {user.location.country}</p>
                </div>
            )}
        </div>
    );
};

export default UserDetail;