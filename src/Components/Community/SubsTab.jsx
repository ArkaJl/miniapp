
import Post from "/src/Components/Post/Post.jsx";
import React from "react";

const SubsTab = ({ posts, isMobile, handleLike, handlePostClick }) => {
    return (
        <>
            {/* Лента постов */}
            <div className={`space-y-4 ${!isMobile ? 'max-w-2xl mx-auto' : ''} mb-18`}>
                {posts.map(post => (
                    <Post
                        key={post.id}
                        {...post}
                        onLike={handleLike}
                        onPostClick={handlePostClick}
                        isMobile={isMobile}
                    />
                ))}
            </div>
        </>
    );
};

export default SubsTab;