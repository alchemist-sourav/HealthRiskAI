# Performance & Optimization

HealthRisk AI is optimized for speed, ensuring a premium user experience with minimal latency.

## Next.js Optimizations

1. **Server-Side Rendering (SSR) & Static Site Generation (SSG)**
   - The Next.js App Router statically pre-renders pages where possible, delivering HTML instantly to the browser and avoiding heavy client-side JavaScript execution for static content.
   - Turbopack is used during development for lightning-fast HMR (Hot Module Replacement).

2. **Bundle Size Reduction**
   - Heavy dependencies like `recharts` and `framer-motion` are tree-shaken by Next.js.
   - Only the specific Lucide-React icons used on a page are bundled, rather than importing the entire icon library.

3. **Lazy Loading**
   - Next.js `next/image` is used for optimized image delivery (compressing WebP formats and lazy loading below-the-fold content).
   - Dynamic imports can be utilized to split large chart components so they only load when visible in the viewport.

## Backend Optimizations

1. **In-Memory ML Models**
   - Pre-trained models (`.pkl`) are loaded into memory *once* when the FastAPI server starts. This prevents disk I/O bottlenecks during live prediction requests, keeping API response times under 50ms.

2. **Asynchronous Processing**
   - FastAPI handles incoming requests asynchronously, allowing thousands of concurrent clinical requests without blocking the event loop.

## Animation Performance

- All Framer Motion animations utilize hardware-accelerated CSS properties (`transform`, `opacity`) rather than layout-triggering properties (`width`, `margin`), ensuring silky smooth 60 FPS transitions even on low-end devices.
