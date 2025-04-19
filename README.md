# Frontend - StockWiseCare

## 🧠 Problem Statement
The frontend acts as the user interface for viewing stock portfolio data, market sentiment, donation contributions, and interacting with a financial assistant chatbot.

## ✅ Proposed Solution
A responsive and modern React + Next.js application that dynamically fetches and displays portfolio-related data via API, while also offering chatbot support for financial guidance.

## 💻 Tech Stack
- React.js
- Next.js
- Axios
- Tailwind CSS
- Framer Motion (optional for animations)

## 🚀 Core Features
- **Portfolio Value**: Displays total portfolio worth.
- **Today's Gain/Loss**: Visual indicator of today's market performance.
- **Charity Donations**: Total amount donated.
- **AI Market Insights**: Sentiment analysis on user holdings.
- **Stock Table**: Interactive table listing stock details.
- **Chatbot Assistant**: A conversational AI interface for finance-related questions.

## ✨ Additional Features
- Responsive UI using Tailwind CSS.
- Tabbed navigation for seamless section switching.
- Smooth animations and interactive charts (optional).
- Mobile-friendly layout.

## 🔧 Implementation
- API calls using `Axios` from `https://stockwisecare-backend.onrender.com`.
- State handled using `useState` and `useEffect`.
- Chatbot integrated using a dedicated component (`/components/Chatbot.js`) that sends messages to the backend.
- Conditional rendering and loading indicators used for better UX.

## 🌐 Deployment
- Deployed on **Vercel**:  
  🔗 [Frontend Live](https://stock-wise-care-frontend-jpmwhuao4-sripoojitha31s-projects.vercel.app)
- `.env` configuration:
  ```bash
  NEXT_PUBLIC_API_BASE_URL=https://stockwisecare-backend.onrender.com
