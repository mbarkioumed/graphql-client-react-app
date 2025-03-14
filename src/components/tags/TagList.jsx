import React, { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import { Link } from "react-router-dom";
import { GET_TAGS } from "../../graphql/queries/tagQueries";

const TagList = () => {
    const { loading, error, data } = useQuery(GET_TAGS);
    const [tags, setTags] = useState([]);

    useEffect(() => {
        if (data && data.tags) {
            setTags(data.tags);
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
                <h2>Tags</h2>
                <Link to="/tags/new" className="button button-link">
                    Create New Tag
                </Link>
            </div>
            <div className="card">
                <ul style={{ listStyle: "none", padding: 0 }}>
                    {tags.map((tag) => (
                        <li
                            key={tag.id}
                            style={{
                                padding: "8px 0",
                                borderBottom: "1px solid #eee",
                            }}
                        >
                            <span style={{ fontSize: "16px" }}>{tag.name}</span>
                        </li>
                    ))}
                </ul>
                {tags.length === 0 && <p>No tags found.</p>}
            </div>
        </div>
    );
};

export default TagList;
