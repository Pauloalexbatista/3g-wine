'use client'

import { useState } from 'react'
import { createClient } from '@/utils/supabase/client'
import { useRouter } from 'next/navigation'

export default function AuthForm() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [view, setView] = useState<'login' | 'signup'>('login')
    const supabase = createClient()
    const router = useRouter()

    const handleAuth = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setError(null)

        try {
            if (view === 'login') {
                const { error } = await supabase.auth.signInWithPassword({
                    email,
                    password,
                })
                if (error) throw error
                router.push('/')
                router.refresh()
            } else {
                const { error } = await supabase.auth.signUp({
                    email,
                    password,
                    options: {
                        emailRedirectTo: `${window.location.origin}/auth/callback`,
                    },
                })
                if (error) throw error
                alert('Verifique o seu email para confirmar a conta!')
            }
        } catch (err: any) {
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="w-full p-8 md:p-10 rounded-3xl bg-white/5 backdrop-blur-2xl border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] animate-fadeIn">
            <h2 className="text-2xl font-serif text-center mb-10 text-white tracking-wide">
                {view === 'login' ? 'Bem-vindo de volta' : 'Crie a sua conta'}
            </h2>

            <form onSubmit={handleAuth} className="space-y-8">
                <div className="text-center">
                    <label className="block text-xs font-semibold text-gray-400 mb-3 uppercase tracking-widest">Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-4 py-4 bg-white/5 border border-white/10 rounded-2xl focus:outline-none focus:ring-1 focus:ring-[#D4AF37]/50 transition-all text-white text-center text-lg placeholder:text-gray-600"
                        placeholder="seu@email.com"
                        required
                    />
                </div>
                <div className="text-center">
                    <label className="block text-xs font-semibold text-gray-400 mb-3 uppercase tracking-widest">Palavra-passe</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full px-4 py-4 bg-white/5 border border-white/10 rounded-2xl focus:outline-none focus:ring-1 focus:ring-[#D4AF37]/50 transition-all text-white text-center text-lg"
                        required
                    />
                </div>

                {error && (
                    <p className="text-red-400 text-xs text-center bg-red-400/10 py-3 rounded-xl border border-red-400/20">
                        {error}
                    </p>
                )}

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-5 bg-gradient-to-r from-[#D4AF37] to-[#BC8F1D] text-black font-bold rounded-2xl hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 shadow-xl shadow-[#D4AF37]/10 text-sm uppercase tracking-widest mt-4"
                >
                    {loading ? 'A processar...' : view === 'login' ? 'Entrar' : 'Registar'}
                </button>
            </form>

            <div className="mt-10 text-center border-t border-white/5 pt-8">
                <button
                    onClick={() => setView(view === 'login' ? 'signup' : 'login')}
                    className="text-gray-500 hover:text-[#D4AF37] transition-colors text-xs uppercase tracking-widest font-medium"
                >
                    {view === 'login' 
                        ? 'Não tem uma conta? Registe-se' 
                        : 'Já tem uma conta? Faça login'}
                </button>
            </div>
        </div>
    )
}
