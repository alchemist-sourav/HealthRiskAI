# HealthRisk AI — Frontend

> Next.js 16 + TypeScript frontend for the HealthRisk AI platform.

For full project documentation — including architecture, API reference, ML model details, and setup instructions — see the **[root README](../README.md)**.

---

## Quick Start

```bash
# Install dependencies
npm install

# Start development server (requires backend running on port 8000)
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Available Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start the Next.js development server |
| `npm run build` | Build for production |
| `npm run start` | Start the production server |
| `npm run lint` | Run ESLint |

---

## Pages

| Route | Description |
|-------|-------------|
| `/dashboard` | Main dashboard with KPI metrics and recent predictions |
| `/predict` | Prediction forms for Heart Disease, Diabetes, and Insurance |
| `/simulation` | Interactive stress-test simulator with live sliders |
| `/analytics` | Enterprise analytics with 6+ chart types |
| `/report` | AI-generated health report with PDF export |
| `/about` | Project info, model performance, and tech stack |

---

## Tech Stack

- **Framework:** Next.js 16.2.10 (App Router)
- **Language:** TypeScript 5
- **Styling:** Tailwind CSS 4
- **Animations:** Framer Motion 12
- **Charts:** Recharts 3
- **Forms:** React Hook Form + Zod
- **HTTP:** Axios
- **Icons:** Lucide React

---

For full documentation, visit the [project root README](../README.md).
