import React, {  useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

interface LoginProps {
    setToken: (token: string) => void;
}

const Login: React.FC<LoginProps> = ({ setToken }) => {
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [error, setError] = useState<string>("");
    const navigate = useNavigate();


    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        try {
            const response = await axios.post("https://localhost:7134/api/user/login", {
                username,
                password,
            });
            if (response.data.id) {
                setToken(response.data.token);

                console.log('from login ', response.data.token);
                sessionStorage.setItem("token", response.data.token);
                if (response.data.id) {
                    sessionStorage.setItem("userId", response.data.id);
                    navigate("/queue");
                }
            }
            else
            {
                throw new Error('Invalid username or password.');
            }
        } catch (err) {
            setError("Invalid username or password.");
        }
    };

    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
                <div>
                    <label>Username</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Password</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                {error && <p style={{ color: "red" }}>{error}</p>}
                <button type="submit">Login</button>
            </form>
            <p>
                Don't have an account? <a href="/register">Register</a>
            </p>
        </div>
    );
};

export default Login;


