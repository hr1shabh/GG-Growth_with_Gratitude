import React, { useState, useEffect } from 'react';
import API_BASE_URL from '../../apiConfig';
import Posts from '../../components/posts/posts';
import CreatePost from '../../components/createPost/createPost';

const Home = () => {
    const [posts, setPosts] = useState([]); // State to store posts
    const [loading, setLoading] = useState(true); // State to handle loading
    const [error, setError] = useState(null); // State to handle errors
    const token = localStorage.getItem("access_token");

    // Function to fetch posts
    const fetchPosts = React.useCallback(async () => {
        try {
            if (!token) {
                throw new Error("User is not authenticated");
            }

            const response = await fetch(`${API_BASE_URL}/api/posts/`, {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                throw new Error("Failed to fetch posts");
            }

            const data = await response.json();
            setPosts(data); // Update the posts state
        } catch (error) {
            setError(error.message); // Set error state
        } finally {
            setLoading(false); // Set loading to false
        }
    }, [token]);

    // Fetch posts when the component mounts
    useEffect(() => {
        fetchPosts();
    }, [fetchPosts]);

    return (
        <div>
            {/* Pass fetchPosts to CreatePost */}
            <CreatePost fetchPosts={fetchPosts} />

            {/* Pass posts, loading, and error to Posts */}
            <Posts posts={posts} loading={loading} error={error} />
        </div>
    );
};

export default Home;