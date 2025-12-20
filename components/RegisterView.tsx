
import React, { useState } from 'react';
import { supabase } from '../lib/supabase';
import { User, Mail, Lock, Loader2, ArrowLeft } from 'lucide-react';

interface RegisterViewProps {
    onBack: () => void;
    onRegisterSuccess: () => void;
    onLoginClick: () => void;
}

export const RegisterView: React.FC<RegisterViewProps> = ({ onBack, onRegisterSuccess, onLoginClick }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [affiliateCode, setAffiliateCode] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            // 1. Sign up user
            const { data: authData, error: authError } = await supabase.auth.signUp({
                email,
                password,
            });

            if (authError) throw authError;

            if (authData.user) {
                // 2. Create profile entry
                const cleanCode = affiliateCode.trim().toLowerCase().replace(/\s+/g, '-');
                const { error: profileError } = await supabase
                    .from('profiles')
                    .insert([
                        {
                            id: authData.user.id,
                            email: email,
                            role: 'affiliate',
                            affiliate_code: cleanCode
                        }
                    ]);

                if (profileError) {
                    console.error("Profile error:", profileError);
                    // If dup key, usually means affiliate code taken
                    if (profileError.code === '23505') {
                        throw new Error("Este código de afiliado já está em uso.");
                    }
                    throw new Error("Erro ao criar perfil.");
                }

                alert('Conta criada com sucesso! Verifique seu email se necessário.');
                onRegisterSuccess();
            }
        } catch (err: any) {
            setError(err.message || 'Erro ao criar conta.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#18181b] px-4">
            <div className="w-full max-w-md">
                <button
                    onClick={onBack}
                    className="flex items-center gap-2 text-gray-400 hover:text-white mb-8 transition-colors"
                >
                    <ArrowLeft className="w-4 h-4" /> Voltar para loja
                </button>

                <div className="bg-[#27272a] rounded-2xl border border-[#3f3f46] p-8 shadow-xl">
                    <div className="text-center mb-8">
                        <div className="w-16 h-16 bg-[#F5C518]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                            <User className="w-8 h-8 text-[#F5C518]" />
                        </div>
                        <h2 className="text-2xl font-bold text-white">Criar Conta</h2>
                        <p className="text-gray-400 text-sm mt-2">Torne-se um afiliado e comece a lucrar</p>
                    </div>

                    <div className="space-y-4">
                        <button
                            onClick={() => {
                                supabase.auth.signInWithOAuth({
                                    provider: 'google',
                                    options: {
                                        redirectTo: import.meta.env.VITE_SITE_URL || window.location.origin
                                    }
                                });
                            }}
                            className="w-full flex items-center justify-center gap-2 bg-white hover:bg-gray-100 text-black font-medium py-3 rounded-lg transition-colors"
                        >
                            <svg className="w-5 h-5" viewBox="0 0 24 24">
                                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                            </svg>
                            Registrar com Google
                        </button>
                        <button
                            onClick={() => {
                                supabase.auth.signInWithOAuth({
                                    provider: 'discord',
                                    options: {
                                        redirectTo: import.meta.env.VITE_SITE_URL || window.location.origin
                                    }
                                });
                            }}
                            className="w-full flex items-center justify-center gap-2 bg-[#5865F2] hover:bg-[#4752C4] text-white font-medium py-3 rounded-lg transition-colors"
                        >
                            <svg className="w-5 h-5 fill-current" viewBox="0 0 127.14 96.36">
                                <path d="M107.7,8.07A105.15,105.15,0,0,0,81.47,0a72.06,72.06,0,0,0-3.36,6.83A97.68,97.68,0,0,0,49,6.83,72.37,72.37,0,0,0,45.64,0,105.89,105.89,0,0,0,19.39,8.09C2.79,32.65-1.71,56.6.54,80.21h0A105.73,105.73,0,0,0,32.71,96.36,77.11,77.11,0,0,0,39.6,85.25a68.42,68.42,0,0,1-10.85-5.18c.91-.66,1.8-1.34,2.66-2a75.57,75.57,0,0,0,64.32,0c.87.71,1.76,1.39,2.66,2a68.68,68.68,0,0,1-10.87,5.19,77,77,0,0,0,6.89,11.1A105.89,105.89,0,0,0,126.6,80.22c1.24-23.28-3.28-47.23-18.9-72.15ZM42.45,65.69C36.18,65.69,31,60,31,53s5-12.74,11.43-12.74S54,46,53.89,53,48.84,65.69,42.45,65.69Zm42.24,0C78.41,65.69,73.25,60,73.25,53s5-12.74,11.44-12.74S96.23,46,96.12,53,91.08,65.69,84.69,65.69Z" />
                            </svg>
                            Registrar com Discord
                        </button>
                    </div>

                    <div className="mt-6 text-center text-sm text-gray-400">
                        Já tem conta?{' '}
                        <button onClick={onLoginClick} className="text-[#F5C518] hover:underline font-bold">
                            Fazer login
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
