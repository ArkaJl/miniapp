// src/Components/Community/CommunityCoverEditor.jsx
import { motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { FaTimes, FaSave, FaUndo, FaTrash, FaPlus } from "react-icons/fa";

const CommunityCoverEditor = ({ isOpen, onClose, initialData, onSave }) => {
    const [formData, setFormData] = useState(initialData);
    const [tempAvatar, setTempAvatar] = useState(null);
    const [tempBackground, setTempBackground] = useState(null);
    const [newTag, setNewTag] = useState('');
    const [newImage, setNewImage] = useState('');
    const fileInputAvatarRef = useRef(null);
    const fileInputBackgroundRef = useRef(null);
    const fileInputGalleryRef = useRef(null);

    // Сброс формы при открытии/закрытии
    useEffect(() => {
        if (isOpen) {
            setFormData(initialData);
            setTempAvatar(null);
            setTempBackground(null);
            setNewTag('');
            setNewImage('');
        }
    }, [isOpen, initialData]);

    const handleChange = (field, value) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleCoverDataChange = (field, value) => {
        setFormData(prev => ({
            ...prev,
            coverData: {
                ...prev.coverData,
                [field]: value
            }
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
            } else if (type === 'background') {
                setTempBackground(event.target.result);
                handleCoverDataChange('background1', event.target.result);
            } else if (type === 'gallery') {
                // Добавляем новое изображение в галерею
                handleCoverDataChange('descriptionImages', [
                    ...formData.coverData.descriptionImages,
                    event.target.result
                ]);
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

    const addTag = () => {
        if (newTag.trim() !== '') {
            handleCoverDataChange('tags', [
                ...formData.coverData.tags,
                newTag.trim()
            ]);
            setNewTag('');
        }
    };

    const removeTag = (index) => {
        const newTags = [...formData.coverData.tags];
        newTags.splice(index, 1);
        handleCoverDataChange('tags', newTags);
    };

    const removeImage = (index) => {
        const newImages = [...formData.coverData.descriptionImages];
        newImages.splice(index, 1);
        handleCoverDataChange('descriptionImages', newImages);
    };

    const handleTagKeyPress = (e) => {
        if (e.key === 'Enter') {
            addTag();
        }
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
                className="bg-[#1c1a3a] rounded-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="p-5 border-b border-[#35518e] sticky top-0 bg-[#1c1a3a] z-10">
                    <div className="flex justify-between items-center">
                        <h2 className="text-xl font-bold">Редактирование обложки сообщества</h2>
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
                        <div className="relative max-w-4xl mx-auto rounded-2xl overflow-hidden shadow-2xl">
                            {/* Фон */}
                            <div
                                style={{ backgroundImage: `url(${formData.coverData.background1})` }}
                                className="relative w-full h-40 bg-cover bg-center pt-16"
                            >
                                <div className="absolute inset-0 bg-black/50 flex items-end pb-8">
                                    <div className="container mx-auto px-4 md:px-8">
                                        {/* Аватар */}
                                        <div className="absolute top-8 left-8 w-16 h-16 rounded-full border-4 border-white overflow-hidden shadow-xl z-10">
                                            <img src={formData.avatar} alt="Avatar" className="w-full h-full object-cover" />
                                        </div>
                                        {/* Название */}
                                        <div className="ml-28 pt-4">
                                            <h1 className="text-xl font-bold text-white mb-3 break-words">
                                                {formData.coverData.name}
                                            </h1>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Теги и описание (упрощенно) */}
                            <div className="bg-white p-4">
                                <div className="flex flex-wrap gap-2 mb-4">
                                    {formData.coverData.tags.map((tag, i) => (
                                        <span key={i} className="inline-block px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-xs">
                                            #{tag}
                                        </span>
                                    ))}
                                </div>
                                <p className="text-gray-700 mb-4">{formData.coverData.description}</p>
                                <div className="grid grid-cols-3 gap-2">
                                    {formData.coverData.descriptionImages.slice(0, 3).map((img, i) => (
                                        <img key={i} src={img} alt="" className="w-full h-16 object-cover rounded" />
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Основные настройки */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Аватар */}
                        <div>
                            <label className="block text-sm font-medium mb-1">Аватар сообщества</label>
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

                        {/* Фоновое изображение */}
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

                    {/* описание */}

                    <div>
                        <label className="block text-sm font-medium mb-1">Описание</label>
                        <textarea
                            value={formData.coverData.description}
                            onChange={(e) => handleCoverDataChange('description', e.target.value)}
                            className="w-full bg-[#252349] border border-[#35518e] rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-[#8e83e4]"
                            rows="3"
                        />
                    </div>

                    {/* Теги */}
                    <div>
                        <label className="block text-sm font-medium mb-1">Теги</label>
                        <div className="flex flex-wrap gap-2 mb-2">
                            {formData.coverData.tags.map((tag, index) => (
                                <div key={index} className="flex items-center bg-[#35518e] px-3 py-1 rounded-full">
                                    <span className="text-sm">#{tag}</span>
                                    <button
                                        onClick={() => removeTag(index)}
                                        className="ml-2 text-xs text-red-400 hover:text-red-300"
                                    >
                                        <FaTrash />
                                    </button>
                                </div>
                            ))}
                        </div>
                        <div className="flex gap-2">
                            <input
                                type="text"
                                value={newTag}
                                onChange={(e) => setNewTag(e.target.value)}
                                onKeyPress={handleTagKeyPress}
                                placeholder="Добавить тег"
                                className="flex-1 bg-[#252349] border border-[#35518e] rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-[#8e83e4]"
                            />
                            <button
                                onClick={addTag}
                                className="bg-[#8e83e4] hover:bg-[#a45cd4] px-4 py-2 rounded-lg transition-colors"
                            >
                                <FaPlus />
                            </button>
                        </div>
                    </div>

                    {/* Галерея изображений */}
                    <div>
                        <label className="block text-sm font-medium mb-1">Галерея изображений</label>
                        <div className="grid grid-cols-3 gap-3 mb-3">
                            {formData.coverData.descriptionImages.map((img, index) => (
                                <div key={index} className="relative group">
                                    <img src={img} alt="" className="w-full h-24 object-cover rounded-lg" />
                                    <button
                                        onClick={() => removeImage(index)}
                                        className="absolute top-1 right-1 bg-black/50 rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                                    >
                                        <FaTrash className="text-red-400" />
                                    </button>
                                </div>
                            ))}
                        </div>
                        <div className="flex gap-2">
                            <button
                                onClick={() => fileInputGalleryRef.current.click()}
                                className="bg-[#252349] border border-[#35518e] rounded-lg px-4 py-2"
                            >
                                Добавить изображение
                            </button>
                            <input
                                type="file"
                                ref={fileInputGalleryRef}
                                className="hidden"
                                accept="image/*"
                                onChange={(e) => handleImageChange(e, 'gallery')}
                            />
                        </div>
                    </div>
                </div>

                <div className="p-5 border-t border-[#35518e] flex justify-between">
                    <button
                        onClick={handleReset}
                        className="flex items-center gap-2 bg-[#252349] hover:bg-[#2d2a56] px-4 py-2 rounded-lg transition-colors"
                    >
                        <FaUndo /> Сбросить
                    </button>
                    <button
                        onClick={handleSubmit}
                        className="flex items-center gap-2 bg-[#8e83e4] hover:bg-[#a45cd4] px-4 py-2 rounded-lg transition-colors"
                    >
                        <FaSave /> Сохранить изменения
                    </button>
                </div>
            </motion.div>
        </motion.div>
    );
};

export default CommunityCoverEditor;