import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/authContext';

const Register = () => {
    const navigate = useNavigate();
    const { register, loading, error, currentUser } = useAuth();
    const [profile, setProfile] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // Effect to handle navigation after successful registration
    useEffect(() => {
        if (currentUser) {
            console.log('User registered successfully, navigating to home');
            navigate('/');
        }
    }, [currentUser, navigate]);

    const handleRegister = async (e) => {
        e.preventDefault();
        
        // Basic validation
        if (!profile || !email || !password) {
            console.error('Please fill in all fields');
            return;
        }

        try {
            // console.log('Attempting registration', { email, profile });
            
            const success = await register(email, password, profile);
            
            console.log('Registration attempt result:', success);
            
            // Navigation will be handled by the useEffect watching currentUser
            if (!success) {
                console.error('Registration failed');
            }
        } catch (err) {
            console.error('Registration process error:', err);
        }
    };

    return (
        <div className="flex min-h-screen bg-gray-100 flex-row-reverse">
            <div className="w-1/2 bg-white p-12 flex flex-col justify-center">
                <h1 className="text-4xl font-bold text-gray-800 mb-6">Create Your Account</h1>
                <p className="text-gray-600 mb-8">
                    Join our platform by creating a new account. It's quick and easy!
                </p>
                <div className="flex items-center space-x-4">
                    <span className="text-gray-700">Already have an account?</span>
                    <Link to="/login">
                        <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-300">
                            Login
                        </button>
                    </Link>
                </div>
            </div>
            <div className="w-1/2 bg-blue-50 flex items-center justify-center p-12">
                <div className="w-full max-w-md">
                    <h2 className="text-3xl font-semibold text-gray-800 mb-8 text-center">Register</h2>
                    <form className="space-y-6" onSubmit={handleRegister}>
                        <input
                            type="text"
                            placeholder="Username"
                            value={profile}
                            onChange={(e) => setProfile(e.target.value)}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
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
                            minLength="5"  // Add minimum password length
                        />
                        {error && (
                            <p className="text-red-500 text-sm text-center">{error}</p>
                        )}
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition duration-300 ease-in-out transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? "Registering..." : "Register"}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Register;