import {FaChevronRight, FaHome, FaSearch, FaStore, FaUsers} from "react-icons/fa";
import {GiCoins} from "react-icons/gi";
import {IoIosNotifications} from "react-icons/io";
import {Link} from "react-router-dom";
import "./style.css"

export default function MainPage() {
    return (
        <div className="app font-sans">
            <div className="bg-[#f5f7fa] background-img text-[#f4f8fe] flex flex-col min-h-screen">
                {/* Шапка (фиксированная) */}
                <header className="bg-[#14102a] text-white p-4 fixed top-0 left-0 right-0 z-50 shadow-md">
                    <div className="flex items-center justify-between">
                        {/* Поиск */}
                        <div className="relative flex-1 max-w-md mr-2">
                            <div className="relative">
                                <input
                                    type="text"
                                    placeholder="Поиск..."
                                    className="w-full py-2 px-4 pr-10 rounded-full bg-[#35518e] text-white placeholder-[#85b7ef] focus:outline-none focus:ring-2 focus:ring-[#8e83e4]"
                                />
                                <FaSearch className="absolute right-3 top-3 text-[#bbb2f0]"/>
                            </div>
                        </div>

                        {/* Иконки справа */}
                        <div className="flex items-center space-x-4">
                            {/* Монеты */}
                            <div className="flex items-center bg-[#233e85] px-2 py-1 rounded-full">
                                <GiCoins className="text-[#bbb2f0] text-xl mr-1"/>
                                <span className="text-sm font-medium">150</span>
                            </div>

                            {/* Уведомления */}
                            <div className="relative">
                                <div className="p-1 rounded-full hover:bg-[#35518e]">
                                    <IoIosNotifications className="text-xl"/>
                                    <span className="absolute -top-1 -right-1 bg-[#a45cd4] text-white text-xs font-bold rounded-full h-4 w-4 flex items-center justify-center">3</span>
                                </div>
                            </div>

                            {/* Аватар */}
                            <Link to="/profile">
                                <div className="w-8 h-8 rounded-full bg-[#233e85] overflow-hidden hover:scale-105 transition-transform">
                                    <img src="https://randomuser.me/api/portraits/women/44.jpg" alt="Аватар"
                                         className="w-full h-full object-cover"/>
                                </div>
                            </Link>
                        </div>
                    </div>
                </header>

                {/* Основной контент */}
                <main className="flex-1 mt-16 mb-16">
                    {/* Рекомендованные сообщества */}
                    <section className="p-4">
                        <h2 className="text-xl font-bold mb-3 text-[#1c2562]">Рекомендуем</h2>
                        <div className="flex space-x-3 overflow-x-auto pb-2">
                            {[
                                {name: "Гейминг", bg: "bg-[#85b7ef]", color: "text-[#262196]"},
                                {name: "Музыка", bg: "bg-[#bbb2f0]", color: "text-[#233e85]"},
                                {name: "Аниме", bg: "bg-[#8e83e4]", color: "text-[#1c2562]"},
                                {name: "Технологии", bg: "bg-[#a45cd4]", color: "text-white"}
                            ].map((item, index) => (
                                <div key={index} className="flex-shrink-0 w-24">
                                    <div className="bg-[#233e85] rounded-lg p-2 shadow-sm text-center hover:shadow-md hover:-translate-y-1 transition-all">
                                        <div className={`w-16 h-16 mx-auto rounded-full ${item.bg} overflow-hidden mb-1 flex items-center justify-center`}>
                                            <span className={`font-bold ${item.color}`}>{item.name[0]}</span>
                                        </div>
                                        <p className="text-xs font-medium truncate">{item.name}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Баннер с ивентом */}
                    <section className="px-4 mb-4">
                        <div className="bg-gradient-to-r from-[#233e85] to-[#a45cd4] rounded-xl p-4 text-white shadow-md">
                            <h3 className="font-bold text-lg mb-1">Текущий ивент</h3>
                            <p className="text-sm mb-2">Собери 1000 монет и получи эксклюзивный бейдж!</p>
                            <div className="w-full bg-[#233e85] bg-opacity-30 rounded-full h-2 mb-2">
                                <div className="bg-[#bbb2f0] h-2 rounded-full" style={{width: '45%'}}></div>
                            </div>
                            <p className="text-xs">450/1000 монет собрано</p>
                        </div>
                    </section>

                    {/* Мои сообщества */}
                    <section className="p-4">
                        <h2 className="text-xl font-bold mb-3 text-[#bcd8f6]">Мои сообщества</h2>
                        <div className="bg-[#233e85] rounded-xl shadow-sm overflow-hidden">
                            {[
                                {name: "Кодинг", members: "12.5K", bg: "bg-[#85b7ef]"},
                                {name: "Дизайн", members: "8.2K", bg: "bg-[#576ecb]"},
                                {name: "Фитнес", members: "5.7K", bg: "bg-[#262196]"}
                            ].map((item, index) => (
                                <div key={index} className="flex items-center p-3 border-b border-[#85b7ef] hover:bg-[#35518e] transition-colors">
                                    <div className={`w-10 h-10 rounded-full ${item.bg} mr-3 overflow-hidden flex items-center justify-center text-white`}>
                                        {item.name[0]}
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="font-medium">{item.name}</h3>
                                        <p className="text-xs text-[#978ce6]">{item.members} участников</p>
                                    </div>
                                    <FaChevronRight className="text-[#8e83e4]"/>
                                </div>
                            ))}
                        </div>
                    </section>
                </main>

                {/* Подвал */}
                <footer className="bg-[#233e85] border-t border-[#85b7ef] fixed bottom-0 left-0 right-0 p-3 shadow-md z-50">
                    <div className="flex justify-around">
                        {[
                            {icon: <FaHome className="text-xl"/>, name: "Главная", active: true},
                            {icon: <FaStore className="text-xl"/>, name: "Магазин"},
                            {icon: <FaUsers className="text-xl"/>, name: "Сообщества"}
                        ].map((item, index) => (
                            <button key={index} className={`flex flex-col items-center ${item.active ? 'text-[#bcd8f6]' : 'text-[#8e83e4]'}`}>
                                {item.icon}
                                <span className="text-xs mt-1">{item.name}</span>
                                {item.active && <div className="w-1 h-1 rounded-full bg-[#576ecb] mt-1"></div>}
                            </button>
                        ))}
                    </div>
                </footer>
            </div>
        </div>
    )
}