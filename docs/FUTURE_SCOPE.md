# Future Scope

HealthRisk AI is designed as an extensible foundation. The following features are planned for future major releases:

### 1. Authentication & Role-Based Access Control (RBAC)
- Integration with NextAuth or Supabase to allow secure logins.
- **Doctor Portal:** Access patient history, manage clinical notes, and override AI recommendations.
- **Patient Portal:** View personal risk assessments and track lifestyle improvements over time.

### 2. Hospital & Multi-Tenant Dashboard
- Expand the analytics to view aggregate data across an entire hospital network, tracking demographic risk clusters and resource allocation needs based on predictive trends.

### 3. Medical Image Analysis (Computer Vision)
- Integrate a PyTorch/TensorFlow microservice to analyze X-Rays and MRI scans, supplementing the tabular data models with visual diagnostic capabilities (e.g., detecting pneumonia or tumor growth).

### 4. Large Language Model (LLM) Integration
- Leverage OpenAI or local open-source LLMs (e.g., Llama 3) to summarize unstructured doctor notes and automatically extract tabular parameters required for the prediction models.
- Implement an interactive "AI Assistant" chatbot on the report page to answer patient queries in natural language based on their specific risk profile.

### 5. Wearable Device Integration (IoT)
- Implement webhooks and APIs to ingest continuous real-time data from Apple Watch, Fitbit, or continuous glucose monitors, enabling dynamic, minute-by-minute risk re-evaluations.

### 6. PDF Export Engine
- Replace the placeholder Export button on the AI Report page with `react-pdf` or a Puppeteer backend service to generate compliant, printable clinical reports.
