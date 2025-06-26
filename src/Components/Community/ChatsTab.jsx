import { motion } from "framer-motion";
import { FaUsers, FaComment } from "react-icons/fa";
import { IoMdTime } from "react-icons/io";

const ChatsTab = ({ isMobile }) => {
    // Моковые данные чатов
    const chats = [
        {
            id: 1,
            title: "Основной чат",
            coverImage: "https://i.pinimg.com/originals/a3/c9/6b/a3c96be051dc86a4abb70ae70a8e70f7.jpg",
            creatorAvatar: "https://i.pinimg.com/originals/a3/c9/6b/a3c96be051dc86a4abb70ae70a8e70f7.jpg",
            membersCount: 42,
            lastMessageTime: "2 мин назад",
            unreadCount: 3
        },
        {
            id: 2,
            title: "Игровой чат",
            coverImage: "https://i.pinimg.com/originals/a3/c9/6b/a3c96be051dc86a4abb70ae70a8e70f7.jpg",
            creatorAvatar: "https://randomuser.me/api/portraits/women/2.jpg",
            membersCount: 28,
            lastMessageTime: "10 мин назад",
            unreadCount: 0
        },
        {
            id: 3,
            title: "Обсуждение фильмов",
            coverImage: "https://i.pinimg.com/originals/a3/c9/6b/a3c96be051dc86a4abb70ae70a8e70f7.jpg",
            creatorAvatar: "https://randomuser.me/api/portraits/men/3.jpg",
            membersCount: 15,
            lastMessageTime: "1 час назад",
            unreadCount: 5
        },
        {
            id: 4,
            title: "Музыкальный клуб",
            coverImage: "https://i.pinimg.com/originals/a3/c9/6b/a3c96be051dc86a4abb70ae70a8e70f7.jpg",
            creatorAvatar: "https://randomuser.me/api/portraits/women/4.jpg",
            membersCount: 36,
            lastMessageTime: "5 часов назад",
            unreadCount: 0
        },
        {
            id: 5,
            title: "Книжный клуб",
            coverImage: "https://i.pinimg.com/originals/a3/c9/6b/a3c96be051dc86a4abb70ae70a8e70f7.jpg",
            creatorAvatar: "https://randomuser.me/api/portraits/men/5.jpg",
            membersCount: 19,
            lastMessageTime: "вчера",
            unreadCount: 2
        },
        {
            id: 6,
            title: "Путешествия",
            coverImage: "https://i.pinimg.com/originals/a3/c9/6b/a3c96be051dc86a4abb70ae70a8e70f7.jpg",
            creatorAvatar: "https://randomuser.me/api/portraits/women/6.jpg",
            membersCount: 31,
            lastMessageTime: "2 дня назад",
            unreadCount: 0
        },
    ];

    return (
        <div className="p-4  mb-18">
            {/* Заголовок секции */}
            <h2 className="text-xl font-bold mb-4 text-white">Чаты сообщества</h2>

            {/* Сетка чатов */}
            <div className={`grid ${isMobile ? 'grid-cols-2' : 'grid-cols-3'} gap-3`}>
                {chats.map(chat => (
                    <motion.div
                        key={chat.id}
                        className="relative rounded-xl overflow-hidden shadow-lg"
                        whileHover={{ y: -5 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        {/* Обложка чата */}
                        <div className="relative aspect-square">
                            <img
                                src={chat.coverImage}
                                alt={chat.title}
                                className="w-full h-full object-cover"
                            />

                            {/* Аватар создателя */}
                            <div className={`absolute top-2 left-2 ${isMobile ? 'w-10 h-10' : 'w-20 h-20'} rounded-full border-2 border-white overflow-hidden`}>
                                <img
                                    src={chat.creatorAvatar}
                                    alt="Creator"
                                    className="w-full h-full object-cover"
                                />
                            </div>

                            {/* Количество участников */}
                            <div className="absolute bottom-2 left-2 flex items-center bg-black/50 text-white text-xs px-2 py-1 rounded-full">
                                <FaUsers className="mr-1" />
                                <span>{chat.membersCount}</span>
                            </div>
                        </div>

                        {/* Информация о чате */}
                        <div className="bg-[#1e1b3a] p-3">
                            <h3 className="font-bold text-white truncate">{chat.title}</h3>
                            <div className="flex items-center justify-between mt-1">
                                <div className="flex items-center text-xs text-gray-400">
                                    <FaComment className="mr-1" />
                                    <span>{chat.lastMessageTime}</span>
                                </div>
                                <div className="flex items-center text-xs text-gray-400">
                                    <IoMdTime className="mr-1" />
                                    <span>активен</span>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Кнопка создания нового чата (только для ПК) */}
            {!isMobile && (
                <motion.button
                    className="fixed bottom-24 right-6 bg-[#576ecb] text-white p-3 rounded-full shadow-lg"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                >
                    <FaComment className="text-xl" />
                </motion.button>
            )}
        </div>
    );
};

export default ChatsTab;