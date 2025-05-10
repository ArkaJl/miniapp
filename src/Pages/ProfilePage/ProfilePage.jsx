import { FaCog, FaMoon, FaSun, FaPalette, FaUserTag, FaEdit, FaCheck, FaImage, FaTimes } from 'react-icons/fa';
import { GiCoins } from 'react-icons/gi';
import { useState, useRef } from 'react';

const AvatarFrame = ({ frame, selected, onClick }) => {
    return (
        <div
            className={`relative w-20 h-20 mx-1 cursor-pointer flex-shrink-0 ${selected ? 'ring-2 ring-blue-500 rounded-full' : ''}`}
            onClick={onClick}
        >
            {frame.id === 0 ? (
                <div className="w-full h-full rounded-full overflow-hidden border-2 border-transparent">
                    <img
                        src="https://randomuser.me/api/portraits/women/44.jpg"
                        alt="Аватар"
                        className="w-full h-full object-cover"
                    />
                </div>
            ) : (
                <>
                    <svg viewBox="0 0 100 100" className="absolute inset-0">
                        <path
                            d={frame.path}
                            fill="none"
                            stroke={frame.color}
                            strokeWidth={frame.strokeWidth || 4}
                            strokeDasharray={frame.dashed ? "5,5" : "none"}
                        />
                    </svg>
                    <div className="absolute inset-3 rounded-full overflow-hidden">
                        <img
                            src="https://randomuser.me/api/portraits/women/44.jpg"
                            alt="Аватар"
                            className="w-full h-full object-cover"
                        />
                    </div>
                </>
            )}
        </div>
    );
};

