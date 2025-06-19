import { useState, useEffect } from "react";
import {
    FaArrowLeft,
    FaBell,
    FaUsers,
    FaComments,
    FaUser,
    FaBars,
    FaStore, FaPlus
} from 'react-icons/fa';
import { GiCoins, GiBo } from 'react-icons/gi';
import { motion, useScroll, useTransform } from "framer-motion";
import { Link } from "react-router-dom";
import HomeTab from "/src/Components/Community/HomeTab.jsx";
import ChatsTab from "../../Components/Community/ChatsTab.jsx";
import AlbumsTab from "../../Components/Community/AlbumsTab.jsx";
import SubsTab from "../../Components/Community/SubsTab.jsx";
import PostCreator from "../../Components/PostCreator/PostCreator.jsx";

const CommunityPage = () => {
    const [activeTab, setActiveTab] = useState('home');
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
    const [posts, setPosts] = useState([
        {
            id: 1,
            authorAvatar: 'https://i.pinimg.com/originals/a3/c9/6b/a3c96be051dc86a4abb70ae70a8e70f7.jpg',
            authorName: 'User1',
            title: 'Это мой первый пост в этом сообществе!',
            image: 'https://i.pinimg.com/originals/a3/c9/6b/a3c96be051dc86a4abb70ae70a8e70f7.jpg',
            likesCount: 24,
            sharesCount: 5,
            commentsCount: 8,
            date: '2 часа назад'
        },
        {
            id: 2,
            authorAvatar: 'https://i.pinimg.com/originals/a3/c9/6b/a3c96be051dc86a4abb70ae70a8e70f7.jpg',
            authorName: 'User1',
            title: 'Это мой второй пост в этом сообществе!',
            image: 'https://i.pinimg.com/originals/a3/c9/6b/a3c96be051dc86a4abb70ae70a8e70f7.jpg',
            likesCount: 15,
            sharesCount: 3,
            commentsCount: 5,
            date: '5 часов назад'
        },
        {
            id: 3,
            authorAvatar: 'https://i.pinimg.com/originals/a3/c9/6b/a3c96be051dc86a4abb70ae70a8e70f7.jpg',
            authorName: 'User1',
            title: 'Это мой третий пост в этом сообществе!',
            image: 'https://i.pinimg.com/originals/a3/c9/6b/a3c96be051dc86a4abb70ae70a8e70f7.jpg',
            likesCount: 42,
            sharesCount: 12,
            commentsCount: 7,
            date: '1 день назад'
        },
    ]);

    const featuredContent = [
        {
            id: 1,
            authorAvatar: 'https://i.pinimg.com/originals/a3/c9/6b/a3c96be051dc86a4abb70ae70a8e70f7.jpg',
            authorName: 'User1',
            title: 'Лучший контент сообщества!',
            image: 'https://i.pinimg.com/originals/a3/c9/6b/a3c96be051dc86a4abb70ae70a8e70f7.jpg',
            likesCount: 24,
            sharesCount: 5,
            commentsCount: 8,
            date: '2 часа назад'
        },
        {
            id: 2,
            authorAvatar: 'https://i.pinimg.com/originals/a3/c9/6b/a3c96be051dc86a4abb70ae70a8e70f7.jpg',
            authorName: 'User1',
            title: 'Интересные события',
            image: 'https://i.pinimg.com/originals/a3/c9/6b/a3c96be051dc86a4abb70ae70a8e70f7.jpg',
            likesCount: 24,
            sharesCount: 5,
            commentsCount: 8,
            date: '2 часа назад'
        },
        {
            id: 3,
            authorAvatar: 'https://i.pinimg.com/originals/a3/c9/6b/a3c96be051dc86a4abb70ae70a8e70f7.jpg',
            authorName: 'User1',
            title: 'Новости сообщества',
            image: 'https://i.pinimg.com/originals/a3/c9/6b/a3c96be051dc86a4abb70ae70a8e70f7.jpg',
            likesCount: 24,
            sharesCount: 5,
            commentsCount: 8,
            date: '2 часа назад'
        },
        {
            id: 4,
            authorAvatar: 'https://i.pinimg.com/originals/a3/c9/6b/a3c96be051dc86a4abb70ae70a8e70f7.jpg',
            authorName: 'User1',
            title: 'Анонсы мероприятий',
            image: 'https://i.pinimg.com/originals/a3/c9/6b/a3c96be051dc86a4abb70ae70a8e70f7.jpg',
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

    // Эффект для отслеживания размера экрана
    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Анимация для шапки
    const headerHeight = useTransform(
        useScroll().scrollY,
        [0, 100],
        [isMobile ? '180px' : '220px', isMobile ? '120px' : '150px']
    );

    const avatarSize = useTransform(
        useScroll().scrollY,
        [0, 100],
        [isMobile ? '60px' : '80px', isMobile ? '40px' : '60px']
    );

    const handleLike = (postId, isLiked) => {
        setPosts(posts.map(post =>
            post.id === postId
                ? { ...post, likesCount: isLiked ? post.likesCount - 1 : post.likesCount + 1 }
                : post
        ));
    };

    const handlePostClick = (postId) => {
        console.log(`Post ${postId} clicked`);
    };

    // Функция для рендеринга активной вкладки
    const renderActiveTab = () => {
        switch (activeTab) {
            case 'home':
                return (
                    <HomeTab
                        featuredContent={featuredContent}
                        posts={posts}
                        isMobile={isMobile}
                        handleLike={handleLike}
                        handlePostClick={handlePostClick}
                    />
                );
            case 'subs':
                return (
                    <SubsTab
                        posts={posts}
                        isMobile={isMobile}
                        handleLike={handleLike}
                        handlePostClick={handlePostClick}
                    />
                );
            case 'chats':
                return <ChatsTab isMobile={isMobile} />;
            case 'albums':
                return <AlbumsTab isMobile={isMobile} />;
            default:
                return null;
        }
    };

    const [showPostCreator, setShowPostCreator] = useState(false);

    const handlePublish = (postData) => {
        console.log('Публикуем пост:', postData);
        // Здесь будет логика отправки на сервер
        setShowPostCreator(false);
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
                        src="https://i.pinimg.com/originals/a3/c9/6b/a3c96be051dc86a4abb70ae70a8e70f7.jpg"
                        alt="Community background"
                        className="w-full h-full object-cover opacity-30"
                    />
                </motion.div>

                <div className={`relative z-10 ${isMobile ? 'p-4' : 'p-6'} h-full flex flex-col justify-end`}>
                    <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center">
                            <Link to="/public" className="mr-3">
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
                                    src="https://i.pinimg.com/originals/a3/c9/6b/a3c96be051dc86a4abb70ae70a8e70f7.jpg"
                                    alt="Community"
                                    className="w-full h-full object-cover"
                                />
                            </motion.div>
                            <motion.h1
                                className={`ml-3 font-bold ${isMobile ? 'text-lg' : 'text-xl'} truncate ${isMobile ? 'max-w-[120px]' : 'max-w-[240px]'}`}
                                animate={{
                                    fontSize: isScrolled ? (isMobile ? '1rem' : '1.25rem') : (isMobile ? '1.25rem' : '1.5rem'),
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
                                className={`pb-2 px-1 relative ${activeTab === tab.id ? 'text-[#bcd8f6]' : 'text-[#8e83e4]'} ${!isMobile ? 'px-4' : ''}`}
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
            <main className={`${isMobile ? 'p-4' : 'p-6'} pt-6`}>
                {renderActiveTab()}
            </main>

            {/* Кнопка создания поста */}
            {!showPostCreator && (
                <motion.button
                    onClick={() => setShowPostCreator(true)}
                    className="fixed bottom-24 right-6 bg-[#a45cd4] text-white p-4 rounded-full shadow-lg hover:bg-[#8e83e4] transition-colors z-40"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                >
                    <FaPlus className="text-xl"/>
                </motion.button>
            )}

            {/* Модальное окно создания поста */}
            {showPostCreator && (
                <div className="fixed inset-0 bg-black/80 z-50 flex flex-col">
                    <PostCreator
                        onBack={() => setShowPostCreator(false)}
                        onPublish={handlePublish}
                        className="flex-1"
                    />
                </div>
            )}

            {/* Футер */}
            {!showPostCreator && <footer className="fixed bottom-0 left-0 right-0 bg-[#14102a] border-t border-[#35518e] p-3 shadow-md z-30">
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
            </footer>}
        </div>
    );
};

export default CommunityPage;