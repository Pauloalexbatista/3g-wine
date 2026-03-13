# Project Patterns & Styles

## UI Patterns (Luxury Aesthetics)

### Gold Border & Glow
```css
border: 1px solid rgba(212, 175, 55, 0.3);
box-shadow: 0 0 15px rgba(212, 175, 55, 0.1);
```

### Glassmorphism Card
```css
background: rgba(255, 255, 255, 0.03);
backdrop-filter: blur(10px);
border: 1px solid rgba(255, 255, 255, 0.1);
```

### Premium Gradient
```css
background: linear-gradient(135deg, #000 0%, #1a1a1a 100%);
```

### Color Palette (Luxury Standard)
- **Primary (Gold)**: `#D4AF37`
- **Text (Off-White)**: `#D9D9D9`
- **Background**: Deep Blacks and Dark Grays for depth.

### Icons & Assets
- **Icons**: Always use `lucide-react` for a consistent, thin-stroke luxury feel.
- **Images**: High-resolution, dark-themed renders for wine bottles.

### Animations
- **Library**: `framer-motion`.
- **Style**: Subtle entries, slow fades (0.5s - 0.8s), no jarring movements.

## Functional Patterns

### Supabase Server (SSR)
Use `lib/supabaseServer.ts` for Server Components.
