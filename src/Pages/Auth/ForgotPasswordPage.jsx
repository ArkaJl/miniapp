import { useState } from 'react';
import { supabase } from '/src/config/supabase-db-config.js';

export default function ForgotPasswordPage() {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const handleReset = async (e) => {
        e.preventDefault();

        try {
            const { error } = await supabase.auth.resetPasswordForEmail(email);

            if (error) throw error;

            setMessage('Проверьте вашу почту для сброса пароля');
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div className="min-h-screen bg-[#14102a] flex items-center justify-center p-4">
            <div className="bg-[#1c2562] p-8 rounded-xl shadow-lg max-w-md w-full">
                <h2 className="text-2xl font-bold mb-6 text-white">Восстановление пароля</h2>

                {message && <div className="mb-4 p-2 bg-green-500 text-white rounded">{message}</div>}
                {error && <div className="mb-4 p-2 bg-red-500 text-white rounded">{error}</div>}

                <form onSubmit={handleReset}>
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

                    <button
                        type="submit"
                        className="w-full bg-[#576ecb] text-white py-2 rounded-md hover:bg-[#4659a5] transition"
                    >
                        Отправить инструкции
                    </button>
                </form>
            </div>
        </div>
    );
}