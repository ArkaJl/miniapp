import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const CommunityCover = ({
                            avatar = communityData.avatar,
                            background1 = communityData.coverData.background1,
                            name = communityData.coverData.name,
                            tags = communityData.coverData.tags,
                            description = communityData.coverData.description,
                            descriptionImages = [],
                            isAdmin,
                            onEdit
                        }) => {
    const navigate = useNavigate();

    return (
        <div className="relative max-w-4xl mx-auto rounded-2xl overflow-hidden shadow-2xl mt-12 md:mt-16 mb-18">
            {/* Первая секция с фоном */}
            <div
                style={{ backgroundImage: `url(${background1})` }}
                className="relative w-full h-56 md:h-72 bg-cover bg-center pt-16"
            >
                {isAdmin && (
                    <button
                        onClick={onEdit}
                        className="absolute top-4 right-16 z-20 bg-white/20 p-2 rounded-full"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                    </button>
                )}

                {/* Темный оверлей */}
                <div className="absolute inset-0 bg-black/50 flex items-end pb-8 md:items-center md:pb-0">
                    <div className="container mx-auto px-4 md:px-8">
                        {/* Аватар слева - теперь ниже */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5 }}
                            className="absolute top-8 left-4 md:left-8 w-16 h-16 md:w-20 md:h-20 rounded-full border-4 border-white overflow-hidden shadow-xl z-10"
                        >
                            <img src={avatar} alt={`${name} avatar`} className="w-full h-full object-cover" />
                        </motion.div>

                        {/* Кнопка "Назад" справа - теперь ниже */}
                        <motion.button
                            onClick={() => navigate(-1)}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                            className="absolute top-8 right-4 md:right-8 z-10 bg-white/30 backdrop-blur-sm rounded-full p-2 shadow-lg hover:bg-white/50 transition-all"
                            aria-label="Назад"
                        >
                            <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                            </svg>
                        </motion.button>

                        {/* Заголовок с отступами */}
                        <div className="ml-20 md:ml-28 pt-4 mr-14">
                            <motion.h1
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2, duration: 0.5 }}
                                className="text-2xl md:text-4xl font-bold text-white mb-3 break-words"
                            >
                                {name}
                            </motion.h1>
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="px-5 py-2 bg-emerald-500 text-white rounded-full text-sm md:text-base font-medium shadow-lg hover:bg-emerald-600 transition-all"
                            >
                                Вступить
                            </motion.button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Вторая секция с описанием */}
            <div className="bg-white p-4 md:p-8">
                <div className="container mx-auto">
                    {/* Теги */}
                    <div className="flex flex-wrap gap-2 mb-6">
                        {tags.map((tag, i) => (
                            <motion.span
                                key={i}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }}
                                className="inline-block px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-xs md:text-sm"
                            >
                                #{tag}
                            </motion.span>
                        ))}
                    </div>

                    {/* Описание */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className="prose max-w-none"
                    >
                        <p className="text-gray-700 mb-6">{description}</p>

                        {descriptionImages.map((img, i) => (
                            <img
                                key={i}
                                src={img}
                                alt=""
                                className="w-full h-auto rounded-lg shadow-md mb-6"
                            />
                        ))}
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default CommunityCover;