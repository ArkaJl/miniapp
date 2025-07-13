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
import {BrowserRouter as Router, Routes, Route, Link, Navigate, useLocation} from 'react-router-dom';

import ProfilePageMain from "./Pages/ProfilePage/ProfilePageMain.jsx";
import MainPage from "./Pages/MainPage/MainPage.jsx";
import {AnimatePresence, motion} from "framer-motion";
import StorePage from "./Pages/StorePage/StorePage.jsx";
import NewsPage from "./Pages/NewsPage/NewsPage.jsx";
import CommunityCover from "./Components/CommunityCover/CommunityCover.jsx";
import CommunityPage from "./Pages/CommunityPage/CommunityPage.jsx";
import MembersPage from "./Pages/MembersPage/MembersPage.jsx";
import {useEffect, useState} from "react";
import ChatsPage from "./Pages/ChatsPage/ChatsPage.jsx";
import ProfilePage from "./Pages/ProfilePageCommunity/ProfilePage.jsx";
import PostView from "./Components/PostView/PostView.jsx";

export default function App() {
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
            "content": "Привет! Это мой первый пост![IMG]{{img1}}Как вам? [C]{{[B]{{Круто}}}} [EFFECT]{{hearts}}",
            "images": [
                {
                    "id": "img1",
                    "dataUrl": "https://i.pinimg.com/originals/a3/c9/6b/a3c96be051dc86a4abb70ae70a8e70f7.jpg",
                    "altText": "Мое фото",
                    "width": 1200,
                    "height": 800
                }
            ],
            "styles": {
                "bgColor": "#000959",
                "textColor": "#f8f3f3"
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
        }

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
                    <Route path="/" element={
                        <motion.div
                            initial={{x: 300, opacity: 0.5}}
                            animate={{x: 0, opacity: 1}}
                            exit={{x: -3000, opacity: 0.5}}
                            transition={{duration: 0.3}}
                        >
                            <MainPage/>
                        </motion.div>
                    }/>
                    <Route path="/profile" element={
                        <motion.div
                            initial={{x: 300, opacity: 0.5}}
                            animate={{x: 0, opacity: 1}}
                            exit={{x: -3000, opacity: 0.5}}
                            transition={{duration: 0.3}}
                        >
                            <ProfilePageMain/>
                        </motion.div>
                    }/>
                    <Route path="/store" element={
                        <motion.div
                            initial={{x: 300, opacity: 0.5}}
                            animate={{x: 0, opacity: 1}}
                            exit={{x: -3000, opacity: 0.5}}
                            transition={{duration: 0.3}}
                        >
                            <StorePage/>
                        </motion.div>
                    }/>
                    <Route path="/news" element={
                        <motion.div
                            initial={{x: 300, opacity: 0.5}}
                            animate={{x: 0, opacity: 1}}
                            exit={{x: -3000, opacity: 0.5}}
                            transition={{duration: 0.3}}
                        >
                            <NewsPage/>
                        </motion.div>
                    }/>
                    <Route path="/communitie" element={
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
                    }/>
                    <Route path="/communitie-mainpage" element={
                        <motion.div
                            initial={{opacity: 0, y: -20}}
                            animate={{opacity: 1, y: 0}}
                            exit={{opacity: 0, y: -20}}
                            transition={{type: "spring", damping: 25, stiffness: 300}}
                        >
                            <CommunityPage isMobile={isMobile}/>
                        </motion.div>
                    }/>
                    <Route path="/communitie-memberspage" element={
                        <motion.div
                            initial={{opacity: 0, y: -20}}
                            animate={{opacity: 1, y: 0}}
                            exit={{opacity: 0, y: -20}}
                            transition={{type: "spring", damping: 25, stiffness: 300}}
                        >
                            <MembersPage isMobile={isMobile}/>
                        </motion.div>
                    }/>
                    <Route path="/communitie-chatspage" element={
                        <motion.div
                            initial={{opacity: 0, y: -20}}
                            animate={{opacity: 1, y: 0}}
                            exit={{opacity: 0, y: -20}}
                            transition={{type: "spring", damping: 25, stiffness: 300}}
                        >
                            <ChatsPage isMobile={isMobile}/>
                        </motion.div>
                    }/>
                    <Route path="/communitie-profilepage" element={
                        <motion.div
                            initial={{opacity: 0, y: -20}}
                            animate={{opacity: 1, y: 0}}
                            exit={{opacity: 0, y: -20}}
                            transition={{type: "spring", damping: 25, stiffness: 300}}
                        >
                            <ProfilePage/>
                        </motion.div>
                    }/>
                </Routes>
            </AnimatePresence>

            {/*<PostView*/}
            {/*    post={postData}*/}
            {/*/>*/}

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