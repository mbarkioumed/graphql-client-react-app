import React, { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import { Link } from "react-router-dom";
import { GET_LOCATIONS } from "../../graphql/queries/locationQueries";

const LocationList = () => {
    const { loading, error, data } = useQuery(GET_LOCATIONS);
    const [locations, setLocations] = useState([]);

    useEffect(() => {
        if (data) {
            setLocations(data.locations);
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
                <h2>Locations</h2>
                <Link to="/locations/new" className="button button-link">
                    Create New Location
                </Link>
            </div>
            <div>
                {locations.map((location) => (
                    <div key={location.id} className="card">
                        <h3>
                            {location.city}, {location.country}
                        </h3>
                        <p>
                            {location.street}, {location.state}
                        </p>
                        <p>Timezone: {location.timezone}</p>
                    </div>
                ))}
                {locations.length === 0 && <p>No locations found.</p>}
            </div>
        </div>
    );
};

export default LocationList;
