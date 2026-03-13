# Zero-to-Hero Contributor Guide

## Getting Started
Welcome to the 3G-Wine project! This guide will help you set up and start contributing quickly.

### 1. Prerequisites
- Node.js (Latest LTS)
- npm or pnpm
- A Supabase account (if working on DB/Auth)

### 2. Installation
```bash
npm install
```

### 3. Environment Setup
Copy `.env.example` to `.env.local` and fill in the Supabase credentials.
```bash
NEXT_PUBLIC_SUPABASE_URL=your_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_key
```

### 4. Development Workflow
1. **Start Dev Server**: `npm run dev`
2. **Feature Branch**: Create a branch for your work (`feature/your-feature`).
3. **HAM Memory**: Check `.memory/` before starting to understand the area you're working in.
4. **Style Guide**: Follow the clean code and CSS-first principles defined in `CLAUDE.md`.

### 5. Common Tasks
- **Adding a Product**: Modify the database via Supabase dashboard.
- **Updating UI**: Check `src/components` and use existing design tokens in `src/app/globals.css`.
- **State Changes**: Update `CartContext.tsx` if adding cart features.

### 6. Verification
Run the linter and tests before pushing:
```bash
npm run lint
```

## Support
Refer to `CLAUDE.md` for coding standards or open an issue for architectural questions.
