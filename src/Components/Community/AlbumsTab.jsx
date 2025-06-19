import { motion } from "framer-motion";
import { FaImages, FaRegHeart, FaRegComment } from "react-icons/fa";

const AlbumsTab = ({ isMobile }) => {
    // Моковые данные альбомов
    const albums = [
        {
            id: 1,
            title: "Лучшие моменты",
            description: "Яркие события нашего сообщества",
            coverImage: "https://i.pinimg.com/originals/a3/c9/6b/a3c96be051dc86a4abb70ae70a8e70f7.jpg",
            photosCount: 42,
            likes: 128,
            comments: 24
        },
        {
            id: 2,
            title: "Мероприятия 2023",
            description: "Все встречи и ивенты этого года",
            coverImage: "https://i.pinimg.com/originals/5f/91/4f/5f914f96220fbf257a0a8b7e1a9e1a2f.jpg",
            photosCount: 36,
            likes: 89,
            comments: 15
        },
        {
            id: 3,
            title: "Мемы и приколы",
            description: "Смешные моменты и шутки",
            coverImage: "https://i.pinimg.com/originals/7a/2c/5f/7a2c5f4a8f1e1e1e1e1e1e1e1e1e1e1.jpg",
            photosCount: 57,
            likes: 256,
            comments: 42
        },
        {
            id: 4,
            title: "Архив",
            description: "Старые добрые времена",
            coverImage: "https://i.pinimg.com/originals/9e/1f/4a/9e1f4a8f1e1e1e1e1e1e1e1e1e1e1e1.jpg",
            photosCount: 124,
            likes: 312,
            comments: 28
        },
    ];

    return (
        <div className="p-4">
            {/* Заголовок секции */}
            <h2 className="text-xl font-bold mb-4 text-white">Альбомы сообщества</h2>

            {/* Список альбомов */}
            <div className="space-y-4">
                {albums.map(album => (
                    <motion.div
                        key={album.id}
                        className="bg-[#1e1b3a] rounded-xl overflow-hidden shadow-lg"
                        whileHover={{ y: -3 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        <div className="flex">
                            {/* Текстовая информация */}
                            <div className="flex-1 p-4">
                                <h3 className="font-bold text-white text-lg">{album.title}</h3>
                                <p className="text-gray-400 text-sm mt-1">{album.description}</p>

                                {/* Статистика */}
                                <div className="flex items-center mt-3 space-x-4 text-gray-400 text-sm">
                                    <div className="flex items-center">
                                        <FaImages className="mr-1" />
                                        <span>{album.photosCount}</span>
                                    </div>
                                    <div className="flex items-center">
                                        <FaRegHeart className="mr-1" />
                                        <span>{album.likes}</span>
                                    </div>
                                    <div className="flex items-center">
                                        <FaRegComment className="mr-1" />
                                        <span>{album.comments}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Обложка альбома */}
                            <div className={`${isMobile ? 'w-24' : 'w-32'} flex-shrink-0`}>
                                <img
                                    src={album.coverImage}
                                    alt={album.title}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Кнопка создания нового альбома (только для ПК) */}
            {!isMobile && (
                <motion.button
                    className="fixed bottom-24 right-6 bg-[#576ecb] text-white p-3 rounded-full shadow-lg"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                >
                    <FaImages className="text-xl" />
                </motion.button>
            )}
        </div>
    );
};

export default AlbumsTab;