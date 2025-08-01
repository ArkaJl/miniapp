import { useState } from 'react';
import {
    FaEdit, FaCheck, FaTimes, FaUserFriends,
    FaPhotoVideo, FaChartLine, FaRegBookmark,
    FaDiscord, FaTwitter, FaQrcode, FaUserTag,
    FaHeart, FaRegHeart, FaShare, FaRegComment, FaEllipsisH,
    FaArrowLeft, FaEye, FaSave, FaImage, FaPalette, FaFont
} from 'react-icons/fa';
import { GiCoins } from 'react-icons/gi';
import { motion, AnimatePresence } from 'framer-motion';
import { useDropzone } from 'react-dropzone';
import { HexColorPicker } from 'react-colorful';

// Варианты рамок для аватарки
const AVATAR_BORDERS = [
    { id: 'default', name: 'Стандартная', class: 'border-4 border-white' },
    { id: 'gold', name: 'Золотая', class: 'border-4 border-yellow-400' },
    { id: 'silver', name: 'Серебряная', class: 'border-4 border-gray-300' },
    { id: 'purple', name: 'Фиолетовая', class: 'border-4 border-purple-500' },
    { id: 'gradient', name: 'Градиент', class: 'border-4 border-gradient-to-r from-purple-500 to-pink-500' },
    { id: 'dotted', name: 'Точечная', class: 'border-4 border-dotted border-white' },
    { id: 'double', name: 'Двойная', class: 'border-4 border-double border-white' },
];

