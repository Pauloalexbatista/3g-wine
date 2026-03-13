import AuthForm from '@/components/AuthForm'
import Image from 'next/image'

export default function LoginPage() {
    return (
        <div className="relative min-h-screen flex items-center justify-center p-4 overflow-hidden">
            {/* Background Image with Overlay */}
            <div className="absolute inset-0 z-0">
                <Image
                    src="/images/access-bg.png"
                    alt="Wine Cellar Background"
                    fill
                    className="object-cover"
                    priority
                />
                <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]"></div>
            </div>

            <div className="relative z-10 w-full max-w-md">
                <div className="mb-12 text-center animate-fadeIn">
                    <h1 className="text-4xl md:text-5xl font-serif text-white tracking-[0.3em] mb-4">
                        3G<span className="text-[#D4AF37]">WINE</span>
                    </h1>
                    <p className="text-gray-400 font-light tracking-[0.2em] text-xs uppercase">
                        EXCLUSIVIDADE & TRADIÇÃO
                    </p>
                </div>
                
                <AuthForm />
            </div>
        </div>
    )
}
