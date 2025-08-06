import { useState, useEffect } from "react";
import { FaChevronRight, FaSearch } from "react-icons/fa";
import { GiCoins } from "react-icons/gi";
import { IoIosNotifications } from "react-icons/io";
import { Link } from "react-router-dom";
import SearchPanel from "./SearchPanel";
import NotificationsPanel from "./NotificationsPanel";
import { motion } from "framer-motion";
import { supabase } from "/src/config/supabase-db-config.js";
import "./style.css";
import {useAuth} from "../../App.jsx";

export default function MainPage() {
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
    const [coins, setCoins] = useState(0);
    const [recommendedCommunities, setRecommendedCommunities] = useState([]);
    const [myCommunities, setMyCommunities] = useState([]);
    const [unreadNotificationsCount, setUnreadNotificationsCount] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [userData, setUserData] = useState(null);

    // Получаем текущую сессию напрямую из Supabase
    const getSession = async () => {
        const { data: { session } } = await supabase.auth.getSession();
        return session?.user;
    };

    const handleSearchClick = () => {
        setIsSearchOpen(true);
        setIsNotificationsOpen(false);
    };

    const handleNotificationsClick = () => {
        setIsNotificationsOpen(!isNotificationsOpen);
        setIsSearchOpen(false);
    };

    const handleCloseAllPanels = () => {
        setIsSearchOpen(false);
        setIsNotificationsOpen(false);
    };

        const { checkSession, supabase } = useAuth();

        // Базовая загрузка данных без подписок
        const fetchUserData = async (user) => {
            try {
                const { data } = await supabase
                    .from('users')
                    .select('coins, avatar_url, username')
                    .eq('id', user.id)
                    .single();

                setUserData(data);
            } catch (error) {
                console.error("Ошибка загрузки данных:", error);
            } finally {
                setIsLoading(false);
            }
        };

        useEffect(() => {
            const loadData = async () => {
                const session = await checkSession();

                if (!session) {
                    window.location.href = '/signin';
                    return;
                }

                await fetchUserData(session.user);
            };

            loadData();
        }, []);

    // Skeleton loader для заглушки во время загрузки
    if (isLoading) {
        return (
            <div className="app font-sans">
                <div className="bg-[#f5f7fa] background-img text-[#f4f8fe] flex flex-col min-h-screen">
                    <header className="bg-[#14102a] text-white p-4 fixed top-0 left-0 right-0 z-50 shadow-md">
                        <div className="flex items-center justify-between">
                            <div className="w-full max-w-md mr-2 bg-[#2a3568] rounded-full h-10"></div>
                            <div className="flex items-center space-x-4">
                                <div className="w-20 h-8 bg-[#2a3568] rounded-full"></div>
                                <div className="w-8 h-8 bg-[#2a3568] rounded-full"></div>
                            </div>
                        </div>
                    </header>

                    <main className="flex-1 mt-16 mb-16 p-4 space-y-6">
                        <div>
                            <div className="h-6 w-32 bg-[#2a3568] rounded mb-3"></div>
                            <div className="flex space-x-3">
                                {[1, 2, 3, 4].map(i => (
                                    <div key={i} className="w-24 h-28 bg-[#2a3568] rounded-lg"></div>
                                ))}
                            </div>
                        </div>

                        <div className="h-32 bg-[#2a3568] rounded-xl"></div>

                        <div>
                            <div className="h-6 w-40 bg-[#2a3568] rounded mb-3"></div>
                            <div className="bg-[#2a3568] rounded-xl h-48"></div>
                        </div>
                    </main>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="app font-sans">
                <div className="bg-[#f5f7fa] background-img text-[#f4f8fe] flex flex-col min-h-screen">
                    <header className="bg-[#14102a] text-white p-4 fixed top-0 left-0 right-0 z-50 shadow-md">
                        <div className="flex items-center justify-between">
                            <div className="flex-1 max-w-md mr-2"></div>
                            <div className="flex items-center space-x-4">
                                <div className="w-8 h-8 bg-[#2a3568] rounded-full"></div>
                            </div>
                        </div>
                    </header>
                    <div className="min-h-screen flex items-center justify-center">
                        <div className="text-red-500 p-4 bg-white rounded-lg max-w-md mx-4">
                            {error}
                            <button
                                onClick={fetchUserData}
                                className="mt-2 w-full bg-[#576ecb] text-white py-2 rounded-md"
                            >
                                Попробовать снова
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="app font-sans">
            <div className="bg-[#f5f7fa] background-img text-[#f4f8fe] flex flex-col min-h-screen">
                {/* Шапка (фиксированная) */}
                <header className="bg-[#14102a] text-white p-4 fixed top-0 left-0 right-0 z-50 shadow-md">
                    <div className="flex items-center justify-between">
                        {/* Поиск */}
                        <motion.div
                            className="relative flex-1 max-w-md mr-2"
                            whileTap={{scale: 0.98}}
                        >
                            <div className="relative">
                                <motion.input
                                    type="text"
                                    placeholder="Поиск..."
                                    className="w-full py-2 px-4 pr-10 rounded-full bg-[#35518e] text-white placeholder-[#85b7ef] focus:outline-none focus:ring-2 focus:ring-[#8e83e4]"
                                    onClick={handleSearchClick}
                                    readOnly
                                    whileHover={{scale: 1.02}}
                                    whileTap={{scale: 0.98}}
                                />
                                <FaSearch className="absolute right-3 top-3 text-[#bbb2f0]"/>
                            </div>
                        </motion.div>

                        {/* Иконки справа */}
                        <div className="flex items-center space-x-4">
                            {/* Монеты */}
                            {!isSearchOpen && !isNotificationsOpen && (
                                <div className="flex items-center bg-[#233e85] px-2 py-1 rounded-full">
                                    <GiCoins className="text-[#bbb2f0] text-xl mr-1"/>
                                    <span className="text-sm font-medium">{coins}</span>
                                </div>
                            )}

                            {/* Уведомления */}
                            <div className="relative">
                                <button
                                    onClick={handleNotificationsClick}
                                    className={`p-1 rounded-full ${isNotificationsOpen ? "bg-[#35518e]" : "hover:bg-[#35518e]"}`}
                                >
                                    <IoIosNotifications className="text-xl"/>
                                    {unreadNotificationsCount > 0 && (
                                        <span className="absolute -top-1 -right-1 bg-[#a45cd4] text-white text-xs font-bold rounded-full h-4 w-4 flex items-center justify-center">
                                            {unreadNotificationsCount}
                                        </span>
                                    )}
                                </button>
                            </div>

                            {/* Аватар */}
                            {!isSearchOpen && !isNotificationsOpen && userData && (
                                <Link to="/profile">
                                    <div className="w-8 h-8 rounded-full bg-[#233e85] overflow-hidden hover:scale-105 transition-transform">
                                        {userData.avatar_url ? (
                                            <img
                                                src={userData.avatar_url}
                                                alt="Аватар"
                                                className="w-full h-full object-cover"
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center bg-[#8e83e4]">
                                                <span className="text-white font-bold">
                                                    {userData.username?.[0]?.toUpperCase() || 'U'}
                                                </span>
                                            </div>
                                        )}
                                    </div>
                                </Link>
                            )}
                        </div>
                    </div>
                </header>

                {/* Панель поиска */}
                <SearchPanel isOpen={isSearchOpen} onClose={handleCloseAllPanels}/>

                {/* Панель уведомлений */}
                <NotificationsPanel
                    isOpen={isNotificationsOpen}
                    onClose={handleCloseAllPanels}
                />

                {/* Основной контент */}
                {!isSearchOpen && !isNotificationsOpen && (
                    <main className="flex-1 mt-16 mb-16">
                        {/* Рекомендованные сообщества */}
                        <section className="p-4">
                            <h2 className="text-xl font-bold mb-3 text-[#1c2562]">Рекомендуем</h2>
                            <div className="flex space-x-3 overflow-x-auto pb-2">
                                {recommendedCommunities.length > 0 ? (
                                    recommendedCommunities.map(community => (
                                        <Link to={`/community/${community.id}`} key={community.id} className="flex-shrink-0 w-24">
                                            <div className="bg-[#233e85] rounded-lg p-2 shadow-sm text-center hover:shadow-md hover:-translate-y-1 transition-all">
                                                <div className="w-16 h-16 mx-auto rounded-full bg-[#8e83e4] overflow-hidden mb-1 flex items-center justify-center">
                                                    {community.avatar_url ? (
                                                        <img
                                                            src={community.avatar_url}
                                                            alt={community.name}
                                                            className="w-full h-full object-cover"
                                                        />
                                                    ) : (
                                                        <span className="font-bold text-white">{community.name[0]}</span>
                                                    )}
                                                </div>
                                                <p className="text-xs font-medium truncate">{community.name}</p>
                                            </div>
                                        </Link>
                                    ))
                                ) : (
                                    <div className="text-sm text-gray-500">Нет рекомендуемых сообществ</div>
                                )}
                            </div>
                        </section>

                        {/* Баннер с ивентом */}
                        <section className="px-4 mb-4">
                            <div className="bg-gradient-to-r from-[#233e85] to-[#8e83e4] rounded-xl p-4 text-white shadow-md">
                                <h3 className="font-bold text-lg mb-1">Текущий ивент</h3>
                                <p className="text-sm mb-2">Собери 1000 монет и получи эксклюзивный бейдж!</p>
                                <div className="w-full bg-[#233e85] bg-opacity-30 rounded-full h-2 mb-2">
                                    <div
                                        className="bg-[#bbb2f0] h-2 rounded-full"
                                        style={{ width: `${Math.min(100, (coins / 1000) * 100)}%` }}
                                    ></div>
                                </div>
                                <p className="text-xs">{coins}/1000 монет собрано</p>
                            </div>
                        </section>

                        {/* Мои сообщества */}
                        <section className="p-4">
                            <h2 className="text-xl font-bold mb-3 text-[#bcd8f6]">Мои сообщества</h2>
                            <div className="bg-gradient-to-r from-[#233e85] to-[#8e83e4] rounded-xl shadow-sm overflow-hidden">
                                {myCommunities.length > 0 ? (
                                    myCommunities.map(community => (
                                        <Link
                                            to={`/community/${community.id}`}
                                            key={community.id}
                                            className="flex items-center p-3 border-b border-[#85b7ef] hover:bg-[#35518e] transition-colors"
                                        >
                                            <div className="w-10 h-10 rounded-full bg-[#576ecb] mr-3 overflow-hidden flex items-center justify-center">
                                                {community.avatar_url ? (
                                                    <img
                                                        src={community.avatar_url}
                                                        alt={community.name}
                                                        className="w-full h-full object-cover"
                                                    />
                                                ) : (
                                                    <span className="text-white">{community.name[0]}</span>
                                                )}
                                            </div>
                                            <div className="flex-1">
                                                <h3 className="font-medium">{community.name}</h3>
                                                <p className="text-xs text-[#978ce6]">
                                                    {community.member_count} участников
                                                </p>
                                            </div>
                                            <FaChevronRight className="text-[#8e83e4]" />
                                        </Link>
                                    ))
                                ) : (
                                    <div className="p-4 text-center text-[#bbb2f0]">
                                        Вы ещё не присоединились ни к одному сообществу
                                    </div>
                                )}
                            </div>
                        </section>
                    </main>
                )}
            </div>
        </div>
    );
}