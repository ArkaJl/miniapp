import {FaCoins, FaBell, FaHome, FaStore, FaUsers, FaNewspaper, FaChevronRight, FaSearch, FaUserTag} from 'react-icons/fa';
import { GiCoins } from 'react-icons/gi';
import { IoIosNotifications } from 'react-icons/io';
import './App.css';
import {BrowserRouter as Router, Routes, Route, Link, Navigate, useLocation} from 'react-router-dom';

import ProfilePage from "./Pages/ProfilePage/ProfilePage.jsx";
import MainPage from "./Pages/MainPage/MainPage.jsx";
import {AnimatePresence, motion} from "framer-motion";
import StorePage from "./Pages/StorePage/StorePage.jsx";
import NewsPage from "./Pages/NewsPage/NewsPage.jsx";

export default function App() {
    const location = useLocation();

    return (
       <div>
           <AnimatePresence mode="wait">
               <Routes location={location} key={location.pathname}>
                   <Route path="/" element={
                       <motion.div
                           initial={{ x: 300, opacity: 0.5 }}
                           animate={{ x: 0, opacity: 1 }}
                           exit={{ x: -3000, opacity: 0.5 }}
                           transition={{ duration: 0.3 }}
                       >
                           <MainPage />
                       </motion.div>
                   }/>
                   <Route path="/profile" element={
                       <motion.div
                           initial={{ x: 300, opacity: 0.5 }}
                           animate={{ x: 0, opacity: 1 }}
                           exit={{ x: -3000, opacity: 0.5 }}
                           transition={{ duration: 0.3 }}
                       >
                           <ProfilePage/>
                       </motion.div>
                   }/>

                   <Route path="/store" element={
                       <motion.div
                           initial={{ x: 300, opacity: 0.5 }}
                           animate={{ x: 0, opacity: 1 }}
                           exit={{ x: -3000, opacity: 0.5 }}
                           transition={{ duration: 0.3 }}
                       >
                           <StorePage />
                       </motion.div>
                   }/>
                   <Route path="/news" element={
                       <motion.div
                           initial={{ x: 300, opacity: 0.5 }}
                           animate={{ x: 0, opacity: 1 }}
                           exit={{ x: -3000, opacity: 0.5 }}
                           transition={{ duration: 0.3 }}
                       >
                           <NewsPage/>
                       </motion.div>
                   }/>
               </Routes>
           </AnimatePresence>
           {/* Подвал */}
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
       </div>
    );
}