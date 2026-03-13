import { redirect } from 'next/navigation';
import { createClient } from '@/utils/supabase/server';

export default async function OrdersPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }

  // Placeholder for orders
  const orders: any[] = [];

  return (
    <div className="pt-32 pb-20 px-4 min-h-screen bg-[#0a0a0a] text-white">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold">Histórico de Encomendas</h1>
          <span className="bg-[#111] border border-[#222] px-4 py-1 rounded-full text-sm text-gray-400">
            {orders.length} Encomendas
          </span>
        </div>
        
        {orders.length === 0 ? (
          <div className="bg-[#111] border border-[#222] rounded-xl p-12 text-center">
            <div className="text-5xl mb-4">🍷</div>
            <h2 className="text-xl font-medium mb-2">Ainda não tem encomendas</h2>
            <p className="text-gray-400 mb-6">Explore a nossa loja e descubra vinhos exclusivos.</p>
            <a 
              href="/loja" 
              className="inline-block bg-white text-black font-bold py-2 px-8 rounded-full hover:bg-gray-200 transition-colors"
            >
              Ir para a Loja
            </a>
          </div>
        ) : (
          <div className="space-y-4">
            {/* Map orders here */}
          </div>
        )}
      </div>
    </div>
  );
}
