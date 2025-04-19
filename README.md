# Frontend - StockWiseCare

## Problem Statement
The frontend serves as the dashboard for users to view their investment portfolio, market insights, and charity donations.

## Proposed Solution
A responsive React application that communicates with the backend to display real-time data about stocks, portfolio performance, and charity donations.

## Tech Stack
- React
- Next.js
- Axios
- Tailwind CSS

## Core Features
- **Portfolio Value**: Displays the total value of the user's portfolio.
- **Today's Gain/Loss**: Shows the current day's gain or loss.
- **Charity Donations**: Displays total donations.
- **AI Market Insights**: Provides sentiment analysis for the user's holdings.
- **Stock Table**: Displays a list of stock holdings.

## Additional Features
- Responsive design using Tailwind CSS.
- Dynamic tabbed navigation for each section.
- Interactive charts and data.

## Implementation
- Data is fetched from the backend using `Axios` through GET requests.
- State management with `useState` and `useEffect` hooks.
- Implemented tabbed navigation for seamless user experience.

## Deployment
1. Deploy to Vercel or any similar platform.
2. Ensure the API URL (`NEXT_PUBLIC_API_BASE_URL`) is set correctly in environment variables.

## Integration with Backend
The frontend communicates with the backend through Axios calls. It fetches data in JSON format, which is rendered on the frontend.

## Notes
While the frontend and backend are connected, some additional features like authentication and data validation need to be implemented.
