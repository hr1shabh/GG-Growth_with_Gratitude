import React from 'react';
import Posts from '../../components/posts/posts';
import CreatePost from '../../components/createPost/createPost';

const Home = () => {

    return (
        <div>
            <CreatePost />
            <Posts />
        </div>
    )
};

export default Home;
