import React, { useState, useEffect } from "react";
import Login from "./components/login";
import Register from "./components/register";
import Queue from "./components/queue/queue";
import { jwtDecode, JwtPayload } from "jwt-decode";

import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import './App.css';





const App: React.FC = () => {
    const [token, setToken] = useState<string | null>(sessionStorage.getItem("token"));





    useEffect(() => {
        // Automatically log out if the token is expired
        if (token) {
            const decodeToken = (token: string): JwtPayload | null => {
                try {
                    return jwtDecode<JwtPayload>(token);
                } catch {
                    return null; // Return null for invalid tokens
                }
            };

            const tokenPayload = decodeToken(token);

            if (tokenPayload) {
                console.log("Decoded payload:", tokenPayload);
            } else {
                console.error("Failed to decode token");
            }

        }
    }, [token]);


    const handleLogout = () => {
        setToken(null);
        sessionStorage.removeItem("token");
    };

    return (
        <Router>
            <div className="container">
                <header>
                    <nav>
                        <h1>מערכת לניהול מספרת כלבים</h1>
                        {token && (
                            <button onClick={handleLogout} style={{ float: "right" }}>
                                Logout
                            </button>
                        )}
                    </nav>
                </header>
                <main>
                    <Routes>
                        <Route
                            path="/login"
                            element={!token ? <Login setToken={setToken} /> : <Navigate to="/queue" />}
                        />
                        <Route
                            path="/register"
                            element={!token ? <Register /> : <Navigate to="/queue" />}
                        />
                        <Route
                            path="/queue"
                            element={token ? <Queue token={token} userId={sessionStorage.getItem('userId')! } /> : <Navigate to="/login" />}
                        />
                        <Route path="*" element={<Navigate to={token ? "/queue" : "/login"} />} />
                    </Routes>
                </main>
            </div>
        </Router>
    );
};

export default App;
