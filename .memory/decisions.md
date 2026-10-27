# Architecture & Project Decisions

## 2026-10-27: IFTHENPAY Complete Architecture & Sandbox Strategy
- **Context**: Need to support Multibanco and MB WAY while client finalizes merchant contract with IFTHENPAY.
- **Decision**: Implemented `src/lib/ifthenpay.ts` with transparent `IFTHENPAY_SANDBOX` fallback mode, `/api/checkout`, webhook `/api/payments/ifthenpay-callback`, status polling `/api/payments/status`, and frontend modal in `/carrinho`.
- **Impact**: Zero downtime; full testing capability before merchant keys are entered; instant transition to production upon setting real keys in `.env`.

## 2026-10-27: Let's Encrypt SSL Fix on Production VPS
- **Context**: `3gwine.pt` was serving `TRAEFIK DEFAULT CERT` with `NET::ERR_CERT_AUTHORITY_INVALID` due to initial DNS propagation delay on 2026-10-16.
- **Decision**: Re-triggered ACME verification on Traefik proxy after confirming DNS A-record to `187.7.68.192`.
- **Impact**: Official Let's Encrypt certificate active on both `3gwine.pt` and `www.3gwine.pt` with automatic renewal.

## 2026-10-27: Authentic Physical Store Hero Background
- **Context**: The client provided high-res original photograph of the 3GBARBEARIA / 3GWINE store.
- **Decision**: Applied image to Hero section with `objectPosition: 'center top'`, 95vh height, and subtle gold/dark vignette gradient.
- **Impact**: Showcases the founding history and physical shop while preserving text legibility.

## 2026-03-12: Adoption of HAM (Hierarchical Agent Memory)
- **Context**: Project growing in complexity, need for stable context retention.
- **Decision**: Implement HAM structure with root CLAUDE.md and scoped sub-contexts.
- **Impact**: Reduced token usage, more accurate agent interventions, better stability.

## 2026-03-12: Supabase Integration Check
- **Context**: Project uses Supabase for Auth/DB.
- **Decision**: Keep Supabase for real-time features and secure data storage. Ensure RLS is active.
- **Impact**: Backend stability and security.

## Historical Decisions (Restored from Project Status)

### Admin Management Strategy
- **Decision**: Only the **Admin Dashboard** is implemented for order and inventory management. No user-facing dashboard will be created to keep the experience elite and focused on the product.

### Payment Integration
- **Decision**: Adopt **IFTHENPAY** for specialized Portuguese market support (Multibanco, MB Way).
- **Reasoning**: Local trust and integration simplicity for the Portuguese luxury market.

### VPS Deployment (Staging/Production)
- **Decision**: Using a temporary admin password for VPS setup and testing until the official release.
- **Security Note**: Must be replaced with a secure rotation strategy before public launch.
