import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaSearch, FaTimes, FaChevronRight, FaUsers, FaUserTag } from "react-icons/fa";

const SearchPanel = ({
                         isOpen,
                         onClose,
                         searchQuery,
                         onSearchQueryChange,
                         activeTab,
                         onActiveTabChange,
                         communities,
                         people,
                         loading
                     }) => {
    const inputRef = useRef(null);

    useEffect(() => {
        if (isOpen) {
            inputRef.current?.focus();
        }
    }, [isOpen]);

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ type: "spring", damping: 25, stiffness: 300 }}
                    className="fixed inset-0 bg-[#14102a] z-50 pt-16 overflow-y-auto"
                >
                    {/* Шапка поиска */}
                    <motion.div
                        className="bg-[#14102a] p-4 sticky top-0"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.1 }}
                    >
                        <div className="relative flex items-center">
                            <motion.button
                                onClick={onClose}
                                className="absolute left-3 text-[#bbb2f0] hover:text-white transition-colors"
                                whileTap={{ scale: 0.9 }}
                            >
                                <FaTimes className="text-xl" />
                            </motion.button>
                            <motion.input
                                ref={inputRef}
                                type="text"
                                placeholder="Поиск..."
                                className="w-full py-2 px-10 rounded-full bg-[#35518e] text-white placeholder-[#85b7ef] focus:outline-none focus:ring-2 focus:ring-[#8e83e4]"
                                value={searchQuery}
                                onChange={(e) => onSearchQueryChange(e.target.value)}
                                initial={{ scale: 0.95 }}
                                animate={{ scale: 1 }}
                                transition={{ type: "spring", stiffness: 300 }}
                            />
                            <FaSearch className="absolute right-3 top-3 text-[#bbb2f0]" />
                        </div>

                        {/* Табы */}
                        <motion.div
                            className="flex mt-4 border-b border-[#233e85]"
                            initial={{ y: -10 }}
                            animate={{ y: 0 }}
                            transition={{ delay: 0.2 }}
                        >
                            <motion.button
                                whileHover={{ scale: 1.03 }}
                                whileTap={{ scale: 0.97 }}
                                className={`flex-1 py-2 font-medium flex items-center justify-center gap-2 ${activeTab === "communities" ? "text-[#bbb2f0] border-b-2 border-[#8e83e4]" : "text-[#576ecb]"}`}
                                onClick={() => onActiveTabChange("communities")}
                            >
                                <FaUsers /> Сообщества
                            </motion.button>
                            <motion.button
                                whileHover={{ scale: 1.03 }}
                                whileTap={{ scale: 0.97 }}
                                className={`flex-1 py-2 font-medium flex items-center justify-center gap-2 ${activeTab === "people" ? "text-[#bbb2f0] border-b-2 border-[#8e83e4]" : "text-[#576ecb]"}`}
                                onClick={() => onActiveTabChange("people")}
                            >
                                <FaUserTag /> Люди
                            </motion.button>
                        </motion.div>
                    </motion.div>

                    {/* Результаты */}
                    <motion.div
                        className="p-4"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                    >
                        {searchQuery ? (
                            <>
                                {activeTab === "communities" && (
                                    <motion.div layout>
                                        {loading ? (
                                            <motion.p
                                                className="text-center py-4 text-[#bbb2f0]"
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                            >
                                                Загрузка...
                                            </motion.p>
                                        ) : communities.length > 0 ? (
                                            communities.map(item => (
                                                <motion.div
                                                    key={item.id}
                                                    layout
                                                    initial={{ opacity: 0, y: 10 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    exit={{ opacity: 0 }}
                                                    className="flex items-center p-3 bg-[#233e85] rounded-lg mb-2 hover:bg-[#35518e] transition-colors"
                                                    whileHover={{ scale: 1.01 }}
                                                    whileTap={{ scale: 0.98 }}
                                                >
                                                    <div className="w-10 h-10 rounded-full bg-[#8e83e4] mr-3 overflow-hidden flex items-center justify-center">
                                                        {item.avatar_url ? (
                                                            <img
                                                                src={item.avatar_url}
                                                                alt={item.name}
                                                                className="w-full h-full object-cover"
                                                            />
                                                        ) : (
                                                            <span className="text-white font-bold">
                                {item.name?.[0]?.toUpperCase() || 'C'}
                              </span>
                                                        )}
                                                    </div>
                                                    <div className="flex-1">
                                                        <h4 className="font-medium">{item.name}</h4>
                                                        <p className="text-xs text-[#978ce6]">
                                                            {item.member_count} участников
                                                        </p>
                                                    </div>
                                                    <FaChevronRight className="text-[#8e83e4]" />
                                                </motion.div>
                                            ))
                                        ) : (
                                            <motion.p
                                                className="text-center py-4 text-[#bbb2f0]"
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                            >
                                                Сообщества не найдены
                                            </motion.p>
                                        )}
                                    </motion.div>
                                )}

                                {activeTab === "people" && (
                                    <motion.div layout>
                                        {loading ? (
                                            <motion.p
                                                className="text-center py-4 text-[#bbb2f0]"
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                            >
                                                Загрузка...
                                            </motion.p>
                                        ) : people.length > 0 ? (
                                            people.map(item => (
                                                <motion.div
                                                    key={item.id}
                                                    layout
                                                    initial={{ opacity: 0, y: 10 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    exit={{ opacity: 0 }}
                                                    className="flex items-center p-3 bg-[#233e85] rounded-lg mb-2 hover:bg-[#35518e] transition-colors"
                                                    whileHover={{ scale: 1.01 }}
                                                    whileTap={{ scale: 0.98 }}
                                                >
                                                    <div className="w-10 h-10 rounded-full bg-[#a45cd4] mr-3 overflow-hidden flex items-center justify-center">
                                                        {item.avatar_url ? (
                                                            <img
                                                                src={item.avatar_url}
                                                                alt={item.username}
                                                                className="w-full h-full object-cover"
                                                            />
                                                        ) : (
                                                            <span className="text-white font-bold">
                                {item.username?.[0]?.toUpperCase() || 'U'}
                              </span>
                                                        )}
                                                    </div>
                                                    <div className="flex-1">
                                                        <h4 className="font-medium">{item.username}</h4>
                                                        <p className="text-xs text-[#978ce6]">
                                                            {item.status || "Статус не указан"}
                                                        </p>
                                                    </div>
                                                    <FaChevronRight className="text-[#8e83e4]" />
                                                </motion.div>
                                            ))
                                        ) : (
                                            <motion.p
                                                className="text-center py-4 text-[#bbb2f0]"
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                            >
                                                Люди не найдены
                                            </motion.p>
                                        )}
                                    </motion.div>
                                )}
                            </>
                        ) : (
                            <motion.div
                                className="text-center py-10 text-[#bbb2f0]"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.4 }}
                            >
                                <p>Введите запрос для поиска</p>
                                <p className="text-sm mt-2 text-[#576ecb]">Или выберите категорию выше</p>
                            </motion.div>
                        )}
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default SearchPanel;