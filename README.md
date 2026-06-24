# Google Sheet AI Analyzer (Backend)

The backend service for the Google Sheets AI Analyzer. This API allows users to link a public Google Sheet and query its underlying data using natural language.

It handles data retrieval via the Google Sheets API and processes natural language queries using the Google Gemini API.

### 🔗 Links

- **Live Demo:** [Google Sheet Analyzer Frontend](https://google-sheet-analyzer-frontend.vercel.app/)
- **Frontend Repository:** [github.com/alexandercsierra/google-sheet-analyzer-frontend](https://github.com/alexandercsierra/google-sheet-analyzer-frontend)

---

### 🛠️ Tech Stack

- **Runtime:** Node.js
- **Framework:** Express.js
- **APIs:** Google Sheets API, Google Gemini API

---

### 🚀 Getting Started

To run this backend locally, follow these steps:

#### 1. Prerequisites

Ensure you have [Node.js](https://nodejs.org/) installed. You will also need:

- A Google Gemini API Key
- A Google Developer Account with the Sheets API enabled (if using restricted/service account access, though public sheets may just need a standard API key).

#### 2. Environment Setup

Create a `.env` file in the root directory and add your credentials:

```env
PORT=your_preferred_port_here
SESSION_SECRET=your_session_secret_here
GOOGLE_SHEETS_API_KEY=your_google_sheets_api_key_here
GEMINI_API_KEY=your_gemini_api_key_here
```
