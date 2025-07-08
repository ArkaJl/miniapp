import { useState } from 'react';
import {
    FaEdit, FaCheck, FaTimes, FaUserFriends,
    FaPhotoVideo, FaChartLine, FaRegBookmark,
    FaDiscord, FaTwitter, FaQrcode, FaUserTag,
    FaHeart, FaRegHeart, FaShare, FaRegComment, FaEllipsisH
} from 'react-icons/fa';
import { GiCoins } from 'react-icons/gi';
import { motion, AnimatePresence } from "framer-motion";
import { useMediaQuery } from 'react-responsive';
import Footer from "../../Components/Community/Footer.jsx";
import CommunityMenu from "../../Components/Community/CommunityMenu.jsx";

const ProfilePage = () => {
    const isMobile = useMediaQuery({ query: '(max-width: 768px)' });
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const [profile, setProfile] = useState({
        name: 'Алексей',
        tag: '@alex_community',
        status: 'Создаю контент для сообщества',
        banner: 'https://i.pinimg.com/originals/a3/c9/6b/a3c96be051dc86a4abb70ae70a8e70f7.jpg',
        avatar: 'https://i.pinimg.com/originals/a3/c9/6b/a3c96be051dc86a4abb70ae70a8e70f7.jpg',
        level: 3,
        xp: 650,
        coins: 150,
        badges: ['active', 'creator', 'helper'],
        socialLinks: {
            discord: 'Alex#1234',
            twitter: '@alex_tw',
        },
        stats: {
            posts: 42,
            followers: 1200,
            following: 56
        },
        interests: ['Дизайн', 'Игры', 'Музыка']
    });

    const [userPosts] = useState([
        {
            id: 1,
            authorAvatar: 'https://i.pinimg.com/originals/a3/c9/6b/a3c96be051dc86a4abb70ae70a8e70f7.jpg',
            authorName: 'Алексей',
            title: 'Мой первый пост в этом сообществе!',
            image: 'https://i.pinimg.com/originals/a3/c9/6b/a3c96be051dc86a4abb70ae70a8e70f7.jpg',
            likesCount: 24,
            sharesCount: 5,
            commentsCount: 8,
            date: '2 часа назад'
        }
    ]);

    const [profileComments] = useState([
        {
            id: 1,
            authorAvatar: 'https://randomuser.me/api/portraits/women/44.jpg',
            authorName: 'Мария',
            text: 'Отличный контент! Спасибо за полезные посты.',
            date: '3 дня назад',
            likes: 5
        },
        {
            id: 2,
            authorAvatar: 'https://randomuser.me/api/portraits/men/32.jpg',
            authorName: 'Иван',
            text: 'Приятно видеть таких активных участников в сообществе!',
            date: '1 неделю назад',
            likes: 12
        }
    ]);

    const [isEditing, setIsEditing] = useState(false);
    const [tempStatus, setTempStatus] = useState(profile.status);
    const [activeTab, setActiveTab] = useState('posts');

    const handleStatusSave = () => {
        setProfile({...profile, status: tempStatus});
        setIsEditing(false);
    };

    // Компонент для отображения комментариев
    const Comment = ({ comment }) => (
        <motion.div
            className="bg-gray-800 rounded-lg p-4 mb-3"
            whileHover={{ scale: 1.01 }}
        >
            <div className="flex items-start">
                <img
                    src={comment.authorAvatar}
                    alt={comment.authorName}
                    className="w-10 h-10 rounded-full mr-3"
                />
                <div className="flex-1">
                    <div className="flex items-center justify-between">
                        <h4 className="font-bold">{comment.authorName}</h4>
                        <span className="text-xs text-gray-400">{comment.date}</span>
                    </div>
                    <p className="mt-1 text-sm">{comment.text}</p>
                    <div className="flex items-center mt-2 text-sm text-gray-400">
                        <button className="flex items-center mr-3 hover:text-red-400">
                            <FaHeart className="mr-1" />
                            <span>{comment.likes}</span>
                        </button>
                        <button className="hover:text-blue-400">
                            <FaRegComment className="mr-1" />
                            Ответить
                        </button>
                    </div>
                </div>
            </div>
        </motion.div>
    );

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="min-h-screen bg-gray-900 text-white pb-20"
        >
            {/* Шапка профиля в стиле ProfilePageMain */}
            <div className="relative h-64 bg-gradient-to-r from-[#233e85] to-[#8e83e4]">
                {/* Баннер */}
                <img
                    src={profile.banner}
                    className="w-full h-full object-cover"
                    alt="Profile banner"
                />

                {/* Контейнер для аватара и информации */}
                <div className="absolute bottom-0 left-0 right-0 flex items-end p-4 gap-4">
                    {/* Аватар */}
                    <div className="relative -mb-8">
                        <div className="w-32 h-32 rounded-full border-4 border-white overflow-hidden shadow-xl">
                            <img
                                src={profile.avatar}
                                alt="Аватар"
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </div>

                    {/* Блок с именем, тегом и монетами */}
                    <div className="flex-1">
                        <h1 className="text-2xl font-bold text-white drop-shadow-md">{profile.name}</h1>
                        <div className="flex items-center gap-2 mt-2 mb-4">
                            <div className="bg-[#576ecb] text-white px-3 py-1 rounded-full flex items-center shadow-md max-w-full">
                                <FaUserTag className="mr-1 flex-shrink-0"/>
                                <span className="text-sm font-medium truncate">@{profile.tag.split('@')[1]}</span>
                            </div>
                        </div>
                        <div className="flex items-center bg-[#233e85] text-white px-3 py-1 rounded-full shadow">
                            <GiCoins className="text-yellow-300 text-lg mr-1"/>
                            <span className="font-medium">{profile.coins} монет</span>
                        </div>
                    </div>
                </div>

                {/* Кнопка редактирования */}
                <button
                    className={`absolute top-6 right-6 p-3 rounded-full ${isEditing ? 'bg-green-500' : 'bg-[#1c2562] bg-opacity-30'} text-white transition-all z-10`}
                    onClick={isEditing ? handleStatusSave : () => setIsEditing(true)}
                >
                    {isEditing ? <FaCheck className="text-xl"/> : <FaEdit className="text-xl"/>}
                </button>
            </div>

            {/* Основной контент */}
            <div className="px-4 md:px-8 pt-16 max-w-4xl mx-auto">
                {/* Статус */}
                {isEditing ? (
                    <motion.div
                        className="flex items-center mb-6"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                    >
                        <input
                            type="text"
                            value={tempStatus}
                            onChange={(e) => setTempStatus(e.target.value)}
                            className="w-full p-2 rounded-lg bg-gray-800 border border-gray-600 text-white"
                        />
                        <button
                            onClick={handleStatusSave}
                            className="ml-2 p-2 text-green-500"
                        >
                            <FaCheck />
                        </button>
                        <button
                            onClick={() => setIsEditing(false)}
                            className="ml-1 p-2 text-red-500"
                        >
                            <FaTimes />
                        </button>
                    </motion.div>
                ) : (
                    <motion.div
                        className="flex items-center justify-center mb-6 cursor-pointer"
                        onClick={() => {
                            setTempStatus(profile.status);
                            setIsEditing(true);
                        }}
                        whileHover={{ x: 5 }}
                    >
                        <p className="text-gray-300 text-center">{profile.status}</p>
                        <FaEdit className="ml-2 text-gray-500 text-sm" />
                    </motion.div>
                )}

                {/* Статистика */}
                <motion.div
                    className="grid grid-cols-3 gap-2 mb-6"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                >
                    <div className="rounded-lg p-3 text-center shadow bg-gray-800">
                        <div className="text-lg font-bold">{profile.stats.posts}</div>
                        <div className="text-xs opacity-80">Постов</div>
                    </div>
                    <div className="rounded-lg p-3 text-center shadow bg-gray-800">
                        <div className="text-lg font-bold">{profile.stats.followers}</div>
                        <div className="text-xs opacity-80">Подписчиков</div>
                    </div>
                    <div className="rounded-lg p-3 text-center shadow bg-gray-800">
                        <div className="text-lg font-bold">{profile.stats.following}</div>
                        <div className="text-xs opacity-80">Подписок</div>
                    </div>
                </motion.div>

                {/* Табы для навигации */}
                <motion.div
                    className="border-b border-gray-800 mb-6"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                >
                    <div className="flex justify-center overflow-x-auto no-scrollbar">
                        {[
                            { id: 'about', icon: <FaUserFriends className="mr-2" />, label: 'О себе' },
                            { id: 'activity', icon: <FaChartLine className="mr-2" />, label: 'Активность' },
                            { id: 'posts', icon: <FaPhotoVideo className="mr-2" />, label: 'Посты' }
                        ].map(tab => (
                            <motion.button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`flex items-center px-4 py-3 whitespace-nowrap ${activeTab === tab.id ?
                                    'text-blue-400 border-b-2 border-blue-400' : 'text-gray-400'}`}
                                whileHover={{ scale: 1.05 }}
                            >
                                {!isMobile && tab.icon}
                                {tab.label}
                            </motion.button>
                        ))}
                    </div>
                </motion.div>

                {/* Контент табов */}
                <AnimatePresence mode="wait">
                    {activeTab === 'about' && (
                        <motion.div
                            key="about"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="space-y-6"
                        >
                            <div>
                                <h3 className="text-lg font-semibold mb-3">Интересы</h3>
                                <div className="flex flex-wrap gap-2 mb-6">
                                    {profile.interests.map((interest, i) => (
                                        <motion.span
                                            key={i}
                                            className="px-3 py-1 bg-gray-800 rounded-full text-sm"
                                            whileHover={{ scale: 1.05 }}
                                        >
                                            {interest}
                                        </motion.span>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <h3 className="text-lg font-semibold mb-3">Описание</h3>
                                <p className="text-gray-300 mb-6">
                                    Привет! Я занимаюсь созданием контента для этого сообщества.
                                    Люблю игры, дизайн и музыку. Рад участвовать в жизни сообщества!
                                </p>
                            </div>

                            <div>
                                <h3 className="text-lg font-semibold mb-3">Комментарии</h3>
                                <div className="space-y-3">
                                    {profileComments.map(comment => (
                                        <Comment key={comment.id} comment={comment} />
                                    ))}
                                </div>
                                <div className="mt-4">
                                    <textarea
                                        className="w-full p-3 bg-gray-800 rounded-lg border border-gray-700 text-white"
                                        placeholder="Написать комментарий..."
                                        rows="3"
                                    />
                                    <button className="mt-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors">
                                        Отправить
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {activeTab === 'activity' && (
                        <motion.div
                            key="activity"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.2 }}
                        >
                            <h3 className="text-lg font-semibold mb-3">Последняя активность</h3>
                            <div className="space-y-4">
                                {[1, 2, 3].map(item => (
                                    <motion.div
                                        key={item}
                                        className="bg-gray-800/50 rounded-lg p-3"
                                        whileHover={{ x: 5 }}
                                    >
                                        <div className="text-sm text-gray-400">Сегодня в 14:30</div>
                                        <p className="mt-1">Прокомментировал пост "Как сделать анимацию в React"</p>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    )}

                    {activeTab === 'posts' && (
                        <motion.div
                            key="posts"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="space-y-6"
                        >
                            {userPosts.map((post) => (
                                <motion.div
                                    key={post.id}
                                    className="bg-gray-800 rounded-xl overflow-hidden shadow-lg max-w-2xl mx-auto w-full"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    {/* Шапка поста */}
                                    <div className="p-4 flex items-start justify-between">
                                        <div className="flex items-center">
                                            <div className="w-10 h-10 rounded-full bg-[#8e83e4] overflow-hidden mr-3">
                                                <img
                                                    src={post.authorAvatar}
                                                    alt={post.authorName}
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>
                                            <div>
                                                <h3 className="font-bold text-white">{post.authorName}</h3>
                                                <p className="text-xs text-[#bbb2f0]">{post.date}</p>
                                            </div>
                                        </div>
                                        <button className="text-[#bbb2f0] hover:text-white">
                                            <FaEllipsisH />
                                        </button>
                                    </div>

                                    {/* Заголовок */}
                                    <div className="px-4 pb-3">
                                        <h2 className="text-ml font-bold text-white">{post.title}</h2>
                                    </div>

                                    {/* Изображение */}
                                    {post.image && (
                                        <div className="w-full max-h-96 bg-[#14102a] overflow-hidden">
                                            <img
                                                src={post.image}
                                                alt={post.title}
                                                className="w-full h-full object-contain"
                                            />
                                        </div>
                                    )}

                                    {/* Действия */}
                                    <div className="p-4">
                                        <div className="flex justify-between items-center text-[#bbb2f0]">
                                            <div className="flex items-center space-x-4">
                                                <button className="flex items-center space-x-1 hover:text-[#a45cd4] transition-colors">
                                                    <FaRegHeart />
                                                    <span>{post.likesCount}</span>
                                                </button>
                                                <button className="flex items-center space-x-1 hover:text-[#85b7ef] transition-colors">
                                                    <FaRegComment />
                                                    <span>{post.commentsCount}</span>
                                                </button>
                                            </div>
                                            <button className="hover:text-[#8e83e4] transition-colors">
                                                <FaShare />
                                                <span className="ml-1">{post.sharesCount}</span>
                                            </button>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            <CommunityMenu
                isOpen={isMenuOpen}
                onClose={() => setIsMenuOpen(false)}
                isAdmin={true}
                communityName="Крутое сообщество"
                coverImage="https://i.pinimg.com/originals/a3/c9/6b/a3c96be051dc86a4abb70ae70a8e70f7.jpg"
            />

            <Footer setIsMenuOpen={setIsMenuOpen} />
        </motion.div>
    );
};

export default ProfilePage;