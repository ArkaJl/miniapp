import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaSave, FaTimes, FaPalette, FaImage, FaAlignLeft, FaUsers } from 'react-icons/fa';

// Фейковый API для работы с данными сообщества
const fakeApi = {
    getCommunityData: () => ({
        name: "Крутое сообщество",
        description: "Описание сообщества",
        avatar: "https://i.pinimg.com/originals/a3/c9/6b/a3c96be051dc86a4abb70ae70a8e70f7.jpg",
        background: "https://i.pinimg.com/originals/a3/c9/6b/a3c96be051dc86a4abb70ae70a8e70f7.jpg",
        primaryColor: "#8e83e4",
        textColor: "#ffffff",
        backgroundColor: "#14102a",
        members: 42,
        online: 5,
        coverData: {
            name: "Добро пожаловать!",
            description: "Присоединяйтесь к нашему сообществу",
            background1: "https://i.pinimg.com/originals/a3/c9/6b/a3c96be051dc86a4abb70ae70a8e70f7.jpg",
            tags: ["сообщество", "чат", "развлечения"]
        }
    }),
    saveCommunityData: (data) => {
        console.log("Данные сохранены (фейковый API):", data);
        return new Promise(resolve => setTimeout(() => resolve({ success: true }), 500));
    }
};

const CommunityEditor = ({ isOpen, onClose, isAdmin }) => {
    const [formData, setFormData] = useState(null);
    const [activeTab, setActiveTab] = useState('main');
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);

    // Загрузка данных при открытии
    useEffect(() => {
        if (isOpen) {
            setIsLoading(true);
            const data = fakeApi.getCommunityData();
            setFormData(data);
            setIsLoading(false);
        }
    }, [isOpen]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleCoverChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            coverData: { ...prev.coverData, [name]: value }
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSaving(true);
        try {
            await fakeApi.saveCommunityData(formData);
            onClose();
        } finally {
            setIsSaving(false);
        }
    };

    if (!isOpen || isLoading || !formData) return null;

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
        >
            <motion.div
                initial={{ y: 50 }}
                animate={{ y: 0 }}
                className="bg-[#1e1b3a] rounded-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto border border-[#8e83e4]"
            >
                {/* Заголовок */}
                <div className="sticky top-0 bg-[#2a2750] p-4 border-b border-[#8e83e4] flex justify-between items-center z-10">
                    <h2 className="text-xl font-bold">Редактор сообщества</h2>
                    <button onClick={onClose} className="text-gray-400 hover:text-white">
                        <FaTimes size={20} />
                    </button>
                </div>

                {/* Вкладки */}
                <div className="flex border-b border-[#8e83e4]">
                    {['main', 'appearance', 'cover'].map(tab => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`flex-1 py-3 flex items-center justify-center gap-2 ${
                                activeTab === tab
                                    ? 'text-[#8e83e4] border-b-2 border-[#8e83e4]'
                                    : 'text-gray-400'
                            }`}
                        >
                            {tab === 'main' && <FaAlignLeft />}
                            {tab === 'appearance' && <FaPalette />}
                            {tab === 'cover' && <FaImage />}
                            {tab === 'main' && 'Основное'}
                            {tab === 'appearance' && 'Внешний вид'}
                            {tab === 'cover' && 'Обложка'}
                        </button>
                    ))}
                </div>

                {/* Форма */}
                <form onSubmit={handleSubmit} className="p-4 space-y-6">
                    {/* Основные настройки */}
                    {activeTab === 'main' && (
                        <>
                            <div>
                                <label className="block mb-2 text-sm">Название сообщества</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="w-full bg-[#2a2750] border border-[#8e83e4]/50 rounded-lg px-3 py-2"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block mb-2 text-sm">Описание</label>
                                <textarea
                                    name="description"
                                    value={formData.description}
                                    onChange={handleChange}
                                    rows={4}
                                    className="w-full bg-[#2a2750] border border-[#8e83e4]/50 rounded-lg px-3 py-2"
                                />
                            </div>

                            <div>
                                <label className="block mb-2 text-sm">Аватар (URL)</label>
                                <input
                                    type="text"
                                    name="avatar"
                                    value={formData.avatar}
                                    onChange={handleChange}
                                    className="w-full bg-[#2a2750] border border-[#8e83e4]/50 rounded-lg px-3 py-2"
                                />
                                {formData.avatar && (
                                    <img
                                        src={formData.avatar}
                                        alt="Аватар"
                                        className="mt-2 w-16 h-16 rounded-full object-cover border border-[#8e83e4]"
                                    />
                                )}
                            </div>
                        </>
                    )}

                    {/* Внешний вид */}
                    {activeTab === 'appearance' && (
                        <>
                            <div>
                                <label className="block mb-2 text-sm">Основной цвет</label>
                                <div className="flex items-center gap-3">
                                    <input
                                        type="color"
                                        name="primaryColor"
                                        value={formData.primaryColor}
                                        onChange={handleChange}
                                        className="h-10 w-10 rounded cursor-pointer"
                                    />
                                    <span>{formData.primaryColor}</span>
                                </div>
                            </div>

                            <div>
                                <label className="block mb-2 text-sm">Цвет текста</label>
                                <div className="flex items-center gap-3">
                                    <input
                                        type="color"
                                        name="textColor"
                                        value={formData.textColor}
                                        onChange={handleChange}
                                        className="h-10 w-10 rounded cursor-pointer"
                                    />
                                    <span>{formData.textColor}</span>
                                </div>
                            </div>
                        </>
                    )}

                    {/* Настройки обложки */}
                    {activeTab === 'cover' && (
                        <>
                            <div>
                                <label className="block mb-2 text-sm">Заголовок обложки</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.coverData.name}
                                    onChange={handleCoverChange}
                                    className="w-full bg-[#2a2750] border border-[#8e83e4]/50 rounded-lg px-3 py-2"
                                />
                            </div>

                            <div>
                                <label className="block mb-2 text-sm">Описание обложки</label>
                                <textarea
                                    name="description"
                                    value={formData.coverData.description}
                                    onChange={handleCoverChange}
                                    rows={3}
                                    className="w-full bg-[#2a2750] border border-[#8e83e4]/50 rounded-lg px-3 py-2"
                                />
                            </div>

                            <div>
                                <label className="block mb-2 text-sm">Фон обложки (URL)</label>
                                <input
                                    type="text"
                                    name="background1"
                                    value={formData.coverData.background1}
                                    onChange={handleCoverChange}
                                    className="w-full bg-[#2a2750] border border-[#8e83e4]/50 rounded-lg px-3 py-2"
                                />
                                {formData.coverData.background1 && (
                                    <img
                                        src={formData.coverData.background1}
                                        alt="Фон обложки"
                                        className="mt-2 w-full h-32 object-cover rounded-lg border border-[#8e83e4]"
                                    />
                                )}
                            </div>
                        </>
                    )}

                    {/* Кнопки */}
                    <div className="flex justify-end gap-3 pt-4 border-t border-[#8e83e4]/50">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 bg-gray-600 rounded-lg"
                            disabled={isSaving}
                        >
                            Отмена
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-[#8e83e4] rounded-lg flex items-center gap-2"
                            disabled={isSaving}
                        >
                            {isSaving ? 'Сохранение...' : 'Сохранить'}
                            {!isSaving && <FaSave />}
                        </button>
                    </div>
                </form>
            </motion.div>
        </motion.div>
    );
};

export default CommunityEditor;