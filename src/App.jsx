import {
    FaCoins,
    FaBell,
    FaHome,
    FaStore,
    FaUsers,
    FaNewspaper,
    FaChevronRight,
    FaSearch,
    FaUserTag,
    FaPlus
} from 'react-icons/fa';
import { GiCoins } from 'react-icons/gi';
import { IoIosNotifications } from 'react-icons/io';
import './App.css';
import {
    Routes,
    Route,
    Link,
    Navigate,
    useLocation,
    useNavigate
} from 'react-router-dom';
import {
    createContext,
    useContext,
    useEffect,
    useState,
    useMemo
} from "react";

import ProfilePageMain from "./Pages/ProfilePage/ProfilePageMain.jsx";
import MainPage from "./Pages/MainPage/MainPage.jsx";
import {AnimatePresence, motion} from "framer-motion";
import StorePage from "./Pages/StorePage/StorePage.jsx";
import NewsPage from "./Pages/NewsPage/NewsPage.jsx";
import CommunityCover from "./Components/CommunityCover/CommunityCover.jsx";
import CommunityPage from "./Pages/CommunityPage/CommunityPage.jsx";
import MembersPage from "./Pages/MembersPage/MembersPage.jsx";
import ChatsPage from "./Pages/ChatsPage/ChatsPage.jsx";
import ProfilePage from "./Pages/ProfilePageCommunity/ProfilePage.jsx";

import { SessionContextProvider, useSession } from '@supabase/auth-helpers-react';
import {supabase} from "./config/supabase-db-config.js";
import SignInPage from "./Pages/Auth/SignInPage.jsx";
import SignUpPage from "./Pages/Auth/SignUpPage.jsx";
import ForgotPasswordPage from "./Pages/Auth/ForgotPasswordPage.jsx";

// Создаем контекст для доступа к аутентификации
const AuthContext = createContext();

// Компонент-обертка для управления аутентификацией
const AuthProvider = ({ children }) => {
    const [session, setSession] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        // Проверяем существующую сессию при загрузке
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session);
            setLoading(false);
        });

        // Слушаем изменения состояния аутентификации
        const { data: { subscription } } = supabase.auth.onAuthStateChange(
            async (event, session) => {
                setSession(session);
                setLoading(false);

                // Перенаправляем пользователя после входа/выхода
                if (event === 'SIGNED_IN') navigate('/');
                if (event === 'SIGNED_OUT') navigate('/signin');
            }
        );

        return () => subscription.unsubscribe();
    }, [navigate]);

    const value = useMemo(() => ({
        session,
        loading,
        supabase,
        isAuthenticated: !!session
    }), [session, loading]);

    if (loading) {
        return (
            <div className="min-h-screen bg-[#14102a] flex items-center justify-center">
                <div className="text-white text-xl">Загрузка...</div>
            </div>
        );
    }

    return (
        <SessionContextProvider supabaseClient={supabase} initialSession={session}>
            <AuthContext.Provider value={value}>
                {children}
            </AuthContext.Provider>
        </SessionContextProvider>
    );
};

// Хук для доступа к контексту аутентификации
export const useAuth = () => useContext(AuthContext);

// Компонент для защиты маршрутов
const ProtectedRoute = ({ children }) => {
    const { session, loading } = useAuth();
    const location = useLocation();

    if (loading) {
        return (
            <div className="min-h-screen bg-[#14102a] flex items-center justify-center">
                <div className="text-white text-xl">Проверка авторизации...</div>
            </div>
        );
    }

    if (!session) {
        return <Navigate to="/signin" state={{ from: location }} replace />;
    }

    return children;
};

