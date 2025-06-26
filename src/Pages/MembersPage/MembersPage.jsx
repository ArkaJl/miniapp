import { useState } from 'react';
import { FaCrown, FaShieldAlt, FaUserCog, FaUser, FaSearch, FaArrowLeft, FaCircle } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import Footer from "../../Components/Community/Footer.jsx";

const MembersPage = ({ isMobile }) => {
    // Моковые данные с разными ролями
    const [members, setMembers] = useState([
        { id: 1, name: 'Алексей Петров', role: 'Основатель', avatar: 'https://randomuser.me/api/portraits/men/32.jpg', online: true, lastSeen: 'online' },
        { id: 2, name: 'Иван Сидоров', role: 'Администратор', avatar: 'https://randomuser.me/api/portraits/men/44.jpg', online: true, lastSeen: 'online' },
        { id: 3, name: 'Елена Иванова', role: 'Модератор', avatar: 'https://randomuser.me/api/portraits/women/63.jpg', online: true, lastSeen: 'online' },
        { id: 4, name: 'Дмитрий Смирнов', role: 'Модератор', avatar: 'https://randomuser.me/api/portraits/men/68.jpg', online: false, lastSeen: '2ч назад' },
        { id: 5, name: 'Ольга Кузнецова', role: 'Ветеран', avatar: 'https://randomuser.me/api/portraits/women/50.jpg', online: true, lastSeen: 'online' },
        { id: 6, name: 'Сергей Васильев', role: 'Участник', avatar: 'https://randomuser.me/api/portraits/men/22.jpg', online: false, lastSeen: '5д назад' },
        { id: 7, name: 'Мария Новикова', role: 'Участник', avatar: 'https://randomuser.me/api/portraits/women/33.jpg', online: true, lastSeen: 'online' },
    ]);

    const [searchQuery, setSearchQuery] = useState('');
    const [activeTab, setActiveTab] = useState('all');

    // Фильтрация и сортировка
    const filteredMembers = members
        .filter(member => {
            const matchesSearch = member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                member.role.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesTab = activeTab === 'all' ||
                (activeTab === 'online' && member.online) ||
                (activeTab === 'admins' && ['Основатель', 'Администратор', 'Модератор'].includes(member.role));
            return matchesSearch && matchesTab;
        })
        .sort((a, b) => {
            const roleOrder = { 'Основатель': 1, 'Администратор': 2, 'Модератор': 3, 'Ветеран': 4, 'Участник': 5 };
            return roleOrder[a.role] - roleOrder[b.role] || a.name.localeCompare(b.name);
        });

    // Группировка для админов
    const adminRoles = {
        'Основатель': filteredMembers.filter(m => m.role === 'Основатель'),
        'Администраторы': filteredMembers.filter(m => m.role === 'Администратор'),
        'Модераторы': filteredMembers.filter(m => m.role === 'Модератор')
    };

    // Обычные участники
    const regularMembers = filteredMembers.filter(m => ['Ветеран', 'Участник'].includes(m.role));

    return (
        <div className="bg-[#14102a] text-white min-h-screen pb-20">
            {/* Шапка с поиском */}
            <header className="bg-[#233e85] sticky top-0 z-10 p-4 pb-3 border-b border-[#35518e]">
                <div className="flex items-center justify-between mb-4">
                    <Link
                        to="/communitie-mainpage"
                        className="flex items-center text-[#bcd8f6] hover:text-white transition-colors"
                    >
                        <FaArrowLeft className="text-xl mr-3" />
                        <h1 className="text-xl font-bold">Участники сообщества</h1>
                    </Link>
                </div>

                {/* Поле поиска */}
                <div className="relative mb-3">
                    <FaSearch className="absolute left-3 top-3.5 text-[#8e83e4]" />
                    <input
                        type="text"
                        placeholder="Поиск по имени или роли..."
                        className="w-full bg-[#1e1b3a] text-white pl-10 pr-4 py-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#576ecb] placeholder-[#8e83e4]"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>

                {/* Табы фильтрации */}
                <div className="flex space-x-2 overflow-x-auto pb-1 scrollbar-hide">
                    {['all', 'online', 'admins'].map(tab => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`px-3 py-1.5 rounded-full text-sm whitespace-nowrap transition-colors ${
                                activeTab === tab
                                    ? 'bg-[#576ecb] text-white'
                                    : 'bg-[#1e1b3a] text-[#8e83e4] hover:bg-[#2a2752]'
                            }`}
                        >
                            {tab === 'all' && 'Все'}
                            {tab === 'online' && 'Онлайн'}
                            {tab === 'admins' && 'Администрация'}
                        </button>
                    ))}
                </div>
            </header>

            {/* Основной контент */}
            <main className="p-4">
                {/* Администрация */}
                {(activeTab === 'all' || activeTab === 'admins') && (
                    <div className="mb-8">
                        <h2 className="text-lg font-semibold mb-4 text-[#bcd8f6] flex items-center">
                            <FaShieldAlt className="mr-2" />
                            Администрация
                        </h2>

                        <div className="space-y-3">
                            {Object.entries(adminRoles).map(([role, members]) => (
                                members.length > 0 && (
                                    <div key={role} className="mb-4">
                                        <h3 className="text-sm font-medium text-[#8e83e4] mb-2 ml-1">{role}</h3>
                                        <AnimatePresence>
                                            {members.map(member => (
                                                <motion.div
                                                    key={member.id}
                                                    initial={{ opacity: 0, y: 10 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    exit={{ opacity: 0 }}
                                                    transition={{ duration: 0.2 }}
                                                    className="bg-[#1e1b3a] rounded-xl p-3 flex items-center hover:bg-[#2a2752] transition-colors"
                                                >
                                                    <div className="relative">
                                                        <img
                                                            src={member.avatar}
                                                            alt={member.name}
                                                            className="w-12 h-12 rounded-full object-cover border-2 border-[#8e83e4]"
                                                        />
                                                        {member.online && (
                                                            <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-[#1e1b3a]"></div>
                                                        )}
                                                    </div>

                                                    <div className="ml-3 flex-1">
                                                        <div className="font-medium flex items-center">
                                                            {member.name}
                                                            {member.role === 'Основатель' && (
                                                                <FaCrown className="ml-2 text-yellow-400 text-sm" />
                                                            )}
                                                        </div>
                                                        <div className="text-sm text-[#8e83e4] flex items-center">
                                                            <span>{member.role}</span>
                                                            <span className="mx-2">•</span>
                                                            <span className={member.online ? 'text-green-400 flex items-center' : 'text-gray-500'}>
                                                                {member.online ? (
                                                                    <>
                                                                        <FaCircle className="text-xs mr-1" />
                                                                        online
                                                                    </>
                                                                ) : member.lastSeen}
                                                            </span>
                                                        </div>
                                                    </div>

                                                    <button className="bg-[#576ecb] hover:bg-[#4758a5] text-white px-3 py-1.5 rounded-lg text-sm transition-colors">
                                                        Профиль
                                                    </button>
                                                </motion.div>
                                            ))}
                                        </AnimatePresence>
                                    </div>
                                )
                            ))}
                        </div>
                    </div>
                )}

                {/* Обычные участники */}
                {(activeTab === 'all' || activeTab === 'online') && regularMembers.length > 0 && (
                    <div>
                        <h2 className="text-lg font-semibold mb-4 text-[#bcd8f6] flex items-center">
                            <FaUser className="mr-2" />
                            {activeTab === 'online' ? 'Участники онлайн' : 'Все участники'}
                            <span className="ml-2 text-sm text-[#8e83e4]">({regularMembers.length})</span>
                        </h2>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <AnimatePresence>
                                {regularMembers.map(member => (
                                    <motion.div
                                        key={member.id}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0 }}
                                        transition={{ duration: 0.2 }}
                                        className="bg-[#1e1b3a] rounded-xl p-3 flex items-center hover:bg-[#2a2752] transition-colors"
                                    >
                                        <div className="relative">
                                            <img
                                                src={member.avatar}
                                                alt={member.name}
                                                className="w-10 h-10 rounded-full object-cover"
                                            />
                                            {member.online && (
                                                <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-[#1e1b3a]"></div>
                                            )}
                                        </div>

                                        <div className="ml-3 flex-1">
                                            <div className="font-medium">{member.name}</div>
                                            <div className="text-sm text-[#8e83e4] flex items-center">
                                                <span>{member.role}</span>
                                                <span className="mx-2">•</span>
                                                <span className={member.online ? 'text-green-400 flex items-center' : 'text-gray-500'}>
                                                    {member.online ? (
                                                        <>
                                                            <FaCircle className="text-[8px] mr-1" />
                                                            online
                                                        </>
                                                    ) : member.lastSeen}
                                                </span>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </div>
                    </div>
                )}
            </main>
            <Footer/>
        </div>
    );
};

export default MembersPage;