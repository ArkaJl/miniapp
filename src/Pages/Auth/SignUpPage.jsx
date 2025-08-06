import { useState } from 'react';
import { supabase } from '/src/config/supabase-db-config.js';
import { useNavigate } from 'react-router-dom';

export default function SignUpPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
    const navigate = useNavigate();

    const handleSignUp = async (e) => {
        e.preventDefault();
        setError('');

        try {
            // Регистрация в Supabase Auth
            const { data, error: signUpError } = await supabase.auth.signUp({
                email,
                password,
                options: {
                    data: {
                        username // Сохраняем имя пользователя в метаданных
                    }
                }
            });

            if (signUpError) throw signUpError;

            // Создаем запись в кастомной таблице users БЕЗ password_hash
            const { error: dbError } = await supabase
                .from('users')
                .insert({
                    id: data.user.id,
                    email,
                    username,
                    coins: 50 // Начальные монеты
                });

            if (dbError) throw dbError;

            // Показываем сообщение о необходимости подтверждения email
            setSuccess(true);
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div className="min-h-screen bg-[#14102a] flex items-center justify-center p-4">
            <div className="bg-[#1c2562] p-8 rounded-xl shadow-lg max-w-md w-full">
                <h2 className="text-2xl font-bold mb-6 text-white">Регистрация</h2>

                {success ? (
                    <div className="mb-4 p-4 bg-green-500 text-white rounded">
                        <p className="font-medium">Регистрация почти завершена!</p>
                        <p className="mt-2">Пожалуйста, проверьте вашу почту и подтвердите email.</p>
                        <button
                            onClick={() => navigate('/signin')}
                            className="mt-4 w-full bg-[#3a4a8a] text-white py-2 rounded-md hover:bg-[#2d3a6e] transition"
                        >
                            Перейти к входу
                        </button>
                    </div>
                ) : (
                    <>
                        {error && <div className="mb-4 p-3 bg-red-500 text-white rounded-md">{error}</div>}

                        <form onSubmit={handleSignUp}>
                            <div className="mb-4">
                                <label className="block text-sm font-medium mb-2 text-gray-300">Имя пользователя</label>
                                <input
                                    type="text"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    className="w-full px-3 py-2 bg-[#2a3568] border border-[#35518e] rounded-md text-white focus:outline-none focus:ring-2 focus:ring-[#576ecb]"
                                    required
                                    placeholder="Придумайте уникальное имя"
                                />
                            </div>

                            <div className="mb-4">
                                <label className="block text-sm font-medium mb-2 text-gray-300">Email</label>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full px-3 py-2 bg-[#2a3568] border border-[#35518e] rounded-md text-white focus:outline-none focus:ring-2 focus:ring-[#576ecb]"
                                    required
                                    placeholder="your@email.com"
                                />
                            </div>

                            <div className="mb-6">
                                <label className="block text-sm font-medium mb-2 text-gray-300">Пароль</label>
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full px-3 py-2 bg-[#2a3568] border border-[#35518e] rounded-md text-white focus:outline-none focus:ring-2 focus:ring-[#576ecb]"
                                    required
                                    minLength={6}
                                    placeholder="Не менее 6 символов"
                                />
                                <p className="mt-1 text-xs text-gray-400">Используйте надежный пароль</p>
                            </div>

                            <button
                                type="submit"
                                className="w-full bg-[#576ecb] text-white py-2 rounded-md hover:bg-[#4659a5] transition font-medium"
                            >
                                Создать аккаунт
                            </button>
                        </form>

                        <div className="mt-6 pt-4 border-t border-[#35518e]">
                            <p className="text-center text-gray-400 text-sm">
                                Уже есть аккаунт?{' '}
                                <button
                                    onClick={() => navigate('/signin')}
                                    className="text-[#8e83e4] hover:text-[#bcd8f6] font-medium"
                                >
                                    Войти
                                </button>
                            </p>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}