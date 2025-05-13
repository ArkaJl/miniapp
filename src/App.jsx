import { FaCoins, FaBell, FaHome, FaStore, FaUsers, FaChevronRight, FaSearch } from 'react-icons/fa';
import { GiCoins } from 'react-icons/gi';
import { IoIosNotifications } from 'react-icons/io';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';

import ProfilePage from "./Pages/ProfilePage/ProfilePage.jsx";
import MainPage from "./Pages/MainPage/MainPage.jsx";

export default function App() {
    return (
        <Router>
            <Routes>
                <Route
                    path="/profile"
                    element={<ProfilePage/>}
                />
                <Route
                    path="/"
                    element={<MainPage/>}
                />
            </Routes>
        </Router>
    );
}