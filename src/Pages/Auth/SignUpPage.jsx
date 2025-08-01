import { useState } from 'react';
import { supabase } from '/src/config/supabase-db-config.js';

import { useNavigate } from 'react-router-dom';

export default function SignUpPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSignUp = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const { error: signUpError } = await supabase.auth.signUp({
                email,
                password
            });

            if (signUpError) throw signUpError;

            // Создаем запись пользователя в таблице users
            const { data: { user } } = await supabase.auth.getUser();

            const { error: dbError } = await supabase
                .from('users')
                .insert({
                    id: user.id,
                    email,
                    username,
                    coins: 50 // Начальные монеты
                });

            if (dbError) throw dbError;

            navigate('/');
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div className="min-h-screen bg-[#14102a] flex items-center justify-center p-4">
            <div className="bg-[#1c2562] p-8 rounded-xl shadow-lg max-w-md w-full">
                <h2 className="text-2xl font-bold mb-6 text-white">Регистрация</h2>
                {error && <div className="mb-4 p-2 bg-red-500 text-white rounded">{error}</div>}

                <form onSubmit={handleSignUp}>
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-2 text-gray-300">Имя пользователя</label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full px-3 py-2 bg-[#2a3568] border border-[#35518e] rounded-md text-white"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-2 text-gray-300">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-3 py-2 bg-[#2a3568] border border-[#35518e] rounded-md text-white"
                            required
                        />
                    </div>

                    <div className="mb-6">
                        <label className="block text-sm font-medium mb-2 text-gray-300">Пароль</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-3 py-2 bg-[#2a3568] border border-[#35518e] rounded-md text-white"
                            required
                            minLength={6}
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-[#576ecb] text-white py-2 rounded-md hover:bg-[#4659a5] transition"
                    >
                        Создать аккаунт
                    </button>
                </form>

                <div className="mt-4 text-center">
                    <button
                        onClick={() => navigate('/signin')}
                        className="text-[#8e83e4] hover:text-[#bcd8f6] text-sm"
                    >
                        Уже есть аккаунт? Войти
                    </button>
                </div>
            </div>
        </div>
    );
}