export default function ProfilePage() {
    const [showThemeModal, setShowThemeModal] = useState(false);
    const [currentTheme, setCurrentTheme] = useState('light');
    const [coins, setCoins] = useState(150);
    const [isEditing, setIsEditing] = useState(false);
    const [name, setName] = useState('Анна Смирнова');
    const [username, setUsername] = useState('anna_smirnova');
    const [selectedFrame, setSelectedFrame] = useState(0);
    const avatarInputRef = useRef(null);
    const bgInputRef = useRef(null);
    const [avatar, setAvatar] = useState('https://randomuser.me/api/portraits/women/44.jpg');
    const [background, setBackground] = useState({
        type: 'gradient',
        value: 'from-purple-500 to-pink-600'
    });
    const [customBg, setCustomBg] = useState(null);

    const themes = [
        { id: 'light', name: 'Светлая', icon: <FaSun className="text-yellow-500 text-lg" /> },
        { id: 'dark', name: 'Темная', icon: <FaMoon className="text-indigo-500 text-lg" /> },
        { id: 'system', name: 'Системная', icon: <FaPalette className="text-blue-500 text-lg" /> }
    ];

    const frames = [
        { id: 0, name: 'Без рамки', path: '', color: 'transparent', price: 0 },
        { id: 1, name: 'Золотая', path: 'M20,20 L80,20 L80,80 L20,80 Z', color: 'gold', price: 100, strokeWidth: 6 },
        { id: 2, name: 'Серебряная', path: 'M15,15 Q50,5 85,15 Q95,50 85,85 Q50,95 15,85 Q5,50 15,15 Z', color: 'silver', price: 80 },
        { id: 3, name: 'Круглая', path: 'M50,10 A40,40 0 1,1 50,90 A40,40 0 1,1 50,10', color: '#EC4899', price: 70 },
        { id: 4, name: 'Звезда', path: 'M50,5 L61,35 L93,35 L68,55 L79,85 L50,70 L21,85 L32,55 L7,35 L39,35 Z', color: '#F59E0B', price: 120 },
    ];

    const presetBackgrounds = [
        { id: 1, name: 'Фиолетовый', class: 'from-purple-500 to-pink-600' },
        { id: 2, name: 'Синий', class: 'from-blue-500 to-teal-400' },
        { id: 3, name: 'Красный', class: 'from-red-500 to-orange-500' },
        { id: 4, name: 'Зелёный', class: 'from-green-500 to-emerald-400' },
    ];

    const changeTheme = (theme) => {
        setCurrentTheme(theme);
        setShowThemeModal(false);
    };

    const handleAvatarChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                setAvatar(event.target.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleBgChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                setCustomBg(event.target.result);
                setBackground({ type: 'custom', value: event.target.result });
            };
            reader.readAsDataURL(file);
        }
    };

    const removeCustomBg = () => {
        setCustomBg(null);
        setBackground({ type: 'gradient', value: 'from-purple-500 to-pink-600' });
    };

    const saveChanges = () => {
        setIsEditing(false);
        // Здесь можно добавить логику сохранения изменений
    };

    return (
        <div className={`min-h-screen ${currentTheme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'}`}>
            {/* Фон профиля с аватаром */}
            <div className={`relative h-64 ${background.type === 'gradient' ? `bg-gradient-to-r ${background.value}` : ''}`}>
                {background.type === 'custom' && (
                    <div
                        className="absolute inset-0 bg-cover bg-center"
                        style={{ backgroundImage: `url(${background.value})` }}
                    />
                )}

                {/* Аватар с рамкой - теперь внутри фона */}
                <div className="absolute bottom-10 left-1/4 transform -translate-x-1/2">
                    <div className="relative">
                        {selectedFrame > 0 ? (
                            <div className="relati  ve w-32 h-32">
                                <svg viewBox="0 0 100 100" className="absolute inset-0">
                                    <path
                                        d={frames[selectedFrame].path}
                                        fill="none"
                                        stroke={frames[selectedFrame].color}
                                        strokeWidth={frames[selectedFrame].strokeWidth || 4}
                                        strokeDasharray={frames[selectedFrame].dashed ? "5,5" : "none"}
                                    />
                                </svg>
                                <div className="absolute inset-4 rounded-full overflow-hidden border-4 border-white shadow-xl">
                                    <img
                                        src={avatar}
                                        alt="Аватар"
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            </div>
                        ) : (
                            <div className="w-32 h-32 rounded-full border-4 border-white overflow-hidden shadow-xl">
                                <img
                                    src={avatar}
                                    alt="Аватар"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        )}
                    </div>
                </div>

                {/* Кнопка редактирования */}
                <button
                    className={`absolute top-6 right-6 p-3 rounded-full ${isEditing ? 'bg-green-500 text-white' : 'bg-white bg-opacity-30 text-white'} transition-all z-10`}
                    onClick={isEditing ? saveChanges : () => setIsEditing(true)}
                >
                    {isEditing ? <FaCheck className="text-xl" /> : <FaEdit className="text-xl" />}
                </button>
            </div>

            {/* Контент профиля */}
            <div className="relative px-4 pt-16"> {/* Увеличили pt для отступа под аватар */}
                {/* Тег профиля */}
                <div className="flex justify-center mb-4">
                    <div className="bg-blue-500 text-white px-3 py-1 rounded-full flex items-center shadow-md max-w-full">
                        <FaUserTag className="mr-1 flex-shrink-0" />
                        <span className="text-sm font-medium truncate">@{username}</span>
                    </div>
                </div>

                {/* Редактирование профиля */}
                {isEditing && (
                    <div className={`mb-4 p-4 rounded-xl ${currentTheme === 'dark' ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
                        <h3 className="font-bold text-lg mb-3">Редактирование профиля</h3>

                        <div className="mb-4">
                            <label className="block text-sm font-medium mb-1">Имя</label>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className={`w-full p-2 rounded-lg border ${currentTheme === 'dark' ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'}`}
                                maxLength={30}
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block text-sm font-medium mb-1">Никнейм</label>
                            <input
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value.replace(/\s+/g, '_'))}
                                className={`w-full p-2 rounded-lg border ${currentTheme === 'dark' ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'}`}
                                maxLength={20}
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block text-sm font-medium mb-1">Аватар</label>
                            <button
                                onClick={() => avatarInputRef.current.click()}
                                className={`w-full p-2 rounded-lg border ${currentTheme === 'dark' ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'} flex items-center justify-center`}
                            >
                                <FaImage className="mr-2" />
                                Изменить аватар
                            </button>
                            <input
                                type="file"
                                ref={avatarInputRef}
                                onChange={handleAvatarChange}
                                accept="image/*"
                                className="hidden"
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block text-sm font-medium mb-1">Рамка аватара</label>
                            <div className="flex overflow-x-auto py-2 px-1 -mx-1">
                                {frames.map(frame => (
                                    <div key={frame.id} className="px-1">
                                        <AvatarFrame
                                            frame={frame}
                                            selected={selectedFrame === frame.id}
                                            onClick={() => setSelectedFrame(frame.id)}
                                        />
                                        <div className="text-xs text-center mt-1 truncate w-20">{frame.name}</div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="mb-4">
                            <label className="block text-sm font-medium mb-1">Фон профиля</label>
                            <div className="grid grid-cols-2 gap-2 mb-2">
                                {presetBackgrounds.map(bg => (
                                    <button
                                        key={bg.id}
                                        className={`h-16 rounded-lg bg-gradient-to-r ${bg.class} ${
                                            background.type === 'gradient' && background.value === bg.class ? 'ring-2 ring-blue-500' : ''
                                        }`}
                                        onClick={() => setBackground({ type: 'gradient', value: bg.class })}
                                    >
                                        <span className="text-xs text-white font-medium">{bg.name}</span>
                                    </button>
                                ))}
                            </div>

                            <button
                                onClick={() => bgInputRef.current.click()}
                                className={`w-full p-2 rounded-lg border ${currentTheme === 'dark' ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'} flex items-center justify-center`}
                            >
                                <FaImage className="mr-2" />
                                Загрузить свой фон
                            </button>
                            <input
                                type="file"
                                ref={bgInputRef}
                                onChange={handleBgChange}
                                accept="image/*"
                                className="hidden"
                            />

                            {background.type === 'custom' && (
                                <div className="mt-2 relative">
                                    <div
                                        className="h-16 rounded-lg bg-cover bg-center"
                                        style={{ backgroundImage: `url(${background.value})` }}
                                    />
                                    <button
                                        onClick={removeCustomBg}
                                        className="absolute top-1 right-1 bg-black bg-opacity-50 text-white p-1 rounded-full"
                                    >
                                        <FaTimes className="text-xs" />
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {/* Имя и монеты */}
                <div className={`${isEditing ? 'opacity-0 h-0' : ''}`}>
                    <h1 className="text-2xl font-bold text-center truncate px-4 mb-1">{name}</h1>
                    <div className="flex justify-center">
                        <div className={`flex items-center ${currentTheme === 'dark' ? 'bg-gray-700 text-blue-300' : 'bg-blue-100 text-blue-800'} px-4 py-1 rounded-full shadow`}>
                            <GiCoins className="text-yellow-500 text-lg mr-1" />
                            <span className="font-medium">{coins} монет</span>
                        </div>
                    </div>
                </div>

                {/* Статистика */}
                <div className={`grid grid-cols-3 gap-2 my-4 ${isEditing ? 'opacity-0 h-0' : ''}`}>
                    <div className={`rounded-lg p-3 text-center shadow ${currentTheme === 'dark' ? 'bg-gray-800' : 'bg-white bg-opacity-90'}`}>
                        <div className="text-lg font-bold">124</div>
                        <div className="text-xs opacity-80">Постов</div>
                    </div>
                    <div className={`rounded-lg p-3 text-center shadow ${currentTheme === 'dark' ? 'bg-gray-800' : 'bg-white bg-opacity-90'}`}>
                        <div className="text-lg font-bold">1.2K</div>
                        <div className="text-xs opacity-80">Подписчиков</div>
                    </div>
                    <div className={`rounded-lg p-3 text-center shadow ${currentTheme === 'dark' ? 'bg-gray-800' : 'bg-white bg-opacity-90'}`}>
                        <div className="text-lg font-bold">56</div>
                        <div className="text-xs opacity-80">Подписок</div>
                    </div>
                </div>

                {/* Настройки */}
                {!isEditing && (
                    <div className={`rounded-xl overflow-hidden shadow-lg mb-16 ${currentTheme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
                        <div className={`p-4 border-b ${currentTheme === 'dark' ? 'border-gray-700' : 'border-gray-200'} font-medium`}>
                            Настройки
                        </div>

                        <div className="divide-y divide-gray-200">
                            <button className="w-full text-left p-4 flex items-center justify-between">
                                <div>Уведомления</div>
                                <div className={`text-sm ${currentTheme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>Включены</div>
                            </button>
                            <button className="w-full text-left p-4 flex items-center justify-between">
                                <div>Конфиденциальность</div>
                                <div className={`text-sm ${currentTheme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>Только друзья</div>
                            </button>
                            <button
                                className="w-full text-left p-4 flex items-center justify-between"
                                onClick={() => setShowThemeModal(true)}
                            >
                                <div>Тема оформления</div>
                                <div className={`text-sm ${currentTheme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                                    {currentTheme === 'light' ? 'Светлая' : currentTheme === 'dark' ? 'Темная' : 'Системная'}
                                </div>
                            </button>
                        </div>
                    </div>
                )}
            </div>

            {/* Модальное окно выбора темы */}
            {showThemeModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className={`rounded-xl w-full max-w-md ${currentTheme === 'dark' ? 'bg-gray-800' : 'bg-white'} shadow-2xl`}>
                        <div className={`p-4 border-b ${currentTheme === 'dark' ? 'border-gray-700' : 'border-gray-200'} font-medium`}>
                            Выберите тему оформления
                        </div>

                        <div className="divide-y divide-gray-200">
                            {themes.map(theme => (
                                <button
                                    key={theme.id}
                                    className={`w-full text-left p-4 flex items-center ${currentTheme === theme.id ? (currentTheme === 'dark' ? 'bg-gray-700 text-blue-400' : 'bg-blue-50 text-blue-600') : ''}`}
                                    onClick={() => changeTheme(theme.id)}
                                >
                                    <div className="mr-3">{theme.icon}</div>
                                    <div>{theme.name}</div>
                                    {currentTheme === theme.id && (
                                        <div className="ml-auto text-blue-500">✓</div>
                                    )}
                                </button>
                            ))}
                        </div>

                        <div className={`p-4 flex justify-end border-t ${currentTheme === 'dark' ? 'border-gray-700' : 'border-gray-200'}`}>
                            <button
                                className={`px-4 py-2 rounded-lg ${currentTheme === 'dark' ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'}`}
                                onClick={() => setShowThemeModal(false)}
                            >
                                Закрыть
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}