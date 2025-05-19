import { useState } from 'react';
import Post from '/src/Components/Post/Post.jsx';

const NewsPage = () => {
    // Моковые данные новостей
    const news = [
        {
            id: 1,
            authorAvatar: 'https://example.com/logo.png', // Замените на ваш логотип
            authorName: 'Команда разработчиков',
            title: 'Новое обновление!',
            image: 'https://example.com/update-image.jpg',
            likesCount: 245,
            sharesCount: 56,
            commentsCount: 32,
            date: '2 часа назад'
        },
        {
            id: 2,
            authorAvatar: 'https://example.com/logo.png',
            authorName: 'Команда разработчиков',
            title: 'Конкурс на лучший пост',
            image: 'https://example.com/contest-image.jpg',
            likesCount: 189,
            sharesCount: 78,
            commentsCount: 45,
            date: '1 день назад'
        },
        {
            id: 3,
            authorAvatar: 'https://example.com/logo.png',
            authorName: 'Команда разработчиков',
            title: 'Технические работы',
            image: null,
            likesCount: 56,
            sharesCount: 23,
            commentsCount: 12,
            date: '3 дня назад'
        }
    ];

    const handleLike = (postId, newLikeStatus) => {
        console.log(`Post ${postId} was ${newLikeStatus ? 'liked' : 'unliked'}`);
        // Здесь можно добавить логику отправки на сервер
    };

    const handlePostClick = (postId) => {
        console.log(`Opening post ${postId}`);
        // Позже реализуем открытие полного поста
    };

    return (
        <div className="background-img min-h-screen mb-18">
            <div className="max-w-2xl mx-auto p-4">
                <h1 className="text-3xl font-bold text-[#1c2562] mb-6">Новости</h1>

                <div className="space-y-6">
                    {news.map(post => (
                        <Post
                            key={post.id}
                            {...post}
                            onLike={handleLike}
                            onPostClick={handlePostClick}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default NewsPage;