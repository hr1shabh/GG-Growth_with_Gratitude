import { useEffect, useState } from "react";
import Post from "../post/post";

const Posts = () => {
    const posts = [
        {
            id: 1,
            name: "John Doe",
            userId: 1,
            date: "2024-01-01",
            Gratitudepoint1: "I a grateful for the opportunity to be here",
            Gratitudepoint2: "I a grateful for the my family",
            Gratitudepoint3: "I a grateful for my health"
        },
        {
            id: 2,
            name: "Jane Doe",
            userId: 2,
            date: "2024-01-01",
            Gratitudepoint1: "I a grateful for the opportunity to be here",
            Gratitudepoint2: "I a grateful for the my family",
            Gratitudepoint3: "I a grateful for my health"
        }
    ]
    return (
        <div className="posts">
            {posts.map((post) => (
                <Post post={post} key={post.id} />
            ))}
        </div>
    )
}

export default Posts;