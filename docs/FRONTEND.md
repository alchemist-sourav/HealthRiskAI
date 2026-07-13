# Frontend Architecture

The frontend of HealthRisk AI is built using **Next.js 16**, leveraging the App Router for nested routing, fast server-side rendering, and optimal performance.

## Core Concepts

### 1. App Router
The application uses the `app/` directory structure introduced in Next.js 13+.
- `app/layout.tsx`: The root layout providing the global UI shell (Sidebar, Header) and the `AnimatePresence` wrapper for page transitions.
- `app/page.tsx`: The landing page/dashboard.
- `app/predict/page.tsx`: The clinical prediction workflow form.
- `app/analytics/page.tsx`: The data visualization page.
- `app/simulation/page.tsx`: The interactive HealthRisk Lab simulator.
- `app/report/page.tsx`: The AI Health Report generator.

### 2. Component Structure
Reusable UI elements are located in `components/`:
- **`components/ui/`**: Primitive components like `GlassCard.tsx`, `AnimatedCounter.tsx`, `MetricCard.tsx`, `LoadingSkeleton.tsx`, and `ProgressRing.tsx`.
- **`components/Sidebar.tsx` & `components/Header.tsx`**: Core navigational components.

### 3. UI Architecture (Glassmorphism & Theming)
The styling is driven by **Tailwind CSS 4** and customized via `app/globals.css`.
- Uses CSS variables (`--primary`, `--surface`, `--card`, etc.) to allow for fluid theme switching (Dark/Light).
- Implements a modern "Glassmorphism" aesthetic using `backdrop-blur` and translucent RGBA backgrounds.

### 4. Animations
**Framer Motion** is integrated heavily to provide a "premium" feel:
- Page transitions (fade-in, slide-up).
- Hover effects on cards and buttons.
- Animated counters for numbers scaling up.
- Smooth mounting/unmounting of loading states and scenario result cards.

### 5. Responsive Design
The layout uses Tailwind's mobile-first breakpoints. Complex grids (like the Dashboard KPIs and Analytics charts) gracefully collapse from 3-columns (`lg:grid-cols-3`) to a single column on mobile devices. Floating labels on forms ensure input touch-targets are accessible on smaller screens.
