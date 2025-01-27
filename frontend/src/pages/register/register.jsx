import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/authContext';

const Register = () => {

    const { register } = useAuth();
    const handleregister = () => {
        register();
    }

  return (
    <div className="flex min-h-screen bg-gray-100 flex-row-reverse">
      <div className="w-1/2 bg-white p-12 flex flex-col justify-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-6">Welcome to the Register Page</h1>
        <p className="text-gray-600 mb-8">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam repudiandae magnam id vero, impedit in minima reiciendis voluptate sed iusto autem quasi exercitationem optio nostrum reprehenderit quod eveniet, deserunt labore.
        </p>
        <div className="flex items-center space-x-4">
          <span className="text-gray-700">Do you have an account?</span>
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
          <form className="space-y-6">
            <input 
              type="text" 
              placeholder='Username' 
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input 
              type="text" 
              placeholder='Email' 
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input 
              type="password" 
              placeholder='Password' 
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button 
              onClick={handleregister}
              type='submit' 
              className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition duration-300 ease-in-out transform hover:scale-105"
            >
              Register
            </button>
          </form>
        </div>
      </div>
    </div>
  )
};

export default Register;