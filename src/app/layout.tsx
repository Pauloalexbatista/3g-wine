import type { Metadata } from "next";
import { CartProvider } from '@/context/CartContext';
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://3gwine.pt"),
  title: "3GWINE | Garrafeira Exclusiva - Vinhos Premium",
  description: "Garrafeira 3GWINE na Póvoa de Santa Iria e loja online. Vinhos portugueses selecionados, reservas de cave, espumantes e edições limitadas.",
  keywords: [
    "3GWINE",
    "garrafeira Póvoa de Santa Iria",
    "vinhos portugueses",
    "vinho premium",
    "comprar vinho online Portugal",
    "garrafeira exclusiva",
    "vinhos Douro Alentejo",
  ],
  openGraph: {
    type: "website",
    locale: "pt_PT",
    url: "https://3gwine.pt",
    siteName: "3GWINE",
    title: "3GWINE | Garrafeira Exclusiva - Vinhos Premium",
    description: "Descubra a nossa carta de vinhos selecionados, reservas de cave e loja física na Póvoa de Santa Iria.",
    images: [
      {
        url: "/images/brand/3gwine-hero-bg.jpg",
        width: 1200,
        height: 630,
        alt: "Garrafeira 3GWINE",
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
  },
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
