# Logic & Utilities Context: src/lib

Guidelines for business logic and data.

## Supabase
- Manage clients here (`supabaseClient.ts`, `supabaseServer.ts`).
- Centralize all DB queries in service functions if possible.

## Payment (IFTHENPAY)
- Payment logic should be abstracted here.
- Handle MBWay and Multibanco payloads securely.
