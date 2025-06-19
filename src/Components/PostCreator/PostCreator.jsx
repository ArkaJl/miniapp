import { useState, useRef, useEffect } from 'react';
import {
    FaBold, FaItalic, FaUnderline, FaStrikethrough, FaLink,
    FaAlignCenter, FaImage, FaArrowLeft, FaEye, FaPaperPlane,
    FaPalette, FaFont, FaTimes, FaMagic, FaScroll
} from 'react-icons/fa';
import { useDropzone } from 'react-dropzone';
import { motion, AnimatePresence } from 'framer-motion';
import { HexColorPicker } from 'react-colorful';

const PostCreator = ({ onBack, onPublish }) => {
    const [content, setContent] = useState('');
    const [previewVisible, setPreviewVisible] = useState(false);
    const [images, setImages] = useState([]);
    const [bgColor, setBgColor] = useState('#ffffff');
    const [textColor, setTextColor] = useState('#000000');
    const textareaRef = useRef(null);
    const [selectedImageAction, setSelectedImageAction] = useState(null);
    const [showEffectsList, setShowEffectsList] = useState(false);
    const [linkUrl, setLinkUrl] = useState('');
    const [showLinkInput, setShowLinkInput] = useState(false);

    const effects = [
        { id: 'confetti', name: 'Конфетти' },
        { id: 'fireworks', name: 'Фейерверк' },
        { id: 'hearts', name: 'Сердечки' },
        { id: 'stars', name: 'Звезды' }
    ];

    const [colorPicker, setColorPicker] = useState({
        show: false,
        type: null,
        color: '#ffffff'
    });

    // Обработчики цветовой палитры
    const openColorPicker = (type) => {
        let currentColor;

        if (type === 'bg') {
            currentColor = bgColor.startsWith('#') ? bgColor : '#ffffff';
        } else {
            currentColor = textColor;
        }

        setColorPicker({
            show: true,
            type,
            color: currentColor
        });
    };

    const handleColorChange = (color) => {
        if (colorPicker.type === 'bg') {
            setBgColor(color);
        } else {
            setTextColor(color);
        }
    };

    const closeColorPicker = () => {
        setColorPicker({ show: false, type: null, color: '#ffffff' });
    };

    // Функция для чтения файла как Data URL
    const readFileAsDataURL = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result);
            reader.onerror = reject;
            reader.readAsDataURL(file);
        });
    };

    // Загрузка изображений
    const { getRootProps, getInputProps } = useDropzone({
        accept: {
            'image/*': ['.jpeg', '.jpg', '.png', '.webp']
        },
        onDrop: async (acceptedFiles) => {
            const newImages = await Promise.all(
                acceptedFiles.map(async (file) => {
                    const id = Math.random().toString(36).substring(2, 9);
                    const dataUrl = await readFileAsDataURL(file);
                    return { file, id, dataUrl };
                })
            );
            setImages(prevImages => [...prevImages, ...newImages]);
        }
    });

    // Вставка в текущую позицию курсора
    const insertAtCursor = (textToInsert) => {
        const textarea = textareaRef.current;
        const start = textarea.selectionStart;
        const beforeText = content.substring(0, start);
        const afterText = content.substring(start);

        setContent(`${beforeText}${textToInsert}${afterText}`);

        setTimeout(() => {
            textarea.selectionStart = start + textToInsert.length;
            textarea.selectionEnd = start + textToInsert.length;
            textarea.focus();
        }, 0);
    };

    // Вставка изображения
    const insertImage = (imageId, asBackground = false) => {
        if (asBackground) {
            insertAtCursor(`[BG]{{${imageId}|Текст на фоне}}`);
        } else {
            insertAtCursor(`[IMG]{{${imageId}}}`);
        }
        setSelectedImageAction(null);
    };

    // Вставка эффекта
    const insertEffect = (effectId) => {
        insertAtCursor(`[EFFECT]{{${effectId}}}`);
        setShowEffectsList(false);
    };

    // Обработчик добавления ссылки
    const handleAddLink = () => {
        const textarea = textareaRef.current;
        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;
        const selectedText = content.substring(start, end);

        if (selectedText.trim() === '') {
            alert('Выделите текст для ссылки');
            return;
        }

        if (linkUrl.trim() === '') {
            alert('Введите URL');
            return;
        }

        const beforeText = content.substring(0, start);
        const afterText = content.substring(end);

        setContent(`${beforeText}[L]{{${selectedText}|${linkUrl}}}${afterText}`);
        setLinkUrl('');
        setShowLinkInput(false);

        setTimeout(() => {
            textarea.selectionStart = start;
            textarea.selectionEnd = end;
            textarea.focus();
        }, 0);
    };

    // Форматирование текста
    const formatText = (type) => {
        const textarea = textareaRef.current;
        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;
        const selectedText = content.substring(start, end);
        const beforeText = content.substring(0, start);
        const afterText = content.substring(end);

        const tags = {
            bold: '[B]{{$1}}',
            italic: '[I]{{$1}}',
            underline: '[U]{{$1}}',
            strikethrough: '[S]{{$1}}',
            center: '[C]{{$1}}',
            scroll: (text) => `[SCROLL]{{${text}}}`
        };

        if (type === 'link') {
            setShowLinkInput(true);
        }
        else if (type === 'scroll') {
            if (selectedText.trim() === '') {
                alert('Выделите текст для горизонтального скролла');
                return;
            }
            setContent(`${beforeText}${tags.scroll(selectedText)}${afterText}`);
        }
        else {
            const formattedText = selectedText.replace(/^(.*)$/gm, tags[type]);
            setContent(`${beforeText}${formattedText}${afterText}`);
        }

        setTimeout(() => {
            textarea.selectionStart = start;
            textarea.selectionEnd = end;
            textarea.focus();
        }, 0);
    };

    // Рендер форматированного текста
    const renderFormattedText = () => {
        let html = content.split('\n').map(paragraph => {
            if (paragraph.trim() === '') return '<p>&nbsp;</p>'; // пустые строки
            return `<p>${paragraph}</p>`;
        }).join('');

        const rules = [
            { regex: /\[B\]\{\{(.*?)\}\}/g, replacement: '<strong>$1</strong>' },
            { regex: /\[I\]\{\{(.*?)\}\}/g, replacement: '<em>$1</em>' },
            { regex: /\[U\]\{\{(.*?)\}\}/g, replacement: '<u>$1</u>' },
            { regex: /\[S\]\{\{(.*?)\}\}/g, replacement: '<s>$1</s>' },
            { regex: /\[C\]\{\{(.*?)\}\}/g, replacement: '<div style="text-align:center">$1</div>' },
            { regex: /\[L\]\{\{(.*?)\|(.*?)\}\}/g, replacement: '<a href="$2" target="_blank" rel="noopener noreferrer" style="color: inherit; text-decoration: underline;">$1</a>' },
            {
                regex: /\[IMG\]\{\{(.*?)\}\}/g,
                replacement: (match, id) => {
                    const image = images.find(img => img.id === id);
                    return image ? `
                        <div class="my-3 max-w-full">
                            <img 
                                src="${image.dataUrl}" 
                                alt="Post content" 
                                class="max-w-full max-h-[50vh] rounded-lg mx-auto object-contain"
                            />
                        </div>
                    ` : '';
                }
            },
            {
                regex: /\[BG\]\{\{(.*?)\|(.*?)\}\}/g,
                replacement: (match, id, text) => {
                    const image = images.find(img => img.id === id);
                    return image ? `
                        <div class="my-3 p-6 rounded-lg bg-cover bg-center relative" style="background-image: url('${image.dataUrl}'); min-height: 200px;">
                            <div class="backdrop-blur-sm bg-white/30 p-4 rounded">
                                <div class="relative z-10 p-4 text-white">
                                    ${text}
                                </div>
                            </div>
                        </div>
                    ` : '';
                }
            },
            {
                regex: /\[EFFECT\]\{\{(.*?)\}\}/g,
                replacement: (match, effectId) => {
                    const effect = effects.find(e => e.id === effectId);
                    return effect ? `
                        <div class="effect-${effectId} my-4 py-8 text-center border-2 border-dashed rounded-lg">
                            <p class="font-bold">Эффект: ${effect.name}</p>
                        </div>
                    ` : '';
                }
            },
            {
                regex: /\[SCROLL\]\{\{(.*?)\}\}/g,
                replacement: (match, scrollText) => `
                    <div class="my-4 overflow-x-auto whitespace-nowrap py-2 scroll-container rounded-lg" style="background-color: ${bgColor}; color: ${textColor}">
                        <div class="inline-block px-4 py-2 text-lg">${scrollText}</div>
                    </div>
                `
            },
            {
                regex: /\[FULLBG\]\{\{(.*?)\}\}/g,
                replacement: (match, id) => {
                    const image = images.find(img => img.id === id);
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
                }
            }
        ];

        rules.forEach(rule => {
            html = html.replace(rule.regex, rule.replacement);
        });

        return { __html: html };
    };


    const removeImage = (id) => {
        setImages(prevImages => prevImages.filter(img => img.id !== id));
        setContent(prevContent => prevContent.replace(new RegExp(`\\[IMG\\]\\{\\{${id}\\}\\}`, 'g'), ''));
        setContent(prevContent => prevContent.replace(new RegExp(`\\[BG\\]\\{\\{${id}\\|.*?\\}\\}`, 'g'), ''));
    };

    return (
        <div className="bg-[#f5f7fa] min-h-screen pb-20">
            {/* Шапка редактора */}
            <div className="bg-[#14102a] text-white p-4 flex justify-between items-center sticky top-0 z-10">
                <button onClick={onBack} className="p-2">
                    <FaArrowLeft className="text-xl"/>
                </button>
                <h1 className="text-lg font-bold">Создание поста</h1>
                <div className="w-8"></div>
            </div>

            {/* Панель инструментов */}
            <div className="bg-[#233e85] p-2 flex overflow-x-auto space-x-2 sticky top-16 z-10">
                <button onClick={() => formatText('bold')}
                        className="p-2 rounded-lg bg-[#35518e] text-white hover:bg-[#8e83e4] transition-colors">
                    <FaBold/>
                </button>
                <button onClick={() => formatText('italic')}
                        className="p-2 rounded-lg bg-[#35518e] text-white hover:bg-[#8e83e4] transition-colors">
                    <FaItalic/>
                </button>
                <button onClick={() => formatText('underline')}
                        className="p-2 rounded-lg bg-[#35518e] text-white hover:bg-[#8e83e4] transition-colors">
                    <FaUnderline/>
                </button>
                <button onClick={() => formatText('strikethrough')}
                        className="p-2 rounded-lg bg-[#35518e] text-white hover:bg-[#8e83e4] transition-colors">
                    <FaStrikethrough/>
                </button>
                <button onClick={() => formatText('center')}
                        className="p-2 rounded-lg bg-[#35518e] text-white hover:bg-[#8e83e4] transition-colors">
                    <FaAlignCenter/>
                </button>
                <button onClick={() => formatText('link')}
                        className="p-2 rounded-lg bg-[#35518e] text-white hover:bg-[#8e83e4] transition-colors">
                    <FaLink/>
                </button>
                <button onClick={() => formatText('scroll')}
                        className="p-2 rounded-lg bg-[#35518e] text-white hover:bg-[#8e83e4] transition-colors">
                    <FaScroll/>
                </button>

                {/* Кнопка добавления изображения */}
                <div className="relative">
                    <button
                        {...getRootProps()}
                        className="p-2 rounded-lg bg-[#35518e] text-white hover:bg-[#8e83e4] transition-colors"
                    >
                        <FaImage/>
                    </button>
                    <input {...getInputProps()} />
                </div>

                <button
                    onClick={() => openColorPicker('bg')}
                    className="p-2 rounded-lg bg-[#35518e] text-white hover:bg-[#8e83e4] transition-colors"
                >
                    <FaPalette/>
                </button>

                <button
                    onClick={() => openColorPicker('text')}
                    className="p-2 rounded-lg bg-[#35518e] text-white hover:bg-[#8e83e4] transition-colors"
                >
                    <FaFont/>
                </button>

                {/* Кнопка для эффектов */}
                <button
                    onClick={() => setShowEffectsList(!showEffectsList)}
                    className="p-2 rounded-lg bg-[#35518e] text-white hover:bg-[#8e83e4] transition-colors"
                >
                    <FaMagic/>
                </button>
            </div>

            {/* Список эффектов */}
            {showEffectsList && (
                <div className="bg-[#233e85] p-2 flex overflow-x-auto space-x-2 sticky top-28 z-10">
                    {effects.map(effect => (
                        <button
                            key={effect.id}
                            onClick={() => insertEffect(effect.id)}
                            className="px-3 py-1 rounded-lg bg-[#35518e] text-white hover:bg-[#8e83e4] transition-colors"
                        >
                            {effect.name}
                        </button>
                    ))}
                </div>
            )}

            {/* Форма для добавления ссылки */}
            {showLinkInput && (
                <div className="bg-[#233e85] p-2 sticky top-28 z-10">
                    <div className="flex space-x-2">
                        <input
                            type="text"
                            value={linkUrl}
                            onChange={(e) => setLinkUrl(e.target.value)}
                            placeholder="Введите URL"
                            className="flex-1 px-3 py-1 rounded-lg bg-white text-[#14102a]"
                        />
                        <button
                            onClick={handleAddLink}
                            className="px-3 py-1 rounded-lg bg-green-500 text-white hover:bg-green-600"
                        >
                            Добавить
                        </button>
                        <button
                            onClick={() => setShowLinkInput(false)}
                            className="px-3 py-1 rounded-lg bg-red-500 text-white hover:bg-red-600"
                        >
                            Отмена
                        </button>
                    </div>
                </div>
            )}

            {/* Редактор */}
            <div className="p-4">
                <textarea
                    ref={textareaRef}
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Начните писать пост здесь..."
                    className="w-full min-h-[200px] p-4 rounded-lg bg-white text-[#14102a] border border-[#8e83e4] focus:outline-none focus:ring-2 focus:ring-[#8e83e4]"
                />
            </div>

            {/* Загруженные изображения */}
            {images.length > 0 && (
                <div className="px-4 mb-4">
                    <h3 className="text-sm text-[#576ecb] mb-2">Загруженные изображения:</h3>
                    <div className="flex overflow-x-auto space-x-2 pb-2">
                        {images.map((image, index) => (
                            <div key={image.id} className="relative flex-shrink-0">
                                <div
                                    className="h-20 w-20 rounded-lg bg-gray-200 overflow-hidden cursor-pointer"
                                    onClick={() => insertImage(image.id)}
                                >
                                    <img
                                        src={image.dataUrl}
                                        alt="Preview"
                                        className="h-full w-full object-cover"
                                    />
                                </div>
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setSelectedImageAction(image.id);
                                    }}
                                    className="absolute top-0 right-0 bg-blue-500 text-white rounded-full w-5 h-5 flex items-center justify-center transform translate-x-1/2 -translate-y-1/2"
                                >
                                    ...
                                </button>
                                <span
                                    className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white text-xs text-center truncate px-1">
                                    {index + 1}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Меню действий с изображением */}
            {selectedImageAction && (
                <div className="fixed inset-0 bg-black bg-opacity-50 z-40 flex items-center justify-center">
                    <div className="bg-white rounded-lg p-4 max-w-xs w-full">
                        <div className="flex justify-between items-center mb-3">
                            <h3 className="font-bold">Действие с изображением</h3>
                            <button
                                onClick={() => setSelectedImageAction(null)}
                                className="p-1 text-gray-500 hover:text-gray-700"
                            >
                                <FaTimes/>
                            </button>
                        </div>
                        <button
                            onClick={() => {
                                insertAtCursor(`[FULLBG]{{${selectedImageAction}}}`);
                                setSelectedImageAction(null);
                            }}
                            className="w-full py-2 mb-2 bg-indigo-500 text-white rounded hover:bg-indigo-600"
                        >
                            Установить как фон поста
                        </button>
                        <button
                            onClick={() => insertImage(selectedImageAction, false)}
                            className="w-full py-2 mb-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                        >
                            Вставить как изображение
                        </button>
                        <button
                            onClick={() => insertImage(selectedImageAction, true)}
                            className="w-full py-2 mb-2 bg-purple-500 text-white rounded hover:bg-purple-600"
                        >
                            Использовать как фон текста
                        </button>
                        <button
                            onClick={() => removeImage(selectedImageAction)}
                            className="w-full py-2 bg-red-500 text-white rounded hover:bg-red-600"
                        >
                            Удалить
                        </button>
                    </div>
                </div>
            )}

            {/* Кнопки действий */}
            <div
                className="mb-0 fixed bottom-0 left-0 right-0 bg-[#f5f7fa] p-4 border-t border-[#8e83e4] flex justify-between">
                <button
                    onClick={() => setPreviewVisible(true)}
                    disabled={!content && images.length === 0}
                    className={`px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors ${
                        (!content && images.length === 0) ? 'bg-gray-300 cursor-not-allowed' : 'bg-[#8e83e4] text-white hover:bg-[#a45cd4]'
                    }`}
                >
                    <FaEye/> <span>Просмотр</span>
                </button>
                <button
                    onClick={() => onPublish({
                        content,
                        images,
                        styles: {bgColor, textColor}
                    })}
                    disabled={!content && images.length === 0}
                    className={`px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors ${
                        (!content && images.length === 0) ? 'bg-gray-300 cursor-not-allowed' : 'bg-[#a45cd4] text-white hover:bg-[#8e83e4]'
                    }`}
                >
                    <FaPaperPlane/> <span>Опубликовать</span>
                </button>
            </div>

            {/* Предпросмотр */}
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
                            className="bg-white rounded-lg max-w-full max-h-[90vh] overflow-y-auto w-full max-w-2xl post-container"
                            onClick={(e) => e.stopPropagation()}
                            style={{backgroundColor: bgColor.startsWith('#') ? bgColor : 'white'}}
                        >
                            <div className="p-6">
                                <h2 className="text-xl font-bold mb-4" style={{color: textColor}}>Предпросмотр
                                    поста</h2>
                                <div
                                    className="prose max-w-none"
                                    style={{color: textColor}}
                                    dangerouslySetInnerHTML={renderFormattedText()}
                                />
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
                                Выберите {colorPicker.type === 'bg' ? 'цвет фона' : 'цвет текста'}
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
                                        style={{
                                            backgroundColor: colorPicker.type === 'bg' ? bgColor : textColor
                                        }}
                                    />
                                    <span>
                                        {colorPicker.type === 'bg' ? 'Фон' : 'Текст'}: {colorPicker.color}
                                    </span>
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
        </div>
    );
};

export default PostCreator;