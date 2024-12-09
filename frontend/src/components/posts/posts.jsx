import { useEffect, useState } from "react";

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
        <div className="container mx-auto px-4 py-6 space-y-6">
        {posts.map((post, index) => (
          <div 
            key={index} 
            className="bg-white shadow-lg rounded-lg overflow-hidden border border-gray-200 hover:shadow-xl transition-shadow duration-300"
          >
            <div className="px-6 py-4 flex justify-between items-center border-b border-gray-100">
              <h3 className="text-xl font-bold text-gray-800">{post.name}</h3>
              <p className="text-sm text-gray-500">{post.date}</p>
            </div>
            <div className="px-6 py-4">
              <ul className="space-y-2">
                {[post.Gratitudepoint1, post.Gratitudepoint2, post.Gratitudepoint3].map((point, idx) => (
                  <li 
                    key={idx} 
                    className="flex items-start space-x-3"
                  >
                    <svg 
                      className="w-5 h-5 text-green-500 flex-shrink-0 mt-1" 
                      fill="currentColor" 
                      viewBox="0 0 20 20"
                    >
                      <path 
                        fillRule="evenodd" 
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" 
                        clipRule="evenodd" 
                      />
                    </svg>
                    <span className="text-gray-700">{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
 
    )
}

export default Posts;