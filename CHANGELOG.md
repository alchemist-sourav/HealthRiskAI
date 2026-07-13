# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2026-07-14

### Added
- **Core Architecture**: Full-stack Next.js 16 (Turbopack) and FastAPI architecture.
- **Machine Learning**: 
  - Random Forest model for Heart Disease prediction.
  - Gradient Boosting model for Diabetes Risk prediction.
  - Linear Regression model for Medical Insurance Premium estimation.
- **Frontend UI/UX**:
  - Floating sidebar and responsive navigation.
  - Premium dark theme with glassmorphism effects and tailored gradients.
  - Dashboard with 6 animated KPI cards and live AI status badges.
  - Clinical Workflow Prediction Page with floating labels and visual risk gauges.
  - Interactive Analytics page with Recharts (Area, Pie, Bar, Radar, Scatter).
  - ChatGPT-style AI Health Report with timeline-based recommendations.
  - HealthRisk Lab Simulation for stress-testing market and hospital portfolios.
  - About page detailing datasets, tech stack, and developer information.
- **Tooling**:
  - Pre-configured `eslint` rules.
  - Setup `.env.example` and security configurations.
  - Added GitHub Issue and PR templates.

### Fixed
- Stabilized Next.js build environment by removing conflicting lockfiles.
- Fixed Git submodule tracking issues for the frontend directory.
