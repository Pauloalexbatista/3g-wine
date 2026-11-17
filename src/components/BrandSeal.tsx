'use client';

import React from 'react';

function LogoSymbolWhite() {
  return (
    <>
      {/* Gota no topo */}
      <path d="M50 9 C50 9 45 19 45 23.5 A5 5 0 0 0 55 23.5 C55 19 50 9 50 9 Z" fill="#FFFFFF" />
      {/* "3" estilizado à esquerda */}
      <path d="M22 24 L37 24 Q42 24 42 29 Q42 32.5 38 33.5 Q42 34.5 42 38 Q42 43 36 43 L24 43 L27 38.5 L35 38.5 Q37 38.5 37 36.5 Q37 35 34 35 L29 35 L29 31.5 L34 31.5 Q37 31.5 37 29.8 Q37 28 34.5 28 L25 28 Z" fill="#FFFFFF" />
      {/* "G" estilizado à direita */}
      <path d="M78 24 L64 24 Q58 24 58 33.5 Q58 43 65 43 L74 43 Q78 43 78 38 L78 32.5 L68 32.5 L68 36 L73.5 36 L73.5 38.5 Q73.5 39.2 72 39.2 L65.5 39.2 Q62.8 39.2 62.8 33.5 Q62.8 28 65.5 28 L75.5 28 Z" fill="#FFFFFF" />
      {/* Garrafa central */}
      <path d="M47 32 L53 32 L53 42 Q53 46 57.5 50 L57.5 85 Q57.5 88 54.5 88 L45.5 88 Q42.5 88 42.5 85 L42.5 50 Q47 46 47 42 Z" fill="#FFFFFF" />
      {/* Texto WINE vertical recortado */}
      <text
        x="50"
        y="69"
        textAnchor="middle"
        transform="rotate(-90 50 69)"
        fontFamily="Georgia, serif"
        fontSize="8.5"
        fontWeight="bold"
        letterSpacing="1.2"
        fill="#8B1538"
      >
        WINE
      </text>
      {/* Taça esquerda */}
      <path d="M24 54 L38 54 Q38 66 31 68 L31 85 L36 85 L36 88 L26 88 L26 85 L29.5 85 L29.5 68 Q24 66 24 54 Z" fill="#FFFFFF" />
      {/* Taça direita */}
      <path d="M62 54 L76 54 Q76 66 69 68 L69 85 L74 85 L74 88 L64 88 L64 85 L67.5 85 L67.5 68 Q62 66 62 54 Z" fill="#FFFFFF" />
    </>
  );
}

/** Brasão circular oficial para o cabeçalho */
export function BrandCrest({ className = 'w-10 h-10' }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" className={className} aria-hidden="true">
      <circle cx="50" cy="50" r="46" fill="#8B1538" stroke="#D4AF37" strokeWidth="3.5" />
      <circle cx="50" cy="50" r="40" fill="none" stroke="#FFFFFF" strokeOpacity="0.35" strokeWidth="1.5" />
      <g transform="translate(12, 12) scale(0.76)">
        <LogoSymbolWhite />
      </g>
    </svg>
  );
}

/** Selo de lacre vermelho com o símbolo 3GWINE a branco */
export function RedWaxSeal({ className = 'w-20 h-20' }: { className?: string }) {
  const gradId = React.useId();
  return (
    <svg viewBox="0 0 100 100" className={className} aria-hidden="true">
      <defs>
        <radialGradient id={gradId} cx="35%" cy="35%" r="65%">
          <stop offset="0%" stopColor="#D4213F" />
          <stop offset="65%" stopColor="#8B1538" />
          <stop offset="100%" stopColor="#4A0918" />
        </radialGradient>
      </defs>
      <path
        d="M50 4 C60 2,70 8,78 13 C86 18,93 27,95 37 C98 48,94 59,91 69 C88 79,80 88,70 92 C60 96,49 97,38 94 C27 91,17 85,11 75 C5 65,4 53,6 42 C8 31,14 20,23 13 C32 6,41 6,50 4 Z"
        fill={`url(#${gradId})`}
        stroke="#380611"
        strokeWidth="1.5"
      />
      <circle cx="50" cy="50" r="35" fill="none" stroke="#FFFFFF" strokeOpacity="0.35" strokeWidth="1" />
      <circle cx="50" cy="50" r="32" fill="none" stroke="#380611" strokeOpacity="0.55" strokeWidth="1" />
      <g transform="translate(20, 20) scale(0.6)">
        <LogoSymbolWhite />
      </g>
    </svg>
  );
}
