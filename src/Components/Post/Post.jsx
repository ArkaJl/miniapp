import { motion } from 'framer-motion';
import { FaHeart, FaRegHeart, FaShare, FaRegComment, FaEllipsisH } from 'react-icons/fa';
import {useState} from "react";

const Post = ({
                  id,
                  authorAvatar,
                  authorName,
                  title,
                  image,
                  likesCount,
                  sharesCount,
                  commentsCount,
                  date,
                  onLike,
                  onPostClick
              }) => {
    const [isLiked, setIsLiked] = useState(false);
    const [currentLikes, setCurrentLikes] = useState(likesCount);

    const handleLike = (e) => {
        e.stopPropagation();
        if (isLiked) {
            setCurrentLikes(currentLikes - 1);
        } else {
            setCurrentLikes(currentLikes + 1);
        }
        setIsLiked(!isLiked);
        if (onLike) onLike(id, !isLiked);
    };

    return (
        <motion.div
            className="bg-gradient-to-r from-[#233e85] to-[#8e83e4] rounded-xl overflow-hidden shadow-lg mb-6 cursor-pointer"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => onPostClick(id)}
        >
            {/* Шапка поста */}
            <div className="p-4 flex items-start justify-between">
                <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-[#8e83e4] overflow-hidden mr-3">
                        <img
                            src={authorAvatar}
                            alt={authorName}
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <div>
                        <h3 className="font-bold text-white">{authorName}</h3>
                        <p className="text-xs text-[#bbb2f0]">{date}</p>
                    </div>
                </div>
                <button
                    className="text-[#bbb2f0] hover:text-white"
                    onClick={(e) => e.stopPropagation()}
                >
                    <FaEllipsisH />
                </button>
            </div>

            {/* Заголовок */}
            <div className="px-4 pb-3">
                <h2 className="text-xl font-bold text-white">{title}</h2>
            </div>

            {/* Изображение */}
            {image && (
                <div className="w-full aspect-square bg-[#14102a] overflow-hidden">
                    <img
                        src={image}
                        alt={title}
                        className="w-full h-full object-cover"
                    />
                </div>
            )}

            {/* Действия */}
            <div
                className="p-4"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex justify-between items-center text-[#bbb2f0]">
                    <div className="flex items-center space-x-4">
                        <button
                            onClick={handleLike}
                            className="flex items-center space-x-1 hover:text-[#a45cd4] transition-colors"
                        >
                            {isLiked ? (
                                <FaHeart className="text-[#a45cd4]" />
                            ) : (
                                <FaRegHeart />
                            )}
                            <span>{currentLikes}</span>
                        </button>
                        <button className="flex items-center space-x-1 hover:text-[#85b7ef] transition-colors">
                            <FaRegComment />
                            <span>{commentsCount}</span>
                        </button>
                    </div>
                    <button className="hover:text-[#8e83e4] transition-colors">
                        <FaShare />
                        <span className="ml-1">{sharesCount}</span>
                    </button>
                </div>
            </div>
        </motion.div>
    );
};

export default Post;