import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/authContext';
import { useGoogleLogin } from '@react-oauth/google';

const Login = () => {
    const navigate = useNavigate();
    const { login, googleLogin, loading, error, currentUser } = useAuth();

    const loginToGoogle = useGoogleLogin({
        onSuccess: codeResponse => googleLogin(codeResponse.code),
        flow: 'auth-code',
    });
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        if (currentUser) {
            navigate('/');
        }
    }, [currentUser, navigate]);

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const success = await login(email, password);
            if (!success) {
                console.error('Login explicitly failed');
            }
        } catch (err) {
            console.error('Login process error:', err);
        }
    };

    return (
        <div className="flex min-h-screen bg-gray-100">
            <div className="w-1/2 bg-white p-12 flex flex-col justify-center">
                <h1 className="text-4xl font-bold text-gray-800 mb-6">Welcome to the Login Page</h1>
                <p className="text-gray-600 mb-8">
                    Login to access your account
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

                    <div className="mt-6">
                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-gray-300"></div>
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="px-2 bg-blue-50 text-gray-500">Or continue with</span>
                            </div>
                        </div>

                        <button
                            onClick={() => loginToGoogle()}
                            type="button"
                            className="mt-6 w-full flex items-center justify-center gap-3 bg-white text-gray-700 border border-gray-300 py-3 rounded-lg hover:bg-gray-50 transition duration-300 shadow-sm hover:shadow-md"
                        >
                            <img src="https://www.svgrepo.com/show/475656/google-color.svg" className="h-5 w-5" alt="Google" />
                            Sign in with Google
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;