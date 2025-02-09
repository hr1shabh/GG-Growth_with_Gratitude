import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '../../context/authContext';
import Posts from '../../components/posts/posts';
import CreatePost from '../../components/createPost/createPost';

const Profile = () => {
    const { id } = useParams();
    const { currentUser } = useAuth();
    const [profileUser, setProfileUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const response = await fetch(`http://127.0.0.1:8000/api/users/userprofile/${id}/`, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('access_token')}`
                    }
                });
                
                if (!response.ok) throw new Error('Failed to fetch profile');
                
                const data = await response.json();
                setProfileUser(data);
            } catch (error) {
                setError(error.message);
            } finally {
                setIsLoading(false);
            }
        };
        fetchUserProfile();
    }, [id]);

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;
    if (!profileUser) return <div>No profile data found</div>;

    return (
        <div className="relative w-full max-w-md mx-auto">
            {/* Background Image */}
            <div className="w-full h-48 overflow-hidden bg-gray-200">
                <img 
                    src="/default-background.jpg"
                    alt="background" 
                    className="w-full h-full object-cover"
                />
            </div>
            
            {/* Profile Section */}
            <div className="relative">
                {/* Profile Picture */}
                <div className="absolute -top-16 left-1/2 transform -translate-x-1/2 w-32 h-32 border-4 border-white rounded-full overflow-hidden bg-gray-200">
                    <img 
                        src="/default-avatar.png"
                        alt="profile" 
                        className="w-full h-full object-cover"
                    />
                </div>
                
                {/* User Details */}
                <div className="pt-20 text-center">
                    <h1 className="text-2xl font-bold">
                        {profileUser.profile || profileUser.email}
                    </h1>
                    <p className="text-gray-600">{profileUser.email}</p>
                    
                    {/* Follow Button - Only show if not current user's profile */}
                    {currentUser && profileUser.id !== currentUser.id && (
                        <button className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors">
                            Follow
                        </button>
                    )}
                </div>
            </div>
            
            {/* Posts Section */}
            <div className="mt-6 p-4">
                {/* <Posts userId={id} /> */}
            </div>
        </div>
    );
};

export default Profile;