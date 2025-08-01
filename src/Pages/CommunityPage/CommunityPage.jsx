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

    const [communityData, setCommunityData] = useState({
        name: "Крутое сообщество",
        description: "Описание сообщества",
        avatar: "https://i.pinimg.com/originals/a3/c9/6b/a3c96be051dc86a4abb70ae70a8e70f7.jpg",
        background: "https://i.pinimg.com/originals/a3/c9/6b/a3c96be051dc86a4abb70ae70a8e70f7.jpg",
        primaryColor: "#8e83e4",
        textColor: "#ffffff",
        backgroundColor: "#14102a",
        coverData: {
            name: "Добро пожаловать!",
            description: "Присоединяйтесь к нашему сообществу",
            background1: "https://i.pinimg.com/originals/a3/c9/6b/a3c96be051dc86a4abb70ae70a8e70f7.jpg",
            tags: ["сообщество", "чат", "развлечения"]
        }
    });

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
        // ... (оставь handleLike без изменений)
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
                return <HomeTab {...{ featuredContent, posts, isMobile, handleLike, handlePostClick }} />;
            case 'subs':
                return <SubsTab {...{ posts, isMobile, handleLike, handlePostClick }} />;
            case 'chats':
                return <ChatsTab isMobile={isMobile} />;
            case 'albums':
                return <AlbumsTab isMobile={isMobile} />;
            default:
                return null;
        }
    };

    // Десктопная версия
    if (!isMobile) {
        return (
            <div className="bg-[#14102a] text-white min-h-screen flex">
                {/* Левая колонка - весь контент */}
                <div className="flex-1 overflow-y-auto">
                    <main className="px-6 py-4 max-w-2xl mx-auto">
                        {renderActiveTab()}
                    </main>

                    {/* Подвал в левой колонке (только для мобильной версии, на десктопе он справа) */}
                </div>

                {/* Правая колонка - шире (w-96 вместо w-80), чтобы не было горизонтального скролла */}
                <div className="w-96 bg-[#1c2562] border-l border-[#2a2a4a] sticky top-0 h-screen overflow-y-auto flex flex-col">
                    {/* Шапка сообщества */}
                    <div className="bg-[#233e85] p-4">
                        <div className="flex justify-between items-center mb-4">
                            <Link to="/" className="flex items-center">
                                <FaArrowLeft className="text-xl" />
                            </Link>
                            <button className="p-1 rounded-full hover:bg-[#35518e]">
                                <FaBell className="text-lg" />
                            </button>
                        </div>

                        <div className="flex items-center mb-4">
                            <div className="rounded-full bg-[#8e83e4] overflow-hidden border-2 border-white w-16 h-16 flex-shrink-0">
                                <img
                                    src={communityData.avatar}
                                    className="w-full h-full object-cover"
                                    alt="Community avatar"
                                />
                            </div>
                            <div className="ml-3 min-w-0">
                                <h1 className="font-bold text-white text-xl truncate">
                                    {communityData.name}
                                </h1>
                                <div className="flex items-center text-sm text-gray-300 mt-1">
                                    <FaUsers className="mr-1" />
                                    <span>42 участника • 5 онлайн</span>
                                </div>
                            </div>
                        </div>

                        <p className="text-sm text-gray-300 mb-4 break-words">
                            {communityData.description}
                        </p>

                        <div className="flex flex-wrap gap-2 mb-4">
                            {communityData.coverData.tags.map(tag => (
                                <span key={tag} className="bg-[#35518e] text-xs px-2 py-1 rounded-full whitespace-nowrap">
                                    #{tag}
                                </span>
                            ))}
                        </div>

                        <div className="flex space-x-2">
                            <div className="flex items-center bg-[#1c2562] px-3 py-1 rounded-full">
                                <GiCoins className="text-[#bbb2f0] text-sm mr-1" />
                                <span className="text-sm">150</span>
                            </div>
                            <div className="flex items-center bg-[#1c2562] px-3 py-1 rounded-full">
                                <GiBo className="text-[#a45cd4] text-sm mr-1" />
                                <span className="text-sm">25</span>
                            </div>
                        </div>
                    </div>

                    {/* Навигация */}
                    <div className="p-4 border-b border-[#35518e]">
                        <div className="flex flex-wrap gap-2">
                            {['home', 'subs', 'chats', 'albums'].map(tab => (
                                <button
                                    key={tab}
                                    onClick={() => setActiveTab(tab)}
                                    className={`px-4 py-2 rounded-lg text-sm whitespace-nowrap ${
                                        activeTab === tab
                                            ? 'bg-[#576ecb] text-white'
                                            : 'text-[#8e83e4] hover:bg-[#2a3568]'
                                    }`}
                                >
                                    {tab === 'home' && 'Главная'}
                                    {tab === 'subs' && 'Подписки'}
                                    {tab === 'chats' && 'Чаты'}
                                    {tab === 'albums' && 'Альбомы'}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Дополнительный контент */}
                    <div className="p-4">
                        <h3 className="text-sm font-semibold mb-2">Рекомендации</h3>
                        <div className="space-y-3">
                            {featuredContent.slice(0, 3).map(item => (
                                <div
                                    key={item.id}
                                    className="flex items-center space-x-2 p-2 hover:bg-[#2a3568] rounded-lg cursor-pointer"
                                    onClick={() => handlePostClick(item.id)}
                                >
                                    <img
                                        src={item.authorAvatar}
                                        className="w-8 h-8 rounded-full flex-shrink-0"
                                        alt="Author"
                                    />
                                    <span className="text-sm truncate">{item.title}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Подвал (Footer) - теперь в правой колонке */}
                    <div className="mt-auto">
                        <Footer setIsMenuOpen={setIsMenuOpen} />
                    </div>
                </div>

                {/* Кнопка создания поста */}
                <motion.button
                    onClick={() => setShowPostCreator(true)}
                    className="fixed bottom-6 right-6 bg-[#a45cd4] text-white p-4 rounded-full shadow-lg hover:bg-[#8e83e4] transition-colors z-40"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                >
                    <FaPlus className="text-xl" />
                </motion.button>

                {/* Модальные окна */}
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
                    isAdmin={true}
                    communityName={communityData.name}
                    coverImage={communityData.background}
                    communityData={communityData}
                    setCommunityData={() => {}}
                />
            </div>
        );
    }

    // Мобильная версия (остается без изменений)
    const headerHeight = isMobile ? (isScrolled ? 100 : 160) : (isScrolled ? 120 : 180);
    const tabsHeight = 48;

    return (
        <div className="bg-[#14102a] text-white min-h-screen flex flex-col">
            <div style={{ height: `${headerHeight + tabsHeight}px` }} className="sticky top-0 z-50">
                <motion.header
                    className="relative bg-[#233e85] w-full overflow-hidden"
                    initial={false}
                    animate={{
                        height: `${headerHeight}px`
                    }}
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                >
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

                    <div className="relative z-10 h-full flex flex-col">
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

            <main className={`${isMobile ? 'px-4' : 'px-6'} flex-1`}>
                {renderActiveTab()}
            </main>

            {!showPostCreator && <Footer className="mt-auto" setIsMenuOpen={setIsMenuOpen}/>}

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
                isAdmin={true}
                communityName={communityData.name}
                coverImage={communityData.background}
                communityData={communityData}
                setCommunityData={setCommunityData}
            />
        </div>
    );
};

export default CommunityPage;