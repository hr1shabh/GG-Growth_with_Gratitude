import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/authContext';

const Login = () => {
    const navigate = useNavigate();
    const { login, loading, error } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault(); // Prevent form submission
        const success = await login(email, password); // Call the login function
        if (success) {
            navigate('/'); // Redirect to the homepage on success
        }
    };

    return (
        <div className="flex min-h-screen bg-gray-100">
            <div className="w-1/2 bg-white p-12 flex flex-col justify-center">
                <h1 className="text-4xl font-bold text-gray-800 mb-6">Welcome to the Login Page</h1>
                <p className="text-gray-600 mb-8">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam repudiandae magnam id vero, impedit in minima reiciendis voluptate sed iusto autem quasi exercitationem optio nostrum reprehenderit quod eveniet, deserunt labore.
                </p>
                <div className="flex items-center space-x-4">
                    <span className="text-gray-700">Don't have an account?</span>
                    <Link to="/register">
                        <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-300">
                            Register
                        </button>
                    </Link>
                </div>
            </div>
            <div className="w-1/2 bg-blue-50 flex items-center justify-center p-12">
                <div className="w-full max-w-md">
                    <h2 className="text-3xl font-semibold text-gray-800 mb-8 text-center">Login</h2>
                    <form className="space-y-6" onSubmit={handleLogin}>
                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                        {error && (
                            <p className="text-red-500 text-sm text-center">{error}</p>
                        )}
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition duration-300 ease-in-out transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? 'Logging in...' : 'Login'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;