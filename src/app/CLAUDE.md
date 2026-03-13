# View & API Context: src/app

Guidelines for pages and API routes.

## Routing
- **App Router**: Use Server Components by default.
- **API Routes**: Located in `src/app/api/`. Use Zod for validation.

## Page Layouts
- Use `layout.tsx` for shared sidebars/navbars.
- Ensure all pages use the luxury theme (Dark background, white/gold text).

## Performance
- Parallelize Supabase fetches where possible.
- Use `next/image` for all wine bottle photos.
