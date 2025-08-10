import { motion, AnimatePresence } from "framer-motion";
import {
    FaTimes, FaHome, FaUsers, FaCalendar,
    FaCog, FaUserShield, FaUser, FaSignOutAlt,
    FaImage, FaPoll, FaBell, FaBookmark, FaInfoCircle,
    FaChevronRight
} from "react-icons/fa";
import { GiPresent } from "react-icons/gi";
import {useState} from "react";
import CommunityEditor from "./CommunityEditor.jsx";

const CommunityMenu = ({ isOpen, onClose, isAdmin, communityName, coverImage, onEdit, onEditCover }) => {
    const overlayVariants = {
        open: { opacity: 1, transition: { duration: 0.2 } },
        closed: { opacity: 0, transition: { duration: 0.2 } }
    };

    const menuVariants = {
        open: { x: 0, transition: { type: "tween", ease: "easeOut", duration: 0.25 } },
        closed: { x: "-100%", transition: { duration: 0.2 } }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Оверлей */}
                    <motion.div
                        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
                        initial="closed"
                        animate="open"
                        exit="closed"
                        variants={overlayVariants}
                        onClick={onClose}
                    />

                    {/* Меню */}
                    <motion.div
                        className="fixed top-0 left-0 h-full w-72 max-w-full bg-[#0f172a] border-r border-[#1e293b] z-50"
                        initial="closed"
                        animate="open"
                        exit="closed"
                        variants={menuVariants}
                    >
                        {/* Минималистичная шапка */}
                        <div className="p-4 border-b border-[#1e293b]">
                            <div className="flex justify-between items-center">
                                <h2 className="text-xl font-bold text-white truncate max-w-[80%]">
                                    {communityName}
                                </h2>
                                <button
                                    onClick={onClose}
                                    className="p-2 rounded-full hover:bg-[#1e293b] text-gray-400 hover:text-white"
                                >
                                    <FaTimes />
                                </button>
                            </div>
                            <p className="text-sm text-gray-400 mt-1 flex items-center">
                                <span className="w-2 h-2 rounded-full bg-green-500 mr-2"></span>
                                42 участника • 5 онлайн
                            </p>
                        </div>

                        {/* Тело меню */}
                        <div className="h-[calc(100%-80px)] overflow-y-auto py-2">
                            <MenuSection>
                                <MenuItem icon={<FaHome />} label="Главная" isActive />
                                <MenuItem icon={<FaUsers />} label="Участники" />
                                <MenuItem icon={<FaImage />} label="Медиа" />
                                <MenuItem icon={<FaCalendar />} label="Мероприятия" badge="3" />
                                <MenuItem icon={<FaPoll />} label="Опросы" />
                            </MenuSection>

                            {isAdmin && (
                                <MenuSection title="Управление">
                                    <MenuItem icon={<FaCog />} label="Настройки" />
                                    <MenuItem icon={<FaUserShield />} label="Модерация" />
                                    <MenuItem icon={<GiPresent />} label="Приглашения" badge="12" />
                                    <MenuItem
                                        icon={<FaCog />}
                                        label="Редактировать сообщество"
                                        onClicked={onEdit}
                                    />
                                    <MenuItem
                                        icon={<FaCog />}
                                        label="Изменить Обложку сообщества"
                                        onClicked={onEditCover}
                                    />
                                </MenuSection>
                            )}

                            <MenuSection title="Личное">
                                <MenuItem icon={<FaUser />} label="Профиль" />
                                <MenuItem icon={<FaBookmark />} label="Закладки" />
                                <MenuItem icon={<FaBell />} label="Уведомления" badge="5" />
                                <MenuItem icon={<FaInfoCircle />} label="Помощь" />
                                <MenuItem icon={<FaSignOutAlt />} label="Выйти" />
                            </MenuSection>
                        </div>

                        {/* Футер меню */}
                        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-[#1e293b] bg-[#0f172a]">
                            <div className="text-xs text-gray-500">
                                Сообщество • v2.4.1
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

// Обновлённые компоненты
const MenuSection = ({ title, children }) => (
    <div className="mb-1">
        {title && (
            <h3 className="px-4 py-2 text-[10px] font-semibold text-gray-500 uppercase tracking-wider">
                {title}
            </h3>
        )}
        <div className="space-y-0.5">
            {children}
        </div>
    </div>
);

const MenuItem = ({ icon, label, isActive = false, badge, onClicked }) => (
    <button
        className={`w-full flex items-center justify-between px-4 py-3 text-left transition-colors
      ${isActive ? 'bg-[#1e293b] text-[#8e83e4]' : 'text-gray-300 hover:bg-[#1e293b] hover:text-white'}`}
        onClick={onClicked}
    >

        <div className="flex items-center">
      <span className={`text-lg mr-3 ${isActive ? 'text-[#8e83e4]' : 'text-gray-500'}`}>
        {icon}
      </span>
            <span>{label}</span>
        </div>
        <div className="flex items-center">
            {badge && (
                <span className="bg-[#8e83e4] text-white text-xs px-2 py-0.5 rounded-full mr-2">
          {badge}
        </span>
            )}
            <FaChevronRight className="text-xs text-gray-500" />
        </div>
    </button>
);

export default CommunityMenu;