const ProfileEditor = ({ profileData, onBack, onSave }) => {
    // Значения по умолчанию
    const defaultProfile = {
        name: '',
        tag: '',
        status: '',
        banner: '',
        avatar: '',
        bannerColor: '#233e85',
        profileColor: '#1a1a2e',
        textColor: '#ffffff',
        avatarBorder: 'default',
        coins: 0,
        badges: [],
        socialLinks: {
            discord: '',
            twitter: ''
        },
        stats: {
            posts: 0,
            followers: 0,
            following: 0
        },
        interests: []
    };

    // Инициализация состояния
    const [profile, setProfile] = useState({
        ...defaultProfile,
        ...profileData,
        socialLinks: {
            ...defaultProfile.socialLinks,
            ...(profileData?.socialLinks || {})
        },
        stats: {
            ...defaultProfile.stats,
            ...(profileData?.stats || {})
        },
        interests: [...(profileData?.interests || [])]
    });

    const [previewVisible, setPreviewVisible] = useState(false);
    const [bannerFile, setBannerFile] = useState(null);
    const [avatarFile, setAvatarFile] = useState(null);
    const [colorPicker, setColorPicker] = useState({
        show: false,
        type: null,
        color: '#ffffff'
    });
    const [showSocialInput, setShowSocialInput] = useState({
        show: false,
        type: null
    });
    const [showBorderSelector, setShowBorderSelector] = useState(false);

    // Функции для работы с изображениями
    const readFileAsDataURL = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result);
            reader.onerror = reject;
            reader.readAsDataURL(file);
        });
    };

    const bannerDropzone = useDropzone({
        accept: {
            'image/*': ['.jpeg', '.jpg', '.png', '.webp']
        },
        onDrop: async (acceptedFiles) => {
            if (acceptedFiles.length > 0) {
                const dataUrl = await readFileAsDataURL(acceptedFiles[0]);
                setBannerFile({ file: acceptedFiles[0], dataUrl });
            }
        }
    });

    const avatarDropzone = useDropzone({
        accept: {
            'image/*': ['.jpeg', '.jpg', '.png', '.webp']
        },
        onDrop: async (acceptedFiles) => {
            if (acceptedFiles.length > 0) {
                const dataUrl = await readFileAsDataURL(acceptedFiles[0]);
                setAvatarFile({ file: acceptedFiles[0], dataUrl });
            }
        }
    });

    // Функции для работы с цветами
    const openColorPicker = (type) => {
        let currentColor;

        switch(type) {
            case 'banner':
                currentColor = profile.bannerColor || defaultProfile.bannerColor;
                break;
            case 'profile':
                currentColor = profile.profileColor || defaultProfile.profileColor;
                break;
            case 'text':
                currentColor = profile.textColor || defaultProfile.textColor;
                break;
            default:
                currentColor = '#ffffff';
        }

        setColorPicker({
            show: true,
            type,
            color: currentColor
        });
    };

    const handleColorChange = (color) => {
        if (colorPicker.type === 'banner') {
            setProfile({...profile, bannerColor: color});
        } else if (colorPicker.type === 'profile') {
            setProfile({...profile, profileColor: color});
        } else if (colorPicker.type === 'text') {
            setProfile({...profile, textColor: color});
        }
    };

    const closeColorPicker = () => {
        setColorPicker({ show: false, type: null, color: '#ffffff' });
    };

    // Обработчики изменений
    const handleChange = (e) => {
        const { name, value } = e.target;
        setProfile(prev => ({ ...prev, [name]: value }));
    };

    const handleSocialChange = (e) => {
        const { name, value } = e.target;
        setProfile(prev => ({
            ...prev,
            socialLinks: { ...prev.socialLinks, [name]: value }
        }));
    };

    const handleInterestChange = (index, value) => {
        const newInterests = [...profile.interests];
        newInterests[index] = value;
        setProfile(prev => ({ ...prev, interests: newInterests }));
    };

    const addInterest = () => {
        setProfile(prev => ({
            ...prev,
            interests: [...prev.interests, '']
        }));
    };

    const removeInterest = (index) => {
        setProfile(prev => ({
            ...prev,
            interests: prev.interests.filter((_, i) => i !== index)
        }));
    };

    const selectBorder = (borderId) => {
        setProfile(prev => ({ ...prev, avatarBorder: borderId }));
        setShowBorderSelector(false);
    };

    const handleSave = () => {
        const updatedProfile = {
            ...profile,
            banner: bannerFile?.dataUrl || profile.banner,
            avatar: avatarFile?.dataUrl || profile.avatar
        };
        onSave(updatedProfile);
    };

    // Получение класса для рамки аватарки
    const getBorderClass = (borderId) => {
        const border = AVATAR_BORDERS.find(b => b.id === borderId) || AVATAR_BORDERS[0];
        return border.class;
    };

    return (
        <div className="bg-[#14102a] min-h-screen pb-20">
            {/* Шапка редактора */}
            <div className="bg-[#14102a] text-white p-4 flex justify-between items-center sticky top-0 z-10">
                <button onClick={onBack} className="p-2">
                    <FaArrowLeft className="text-xl"/>
                </button>
                <h1 className="text-lg font-bold">Редактирование профиля</h1>
                <div className="w-8"></div>
            </div>

            {/* Основной контент */}
            <div className="p-4 space-y-6">
                {/* Баннер */}
                <div className="relative group">
                    <div
                        {...bannerDropzone.getRootProps()}
                        className="h-48 rounded-lg overflow-hidden cursor-pointer relative"
                        style={{
                            backgroundImage: bannerFile?.dataUrl ? `url(${bannerFile.dataUrl})` : profile.banner ? `url(${profile.banner})` : 'none',
                            backgroundColor: profile.bannerColor || defaultProfile.bannerColor,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center'
                        }}
                    >
                        <input {...bannerDropzone.getInputProps()} />
                        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all flex items-center justify-center">
                            <div className="opacity-70 group-hover:opacity-100 transition-all text-white flex flex-col items-center">
                                <FaImage className="text-2xl mb-1"/>
                                <span className="text-sm">Нажмите для загрузки баннера</span>
                            </div>
                        </div>
                    </div>
                    <div className="absolute top-2 right-2 flex space-x-2">
                        <button
                            onClick={() => openColorPicker('banner')}
                            className="p-2 bg-black bg-opacity-50 rounded-full text-white hover:bg-opacity-70"
                            title="Цвет баннера"
                        >
                            <FaPalette/>
                        </button>
                    </div>
                </div>

                {/* Аватар и рамка */}
                <div className="relative -mt-16 ml-4">
                    <div className="flex items-end space-x-4">
                        <div className="relative group">
                            <div
                                {...avatarDropzone.getRootProps()}
                                className={`w-32 h-32 rounded-full overflow-hidden cursor-pointer relative ${getBorderClass(profile.avatarBorder)}`}
                            >
                                <input {...avatarDropzone.getInputProps()} />
                                <img
                                    src={avatarFile?.dataUrl || profile.avatar || 'https://via.placeholder.com/150'}
                                    alt="Аватар"
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all flex items-center justify-center">
                                    <FaImage className="opacity-70 group-hover:opacity-100 transition-all text-white"/>
                                </div>
                            </div>
                            <button
                                onClick={() => setShowBorderSelector(!showBorderSelector)}
                                className="absolute -bottom-2 -right-2 p-2 bg-[#8e83e4] rounded-full text-white hover:bg-[#a45cd4] transition-colors"
                                title="Выбрать рамку"
                            >
                                <FaImage/>
                            </button>
                        </div>

                        {/* Выбор рамки */}
                        {showBorderSelector && (
                            <div className="absolute left-0 bottom-full mb-2 bg-white rounded-lg shadow-xl p-3 z-10 w-64">
                                <h4 className="font-bold mb-2">Выберите рамку</h4>
                                <div className="grid grid-cols-3 gap-2">
                                    {AVATAR_BORDERS.map(border => (
                                        <button
                                            key={border.id}
                                            onClick={() => selectBorder(border.id)}
                                            className={`h-12 rounded-full ${border.class} ${profile.avatarBorder === border.id ? 'ring-2 ring-blue-500' : ''}`}
                                            title={border.name}
                                        />
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Кнопки выбора цвета профиля и текста */}
                        <div className="flex space-x-2 mb-4">
                            <button
                                onClick={() => openColorPicker('profile')}
                                className="p-2 bg-[#1a1a2e] rounded-lg text-white hover:bg-[#2a2a3e] flex items-center"
                                title="Цвет профиля"
                            >
                                <FaPalette className="mr-1"/>
                                <span>Фон</span>
                            </button>
                            <button
                                onClick={() => openColorPicker('text')}
                                className="p-2 bg-[#1a1a2e] rounded-lg text-white hover:bg-[#2a2a3e] flex items-center"
                                title="Цвет текста"
                            >
                                <FaFont className="mr-1"/>
                                <span>Текст</span>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Основная информация */}
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-white/50 mb-1">Имя</label>
                        <input
                            type="text"
                            name="name"
                            value={profile.name || ''}
                            onChange={handleChange}
                            className="w-full p-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#8e83e4] focus:border-transparent"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-white/50 mb-1">Тег (без @)</label>
                        <div className="flex">
                            <span className="inline-flex items-center px-3 rounded-l-lg bg-white/20 text-white">
                                @
                            </span>
                            <input
                                type="text"
                                name="tag"
                                value={profile.tag ? profile.tag.replace('@', '') : ''}
                                onChange={handleChange}
                                className="w-full p-2 rounded-r-lg border border-gray-300 focus:ring-2 focus:ring-[#8e83e4] focus:border-transparent"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-white/50 mb-1">Статус</label>
                        <textarea
                            name="status"
                            value={profile.status || ''}
                            onChange={handleChange}
                            rows="2"
                            className="w-full p-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#8e83e4] focus:border-transparent"
                        />
                    </div>
                </div>

                {/* Социальные сети */}
                <div className="space-y-3">
                    <div className="flex justify-between items-center">
                        <h3 className="font-medium">Социальные сети</h3>
                        <button
                            onClick={() => setShowSocialInput({ show: true, type: 'add' })}
                            className="text-sm text-[#8e83e4] hover:text-[#a45cd4]"
                        >
                            Добавить
                        </button>
                    </div>

                    <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                            <FaDiscord className="text-[#576ecb]"/>
                            <span className="flex-1">{profile.socialLinks?.discord || 'Не указан'}</span>
                            <button
                                onClick={() => setShowSocialInput({ show: true, type: 'discord' })}
                                className="text-gray-500 hover:text-gray-700"
                            >
                                <FaEdit/>
                            </button>
                        </div>

                        <div className="flex items-center space-x-2">
                            <FaTwitter className="text-[#1DA1F2]"/>
                            <span className="flex-1">{profile.socialLinks?.twitter || 'Не указан'}</span>
                            <button
                                onClick={() => setShowSocialInput({ show: true, type: 'twitter' })}
                                className="text-gray-500 hover:text-gray-700"
                            >
                                <FaEdit/>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Интересы */}
                <div className="space-y-3">
                    <h3 className="font-medium">Интересы</h3>
                    <div className="space-y-2">
                        {profile.interests?.map((interest, index) => (
                            <div key={index} className="flex space-x-2">
                                <input
                                    type="text"
                                    value={interest || ''}
                                    onChange={(e) => handleInterestChange(index, e.target.value)}
                                    className="flex-1 p-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#8e83e4] focus:border-transparent"
                                />
                                <button
                                    onClick={() => removeInterest(index)}
                                    className="p-2 text-red-500 hover:text-red-700"
                                >
                                    <FaTimes/>
                                </button>
                            </div>
                        ))}
                    </div>
                    <button
                        onClick={addInterest}
                        className="text-sm text-[#8e83e4] hover:text-[#a45cd4] flex items-center"
                    >
                        + Добавить интерес
                    </button>
                </div>

                {/* Статистика */}
                <div className="space-y-3">
                    <h3 className="font-medium">Статистика</h3>
                    <div className="grid grid-cols-3 gap-2">
                        <div className="rounded-lg p-3 text-center shadow bg-white/20">
                            <div className="text-lg font-bold">{profile.stats?.posts || 0}</div>
                            <div className="text-xs text-white/70">Постов</div>
                        </div>
                        <div className="rounded-lg p-3 text-center shadow bg-white/20">
                            <div className="text-lg font-bold">{profile.stats?.followers || 0}</div>
                            <div className="text-xs text-white/70">Подписчиков</div>
                        </div>
                        <div className="rounded-lg p-3 text-center shadow bg-white/20">
                            <div className="text-lg font-bold">{profile.stats?.following || 0}</div>
                            <div className="text-xs text-white/70">Подписок</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Кнопки действий */}
            <div className="fixed bottom-0 left-0 right-0 bg-white p-4 border-t border-gray-200 flex justify-between">
                <button
                    onClick={() => setPreviewVisible(true)}
                    className="px-4 py-2 rounded-lg flex items-center space-x-2 bg-gray-200 text-gray-800 hover:bg-gray-300 transition-colors"
                >
                    <FaEye/> <span>Просмотр</span>
                </button>
                <button
                    onClick={handleSave}
                    className="px-4 py-2 rounded-lg flex items-center space-x-2 bg-[#8e83e4] text-white hover:bg-[#a45cd4] transition-colors"
                >
                    <FaSave/> <span>Сохранить</span>
                </button>
            </div>

            {/* Модальное окно для социальных сетей */}
            <AnimatePresence>
                {showSocialInput.show && (
                    <motion.div
                        initial={{opacity: 0}}
                        animate={{opacity: 1}}
                        exit={{opacity: 0}}
                        className="fixed inset-0 bg-black bg-opacity-70 z-50 flex items-center justify-center p-4"
                        onClick={() => setShowSocialInput({ show: false, type: null })}
                    >
                        <motion.div
                            initial={{scale: 0.9}}
                            animate={{scale: 1}}
                            exit={{scale: 0.9}}
                            className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <h3 className="text-lg font-bold mb-4">
                                {showSocialInput.type === 'discord' ? 'Discord' :
                                    showSocialInput.type === 'twitter' ? 'Twitter' :
                                        'Добавить социальную сеть'}
                            </h3>

                            {showSocialInput.type === 'add' ? (
                                <div className="space-y-2">
                                    <button
                                        onClick={() => setShowSocialInput({ show: true, type: 'discord' })}
                                        className="w-full py-2 px-4 bg-[#576ecb] text-white rounded hover:bg-[#475cb4] flex items-center space-x-2"
                                    >
                                        <FaDiscord/> <span>Добавить Discord</span>
                                    </button>
                                    <button
                                        onClick={() => setShowSocialInput({ show: true, type: 'twitter' })}
                                        className="w-full py-2 px-4 bg-[#1DA1F2] text-white rounded hover:bg-[#1a8cd8] flex items-center space-x-2"
                                    >
                                        <FaTwitter/> <span>Добавить Twitter</span>
                                    </button>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-black mb-1">
                                            {showSocialInput.type === 'discord' ? 'Discord username' : 'Twitter username'}
                                        </label>
                                        <input
                                            type="text"
                                            name={showSocialInput.type}
                                            value={profile.socialLinks?.[showSocialInput.type] || ''}
                                            onChange={handleSocialChange}
                                            placeholder={showSocialInput.type === 'discord' ? 'username#1234' : '@username'}
                                            className="w-full p-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#8e83e4] focus:border-transparent text-black"
                                        />
                                    </div>
                                    <div className="flex justify-end space-x-2">
                                        <button
                                            onClick={() => setShowSocialInput({ show: false, type: null })}
                                            className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
                                        >
                                            Отмена
                                        </button>
                                        <button
                                            onClick={() => setShowSocialInput({ show: false, type: null })}
                                            className="px-4 py-2 bg-[#8e83e4] text-white rounded hover:bg-[#a45cd4]"
                                        >
                                            Сохранить
                                        </button>
                                    </div>
                                </div>
                            )}
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Модальное окно выбора цвета */}
            <AnimatePresence>
                {colorPicker.show && (
                    <motion.div
                        initial={{opacity: 0}}
                        animate={{opacity: 1}}
                        exit={{opacity: 0}}
                        className="fixed inset-0 bg-black bg-opacity-70 z-50 flex items-center justify-center"
                        onClick={closeColorPicker}
                    >
                        <motion.div
                            initial={{scale: 0.9}}
                            animate={{scale: 1}}
                            exit={{scale: 0.9}}
                            className="bg-white p-6 rounded-lg shadow-xl"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <h3 className="text-lg font-bold mb-4">
                                Выберите цвет баннера
                            </h3>
                            <HexColorPicker
                                color={colorPicker.color}
                                onChange={handleColorChange}
                                style={{width: '250px', height: '200px'}}
                            />
                            <div className="mt-4 flex justify-between">
                                <div className="flex items-center">
                                    <div
                                        className="w-8 h-8 rounded-full border border-gray-300 mr-2"
                                        style={{ backgroundColor: profile.bannerColor || '#233e85' }}
                                    />
                                    <span>Цвет: {profile.bannerColor || '#233e85'}</span>
                                </div>
                                <button
                                    onClick={closeColorPicker}
                                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                                >
                                    Готово
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Предпросмотр профиля */}
            <AnimatePresence>
                {previewVisible && (
                    <motion.div
                        initial={{opacity: 0}}
                        animate={{opacity: 1}}
                        exit={{opacity: 0}}
                        className="fixed inset-0 bg-black bg-opacity-80 z-50 flex items-center justify-center p-4"
                        onClick={() => setPreviewVisible(false)}
                    >
                        <motion.div
                            initial={{scale: 0.9, y: 20}}
                            animate={{scale: 1, y: 0}}
                            exit={{scale: 0.9, y: 20}}
                            className="bg-white rounded-lg max-w-full max-h-[90vh] overflow-y-auto w-full max-w-2xl"
                            onClick={(e) => e.stopPropagation()}
                            style={{ backgroundColor: profile.profileColor || defaultProfile.profileColor }}
                        >
                            {/* Шапка профиля */}
                            <div className="relative h-64">
                                {/* Баннер */}
                                <div
                                    className="w-full h-full object-cover"
                                    style={{
                                        backgroundImage: bannerFile?.dataUrl ? `url(${bannerFile.dataUrl})` : profile.banner ? `url(${profile.banner})` : 'none',
                                        backgroundColor: profile.bannerColor || defaultProfile.bannerColor,
                                        backgroundSize: 'cover',
                                        backgroundPosition: 'center'
                                    }}
                                />

                                {/* Контейнер для аватара и информации */}
                                <div className="absolute bottom-0 left-0 right-0 flex items-end p-4 gap-4">
                                    {/* Аватар */}
                                    <div className="relative -mb-8">
                                        <div className={`w-32 h-32 rounded-full overflow-hidden shadow-xl ${getBorderClass(profile.avatarBorder)}`}>
                                            <img
                                                src={avatarFile?.dataUrl || profile.avatar || 'https://via.placeholder.com/150'}
                                                alt="Аватар"
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                    </div>

                                    {/* Блок с именем, тегом и монетами */}
                                    <div className="flex-1">
                                        <h1
                                            className="text-2xl font-bold drop-shadow-md"
                                            style={{ color: profile.textColor || defaultProfile.textColor }}
                                        >
                                            {profile.name || 'Имя пользователя'}
                                        </h1>
                                        <div className="flex items-center gap-2 mt-2 mb-4">
                                            <div
                                                className="px-3 py-1 rounded-full flex items-center shadow-md max-w-full"
                                                style={{ backgroundColor: profile.bannerColor || defaultProfile.bannerColor, color: profile.textColor || defaultProfile.textColor }}
                                            >
                                                <FaUserTag className="mr-1 flex-shrink-0"/>
                                                <span className="text-sm font-medium truncate">@{profile.tag ? profile.tag.replace('@', '') : 'username'}</span>
                                            </div>
                                        </div>
                                        <div
                                            className="flex items-center px-3 py-1 rounded-full shadow"
                                            style={{ backgroundColor: profile.bannerColor || defaultProfile.bannerColor, color: profile.textColor || defaultProfile.textColor }}
                                        >
                                            <GiCoins className="text-yellow-300 text-lg mr-1"/>
                                            <span className="font-medium">{profile.coins || 0} монет</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Основной контент */}
                            <div className="px-4 md:px-8 pt-16 max-w-4xl mx-auto">
                                {/* Статус */}
                                <div className="flex items-center justify-center mb-6">
                                    <p
                                        className="text-center"
                                        style={{ color: profile.textColor || defaultProfile.textColor }}
                                    >
                                        {profile.status || 'Статус не указан'}
                                    </p>
                                </div>

                                {/* Статистика */}
                                <div className="grid grid-cols-3 gap-2 mb-6">
                                    <div className="rounded-lg p-3 text-center shadow bg-white/20">
                                        <div className="text-lg font-bold"
                                             style={{ color: profile.textColor || defaultProfile.textColor }}
                                        >{profile.stats?.posts || 0}</div>
                                        <div className="text-xs text-white/70"
                                             style={{ color: profile.textColor || defaultProfile.textColor }}
                                        >Постов</div>
                                    </div>
                                    <div className="rounded-lg p-3 text-center shadow bg-white/20">
                                        <div className="text-lg font-bold"
                                             style={{ color: profile.textColor || defaultProfile.textColor }}
                                        >{profile.stats?.followers || 0}</div>
                                        <div className="text-xs text-white/70"
                                             style={{ color: profile.textColor || defaultProfile.textColor }}
                                        >Подписчиков</div>
                                    </div>
                                    <div className="rounded-lg p-3 text-center shadow bg-white/20">
                                        <div className="text-lg font-bold"
                                             style={{ color: profile.textColor || defaultProfile.textColor }}
                                        >{profile.stats?.following || 0}</div>
                                        <div className="text-xs text-white/70"
                                             style={{ color: profile.textColor || defaultProfile.textColor }}
                                        >Подписок</div>
                                    </div>
                                </div>

                                {/* Интересы */}
                                {profile.interests?.length > 0 && (
                                    <div className="mb-6">
                                        <h3 className="text-lg font-semibold mb-3">Интересы</h3>
                                        <div className="flex flex-wrap gap-2">
                                            {profile.interests.filter(i => i?.trim() !== '').map((interest, i) => (
                                                <span
                                                    key={i}
                                                    className="px-3 py-1 bg-white/20 rounded-full text-sm"
                                                    style={{ color: profile.textColor || defaultProfile.textColor }}
                                                >
                                                    {interest}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Социальные сети */}
                                {(profile.socialLinks?.discord || profile.socialLinks?.twitter) && (
                                    <div className="mb-6">
                                        <h3 className="text-lg font-semibold mb-3">Социальные сети</h3>
                                        <div className="space-y-2">
                                            {profile.socialLinks?.discord && (
                                                <div className="flex items-center space-x-2">
                                                    <FaDiscord className="text-[#576ecb]"/>
                                                    <span
                                                        style={{ color: profile.textColor || defaultProfile.textColor }}
                                                    >{profile.socialLinks.discord}</span>
                                                </div>
                                            )}
                                            {profile.socialLinks?.twitter && (
                                                <div className="flex items-center space-x-2">
                                                    <FaTwitter className="text-[#1DA1F2]"/>
                                                    <span
                                                        style={{ color: profile.textColor || defaultProfile.textColor }}
                                                    >{profile.socialLinks.twitter}</span>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                )}
                            </div>

                            <div className="p-4 border-t border-gray-200 flex justify-end">
                                <button
                                    onClick={() => setPreviewVisible(false)}
                                    className="px-4 py-2 bg-[#8e83e4] text-white rounded-lg hover:bg-[#a45cd4] transition-colors"
                                >
                                    Закрыть
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default ProfileEditor;