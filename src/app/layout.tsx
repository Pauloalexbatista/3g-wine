import type { Metadata } from "next";
import { CartProvider } from '@/context/CartContext';
import "./globals.css";

export const metadata: Metadata = {
  title: "3GWINE | Garrafeira exclusiva - Vinhos Premium",
  description: "Descubra a nossa seleção exclusiva de vinhos premium. Qualidade, tradição e excelência em cada garrafa.",
  keywords: "vinhos, vinho premium, loja de vinhos, vinho português, garrafeira exclusiva",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt" suppressHydrationWarning>
      <body className="antialiased" suppressHydrationWarning>
        <CartProvider>
          {children}
        </CartProvider>
      </body>
    </html>
  );
}
