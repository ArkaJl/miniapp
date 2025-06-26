// src/Components/Community/HomeTab.jsx
import { motion } from "framer-motion";
import Post from "/src/Components/Post/Post.jsx";
import React from "react";

const HomeTab = ({ featuredContent, posts, isMobile, handleLike, handlePostClick }) => {
    return (
        <>
            {/* Подборка контента */}
            <section className="mb-6">
                <div className={`grid ${isMobile ? 'grid-cols-2' : 'grid-cols-3'} gap-3 mb-3`}>
                    {/* Главный элемент подборки */}
                    <motion.div
                        className={`rounded-xl overflow-hidden relative ${isMobile ? 'col-span-2 h-48' : 'col-span-2 h-64'}`}
                        whileTap={{ scale: 0.98 }}
                    >
                        <img
                            src={featuredContent[0].image}
                            alt={featuredContent[0].title}
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-3">
                            <h3 className={`font-bold text-white ${isMobile ? 'text-base' : 'text-lg'}`}>{featuredContent[0].title}</h3>
                        </div>
                    </motion.div>

                    {/* Второстепенные элементы */}
                    {featuredContent.slice(1, isMobile ? 3 : 4).map(item => (
                        <motion.div
                            key={item.id}
                            className="rounded-xl overflow-hidden relative h-32"
                            whileTap={{ scale: 0.98 }}
                        >
                            <img
                                src={item.image}
                                alt={item.title}
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-2">
                                <h3 className={`font-bold text-white ${isMobile ? 'text-sm' : 'text-base'}`}>{item.title}</h3>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Горизонтальная лента подборки */}
                <div className="overflow-x-auto pb-2 scrollbar-hide">
                    <div className="flex space-x-3 w-max">
                        {featuredContent.map(item => (
                            <motion.div
                                key={item.id}
                                className={`flex-shrink-0 rounded-xl overflow-hidden relative ${isMobile ? 'w-32 h-24' : 'w-48 h-36'}`}
                                whileTap={{ scale: 0.98 }}
                            >
                                <img
                                    src={item.image}
                                    alt={item.title}
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-2">
                                    <h3 className={`font-bold text-white ${isMobile ? 'text-xs' : 'text-sm'}`}>{item.title}</h3>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

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

export default HomeTab;