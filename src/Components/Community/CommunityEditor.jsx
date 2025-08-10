// src/Components/Community/CommunityEditor.jsx
import { motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { FaTimes, FaSave, FaUndo } from "react-icons/fa";
import { ChromePicker } from "react-color";
import {HexColorPicker} from "react-colorful";

const CommunityEditor = ({ isOpen, onClose, initialData, onSave }) => {
    const [formData, setFormData] = useState(initialData);
    const [tempAvatar, setTempAvatar] = useState(null);
    const [tempBackground, setTempBackground] = useState(null);
    const fileInputAvatarRef = useRef(null);
    const fileInputBackgroundRef = useRef(null);

    // Сброс формы при открытии/закрытии
    useEffect(() => {
        if (isOpen) {
            setFormData(initialData);
            setTempAvatar(null);
            setTempBackground(null);
        }
    }, [isOpen, initialData]);

    const handleChange = (field, value) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleColorChange = (field) => (color) => {
        setFormData(prev => ({
            ...prev,
            [field]: color
        }));
    };

    const handleImageChange = (e, type) => {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (event) => {
            if (type === 'avatar') {
                setTempAvatar(event.target.result);
                handleChange('avatar', event.target.result);
            } else {
                setTempBackground(event.target.result);
                handleChange('background', event.target.result);
            }
        };
        reader.readAsDataURL(file);
    };

    const handleSubmit = () => {
        onSave(formData);
        onClose();
    };

    const handleReset = () => {
        setFormData(initialData);
        setTempAvatar(null);
        setTempBackground(null);
    };

    if (!isOpen) return null;

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={onClose}
        >
            <motion.div
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 50, opacity: 0 }}
                className="bg-[#1c1a3a] rounded-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="p-5 border-b border-[#35518e] sticky top-0 bg-[#1c1a3a] z-10">
                    <div className="flex justify-between items-center">
                        <h2 className="text-xl font-bold">Редактирование сообщества</h2>
                        <button
                            onClick={onClose}
                            className="text-gray-400 hover:text-white"
                        >
                            <FaTimes size={20} />
                        </button>
                    </div>
                </div>

                <div className="p-5 space-y-6">
                    {/* Предпросмотр */}
                    <div className="bg-[#14102a] p-4 rounded-lg border border-[#35518e]">
                        <h3 className="font-bold mb-2">Предпросмотр:</h3>

                        <div
                            className="h-32 rounded-lg relative overflow-hidden mb-4"
                            style={{ backgroundColor: formData.backgroundColor }}
                        >
                            {formData.background && (
                                <img
                                    src={formData.background}
                                    alt="Background"
                                    className="w-full h-full object-cover"
                                />
                            )}

                            <div className="absolute bottom-4 left-4 flex items-center">
                                <div
                                    className="w-16 h-16 rounded-full border-2 border-white overflow-hidden"
                                    style={{ backgroundColor: formData.primaryColor }}
                                >
                                    {formData.avatar && (
                                        <img
                                            src={formData.avatar}
                                            alt="Avatar"
                                            className="w-full h-full object-cover"
                                        />
                                    )}
                                </div>
                                <div className="ml-3">
                                    <h4
                                        className="font-bold text-white"
                                        style={{ color: formData.textColor }}
                                    >
                                        {formData.name}
                                    </h4>
                                    <div className="flex space-x-1 mt-1">
                                        <div
                                            className="w-2 h-2 rounded-full"
                                            style={{ backgroundColor: formData.footerColor }}
                                        />
                                        <div
                                            className="w-2 h-2 rounded-full"
                                            style={{ backgroundColor: formData.footerIconColor }}
                                        />
                                        <div
                                            className="w-2 h-2 rounded-full"
                                            style={{ backgroundColor: formData.primaryColor }}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Предпросмотр футера */}
                        <div
                            className="mt-4 p-3 rounded-lg flex justify-around"
                            style={{ backgroundColor: formData.footerColor }}
                        >
                            {['#fff', '#ddd', '#bbb'].map((color, i) => (
                                <div key={i} className="flex flex-col items-center">
                                    <div className="w-6 h-6 rounded-full" style={{ backgroundColor: formData.footerIconColor }} />
                                    <span
                                        className="text-xs mt-1"
                                        style={{ color: formData.footerIconColor }}
                                    >
                    {i === 0 ? 'Меню' : i === 1 ? 'Чат' : 'Профиль'}
                  </span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Основные настройки */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Название и описание */}
                        <div>
                            <label className="block text-sm font-medium mb-1">Название</label>
                            <input
                                type="text"
                                value={formData.name}
                                onChange={(e) => handleChange('name', e.target.value)}
                                className="w-full bg-[#252349] border border-[#35518e] rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-[#8e83e4]"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1">Описание</label>
                            <textarea
                                value={formData.description}
                                onChange={(e) => handleChange('description', e.target.value)}
                                className="w-full bg-[#252349] border border-[#35518e] rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-[#8e83e4]"
                                rows="2"
                            />
                        </div>
                    </div>

                    {/* Загрузка изображений */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium mb-1">Аватар</label>
                            <div className="flex items-center space-x-3">
                                <button
                                    onClick={() => fileInputAvatarRef.current.click()}
                                    className="bg-[#252349] border border-[#35518e] rounded-lg px-4 py-2"
                                >
                                    Выбрать
                                </button>
                                <input
                                    type="file"
                                    ref={fileInputAvatarRef}
                                    className="hidden"
                                    accept="image/*"
                                    onChange={(e) => handleImageChange(e, 'avatar')}
                                />
                                {tempAvatar && (
                                    <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-white">
                                        <img src={tempAvatar} alt="Avatar preview" className="w-full h-full object-cover" />
                                    </div>
                                )}
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1">Фоновое изображение</label>
                            <div className="flex items-center space-x-3">
                                <button
                                    onClick={() => fileInputBackgroundRef.current.click()}
                                    className="bg-[#252349] border border-[#35518e] rounded-lg px-4 py-2"
                                >
                                    Выбрать
                                </button>
                                <input
                                    type="file"
                                    ref={fileInputBackgroundRef}
                                    className="hidden"
                                    accept="image/*"
                                    onChange={(e) => handleImageChange(e, 'background')}
                                />
                                {tempBackground && (
                                    <div className="w-16 h-12 rounded-md overflow-hidden">
                                        <img src={tempBackground} alt="Background preview" className="w-full h-full object-cover" />
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Цветовые настройки */}
                    <div className="space-y-4">
                        <h3 className="font-bold">Цветовая схема:</h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium mb-1">Основной цвет</label>
                                <div className="flex items-center gap-3">
                                    <HexColorPicker
                                        color={formData.primaryColor}
                                        onChange={handleColorChange('primaryColor')}
                                        className="!w-full h-32"
                                    />
                                    <div
                                        className="w-10 h-10 rounded border border-gray-600"
                                        style={{backgroundColor: formData.primaryColor}}
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-1">Цвет текста</label>
                                <div className="flex items-center gap-3">
                                    <HexColorPicker
                                        color={formData.textColor}
                                        onChange={handleColorChange('textColor')}
                                        className="!w-full h-32"
                                    />
                                    <div
                                        className="w-10 h-10 rounded border border-gray-600"
                                        style={{backgroundColor: formData.textColor}}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium mb-1">Фон страницы</label>
                                <div className="flex items-center gap-3">
                                    <HexColorPicker
                                        color={formData.backgroundColor}
                                        onChange={handleColorChange('backgroundColor')}
                                        className="!w-full h-32"
                                    />
                                    <div
                                        className="w-10 h-10 rounded border border-gray-600"
                                        style={{backgroundColor: formData.backgroundColor}}
                                    />
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium mb-1">Фон футера</label>
                                    <div className="flex items-center gap-3">
                                        <HexColorPicker
                                            color={formData.footerColor}
                                            onChange={handleColorChange('footerColor')}
                                            className="!w-full h-32"
                                        />
                                        <div
                                            className="w-10 h-10 rounded border border-gray-600"
                                            style={{backgroundColor: formData.footerColor}}
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-1">Цвет иконок футера</label>
                                    <div className="flex items-center gap-3">
                                        <HexColorPicker
                                            color={formData.footerIconColor}
                                            onChange={handleColorChange('footerIconColor')}
                                            className="!w-full h-32"
                                        />
                                        <div
                                            className="w-10 h-10 rounded border border-gray-600"
                                            style={{backgroundColor: formData.footerIconColor}}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="p-5 border-t border-[#35518e] flex justify-between">
                    <button
                        onClick={handleReset}
                        className="flex items-center gap-2 bg-[#252349] hover:bg-[#2d2a56] px-4 py-2 rounded-lg transition-colors"
                    >
                        <FaUndo/> Сбросить
                    </button>
                    <button
                        onClick={handleSubmit}
                        className="flex items-center gap-2 bg-[#8e83e4] hover:bg-[#a45cd4] px-4 py-2 rounded-lg transition-colors"
                    >
                        <FaSave/> Сохранить изменения
                    </button>
                </div>
            </motion.div>
        </motion.div>
    );
};

export default CommunityEditor;