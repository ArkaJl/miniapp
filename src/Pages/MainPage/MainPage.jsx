import {FaChevronRight, FaHome, FaSearch, FaStore, FaUsers} from "react-icons/fa";
import {GiCoins} from "react-icons/gi";
import {IoIosNotifications} from "react-icons/io";
import {Link} from "react-router-dom";

export default function MainPage() {
    return (
        <div className="app">
            <div className="bg-gray-100 text-gray-800 flex flex-col min-h-screen">
                {/* Шапка (фиксированная) */}
                <header className="bg-blue-600 text-white p-4 fixed top-0 left-0 right-0 z-50 shadow-md">
                    <div className="flex items-center justify-between">
                        {/* Поиск */}
                        <div className="relative flex-1 max-w-md mr-2">
                            <div className="relative">
                                <input
                                    type="text"
                                    placeholder="Поиск..."
                                    className="w-full py-2 px-4 pr-10 rounded-full bg-blue-500 text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-300"
                                />
                                <FaSearch className="absolute right-3 top-3 text-blue-200"/>
                            </div>
                        </div>

                        {/* Иконки справа */}
                        <div className="flex items-center space-x-4">
                            {/* Монеты - новый дизайн */}
                            <div className="flex items-center bg-blue-700 bg-opacity-70 px-2 py-1 rounded-full">
                                <GiCoins className="text-yellow-300 text-xl mr-1"/>
                                <span className="text-sm font-medium">150</span>
                            </div>

                            {/* Уведомления - новый дизайн */}
                            <div className="relative">
                                <div className="p-1 rounded-full hover:bg-blue-700">
                                    <IoIosNotifications className="text-xl"/>
                                    <span
                                        className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full h-4 w-4 flex items-center justify-center">3</span>
                                </div>
                            </div>

                            {/* Аватар */}
                            <Link to="/profile">
                                <div className="w-8 h-8 rounded-full bg-white overflow-hidden">
                                    <img src="https://randomuser.me/api/portraits/women/44.jpg" alt="Аватар"
                                         className="w-full h-full object-cover"/>
                                </div>
                            </Link>
                        </div>
                    </div>
                </header>

                {/* Основной контент (с отступом под шапку) */}
                <main className="flex-1 mt-16 mb-16">
                    {/* Рекомендованные сообщества */}
                    <section className="p-4">
                        <h2 className="text-xl font-bold mb-3">Рекомендуем</h2>
                        <div className="flex space-x-3 overflow-x-auto pb-2">
                            {/* Карточка сообщества */}
                            <div className="flex-shrink-0 w-24">
                                <div className="bg-white rounded-lg p-2 shadow-sm text-center">
                                    <div className="w-16 h-16 mx-auto rounded-full bg-blue-100 overflow-hidden mb-1">
                                        <img src="https://via.placeholder.com/64?text=G" alt="Гейминг"
                                             className="w-full h-full object-cover"/>
                                    </div>
                                    <p className="text-xs font-medium truncate">Гейминг</p>
                                </div>
                            </div>

                            {/* Еще карточки */}
                            <div className="flex-shrink-0 w-24">
                                <div className="bg-white rounded-lg p-2 shadow-sm text-center">
                                    <div className="w-16 h-16 mx-auto rounded-full bg-red-100 overflow-hidden mb-1">
                                        <img src="https://via.placeholder.com/64?text=M" alt="Музыка"
                                             className="w-full h-full object-cover"/>
                                    </div>
                                    <p className="text-xs font-medium truncate">Музыка</p>
                                </div>
                            </div>

                            <div className="flex-shrink-0 w-24">
                                <div className="bg-white rounded-lg p-2 shadow-sm text-center">
                                    <div className="w-16 h-16 mx-auto rounded-full bg-green-100 overflow-hidden mb-1">
                                        <img src="https://via.placeholder.com/64?text=A" alt="Аниме"
                                             className="w-full h-full object-cover"/>
                                    </div>
                                    <p className="text-xs font-medium truncate">Аниме</p>
                                </div>
                            </div>

                            <div className="flex-shrink-0 w-24">
                                <div className="bg-white rounded-lg p-2 shadow-sm text-center">
                                    <div className="w-16 h-16 mx-auto rounded-full bg-purple-100 overflow-hidden mb-1">
                                        <img src="https://via.placeholder.com/64?text=T" alt="Технологии"
                                             className="w-full h-full object-cover"/>
                                    </div>
                                    <p className="text-xs font-medium truncate">Технологии</p>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Баннер с ивентом */}
                    <section className="px-4 mb-4">
                        <div
                            className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl p-4 text-white shadow-md">
                            <h3 className="font-bold text-lg mb-1">Текущий ивент</h3>
                            <p className="text-sm mb-2">Собери 1000 монет и получи эксклюзивный бейдж!</p>
                            <div className="w-full bg-white bg-opacity-30 rounded-full h-2 mb-2">
                                <div className="bg-yellow-300 h-2 rounded-full" style={{width: '45%'}}></div>
                            </div>
                            <p className="text-xs">450/1000 монет собрано</p>
                        </div>
                    </section>

                    {/* Мои сообщества */}
                    <section className="p-4">
                        <h2 className="text-xl font-bold mb-3">Мои сообщества</h2>
                        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                            {/* Сообщество */}
                            <div className="flex items-center p-3 border-b border-gray-100">
                                <div className="w-10 h-10 rounded-full bg-blue-100 mr-3 overflow-hidden">
                                    <img src="https://via.placeholder.com/40?text=C" alt="Кодинг"
                                         className="w-full h-full object-cover"/>
                                </div>
                                <div className="flex-1">
                                    <h3 className="font-medium">Кодинг</h3>
                                    <p className="text-xs text-gray-500">12.5K участников</p>
                                </div>
                                <FaChevronRight className="text-gray-400"/>
                            </div>

                            {/* Еще сообщества */}
                            <div className="flex items-center p-3 border-b border-gray-100">
                                <div className="w-10 h-10 rounded-full bg-green-100 mr-3 overflow-hidden">
                                    <img src="https://via.placeholder.com/40?text=D" alt="Дизайн"
                                         className="w-full h-full object-cover"/>
                                </div>
                                <div className="flex-1">
                                    <h3 className="font-medium">Дизайн</h3>
                                    <p className="text-xs text-gray-500">8.2K участников</p>
                                </div>
                                <FaChevronRight className="text-gray-400"/>
                            </div>

                            <div className="flex items-center p-3">
                                <div className="w-10 h-10 rounded-full bg-red-100 mr-3 overflow-hidden">
                                    <img src="https://via.placeholder.com/40?text=F" alt="Фитнес"
                                         className="w-full h-full object-cover"/>
                                </div>
                                <div className="flex-1">
                                    <h3 className="font-medium">Фитнес</h3>
                                    <p className="text-xs text-gray-500">5.7K участников</p>
                                </div>
                                <FaChevronRight className="text-gray-400"/>
                            </div>
                        </div>
                    </section>
                </main>

                {/* Подвал (фиксированный) */}
                <footer className="bg-white border-t border-gray-200 fixed bottom-0 left-0 right-0 p-3 shadow-md z-50">
                    <div className="flex justify-around">
                        {/* Главная */}
                        <button className="flex flex-col items-center text-blue-600">
                            <FaHome className="text-xl"/>
                            <span className="text-xs mt-1">Главная</span>
                        </button>

                        {/* Магазин */}
                        <button className="flex flex-col items-center text-gray-500">
                            <FaStore className="text-xl"/>
                            <span className="text-xs mt-1">Магазин</span>
                        </button>

                        {/* Сообщества */}
                        <button className="flex flex-col items-center text-gray-500">
                            <FaUsers className="text-xl"/>
                            <span className="text-xs mt-1">Сообщества</span>
                        </button>
                    </div>
                </footer>
            </div>
        </div>
    )
}