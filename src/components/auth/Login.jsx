import React, { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { useHistory } from "react-router-dom";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();
    const history = useHistory();

    // Demo mode - bypass actual API for testing
    const handleDemoLogin = () => {
        // Create mock user data
        const mockUser = {
            id: "1",
            firstName: "Demo",
            lastName: "User",
            email: "demo@example.com",
        };

        login(mockUser);
        history.push("/");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            const response = await fetch("http://localhost:8080/api/v1/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    userEmail: email,
                    userPassword: password,
                }),
            });

            const data = await response.json();

            if (response.ok) {
                // Create a user object with the response data
                const user = {
                    id: data.userId,
                    email: email,
                    // Using default values for firstName/lastName since they're not in the response
                    firstName: email.split("@")[0],
                    lastName: "",
                };

                login(user);
                history.push("/");
            } else {
                setError(data || "Invalid email or password");
            }
        } catch (err) {
            setError("Login failed. Please check your network connection.");
            console.error("Login error:", err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="card">
            <h2>Login</h2>
            {error && <div className="alert alert-error">{error}</div>}
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input
                        id="email"
                        className="form-control"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password:</label>
                    <input
                        id="password"
                        className="form-control"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="button" disabled={loading}>
                    {loading ? "Logging in..." : "Login"}
                </button>
            </form>

            <div style={{ marginTop: "20px", textAlign: "center" }}>
                <div className="alert alert-info">
                    <strong>Note:</strong> You can try with your REST API
                    endpoint or use the demo account.
                </div>
                <button
                    onClick={handleDemoLogin}
                    className="button"
                    style={{ background: "#666" }}
                >
                    Login with Demo Account
                </button>
            </div>
        </div>
    );
};

export default Login;
