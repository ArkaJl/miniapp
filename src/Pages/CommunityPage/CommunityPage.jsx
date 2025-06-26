import { useState, useEffect } from "react";
import {
    FaArrowLeft,
    FaBell,
    FaUsers,
    FaComments,
    FaUser,
    FaBars,
    FaStore,
    FaPlus
} from 'react-icons/fa';
import { GiCoins, GiBo } from 'react-icons/gi';
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import HomeTab from "/src/Components/Community/HomeTab.jsx";
import ChatsTab from "../../Components/Community/ChatsTab.jsx";
import AlbumsTab from "../../Components/Community/AlbumsTab.jsx";
import SubsTab from "../../Components/Community/SubsTab.jsx";
import PostCreator from "../../Components/PostCreator/PostCreator.jsx";
import _ from 'lodash';
import Footer from "../../Components/Community/Footer.jsx";
import CommunityMenu from "../../Components/Community/CommunityMenu.jsx";

const CommunityPage = ({isMobile}) => {
    const [activeTab, setActiveTab] = useState('home');
    const [isScrolled, setIsScrolled] = useState(false);
    const [showPostCreator, setShowPostCreator] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

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

    useEffect(() => {
        const handleScroll = _.throttle(() => {
            setIsScrolled(window.scrollY > 10);
        }, 100);

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

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

    const handlePublish = (postData) => {
        console.log('Публикуем пост:', postData);
        setShowPostCreator(false);
    };

    const renderActiveTab = () => {
        switch (activeTab) {
            case 'home':
                return <HomeTab {...{featuredContent, posts, isMobile, handleLike, handlePostClick}} />;
            case 'subs':
                return <SubsTab {...{posts, isMobile, handleLike, handlePostClick}} />;
            case 'chats':
                return <ChatsTab isMobile={isMobile} />;
            case 'albums':
                return <AlbumsTab isMobile={isMobile} />;
            default:
                return null;
        }
    };

    // Вычисляемые значения для анимации
    const headerHeight = isMobile ? (isScrolled ? 100 : 160) : (isScrolled ? 120 : 180);
    const tabsHeight = 48; // Фиксированная высота вкладок

    return (
        <div className="bg-[#14102a] text-white min-h-screen flex flex-col">
            {/* Основной контейнер с фиксированной высотой для шапки и вкладок */}
            <div style={{ height: `${headerHeight + tabsHeight}px` }} className="sticky top-0 z-50">
                {/* Анимированная шапка */}
                <motion.header
                    className="relative bg-[#233e85] w-full overflow-hidden"
                    initial={false}
                    animate={{
                        height: `${headerHeight}px`
                    }}
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                >
                    {/* Фоновое изображение */}
                    <motion.div
                        className="absolute inset-0"
                        animate={{
                            scale: isScrolled ? 1.05 : 1,
                            opacity: isScrolled ? 0.8 : 1
                        }}
                    >
                        <img
                            src="https://i.pinimg.com/originals/a3/c9/6b/a3c96be051dc86a4abb70ae70a8e70f7.jpg"
                            className="w-full h-full object-cover"
                            alt="Community background"
                        />
                    </motion.div>

                    {/* Содержимое шапки */}
                    <div className="relative z-10 h-full flex flex-col">
                        {/* Верхняя панель с навигацией */}
                        <div className={`flex items-center justify-between ${isMobile ? 'p-3' : 'p-4'}`}>
                            <Link to="/" className="flex items-center">
                                <FaArrowLeft className="text-xl"/>
                                {!isScrolled && (
                                    <div className="flex ml-2 space-x-1">
                                        <div className="flex items-center bg-[#1c2562] px-2 py-1 rounded-full">
                                            <GiCoins className="text-[#bbb2f0] text-xs mr-1"/>
                                            <span className="text-xs">150</span>
                                        </div>
                                        <div className="flex items-center bg-[#1c2562] px-2 py-1 rounded-full">
                                            <GiBo className="text-[#a45cd4] text-xs mr-1"/>
                                            <span className="text-xs">25</span>
                                        </div>
                                    </div>
                                )}
                            </Link>

                            <button className="p-1 rounded-full hover:bg-[#35518e]">
                                <FaBell className="text-lg"/>
                            </button>
                        </div>

                        {/* Основная информация сообщества */}
                        <motion.div
                            className={`flex items-center ${isMobile ? 'px-3' : 'px-4'} mb-1`}
                            animate={{
                                transform: isScrolled ? 'translateY(-10px)' : 'translateY(0)',
                                opacity: isScrolled ? 0.9 : 1
                            }}
                        >
                            <motion.div
                                className="rounded-full bg-[#8e83e4] overflow-hidden border-2 border-white flex-shrink-0"
                                animate={{
                                    width: isScrolled ? (isMobile ? '40px' : '50px') : (isMobile ? '60px' : '80px'),
                                    height: isScrolled ? (isMobile ? '40px' : '50px') : (isMobile ? '60px' : '80px'),
                                }}
                            >
                                <img
                                    src="https://i.pinimg.com/originals/a3/c9/6b/a3c96be051dc86a4abb70ae70a8e70f7.jpg"
                                    className="w-full h-full object-cover"
                                    alt="Community avatar"
                                />
                            </motion.div>

                            <motion.h1
                                className="ml-3 font-bold text-white truncate"
                                animate={{
                                    fontSize: isScrolled ? (isMobile ? '0.95rem' : '1.1rem') : (isMobile ? '1.1rem' : '1.3rem'),
                                }}
                            >
                                Крутое сообщество
                            </motion.h1>
                        </motion.div>

                        {/* Информация об участниках (только в развернутом состоянии) */}
                        {!isScrolled && (
                            <motion.div
                                className={`flex items-center text-xs text-gray-300 ${isMobile ? 'px-3' : 'px-4'} mb-2`}
                                initial={{opacity: 1}}
                                animate={{opacity: isScrolled ? 0 : 1}}
                            >
                                <FaUsers className="mr-1"/>
                                <span>42 участника{!isMobile && ' • 5 онлайн'}</span>
                            </motion.div>
                        )}
                    </div>
                </motion.header>

                {/* Вкладки - фиксированы под шапкой */}
                <div className="border-t border-[#35518e] bg-[#1c2562] h-12">
                    <div className="flex justify-between h-full">
                        {['home', 'subs', 'chats', 'albums'].map(tab => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`relative flex-1 flex items-center justify-center ${activeTab === tab ? 'text-[#bcd8f6]' : 'text-[#8e83e4]'}`}
                            >
                                <span className="text-sm truncate">
                                    {tab === 'home' && 'Главная'}
                                    {tab === 'subs' && 'Подписки'}
                                    {tab === 'chats' && 'Чаты'}
                                    {tab === 'albums' && 'Альбомы'}
                                </span>
                                {activeTab === tab && (
                                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#576ecb]"/>
                                )}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Основной контент с динамическим отступом сверху */}
            <main className={`${isMobile ? 'px-4' : 'px-6'} flex-1`}>
                {renderActiveTab()}
            </main>

            {/* Футер */}
            {!showPostCreator && <Footer className="mt-auto" setIsMenuOpen={setIsMenuOpen}/>}

            {/* Кнопка создания поста */}
            {!showPostCreator && (
                <motion.button
                    onClick={() => setShowPostCreator(true)}
                    className="fixed bottom-24 right-6 bg-[#a45cd4] text-white p-4 rounded-full shadow-lg hover:bg-[#8e83e4] transition-colors z-40"
                    whileHover={{scale: 1.1}}
                    whileTap={{scale: 0.9}}
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

            <CommunityMenu
                isOpen={isMenuOpen}
                onClose={() => setIsMenuOpen(false)}
                isAdmin={true} // или логика для проверки админки
                communityName="Крутое сообщество"
                coverImage="https://i.pinimg.com/originals/a3/c9/6b/a3c96be051dc86a4abb70ae70a8e70f7.jpg"
            />

        </div>
    );
};

export default CommunityPage;