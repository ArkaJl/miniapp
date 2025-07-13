// components/PostView.jsx
import { useState, useRef, useEffect } from 'react';
import {
    FaHeart, FaRegHeart, FaComment, FaShare, FaBookmark,
    FaRegBookmark, FaEllipsisH, FaClock, FaUser, FaTag,
    FaPaperPlane, FaTimes
} from 'react-icons/fa';
import { motion } from 'framer-motion';

const PostView = ({ post, onClose = null, isFullPage = false }) => {
    const [isLiked, setIsLiked] = useState(false);
    const [isBookmarked, setIsBookmarked] = useState(false);
    const [currentImage, setCurrentImage] = useState(null);
    const [comments, setComments] = useState(post.comments || []);
    const [newComment, setNewComment] = useState('');
    const [showComments, setShowComments] = useState(false);
    const commentsEndRef = useRef(null);

    // Генерация моковых комментариев, если их нет
    useEffect(() => {
        if (!post.comments || post.comments.length === 0) {
            setComments([
                {
                    id: 'comment_1',
                    author: {
                        id: 'user_2',
                        name: 'Мария Иванова',
                        avatar: 'https://i.pravatar.cc/150?img=32'
                    },
                    text: 'Отличный пост! Очень интересно!',
                    createdAt: new Date(Date.now() - 3600000 * 3).toISOString()
                },
                {
                    id: 'comment_2',
                    author: {
                        id: 'user_3',
                        name: 'Алексей Петров',
                        avatar: 'https://i.pravatar.cc/150?img=45'
                    },
                    text: 'Где ты сделал это фото?',
                    createdAt: new Date(Date.now() - 3600000 * 1).toISOString()
                }
            ]);
        }
    }, [post.comments]);

    // Прокрутка к новому комментарию
    useEffect(() => {
        if (showComments && commentsEndRef.current) {
            commentsEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [comments, showComments]);

    useEffect(() => {
        // Добавляем глобальную функцию для обработки кликов по изображениям
        window.handleImageClick = (event, imageId) => {
            event.stopPropagation();
            const image = post.images?.find(img => img.id === imageId);
            if (image) {
                setCurrentImage(image);
            }
        };

        return () => {
            // Убираем глобальную функцию при размонтировании
            delete window.handleImageClick;
        };
    }, [post.images]);

    // Обработчики взаимодействий
    const handleLike = () => setIsLiked(!isLiked);
    const handleBookmark = () => setIsBookmarked(!isBookmarked);

    const handleAddComment = (e) => {
        e.preventDefault();
        if (!newComment.trim()) return;

        const comment = {
            id: Date.now().toString(),
            author: {
                id: 'current_user',
                name: 'Вы',
                avatar: null
            },
            text: newComment,
            createdAt: new Date().toISOString()
        };

        setComments([...comments, comment]);
        setNewComment('');
    };

    const toggleComments = () => {
        setShowComments(!showComments);
    };

    // Форматирование даты
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleString('ru-RU', {
            day: 'numeric',
            month: 'long',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    // Рендер контента с поддержкой всех тегов
    const renderContent = () => {
        if (!post.content) return { __html: '' };

        let html = post.content.split('\n').map(p => `<p>${p || '&nbsp;'}</p>`).join('');

// Обработка изображений
        html = html.replace(/\[IMG\]\{\{(.*?)\}\}/g, (match, id) => {
            const image = post.images?.find(img => img.id === id);
            return image ? `
    <div class="my-3 max-w-full cursor-pointer">
      <img 
        src="${image.dataUrl}" 
        alt="${image.altText || 'Изображение поста'}" 
        class="max-w-full max-h-[70vh] rounded-lg mx-auto object-contain"
        loading="lazy"
        onclick="window.handleImageClick(event, '${image.id}')"
      />
    </div>
  ` : '';
        });

        // Обработка фона с текстом
        html = html.replace(/\[BG\]\{\{([^}|]+)\|([^}]+)\}\}/g, (match, id, text) => {
            const image = post.images?.find(img => img.id === id.trim());
            if (!image) return '';

            return `
    <div class="my-3 p-6 rounded-lg bg-cover bg-center relative overflow-hidden" 
         style="background-image: url('${image.dataUrl}'); min-height: 200px;">
      <div class="absolute inset-0 bg-black/30"></div>
      <div class="backdrop-blur-sm bg-white/1 p-4 rounded relative z-10">
        <div class="p-4 text-white">${text.trim()}</div>
      </div>
    </div>
  `;
        });

        // Обработка эффектов
        html = html.replace(/\[EFFECT\]\{\{(.*?)\}\}/g, (match, effectId) => {
            const effect = post.effects?.includes(effectId) ? effectId : null;
            if (!effect) return '';

            const effectNames = {
                confetti: 'Конфетти',
                fireworks: 'Фейерверк',
                hearts: 'Сердечки',
                stars: 'Звёзды'
            };

            return `
        <div class="effect-${effectId} my-4 py-8 text-center border-2 border-dashed rounded-lg">
          <p class="font-bold">Эффект: ${effectNames[effectId] || effectId}</p>
        </div>
      `;
        });

        // Обработка полного фона (FULLBG)
        html = html.replace(/\[FULLBG\]\{\{(.*?)\}\}/g, (match, id) => {
            const image = post.images?.find(img => img.id === id);
            return image ? `
        <style>
          .post-container {
            background-image: url('${image.dataUrl}');
            background-size: cover;
            background-position: center;
            background-attachment: fixed;
          }
        </style>
      ` : '';
        });

        // Обработка форматирования текста
        const rules = [
            { regex: /\[B\]\{\{(.*?)\}\}/g, replacement: '<strong>$1</strong>' },
            { regex: /\[I\]\{\{(.*?)\}\}/g, replacement: '<em>$1</em>' },
            { regex: /\[U\]\{\{(.*?)\}\}/g, replacement: '<u>$1</u>' },
            { regex: /\[S\]\{\{(.*?)\}\}/g, replacement: '<s>$1</s>' },
            { regex: /\[C\]\{\{(.*?)\}\}/g, replacement: '<div style="text-align:center">$1</div>' },
            {
                regex: /\[L\]\{\{(.*?)\|(.*?)\}\}/g,
                replacement: '<a href="$2" target="_blank" rel="noopener noreferrer" style="color: inherit; text-decoration: underline;">$1</a>'
            },
            {
                regex: /\[SCROLL\]\{\{(.*?)\}\}/g,
                replacement: (match, scrollText) => `
          <div class="my-4 overflow-x-auto whitespace-nowrap py-2 scroll-container rounded-lg" 
               style="background-color: ${post.styles?.bgColor || '#ffffff'}; 
                      color: ${post.styles?.textColor || '#000000'}">
            <div class="inline-block px-4 py-2 text-lg">${scrollText}</div>
          </div>
        `
            }
        ];

        rules.forEach(rule => {
            html = html.replace(rule.regex, rule.replacement);
        });

        return { __html: html };
    };

    // Для модального просмотра изображения
    if (currentImage) {
        return (
            <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4"
                 onClick={() => setCurrentImage(null)}>
                <div className="max-w-full max-h-full" onClick={e => e.stopPropagation()}>
                    <img
                        src={currentImage.dataUrl}
                        alt={currentImage.altText || 'Изображение поста'}
                        className="max-w-full max-h-[90vh] object-contain"
                    />
                    {currentImage.altText && (
                        <p className="text-white text-center mt-2">{currentImage.altText}</p>
                    )}
                </div>
            </div>
        );
    }

    // Основной рендер поста
    return (
        <div className={`${isFullPage ? 'bg-white' : 'fixed inset-0 bg-black bg-opacity-80 z-50 flex items-center justify-center p-4'}`}
             onClick={onClose ? () => onClose() : undefined}>

            <motion.div
                initial={!isFullPage ? { scale: 0.95, y: 20 } : false}
                animate={!isFullPage ? { scale: 1, y: 0 } : false}
                className={`${isFullPage ? 'w-full max-w-4xl mx-auto py-8' : 'max-w-2xl w-full max-h-[90vh] overflow-y-auto'} 
                  bg-white rounded-lg shadow-xl post-container`}
                style={{ backgroundColor: post.styles?.bgColor || '#ffffff' }}
                onClick={e => e.stopPropagation()}>

                {/* Шапка поста */}
                <div className="p-4 border-b border-gray-200 flex justify-between items-center sticky top-0 bg-inherit z-10">
                    <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 rounded-full bg-gray-300 overflow-hidden">
                            {post.author?.avatar ? (
                                <img src={post.author.avatar} alt={post.author.name} className="w-full h-full object-cover" />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center bg-indigo-500 text-white">
                                    <FaUser />
                                </div>
                            )}
                        </div>
                        <div>
                            <h3 className="font-semibold" style={{ color: post.styles?.textColor || '#14102a' }}>
                                {post.author?.name || 'Аноним'}
                            </h3>
                            <div className="flex items-center space-x-2 text-xs text-gray-500">
                                <FaClock className="text-xs" />
                                <span>{formatDate(post.createdAt)}</span>
                            </div>
                        </div>
                    </div>
                    <button className="text-gray-500 hover:text-gray-700 p-1">
                        <FaEllipsisH />
                    </button>
                </div>

                {/* Контент поста */}
                <div
                    className="p-4 prose max-w-none"
                    style={{ color: post.styles?.textColor || '#14102a' }}
                    dangerouslySetInnerHTML={renderContent()}
                />

                {/* Теги */}
                {post.tags?.length > 0 && (
                    <div className="px-4 pb-2 flex flex-wrap gap-2">
                        {post.tags.map(tag => (
                            <span key={tag} className="inline-flex items-center px-2 py-1 rounded-full bg-[rgba(0,0,0,0.5)] text-xs">
                <FaTag className="mr-1 text-xs" /> {tag}
              </span>
                        ))}
                    </div>
                )}

                {/* Статистика */}
                <div className="px-4 py-2 flex justify-between text-sm border-t border-gray-200 bg-[rgba(0,0,0,0.5)]">
                    <button
                        onClick={handleLike}
                        className="flex items-center space-x-1"
                    >
                        {isLiked ? (
                            <FaHeart className="text-red-500" />
                        ) : (
                            <FaRegHeart />
                        )}
                        <span>{post.likes + (isLiked ? 1 : 0)}</span>
                    </button>
                    <button
                        onClick={toggleComments}
                        className="flex items-center space-x-1"
                    >
                        <FaComment />
                        <span>{comments.length}</span>
                    </button>
                    <span>{post.metadata?.readTime || 1} мин. чтения</span>
                </div>

                {/* Секция комментариев */}
                {showComments && (
                    <div className="border-t border-gray-200">
                        <div className="max-h-[300px] overflow-y-auto p-4 space-y-4">
                            {comments.length > 0 ? (
                                comments.map(comment => (
                                    <div key={comment.id} className="flex space-x-3">
                                        <div className="flex-shrink-0">
                                            <div className="w-8 h-8 rounded-full bg-gray-300 overflow-hidden">
                                                {comment.author.avatar ? (
                                                    <img
                                                        src={comment.author.avatar}
                                                        alt={comment.author.name}
                                                        className="w-full h-full object-cover"
                                                    />
                                                ) : (
                                                    <div className="w-full h-full flex items-center justify-center bg-indigo-500 text-white">
                                                        <FaUser className="text-xs" />
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                        <div className="flex-1">
                                            <div className="bg-[rgba(0,0,0,0.5)] rounded-lg p-3">
                                                <div className="flex justify-between items-start">
                          <span className="font-semibold text-sm">
                            {comment.author.name}
                          </span>
                                                    <span className="text-xs text-white/70">
                            {formatDate(comment.createdAt)}
                          </span>
                                                </div>
                                                <p className="mt-1 text-sm">{comment.text}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="text-center py-4 bg-[rgba(0,0,0,0.5)]">
                                    Пока нет комментариев. Будьте первым!
                                </div>
                            )}
                            <div ref={commentsEndRef} />
                        </div>

                        {/* Форма добавления комментария */}
                        <form onSubmit={handleAddComment} className="p-4 border-t border-gray-200 flex items-center">
                            <input
                                type="text"
                                value={newComment}
                                onChange={(e) => setNewComment(e.target.value)}
                                placeholder="Напишите комментарий..."
                                className="flex-1 px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            />
                            <button
                                type="submit"
                                disabled={!newComment.trim()}
                                className="ml-2 p-2 text-indigo-500 hover:text-indigo-700 disabled:text-gray-400"
                            >
                                <FaPaperPlane className="text-xl" />
                            </button>
                        </form>
                    </div>
                )}

                {/* Действия */}
                <div className="p-3 border-t border-gray-200 flex justify-between">
                    <div className="flex space-x-4">
                        <button
                            onClick={handleLike}
                            className="flex items-center space-x-1"
                            style={{ color: post.styles?.textColor || '#14102a' }}>
                            {isLiked ? (
                                <FaHeart className="text-lg text-red-500" />
                            ) : (
                                <FaRegHeart className="text-lg" />
                            )}
                            <span>Нравится</span>
                        </button>
                        <button
                            onClick={toggleComments}
                            className="flex items-center space-x-1"
                            style={{ color: post.styles?.textColor || '#14102a' }}>
                            <FaComment className="text-lg" />
                            <span>{showComments ? 'Скрыть' : 'Комментарии'}</span>
                        </button>
                    </div>
                    <div className="flex space-x-4">
                        <button
                            onClick={handleBookmark}
                            style={{ color: post.styles?.textColor || '#14102a' }}>
                            {isBookmarked ? (
                                <FaBookmark className="text-lg text-yellow-500" />
                            ) : (
                                <FaRegBookmark className="text-lg" />
                            )}
                        </button>
                        <button style={{ color: post.styles?.textColor || '#14102a' }}>
                            <FaShare className="text-lg" />
                        </button>
                    </div>
                </div>

                {/* Кнопка закрытия для модального окна */}
                {!isFullPage && (
                    <div className="p-4 border-t border-gray-200 flex justify-center">
                        <button
                            onClick={onClose}
                            className="px-6 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition-colors"
                        >
                            Закрыть
                        </button>
                    </div>
                )}
            </motion.div>
        </div>
    );
};

export default PostView;