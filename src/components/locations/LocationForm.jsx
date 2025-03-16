import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { CREATE_LOCATION } from "../../graphql/mutations/locationMutations";
import { GET_LOCATIONS } from "../../graphql/queries/locationQueries";
import { useHistory } from "react-router-dom";

const LocationForm = () => {
    const [street, setStreet] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [country, setCountry] = useState("");
    const [timezone, setTimezone] = useState("");
    const history = useHistory();

    const [createLocation] = useMutation(CREATE_LOCATION, {
        onCompleted: () => {
            // Reset form fields after successful submission
            setStreet("");
            setCity("");
            setState("");
            setCountry("");
            setTimezone("");
            alert("Location created successfully!");
            history.push("/locations");
        },
        onError: (error) => {
            console.error("Error creating location:", error);
        },
        refetchQueries: [{ query: GET_LOCATIONS }],
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        createLocation({
            variables: { street, city, state, country, timezone },
        });
    };

    return (
        <div className="card">
            <h2>Create New Location</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="street">Street:</label>
                    <input
                        id="street"
                        className="form-control"
                        type="text"
                        value={street}
                        onChange={(e) => setStreet(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="city">City:</label>
                    <input
                        id="city"
                        className="form-control"
                        type="text"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="state">State:</label>
                    <input
                        id="state"
                        className="form-control"
                        type="text"
                        value={state}
                        onChange={(e) => setState(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="country">Country:</label>
                    <input
                        id="country"
                        className="form-control"
                        type="text"
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="timezone">Timezone:</label>
                    <input
                        id="timezone"
                        className="form-control"
                        type="text"
                        value={timezone}
                        onChange={(e) => setTimezone(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="button">
                    Create Location
                </button>
            </form>
        </div>
    );
};

export default LocationForm;
