import { useState, useEffect } from "react";
import {
    FaArrowLeft,
    FaBell,
    FaHome,
    FaUsers,
    FaComments,
    FaImages,
    FaUser,
    FaBars,
    FaStore
} from 'react-icons/fa';
import { GiCoins, GiBo } from 'react-icons/gi';
import { motion, useScroll, useTransform } from "framer-motion";
import { Link } from "react-router-dom";
import Post from "/src/Components/Post/Post.jsx";

const CommunityPage = () => {
    const [activeTab, setActiveTab] = useState('home');
    const [isScrolled, setIsScrolled] = useState(false);
    const [posts, setPosts] = useState([
        {
            id: 1,
            authorAvatar: 'https://source.unsplash.com/random/200x200/?profile1',
            authorName: 'User1',
            title: 'Это мой первый пост в этом сообществе!',
            image: 'https://source.unsplash.com/random/600x400/?nature1',
            likesCount: 24,
            sharesCount: 5,
            commentsCount: 8,
            date: '2 часа назад'
        },
        {
            id: 2,
            authorAvatar: 'https://source.unsplash.com/random/200x200/?profile1',
            authorName: 'User1',
            title: 'Это мой первый пост в этом сообществе!',
            image: 'https://source.unsplash.com/random/600x400/?nature1',
            likesCount: 24,
            sharesCount: 5,
            commentsCount: 8,
            date: '2 часа назад'
        },
        {
            id: 3,
            authorAvatar: 'https://source.unsplash.com/random/200x200/?profile1',
            authorName: 'User1',
            title: 'Это мой первый пост в этом сообществе!',
            image: 'https://source.unsplash.com/random/600x400/?nature1',
            likesCount: 24,
            sharesCount: 5,
            commentsCount: 8,
            date: '2 часа назад'
        },
        // ... остальные посты
    ]);

    const featuredContent = [
        {
            id: 1,
            authorAvatar: 'https://source.unsplash.com/random/200x200/?profile1',
            authorName: 'User1',
            title: 'Это мой первый пост в этом сообществе!',
            image: 'https://source.unsplash.com/random/600x400/?nature1',
            likesCount: 24,
            sharesCount: 5,
            commentsCount: 8,
            date: '2 часа назад'
        },
        {
            id: 2,
            authorAvatar: 'https://source.unsplash.com/random/200x200/?profile1',
            authorName: 'User1',
            title: 'Это мой первый пост в этом сообществе!',
            image: 'https://source.unsplash.com/random/600x400/?nature1',
            likesCount: 24,
            sharesCount: 5,
            commentsCount: 8,
            date: '2 часа назад'
        },
        {
            id: 3,
            authorAvatar: 'https://source.unsplash.com/random/200x200/?profile1',
            authorName: 'User1',
            title: 'Это мой первый пост в этом сообществе!',
            image: 'https://source.unsplash.com/random/600x400/?nature1',
            likesCount: 24,
            sharesCount: 5,
            commentsCount: 8,
            date: '2 часа назад'
        },
        {
            id: 4,
            authorAvatar: 'https://source.unsplash.com/random/200x200/?profile1',
            authorName: 'User1',
            title: 'Это мой первый пост в этом сообществе!',
            image: 'https://source.unsplash.com/random/600x400/?nature1',
            likesCount: 24,
            sharesCount: 5,
            commentsCount: 8,
            date: '2 часа назад'
        },
    ];

    // Эффект для отслеживания скролла
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Анимация для шапки
    const headerHeight = useTransform(
        useScroll().scrollY,
        [0, 100],
        ['180px', '120px']
    );

    const avatarSize = useTransform(
        useScroll().scrollY,
        [0, 100],
        ['60px', '40px']
    );

    const handleLike = (postId, isLiked) => {
        // ... существующая функция
    };

    const handlePostClick = (postId) => {
        // ... существующая функция
    };

    return (
        <div className="bg-[#14102a] text-white min-h-screen pb-16">
            {/* Анимированная шапка */}
            <motion.header
                className="relative bg-[#233e85] sticky top-0 z-50 overflow-hidden"
                style={{ height: headerHeight }}
            >
                {/* Фоновое изображение */}
                <motion.div
                    className="absolute inset-0 overflow-hidden"
                    style={{ scale: useTransform(useScroll().scrollY, [0, 100], [1, 1.1]) }}
                >
                    <img
                        src="https://source.unsplash.com/random/800x200/?community,background"
                        alt="Community background"
                        className="w-full h-full object-cover opacity-30"
                    />
                </motion.div>

                <div className="relative z-10 p-4 h-full flex flex-col justify-end">
                    <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center">
                            <Link to="/" className="mr-3">
                                <FaArrowLeft className="text-xl" />
                            </Link>
                            <motion.div
                                className="rounded-full bg-[#8e83e4] overflow-hidden border-2 border-white"
                                style={{
                                    width: avatarSize,
                                    height: avatarSize,
                                    minWidth: avatarSize
                                }}
                            >
                                <img
                                    src="https://source.unsplash.com/random/200x200/?community"
                                    alt="Community"
                                    className="w-full h-full object-cover"
                                />
                            </motion.div>
                            <motion.h1
                                className="ml-3 font-bold text-lg truncate max-w-[120px]"
                                animate={{
                                    fontSize: isScrolled ? '1rem' : '1.25rem',
                                    opacity: isScrolled ? 0.9 : 1
                                }}
                            >
                                Крутое сообщество
                            </motion.h1>
                        </div>
                        <div className="flex items-center space-x-2">
                            <button className="p-1 rounded-full hover:bg-[#35518e]">
                                <FaBell className="text-lg" />
                            </button>
                        </div>
                    </div>

                    {/* Валюты */}
                    <motion.div
                        className="flex flex-col items-end absolute top-4 right-14 space-y-1"
                        animate={{
                            scale: isScrolled ? 0.9 : 1,
                            opacity: isScrolled ? 0.8 : 1
                        }}
                    >
                        <div className="flex items-center bg-[#1c2562] px-2 py-1 rounded-full">
                            <GiCoins className="text-[#bbb2f0] text-sm mr-1" />
                            <span className="text-xs">150</span>
                        </div>
                        <div className="flex items-center bg-[#1c2562] px-2 py-1 rounded-full">
                            <GiBo className="text-[#a45cd4] text-sm mr-1" />
                            <span className="text-xs">25</span>
                        </div>
                    </motion.div>

                    {/* Меню вкладок */}
                    <motion.div
                        className="flex justify-between border-b border-[#35518e] mt-auto"
                        animate={{
                            paddingBottom: isScrolled ? '0.5rem' : '1rem'
                        }}
                    >
                        {[
                            { id: 'home', name: 'Главная' },
                            { id: 'subs', name: 'Подписки' },
                            { id: 'chats', name: 'Чаты' },
                            { id: 'albums', name: 'Альбомы' }
                        ].map(tab => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`pb-2 px-1 relative ${activeTab === tab.id ? 'text-[#bcd8f6]' : 'text-[#8e83e4]'}`}
                            >
                                {tab.name}
                                {activeTab === tab.id && (
                                    <motion.div
                                        className="absolute bottom-0 left-0 right-0 h-1 bg-[#576ecb]"
                                        layoutId="underline"
                                    />
                                )}
                            </button>
                        ))}
                    </motion.div>
                </div>
            </motion.header>

            {/* Основной контент */}
            <main className="p-4 pt-6">
                {/* Подборка контента */}
                {activeTab === 'home' && (
                    <section className="mb-6">
                        <div className="grid grid-cols-2 gap-3 mb-3">
                            {/* Главный элемент подборки */}
                            <motion.div
                                className="col-span-2 rounded-xl overflow-hidden relative h-48"
                                whileTap={{ scale: 0.98 }}
                            >
                                <img
                                    src={featuredContent[0].image}
                                    alt={featuredContent[0].title}
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-3">
                                    <h3 className="font-bold text-white">{featuredContent[0].title}</h3>
                                </div>
                            </motion.div>

                            {/* Два второстепенных элемента */}
                            {featuredContent.slice(1, 3).map(item => (
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
                                        <h3 className="font-bold text-white text-sm">{item.title}</h3>
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
                                        className="flex-shrink-0 w-32 rounded-xl overflow-hidden relative h-24"
                                        whileTap={{ scale: 0.98 }}
                                    >
                                        <img
                                            src={item.image}
                                            alt={item.title}
                                            className="w-full h-full object-cover"
                                        />
                                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-2">
                                            <h3 className="font-bold text-white text-xs">{item.title}</h3>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </section>
                )}

                {/* Лента постов */}
                <section>
                    {activeTab === 'home' && (
                        <div className="space-y-4">
                            {posts.map(post => (
                                <Post
                                    key={post.id}
                                    {...post}
                                    onLike={handleLike}
                                    onPostClick={handlePostClick}
                                />
                            ))}
                        </div>
                    )}
                    {/* ... остальные вкладки */}
                </section>
            </main>

            {/* Футер */}
            <footer className="fixed bottom-0 left-0 right-0 bg-[#14102a] border-t border-[#35518e] p-3 shadow-md z-50">
                <div className="flex justify-around">
                    <button className="flex flex-col items-center text-[#8e83e4]">
                        <FaUsers className="text-xl" />
                        <span className="text-xs mt-1">Участники</span>
                    </button>
                    <button className="flex flex-col items-center text-[#8e83e4]">
                        <FaComments className="text-xl" />
                        <span className="text-xs mt-1">Чаты</span>
                    </button>
                    <button className="flex flex-col items-center text-[#8e83e4]">
                        <FaStore className="text-xl" />
                        <span className="text-xs mt-1">Магазин</span>
                    </button>
                    <button className="flex flex-col items-center text-[#8e83e4]">
                        <FaBars className="text-xl" />
                        <span className="text-xs mt-1">Меню</span>
                    </button>
                    <button className="flex flex-col items-center text-[#8e83e4]">
                        <FaUser className="text-xl" />
                        <span className="text-xs mt-1">Профиль</span>
                    </button>
                </div>
            </footer>
        </div>
    );
};

export default CommunityPage;