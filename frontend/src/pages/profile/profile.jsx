import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '../../context/authContext';
import Posts from '../../components/posts/posts';

const Profile = () => {
    const { id } = useParams();
    const { currentUser } = useAuth();
    const [profileUser, setProfileUser] = useState(null);
    const [posts, setPosts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [postsLoading, setPostsLoading] = useState(true);
    const [postsError, setPostsError] = useState(null);
    
    const token = localStorage.getItem("access_token");

    // Fetch profile data
    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const response = await fetch(`http://127.0.0.1:8000/api/users/userprofile/${id}/`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
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
    }, [id, token]);

    // Fetch all posts and filter for user
    const fetchUserPosts = async () => {
        try {
            if (!token) {
                throw new Error("User is not authenticated");
            }
            const response = await fetch("http://127.0.0.1:8000/api/posts/", {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`,
                },
            });
            
            if (!response.ok) throw new Error('Failed to fetch posts');
            
            const data = await response.json();
            const userPosts = data.filter(post => post.user.id === parseInt(id));
            setPosts(userPosts);
        } catch (error) {
            setPostsError(error.message);
        } finally {
            setPostsLoading(false);
        }
    };

    useEffect(() => {
        fetchUserPosts();
    }, [id, token]);

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;
    if (!profileUser) return <div>No profile data found</div>;

    // Get first letter of email (uppercase)
    const firstLetter = profileUser.email.charAt(0).toUpperCase();

    return (
        <div className="relative w-full max-w-md mx-auto">
            {/* Background Image */}
            <div className="w-full h-48 overflow-hidden bg-gray-200">
                <img 
                    src="https://www.psychowellnesscenter.com/images/blogs/gratitude.jpeg"
                    alt="background" 
                    className="w-full h-full object-cover"
                />
            </div>
            
            {/* Profile Section */}
            <div className="relative">
                {/* Profile Letter Avatar */}
                <div className="absolute -top-16 left-1/2 transform -translate-x-1/2 w-32 h-32 border-4 border-white rounded-full overflow-hidden bg-blue-500 flex items-center justify-center">
                    <span className="text-5xl font-bold text-white">
                        {firstLetter}
                    </span>
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
                <Posts 
                    posts={posts} 
                    loading={postsLoading} 
                    error={postsError} 
                />
            </div>
        </div>
    );
};

export default Profile;