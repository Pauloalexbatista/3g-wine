# Project History - 3GWine

## Phase 1: Foundation (Early 2026)
- **Objective**: Establish the luxury brand identity and basic storefront.
- **Key Milestones**:
    - Project initialization with Next.js and Tailwind CSS.
    - Implementation of the dark/gold luxury design system.
    - Integration with Supabase / PostgreSQL for Auth and Database.
    - Creation of the Hero section.
    - Development of the "A Nossa Seleção" grid.

## Phase 2: Web3 & Virtual Wines (March 2026)
- **Objective**: Launch the virtual wine (NFT) experience.
- **Key Milestones**:
    - Development of the `/vinho-virtual` landing page.
    - Implementation of 3D/hover effects and gold shimmer CTA.
    - Affirmation of the "misterioso e premium" aesthetic.

## Phase 3: Commercial Stability & Infrastructure (October 2026)
- **Key Milestones**:
    - **Hostinger VPS & Coolify Setup**: Deployed standalone Next.js with PostgreSQL (`wine3g_prod`) on VPS (`187.7.68.192`).
    - **SSL Let's Encrypt**: Verified DNS propagation for `3gwine.pt` and `www.3gwine.pt`, fixed Traefik fallback certificate and activated official SSL (valid with auto-renewal).
    - **Hero Background**: Integrated authentic high-resolution photograph of the 3GBARBEARIA / 3GWINE physical store with `objectPosition: 'center top'` and dark luxury gradient overlay.
    - **IFTHENPAY Architecture**:
        - Created full payment service in `src/lib/ifthenpay.ts` supporting Multibanco dynamic references and MB WAY push notifications.
        - Integrated `/api/checkout` to create orders and initiate payments.
        - Created `/api/payments/ifthenpay-callback` webhook for instant automatic order confirmation upon payment.
        - Added `/api/payments/status` with polling and sandbox simulation support.
        - Upgraded `/carrinho` with MB WAY / Multibanco selection, NIF field, and luxury modal with countdown and reference copy.
        - Upgraded `/admin/encomendas` with payment status badges (PAGO / PENDENTE), reference info, and customer NIF on packing slip.
        - Applied DB migration to `orders` table on production VPS.
