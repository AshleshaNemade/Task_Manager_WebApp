import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { registerUser } from "../services/authService";

import Alert from "../components/Alert";
import Loader from "../components/Loader";

const Register = () => {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        role: "user"
    });

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {

        setError("");

        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        setLoading(true);
        setError("");
        setSuccess("");

        try {

            await registerUser(formData);

            setSuccess("Registration successful! Redirecting to Login...");

            setTimeout(() => {

                navigate("/login");

            }, 1500);

        } catch (err) {

            if (err.response?.data?.errors) {

                setError(
                    err.response.data.errors[0].msg
                );

            } else {

                setError(
                    err.response?.data?.message ||
                    "Registration failed."
                );

            }

        } finally {

            setLoading(false);

        }

    };

    return (

        <div className="auth-container">

            <form
                className="auth-form"
                onSubmit={handleSubmit}
            >

                <h2>Create Account</h2>

                <p className="auth-subtitle">

                    Register to start managing tasks

                </p>

                <Alert
                    type="success"
                    message={success}
                    onClose={() => setSuccess("")}
                />

                <Alert
                    type="error"
                    message={error}
                    onClose={() => setError("")}
                />

                <input
                    type="text"
                    name="name"
                    placeholder="Full Name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                />

                <input
                    type="email"
                    name="email"
                    placeholder="Email Address"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />

                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                />

                {
                    loading ?

                    <Loader/>

                    :

                    <button
                        type="submit"
                    >

                        Register

                    </button>

                }

                <p className="auth-link">

                    Already have an account?

                    {" "}

                    <Link to="/login">

                        Login

                    </Link>

                </p>

            </form>

        </div>

    );

};

export default Register;