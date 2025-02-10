import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '../../context/authContext';
import Posts from '../../components/posts/posts';
import { UserCircle2, Loader2, Users, Calendar, Mail, MapPin, Link as LinkIcon } from 'lucide-react';

const Profile = () => {
    const { id } = useParams();
    const { currentUser } = useAuth();
    const [profileUser, setProfileUser] = useState(null);
    const [posts, setPosts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [postsLoading, setPostsLoading] = useState(true);
    const [postsError, setPostsError] = useState(null);
    const [isFollowing, setIsFollowing] = useState(false);
    const [activeTab, setActiveTab] = useState('posts');
    
    const token = localStorage.getItem("access_token");

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const response = await fetch(`http://127.0.0.1:8000/api/users/userprofile/${id}/`, {
                    headers: { 'Authorization': `Bearer ${token}` }
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

    const fetchUserPosts = async () => {
        try {
            if (!token) throw new Error("User is not authenticated");
            const response = await fetch("http://127.0.0.1:8000/api/posts/", {
                headers: { "Authorization": `Bearer ${token}` }
            });
            if (!response.ok) throw new Error('Failed to fetch posts');
            const data = await response.json();
            setPosts(data.filter(post => post.user.id === parseInt(id)));
        } catch (error) {
            setPostsError(error.message);
        } finally {
            setPostsLoading(false);
        }
    };

    useEffect(() => {
        fetchUserPosts();
    }, [id, token]);

    if (isLoading) return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="text-center space-y-3">
                <Loader2 className="w-10 h-10 animate-spin text-blue-500 mx-auto" />
                <p className="text-gray-500">Loading profile...</p>
            </div>
        </div>
    );

    if (error) return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="bg-red-50 text-red-500 p-4 rounded-lg max-w-md text-center">
                <p className="font-medium">Error loading profile</p>
                <p className="text-sm mt-1">{error}</p>
            </div>
        </div>
    );

    if (!profileUser) return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="text-gray-500 text-center">
                <UserCircle2 className="w-16 h-16 mx-auto mb-4 opacity-50" />
                <p className="font-medium">Profile not found</p>
            </div>
        </div>
    );

    return (
        <div className="max-w-5xl mx-auto pb-8">
            {/* Hero Section */}
            <div className="relative h-48 md:h-64 lg:h-80 bg-gradient-to-br from-blue-600 to-purple-700 overflow-hidden">
                <div className="absolute inset-0 bg-black/20" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
            </div>

            {/* Profile Content */}
            <div className="relative px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto">
                    <div className="-mt-24 sm:-mt-32 space-y-6">
                        {/* Profile Card */}
                        <div className="bg-white rounded-xl shadow-lg p-6 backdrop-blur-lg bg-white/95">
                            <div className="flex flex-col sm:flex-row items-center gap-6">
                                {/* Avatar */}
                                <div className="relative group">
                                    <div className="w-32 h-32 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center transform group-hover:scale-105 transition-all duration-200 shadow-lg">
                                        <span className="text-5xl font-bold text-white">
                                            {profileUser.email.charAt(0).toUpperCase()}
                                        </span>
                                    </div>
                                </div>

                                {/* User Info */}
                                <div className="flex-1 text-center sm:text-left space-y-4">
                                    <div>
                                        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
                                            {profileUser.profile || profileUser.email.split('@')[0]}
                                        </h1>
                                        <p className="text-gray-500 mt-1">@{profileUser.email.split('@')[0]}</p>
                                    </div>
                                    
                                    <div className="flex flex-wrap justify-center sm:justify-start gap-4 text-sm text-gray-600">
                                        <div className="flex items-center gap-2">
                                            <Mail className="w-4 h-4 text-gray-400" />
                                            <span>{profileUser.email}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Users className="w-4 h-4 text-gray-400" />
                                            <span>123 followers</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Calendar className="w-4 h-4 text-gray-400" />
                                            <span>Joined {new Date().getFullYear()}</span>
                                        </div>
                                    </div>

                                    {/* Action Buttons */}
                                    {currentUser && profileUser.id !== currentUser.id && (
                                        <div className="flex justify-center sm:justify-start gap-3 mt-4">
                                            <button
                                                onClick={() => setIsFollowing(!isFollowing)}
                                                className={`
                                                    px-6 py-2 rounded-full font-medium transition-all duration-200
                                                    ${isFollowing
                                                        ? 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                                                        : 'bg-blue-500 text-white hover:bg-blue-600 shadow-md hover:shadow-lg'
                                                    }
                                                `}
                                            >
                                                {isFollowing ? 'Following' : 'Follow'}
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Tabs & Content */}
                        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                            <div className="border-b border-gray-200">
                                <nav className="flex">
                                    <button
                                        onClick={() => setActiveTab('posts')}
                                        className={`
                                            px-6 py-4 text-sm font-medium transition-colors relative
                                            ${activeTab === 'posts'
                                                ? 'text-blue-600 border-b-2 border-blue-600'
                                                : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                                            }
                                        `}
                                    >
                                        Posts
                                    </button>
                                    <button
                                        onClick={() => setActiveTab('about')}
                                        className={`
                                            px-6 py-4 text-sm font-medium transition-colors relative
                                            ${activeTab === 'about'
                                                ? 'text-blue-600 border-b-2 border-blue-600'
                                                : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                                            }
                                        `}
                                    >
                                        About
                                    </button>
                                </nav>
                            </div>

                            <div className="p-6">
                                {activeTab === 'posts' ? (
                                    <Posts 
                                        posts={posts} 
                                        loading={postsLoading} 
                                        error={postsError} 
                                    />
                                ) : (
                                    <div className="space-y-6">
                                        <h3 className="text-lg font-semibold text-gray-900">About</h3>
                                        <p className="text-gray-600">
                                            Profile information and bio will be displayed here.
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;