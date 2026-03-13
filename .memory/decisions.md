# Architecture & Project Decisions

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
