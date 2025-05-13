import { FaCoins, FaCheck, FaLock, FaCrown, FaTimes } from 'react-icons/fa';
import { useState } from 'react';
import "../MainPage/style.css"

export default function StorePage() {
    const [coins, setCoins] = useState(7350);
    const [ownedItems, setOwnedItems] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('avatarFrames');
    const [isSubscribed, setIsSubscribed] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [modalContent, setModalContent] = useState({
        title: '',
        message: '',
        type: 'info' // 'info', 'confirm', 'success'
    });
    const [currentItem, setCurrentItem] = useState(null);

    const shopItems = {
        avatarFrames: [
            { id: 'af1', name: 'Золотая рамка', price: 100, thumbnail: '🌟', description: 'Элегантная золотая рамка для вашего аватара' },
            { id: 'af2', name: 'Серебряная рамка', price: 80, thumbnail: '✨', description: 'Стильная серебряная рамка' },
            { id: 'af3', name: 'Неоновая рамка', price: 120, thumbnail: '🔮', description: 'Яркая неоновая подсветка' },
            { id: 'af4', name: 'Винтажная рамка', price: 90, thumbnail: '🖼️', description: 'Рамка в винтажном стиле' },
        ],
        messageFrames: [
            { id: 'mf1', name: 'Пузырь сообщения', price: 50, thumbnail: '💬', description: 'Классический пузырь для сообщений' },
            { id: 'mf2', name: 'Сердечная рамка', price: 70, thumbnail: '💖', description: 'Сообщения в сердечках' },
            { id: 'mf3', name: 'Огненная рамка', price: 100, thumbnail: '🔥', description: 'Горячие сообщения!' },
        ],
        stickerPacks: [
            { id: 'sp1', name: 'Мемы', price: 150, thumbnail: '😂', description: 'Набор популярных мемов' },
            { id: 'sp2', name: 'Кошки', price: 120, thumbnail: '🐱', description: 'Милые котики для чата' },
            { id: 'sp3', name: 'Игровые', price: 200, thumbnail: '🎮', description: 'Стикеры для геймеров' },
            { id: 'sp4', name: 'Премиум', price: 300, thumbnail: '💎', description: 'Эксклюзивные стикеры' },
        ]
    };

    const showModalMessage = (title, message, type = 'info') => {
        setModalContent({ title, message, type });
        setShowModal(true);
    };

    const handlePurchaseClick = (item) => {
        if (ownedItems.includes(item.id)) {
            showModalMessage('Уже куплено', `Вы уже приобрели "${item.name}" ранее!`, 'info');
            return;
        }

        setCurrentItem(item);
        showModalMessage(
            'Подтвердите покупку',
            `Вы уверены, что хотите купить "${item.name}" за ${item.price} монет?`,
            'confirm'
        );
    };

    const confirmPurchase = () => {
        if (!currentItem) return;

        if (coins >= currentItem.price) {
            setCoins(coins - currentItem.price);
            setOwnedItems([...ownedItems, currentItem.id]);
            showModalMessage(
                'Покупка совершена',
                `Вы успешно приобрели "${currentItem.name}"!`,
                'success'
            );
        } else {
            showModalMessage(
                'Недостаточно монет',
                `Вам не хватает ${currentItem.price - coins} монет для покупки "${currentItem.name}"`,
                'info'
            );
        }
        setCurrentItem(null);
    };

    const purchaseSubscription = () => {
        if (isSubscribed) {
            showModalMessage('Уже активно', 'У вас уже есть активная премиум подписка!', 'info');
            return;
        }

        if (coins >= 500) {
            setCoins(coins - 500);
            setIsSubscribed(true);
            showModalMessage('Подписка оформлена', 'Поздравляем с приобретением премиум подписки!', 'success');
        } else {
            showModalMessage('Недостаточно монет', 'Вам не хватает монет для оформления подписки', 'info');
        }
    };

    return (
        <div className="min-h-screen bg-[#f5f7fa] text-[#1c2562] pb-20 relative">
            {/* Шапка магазина */}
            <header className="bg-[#14102a] text-white p-4 sticky top-0 z-10 shadow-md">
                <div className="flex justify-between items-center">
                    <h1 className="text-xl font-bold">Магазин</h1>
                    <div className="flex items-center bg-[#233e85] px-3 py-1 rounded-full">
                        <FaCoins className="text-yellow-300 mr-2" />
                        <span className="font-medium">{coins}</span>
                    </div>
                </div>
            </header>

            {/* Баннер подписки */}
            <div className="bg-gradient-to-r from-yellow-400 to-yellow-600 p-4 text-white">
                <div className="flex items-center justify-between">
                    <div className="flex items-center">
                        <FaCrown className="text-xl mr-2" />
                        <div>
                            <h3 className="font-bold">Премиум подписка</h3>
                            <p className="text-sm">Доступ к эксклюзивному контенту и бонусные монеты!</p>
                        </div>
                    </div>
                    <button
                        onClick={purchaseSubscription}
                        disabled={isSubscribed || coins < 500}
                        className={`px-4 py-2 rounded-full font-medium flex items-center ${isSubscribed
                            ? 'bg-green-500'
                            : coins >= 500
                                ? 'bg-[#1c2562] hover:bg-[#233e85]'
                                : 'bg-gray-400'}`}
                    >
                        {isSubscribed ? (
                            <>
                                <FaCheck className="mr-2" />
                                Активна
                            </>
                        ) : (
                            <>
                                <FaCoins className="mr-2" />
                                500 монет
                            </>
                        )}
                    </button>
                </div>
            </div>

            {/* Категории товаров */}
            <div className="flex overflow-x-auto p-2 bg-white shadow-sm">
                {[
                    { id: 'avatarFrames', name: 'Рамки аватара' },
                    { id: 'messageFrames', name: 'Рамки сообщений' },
                    { id: 'stickerPacks', name: 'Стикерпаки' }
                ].map(category => (
                    <button
                        key={category.id}
                        onClick={() => setSelectedCategory(category.id)}
                        className={`px-4 py-2 mx-1 rounded-full whitespace-nowrap ${selectedCategory === category.id ? 'bg-[#8e83e4] text-white' : 'bg-gray-100'}`}
                    >
                        {category.name}
                    </button>
                ))}
            </div>

            {/* Список товаров */}
            <div className="p-4 grid grid-cols-2 gap-4">
                {shopItems[selectedCategory].map(item => (
                    <div key={item.id} className="bg-white rounded-xl shadow-md overflow-hidden">
                        <div className="p-4 flex flex-col items-center">
                            <div className="text-4xl mb-2">{item.thumbnail}</div>
                            <h3 className="font-bold text-center">{item.name}</h3>
                            <p className="text-sm text-gray-500 text-center mt-1">{item.description}</p>

                            <div className="mt-4 flex items-center justify-between w-full">
                                <div className="flex items-center text-yellow-500">
                                    <FaCoins className="mr-1" />
                                    <span>{item.price}</span>
                                </div>

                                {ownedItems.includes(item.id) ? (
                                    <div className="flex items-center text-green-500">
                                        <FaCheck className="mr-1" />
                                        <span>Куплено</span>
                                    </div>
                                ) : (
                                    <button
                                        onClick={() => handlePurchaseClick(item)}
                                        disabled={coins < item.price}
                                        className={`px-3 py-1 rounded-full text-sm ${coins >= item.price ? 'bg-[#576ecb] text-white' : 'bg-gray-200 text-gray-500'}`}
                                    >
                                        {coins >= item.price ? 'Купить' : (
                                            <span className="flex items-center">
                                                <FaLock className="mr-1" />
                                                {item.price}
                                            </span>
                                        )}
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Кастомное модальное окно */}
            {showModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-xl max-w-md w-full p-6 shadow-xl animate-fadeIn">
                        <div className="flex justify-between items-start mb-4">
                            <h3 className="text-xl font-bold text-[#1c2562]">
                                {modalContent.title}
                            </h3>
                            <button
                                onClick={() => setShowModal(false)}
                                className="text-gray-500 hover:text-gray-700 transition-colors"
                            >
                                <FaTimes />
                            </button>
                        </div>

                        <p className="mb-6 text-gray-700">{modalContent.message}</p>

                        <div className="flex space-x-3">
                            {modalContent.type === 'confirm' ? (
                                <>
                                    <button
                                        onClick={() => {
                                            confirmPurchase();
                                            setShowModal(false);
                                        }}
                                        className="flex-1 py-2 bg-[#576ecb] text-white rounded-lg font-medium hover:bg-[#4758a5] transition-colors"
                                    >
                                        Подтвердить
                                    </button>
                                    <button
                                        onClick={() => setShowModal(false)}
                                        className="flex-1 py-2 bg-gray-200 rounded-lg font-medium hover:bg-gray-300 transition-colors"
                                    >
                                        Отмена
                                    </button>
                                </>
                            ) : (
                                <button
                                    onClick={() => setShowModal(false)}
                                    className="w-full py-2 bg-[#576ecb] text-white rounded-lg font-medium hover:bg-[#4758a5] transition-colors"
                                >
                                    Понятно
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            )}

            {/* Добавляем анимации в CSS */}
            <style jsx>{`
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-fadeIn {
                    animation: fadeIn 0.3s ease-out forwards;
                }
            `}</style>
        </div>
    );
}