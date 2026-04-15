'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/utils/supabase/client'
import Link from 'next/link'
import { User } from '@supabase/supabase-js'

export default function UserMenu() {
    const [user, setUser] = useState<User | null>(null)
    const [loading, setLoading] = useState(true)
    const [isOpen, setIsOpen] = useState(false)
    const supabase = createClient()

    useEffect(() => {
        const getUser = async () => {
            const { data: { user } } = await supabase.auth.getUser()
            setUser(user)
            setLoading(false)
        }

        getUser()

        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            setUser(session?.user ?? null)
        })

        return () => subscription.unsubscribe()
    }, [supabase.auth])

    const handleSignOut = async () => {
        await supabase.auth.signOut()
        setIsOpen(false)
    }

    if (loading) return <div className="w-8 h-8 rounded-full bg-gray-800 animate-pulse" />

    if (!user) {
        return (
            <Link 
                href="/auth/login" 
                className="text-white hover:text-[#D4AF37] transition-all text-[11px] tracking-[0.2em] font-semibold border border-transparent hover:border-[#D4AF37]/30 px-3 py-1 rounded-sm"
            >
                ENTRAR
            </Link>
        )
    }

    return (
        <div className="relative">
            <button 
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2 text-gray-300 hover:text-[#D4AF37] transition-colors"
                aria-label="User menu"
            >
                <div className="w-8 h-8 rounded-full border border-[#D4AF37]/30 flex items-center justify-center bg-black/50 overflow-hidden">
                    {user.email?.[0].toUpperCase()}
                </div>
            </button>

            {isOpen && (
                <>
                    <div 
                        className="fixed inset-0 z-40" 
                        onClick={() => setIsOpen(false)}
                    />
                    <div className="absolute right-0 mt-4 w-48 bg-black border border-gray-800 rounded-lg shadow-2xl z-50 py-2 animate-in fade-in slide-in-from-top-2 duration-200">
                        <div className="px-4 py-2 border-b border-gray-800 mb-2">
                            <p className="text-[10px] text-gray-500 tracking-widest">SESSÃO INICIADA</p>
                            <p className="text-xs text-white truncate font-light mt-1">{user.email}</p>
                        </div>
                        
                        <Link 
                            href="/perfil" 
                            className="block px-4 py-2 text-xs text-gray-400 hover:text-[#D4AF37] hover:bg-white/5 transition-all text-left uppercase tracking-widest"
                            onClick={() => setIsOpen(false)}
                        >
                            O Meu Perfil
                        </Link>
                        
                        <Link 
                            href="/encomendas" 
                            className="block px-4 py-2 text-xs text-gray-400 hover:text-[#D4AF37] hover:bg-white/5 transition-all text-left uppercase tracking-widest"
                            onClick={() => setIsOpen(false)}
                        >
                            As Minhas Encomendas
                        </Link>

                        <button 
                            onClick={handleSignOut}
                            className="w-full text-left px-4 py-2 text-xs text-red-500/80 hover:text-red-500 hover:bg-red-500/5 transition-all uppercase tracking-widest border-t border-gray-800 mt-2"
                        >
                            Sair
                        </button>
                    </div>
                </>
            )}
        </div>
    )
}
