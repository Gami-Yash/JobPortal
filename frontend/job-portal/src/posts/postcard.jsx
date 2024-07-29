import React from "react";

const PostCard = ({ post }) => {
  return (
    <div className="max-w-md mx-auto p-4 bg-white drop-shadow-xl rounded-lg overflow-hidden">
      {post.image && (
        <img src={post.image} alt="Post" className="w-full h-64 object-cover" />
      )}
      <div className="p-4">
        <h2 className="text-xl font-bold mb-2">Description</h2>
        <p className="text-gray-700 mb-4">{post.description}</p>
        <h3 className="text-lg font-semibold mb-2">Tags</h3>
        <p className="text-gray-700">{post.tags}</p>
      </div>
    </div>
  );
};

export default PostCard;
