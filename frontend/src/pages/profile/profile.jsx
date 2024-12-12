import React from 'react';
import { useAuth } from '../../context/authContext';
import Posts from '../../components/posts/posts';
const Profile = () => {
    //current user will be replaced with the user from the database
    const { currentUser } = useAuth();
    const backgroundImage = "https://plus.unsplash.com/premium_photo-1682092961192-3ec38c7c8e88?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Z3JhdGl0dWRlfGVufDB8fDB8fHww";
    return (
        <div className="relative w-full max-w-md mx-auto">
          {/* Background Image */}
          <div className="w-full h-48 overflow-hidden">
            <img 
              src={backgroundImage} 
              alt="background" 
              className="w-full h-full object-cover"
            />
          </div>
    
          {/* Profile Section */}
          <div className="relative">
            {/* Profile Picture */}
            <div className="absolute -top-16 left-1/2 transform -translate-x-1/2 w-32 h-32 border-4 border-white rounded-full overflow-hidden">
              <img 
                src={currentUser.profilePicture} 
                alt="profile" 
                className="w-full h-full object-cover"
              />
            </div>
    
            {/* User Details */}
            <div className="pt-20 text-center">
              <h1 className="text-2xl font-bold">{currentUser.name}</h1>
              
              {/* Follow Button */}
              <button className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors">
                Follow
              </button>
            </div>
          </div>
    
          {/* Posts Section */}
          <div className="mt-6 p-4">
            {/* <h1 className="text-xl font-semibold">Posts</h1> */}
            <Posts />
            {/* Add posts content here */}
          </div>
        </div>
      );
};

export default Profile;