function AppContent() {
    const location = useLocation();
    const footerPaths = ['/', '/profile', '/store', '/news'];
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

    const postData = {
        "id": "post_abc123",
        "author": {
            "id": "user_123",
            "name": "Иван Петров",
            "avatar": "https://example.com/avatars/user_123.jpg"
        },
        "content": "Привет! [SCROLL]{{ddjdjdjdjjddjdjdjdjjddjdjdjdjjddjdjdjdjjddjdjdjdjj}} Это [BG]{{img2 | Текст на фоне}} мой первый пост![IMG]{{img1}}Как вам? [C]{{[B]{{Круто}}}} [EFFECT]{{hearts}}",
        "images": [
            {
                "id": "img1",
                "dataUrl": "https://i.pinimg.com/originals/a3/c9/6b/a3c96be051dc86a4abb70ae70a8e70f7.jpg",
                "altText": "Мое фото",
                "width": 1200,
                "height": 800
            },
            {
                "id": "img2",
                "dataUrl": "https://i.pinimg.com/originals/a3/c9/6b/a3c96be051dc86a4abb70ae70a8e70f7.jpg",
                "altText": "Мое фото",
                "width": 1200,
                "height": 800
            }
        ],
        "styles": {
            "bgColor": "#b32525",
            "textColor": "#000000"
        },
        "effects": ["hearts"],
        "likes": 42,
        "comments": [
            {
                "id": "comment_1",
                "author": {
                    "id": "user_456",
                    "name": "Мария Сидорова",
                    "avatar": "https://example.com/avatars/user_456.jpg"
                },
                "text": "Отличный пост!",
                "createdAt": "2023-05-15T14:30:00Z"
            }
        ],
        "createdAt": "2023-05-15T12:00:00Z",
        "updatedAt": "2023-05-15T12:00:00Z",
        "visibility": "public",
        "tags": ["первый пост", "приветствие"],
        "metadata": {
            "wordCount": 15,
            "readTime": 1
        }
    };

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <div>
            <AnimatePresence mode="wait">
                <Routes location={location} key={location.pathname}>
                    {/* Маршруты аутентификации */}
                    <Route path="/signin" element={<SignInPage />} />
                    <Route path="/signup" element={<SignUpPage />} />
                    <Route path="/forgot-password" element={<ForgotPasswordPage />} />

                    {/* Защищенные маршруты */}
                    <Route path="/" element={
                        <ProtectedRoute>
                            <motion.div
                                initial={{x: 300, opacity: 0.5}}
                                animate={{x: 0, opacity: 1}}
                                exit={{x: -3000, opacity: 0.5}}
                                transition={{duration: 0.3}}
                            >
                                <MainPage/>
                            </motion.div>
                        </ProtectedRoute>
                    }/>
                    <Route path="/profile" element={
                        <ProtectedRoute>
                            <motion.div
                                initial={{x: 300, opacity: 0.5}}
                                animate={{x: 0, opacity: 1}}
                                exit={{x: -3000, opacity: 0.5}}
                                transition={{duration: 0.3}}
                            >
                                <ProfilePageMain/>
                            </motion.div>
                        </ProtectedRoute>
                    }/>
                    <Route path="/store" element={
                        <ProtectedRoute>
                            <motion.div
                                initial={{x: 300, opacity: 0.5}}
                                animate={{x: 0, opacity: 1}}
                                exit={{x: -3000, opacity: 0.5}}
                                transition={{duration: 0.3}}
                            >
                                <StorePage/>
                            </motion.div>
                        </ProtectedRoute>
                    }/>
                    <Route path="/news" element={
                        <ProtectedRoute>
                            <motion.div
                                initial={{x: 300, opacity: 0.5}}
                                animate={{x: 0, opacity: 1}}
                                exit={{x: -3000, opacity: 0.5}}
                                transition={{duration: 0.3}}
                            >
                                <NewsPage/>
                            </motion.div>
                        </ProtectedRoute>
                    }/>
                    <Route path="/communitie" element={
                        <ProtectedRoute>
                            <motion.div
                                initial={{opacity: 0, y: -20}}
                                animate={{opacity: 1, y: 0}}
                                exit={{opacity: 0, y: -20}}
                                transition={{type: "spring", damping: 25, stiffness: 300}}
                            >
                                <CommunityCover
                                    avatar="https://source.unsplash.com/random/200x200/?profile"
                                    background1="https://i.pinimg.com/originals/a3/c9/6b/a3c96be051dc86a4abb70ae70a8e70f7.jpg"
                                    name="Крутое сообщество"
                                    tags={["разработка", "дизайн", "анимации", "vite"]}
                                    description="Добро пожаловать в наше сообщество! Мы занимаемся созданием крутых проектов с использованием современных технологий. Присоединяйтесь к нам!"
                                    descriptionImages={[
                                        "https://i.pinimg.com/originals/a3/c9/6b/a3c96be051dc86a4abb70ae70a8e70f7.jpg",
                                        "https://i.pinimg.com/736x/2f/d1/69/2fd169a01f723c082fd4e8dd65bbface.jpg"
                                    ]}
                                />
                            </motion.div>
                        </ProtectedRoute>
                    }/>
                    <Route path="/communitie-mainpage" element={
                        <ProtectedRoute>
                            <motion.div
                                initial={{opacity: 0, y: -20}}
                                animate={{opacity: 1, y: 0}}
                                exit={{opacity: 0, y: -20}}
                                transition={{type: "spring", damping: 25, stiffness: 300}}
                            >
                                <CommunityPage isMobile={isMobile}/>
                            </motion.div>
                        </ProtectedRoute>
                    }/>
                    <Route path="/communitie-memberspage" element={
                        <ProtectedRoute>
                            <motion.div
                                initial={{opacity: 0, y: -20}}
                                animate={{opacity: 1, y: 0}}
                                exit={{opacity: 0, y: -20}}
                                transition={{type: "spring", damping: 25, stiffness: 300}}
                            >
                                <MembersPage isMobile={isMobile}/>
                            </motion.div>
                        </ProtectedRoute>
                    }/>
                    <Route path="/communitie-chatspage" element={
                        <ProtectedRoute>
                            <motion.div
                                initial={{opacity: 0, y: -20}}
                                animate={{opacity: 1, y: 0}}
                                exit={{opacity: 0, y: -20}}
                                transition={{type: "spring", damping: 25, stiffness: 300}}
                            >
                                <ChatsPage isMobile={isMobile}/>
                            </motion.div>
                        </ProtectedRoute>
                    }/>
                    <Route path="/communitie-profilepage" element={
                        <ProtectedRoute>
                            <motion.div
                                initial={{opacity: 0, y: -20}}
                                animate={{opacity: 1, y: 0}}
                                exit={{opacity: 0, y: -20}}
                                transition={{type: "spring", damping: 25, stiffness: 300}}
                            >
                                <ProfilePage/>
                            </motion.div>
                        </ProtectedRoute>
                    }/>
                </Routes>
            </AnimatePresence>

            {/*<PostView*/}
            {/*    post={postData}*/}
            {/*/>*/}

            {/*<ProfileEditor/>*/}

            {/* Подвал - отображается только на определенных путях */}
            {footerPaths.includes(location.pathname) && (
                <footer
                    className="bg-[#14102a] border-t border-[#35518e] fixed bottom-0 left-0 right-0 p-3 shadow-md z-50">
                    <div className="flex justify-around">
                        {[
                            {
                                icon: <FaHome className="text-xl"/>,
                                name: "Главная",
                                path: "/",
                                active: location.pathname === "/"
                            },
                            {
                                icon: <FaUserTag className="text-xl"/>,
                                name: "Профиль",
                                path: "/profile",
                                active: location.pathname === "/profile"
                            },
                            {
                                icon: <FaStore className="text-xl"/>,
                                name: "Магазин",
                                path: "/store",
                                active: location.pathname === "/store"
                            },
                            {
                                icon: <FaNewspaper className="text-xl"/>,
                                name: "Новости",
                                path: "/news",
                                active: location.pathname === "/news"
                            }
                        ].map((item, index) => (
                            <Link
                                key={index}
                                to={item.path}
                                className={`flex flex-col items-center ${item.active ? 'text-[#bcd8f6]' : 'text-[#8e83e4]'}`}
                            >
                                {item.icon}
                                <span className="text-xs mt-1">{item.name}</span>
                                {item.active && <div className="w-1 h-1 rounded-full bg-[#576ecb] mt-1"></div>}
                            </Link>
                        ))}
                    </div>
                </footer>
            )}
        </div>
    );
}

export default function App() {
    return (
        <AuthProvider>
            <AppContent />
        </AuthProvider>
    );
}