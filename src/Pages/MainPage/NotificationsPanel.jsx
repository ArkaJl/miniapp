import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaTimes, FaBell, FaThumbsUp, FaUserPlus, FaComment } from "react-icons/fa";

const NotificationsPanel = ({ isOpen, onClose }) => {
    const [activeFilter, setActiveFilter] = useState("all");

    // Моковые данные уведомлений
    const notifications = [
        {
            id: 1,
            type: "like",
            community: "Гейминг",
            user: "Иван Иванов",
            content: "поставил(а) лайк на ваш пост",
            time: "5 мин назад",
            read: false
        },
        {
            id: 2,
            type: "follow",
            community: "Программирование",
            user: "Анна Петрова",
            content: "подписался(ась) на вас",
            time: "2 часа назад",
            read: true
        },
        {
            id: 3,
            type: "comment",
            community: "Дизайн",
            user: "Сергей Сидоров",
            content: "прокомментировал(а) ваш пост",
            time: "Вчера",
            read: true
        },
        {
            id: 4,
            type: "like",
            community: "Кино",
            user: "Мария Кузнецова",
            content: "поставил(а) лайк на ваш комментарий",
            time: "2 дня назад",
            read: true
        }
    ];

    // Фильтрация уведомлений
    const filteredNotifications = activeFilter === "all"
        ? notifications
        : notifications.filter(n => n.community === activeFilter);

    // Получаем уникальные сообщества для фильтра
    const communities = [...new Set(notifications.map(n => n.community))];

    // Иконки для типов уведомлений
    const getNotificationIcon = (type) => {
        switch(type) {
            case "like": return <FaThumbsUp className="text-blue-400" />;
            case "follow": return <FaUserPlus className="text-green-400" />;
            case "comment": return <FaComment className="text-purple-400" />;
            default: return <FaBell className="text-yellow-400" />;
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0, x: 300 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 300 }}
                    transition={{ type: "spring", damping: 25 }}
                    className="fixed inset-0 z-50 pt-16"
                >
                    <div className="absolute inset-0 bg-[#14102a] bg-opacity-95 backdrop-blur-sm">
                        {/* Шапка */}
                        <div className="bg-[#233e85] p-4 flex justify-between items-center">
                            <h2 className="text-xl font-bold flex items-center gap-2">
                                <FaBell /> Уведомления
                            </h2>
                            <button
                                onClick={onClose}
                                className="p-1 rounded-full hover:bg-[#35518e] transition-colors"
                            >
                                <FaTimes className="text-lg" />
                            </button>
                        </div>

                        {/* Фильтры по сообществам */}
                        <div className="p-4 border-b border-[#35518e]">
                            <div className="flex overflow-x-auto gap-2 pb-2">
                                <button
                                    onClick={() => setActiveFilter("all")}
                                    className={`px-3 py-1 rounded-full whitespace-nowrap ${activeFilter === "all" ? "bg-[#8e83e4] text-white" : "bg-[#233e85] text-[#bbb2f0]"}`}
                                >
                                    Все
                                </button>
                                {communities.map(community => (
                                    <button
                                        key={community}
                                        onClick={() => setActiveFilter(community)}
                                        className={`px-3 py-1 rounded-full whitespace-nowrap ${activeFilter === community ? "bg-[#8e83e4] text-white" : "bg-[#233e85] text-[#bbb2f0]"}`}
                                    >
                                        {community}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Список уведомлений */}
                        <div className="overflow-y-auto h-[calc(100vh-120px)]">
                            {filteredNotifications.length > 0 ? (
                                filteredNotifications.map(notification => (
                                    <motion.div
                                        key={notification.id}
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: 0.1 }}
                                        className={`p-4 border-b border-[#35518e] ${!notification.read ? "bg-[#233e85] bg-opacity-30" : ""}`}
                                    >
                                        <div className="flex gap-3">
                                            <div className="mt-1">
                                                {getNotificationIcon(notification.type)}
                                            </div>
                                            <div className="flex-1">
                                                <div className="flex justify-between">
                                                    <span className="font-bold">{notification.user}</span>
                                                    <span className="text-xs text-[#85b7ef]">{notification.time}</span>
                                                </div>
                                                <p className="text-sm">{notification.content}</p>
                                                <p className="text-xs text-[#8e83e4] mt-1">Сообщество: {notification.community}</p>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))
                            ) : (
                                <div className="text-center py-10 text-[#bbb2f0]">
                                    Нет уведомлений
                                </div>
                            )}
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default NotificationsPanel;