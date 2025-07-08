import { useState } from 'react';
import { FaSearch, FaEllipsisV, FaCheckDouble, FaRegClock, FaRegStar, FaRegTrashAlt } from 'react-icons/fa';
import { IoMdSend } from 'react-icons/io';
import { BsFilterLeft, BsPencilSquare } from 'react-icons/bs';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import Footer from "../../Components/Community/Footer.jsx";
import CommunityMenu from "../../Components/Community/CommunityMenu.jsx";

const ChatsPage = ({ isMobile }) => {

    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const [chats, setChats] = useState([
        {
            id: 1,
            title: 'Основной чат',
            avatar: 'https://i.pravatar.cc/150?img=1',
            lastMessage: 'Привет, как дела?',
            time: '12:30',
            unread: 3,
            isPinned: true,
            isOnline: true,
            lastSeen: 'только что'
        },
        {
            id: 2,
            title: 'Игровой чат',
            avatar: 'https://i.pravatar.cc/150?img=5',
            lastMessage: 'Кто сегодня играет?',
            time: '10:15',
            unread: 0,
            isPinned: true,
            isOnline: false,
            lastSeen: '2ч назад'
        },
        {
            id: 3,
            title: 'Алексей Петров',
            avatar: 'https://i.pravatar.cc/150?img=7',
            lastMessage: 'Отправил вам файл',
            time: 'Вчера',
            unread: 1,
            isPinned: false,
            isOnline: true,
            lastSeen: 'online'
        },
        {
            id: 4,
            title: 'Техподдержка',
            avatar: 'https://i.pravatar.cc/150?img=9',
            lastMessage: 'Ваш вопрос решен',
            time: 'Вчера',
            unread: 0,
            isPinned: false,
            isOnline: false,
            lastSeen: 'вчера'
        },
        {
            id: 5,
            title: 'Музыкальный клуб',
            avatar: 'https://i.pravatar.cc/150?img=11',
            lastMessage: 'Новый альбом выходит завтра!',
            time: 'Пн',
            unread: 0,
            isPinned: false,
            isOnline: false,
            lastSeen: 'недавно'
        },
        {
            id: 6,
            title: 'Кинообсуждения',
            avatar: 'https://i.pravatar.cc/150?img=13',
            lastMessage: 'Посмотрел новый фильм, обсудим?',
            time: 'Сб',
            unread: 5,
            isPinned: false,
            isOnline: true,
            lastSeen: 'online'
        },
    ]);

    const [searchQuery, setSearchQuery] = useState('');
    const [activeTab, setActiveTab] = useState('all');

    const filteredChats = chats
        .filter(chat => chat.title.toLowerCase().includes(searchQuery.toLowerCase()))
        .filter(chat => {
            if (activeTab === 'all') return true;
            if (activeTab === 'unread') return chat.unread > 0;
            if (activeTab === 'pinned') return chat.isPinned;
            return true;
        })
        .sort((a, b) => {
            if (a.isPinned !== b.isPinned) return a.isPinned ? -1 : 1;
            return new Date(`1970/01/01 ${b.time}`) - new Date(`1970/01/01 ${a.time}`);
        });

    const unreadCount = chats.reduce((acc, chat) => acc + chat.unread, 0);

    return (
        <div className="flex flex-col h-screen bg-gray-100 dark:bg-[#0e1621] text-gray-900 dark:text-white">
            {/* Шапка */}
            <header className="bg-[#2b5278] dark:bg-[#17212b] p-3 shadow-sm">
                <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center">
                        <button className="p-1 rounded-full hover:bg-[#3a6d99] dark:hover:bg-[#232f3c] mr-2">
                            <BsFilterLeft className="text-xl" />
                        </button>
                        <h1 className="text-xl font-semibold">Чаты</h1>
                    </div>
                    <div className="flex items-center space-x-2">
                        <button className="p-1 rounded-full hover:bg-[#3a6d99] dark:hover:bg-[#232f3c]">
                            <FaSearch className="text-lg" />
                        </button>
                        <button className="p-1 rounded-full hover:bg-[#3a6d99] dark:hover:bg-[#232f3c]">
                            <FaEllipsisV className="text-lg" />
                        </button>
                    </div>
                </div>

                {/* Поиск и фильтры */}
                <div className="relative mb-2">
                    <FaSearch className="absolute left-3 top-3 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Поиск"
                        className="w-full bg-[#3a6d99] dark:bg-[#232f3c] text-white pl-10 pr-4 py-2 rounded-lg focus:outline-none placeholder-gray-300"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>

                <div className="flex space-x-2 overflow-x-auto pb-1 scrollbar-hide">
                    {[
                        { id: 'all', label: 'Все' },
                        { id: 'unread', label: `Непрочитанные (${unreadCount})` },
                        { id: 'pinned', label: 'Закрепленные' }
                    ].map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`px-3 py-1 rounded-full text-sm whitespace-nowrap transition-colors ${
                                activeTab === tab.id
                                    ? 'bg-[#4f7ba7] dark:bg-[#3a6d99] text-white'
                                    : 'bg-[#3a6d99] dark:bg-[#232f3c] text-gray-200 hover:bg-[#4f7ba7] dark:hover:bg-[#3a6d99]'
                            }`}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>
            </header>

            {/* Список чатов */}
            <main className="flex-1 overflow-y-auto mb-18">
                <AnimatePresence>
                    {filteredChats.map(chat => (
                        <motion.div
                            key={chat.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="border-b border-gray-200 dark:border-[#1a2634]"
                        >
                            <Link
                                to={`/chat/${chat.id}`}
                                className="flex items-center p-3 hover:bg-gray-50 dark:hover:bg-[#1e2c3a] transition-colors"
                            >
                                <div className="relative mr-3">
                                    <img
                                        src={chat.avatar}
                                        alt={chat.title}
                                        className="w-12 h-12 rounded-full object-cover"
                                    />
                                    {chat.isOnline && (
                                        <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white dark:border-[#0e1621]"></div>
                                    )}
                                </div>

                                <div className="flex-1 min-w-0">
                                    <div className="flex justify-between items-center mb-1">
                                        <h3 className="font-medium truncate">{chat.title}</h3>
                                        <span className="text-xs text-gray-500 dark:text-gray-400 whitespace-nowrap ml-2">
                      {chat.time}
                    </span>
                                    </div>

                                    <div className="flex justify-between items-center">
                                        <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
                                            {chat.lastMessage.length > 30
                                                ? `${chat.lastMessage.substring(0, 30)}...`
                                                : chat.lastMessage}
                                        </p>
                                        <div className="flex items-center ml-2">
                                            {chat.unread > 0 ? (
                                                <span className="bg-blue-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                          {chat.unread}
                        </span>
                                            ) : (
                                                <FaCheckDouble className="text-gray-400 text-xs" />
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </main>

            {/* Кнопка нового чата */}
            <div className="absolute bottom-20 right-4">
                <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="bg-blue-500 text-white p-4 rounded-full shadow-lg hover:bg-blue-600 transition-colors"
                >
                    <BsPencilSquare className="text-xl" />
                </motion.button>
            </div>

            <CommunityMenu
                isOpen={isMenuOpen}
                onClose={() => setIsMenuOpen(false)}
                isAdmin={true} // или логика для проверки админки
                communityName="Крутое сообщество"
                coverImage="https://i.pinimg.com/originals/a3/c9/6b/a3c96be051dc86a4abb70ae70a8e70f7.jpg"
            />

            < Footer setIsMenuOpen={setIsMenuOpen}/>
        </div>
    );
};

export default ChatsPage;