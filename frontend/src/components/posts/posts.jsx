import React from 'react';
import Post from '../post/post';

const Posts = ({ posts, loading, error, onPostDeleted }) => {
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
                <Post post={post} key={post.id} onPostDeleted={onPostDeleted} />
            ))}
        </div>
    );
};

export default Posts;