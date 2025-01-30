import { useEffect, useState } from "react";
import Post from "../post/post";
import { useAuth } from '../../context/authContext';

const Posts = () => {
    const [posts, setPosts] = useState([]); // State to store posts
    const [loading, setLoading] = useState(true); // State to handle loading
    const [error, setError] = useState(null); // State to handle errors
    const { currentUser } = useAuth(); // Get the current user from AuthContext

    // Fetch posts from the backend
    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const token = localStorage.getItem("access_token"); // Retrieve the token from localStorage
                if (!token) {
                    throw new Error("User is not authenticated");
                }

                const response = await fetch("http://127.0.0.1:8000/api/posts/", {
                    method: "GET",
                    headers: {
                        "Authorization": `Bearer ${token}`, // Include the token in the header
                    },
                });

                if (!response.ok) {
                    throw new Error("Failed to fetch posts");
                }

                const data = await response.json();
                setPosts(data); // Update the posts state with fetched data
            } catch (error) {
                setError(error.message); // Set error state if something goes wrong
            } finally {
                setLoading(false); // Set loading to false after the request completes
            }
        };

        fetchPosts();
    }, []); // Empty dependency array ensures this runs only once on mount

    // Display loading state
    if (loading) {
        return <div>Loading...</div>;
    }

    // Display error state
    if (error) {
        return <div>Error: {error}</div>;
    }

    // Render posts
    return (
        <div className="posts">
            {posts.map((post) => (
                <Post post={post} key={post.id} />
            ))}
        </div>
    );
};

export default Posts;