import { redirect } from 'next/navigation';
import { createClient } from '@/utils/supabase/server';

export default async function ProfilePage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }

  return (
    <div className="pt-32 pb-20 px-4 min-h-screen bg-[#0a0a0a] text-white">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">O Meu Perfil</h1>
        
        <div className="bg-[#111] border border-[#222] rounded-xl p-8 shadow-xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-xl font-semibold mb-4 text-[#800000]">Informação Pessoal</h2>
              <div className="space-y-4">
                <div>
                  <p className="text-gray-400 text-sm">Email</p>
                  <p className="text-lg font-medium">{user.email}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm">ID de Utilizador</p>
                  <p className="text-sm font-mono text-gray-500">{user.id}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Último Acesso</p>
                  <p className="text-sm">{new Date(user.last_sign_in_at || '').toLocaleString('pt-PT')}</p>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col justify-end">
              <button className="bg-[#800000] text-white font-bold py-2 px-6 rounded-lg hover:bg-[#a00000] transition-colors w-full md:w-auto self-end">
                Editar Perfil
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
