import { Link } from "react-router-dom";
import Footer from "./components/shared/Footer";

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="flex flex-col lg:flex-row items-center justify-between">
          <div className="lg:w-1/2 mb-8 lg:mb-0">
            <h1 className="text-5xl font-bold text-gray-800 mb-6">
              Take Control of Your
              <span className="text-blue-500"> Finances</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              In times of rising living costs, every penny counts. Track your
              expenses, convert currencies, and make data-driven financial
              decisions.
            </p>
            <div className="flex space-x-4">
              <Link
                to="/register"
                className="px-8 py-3 bg-blue-500 text-white rounded-lg shadow-lg
                  hover:bg-blue-600 transition-all duration-300 text-lg font-semibold"
              >
                Get Started
              </Link>
              <Link
                to="/login"
                className="px-8 py-3 bg-white text-blue-500 rounded-lg shadow-lg
                  hover:bg-gray-50 transition-all duration-300 text-lg font-semibold
                  border border-blue-500"
              >
                Sign In
              </Link>
            </div>
          </div>
          <div className="lg:w-1/2 flex justify-center">
            <div className="rounded-lg">
              <div className="w-full h-64 rounded-lg flex items-center justify-center">
                <svg
                  className="w-64 h-64 transform -rotate-90 scale-110"
                  viewBox="0 0 100 100"
                >
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    fill="transparent"
                    stroke="#2196F3"
                    strokeWidth="20"
                    strokeDasharray="125.66 251.32"
                    className="opacity-90"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    fill="transparent"
                    stroke="#9966FF"
                    strokeWidth="20"
                    strokeDasharray="62.83 251.32"
                    strokeDashoffset="-125.66"
                    className="opacity-90"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    fill="transparent"
                    stroke="#FF5252"
                    strokeWidth="20"
                    strokeDasharray="37.70 251.32"
                    strokeDashoffset="-188.49"
                    className="opacity-90"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    fill="transparent"
                    stroke="#4BC0C0"
                    strokeWidth="20"
                    strokeDasharray="25.13 251.32"
                    strokeDashoffset="-226.19"
                    className="opacity-90"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Statistics Section */}
      <div className="bg-white py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
            Why Track Your Expenses?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 bg-blue-50 rounded-lg">
              <div className="text-blue-500 mb-4">
                <svg
                  className="w-12 h-12"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">
                Global Economic Changes
              </h3>
              <p className="text-gray-600">
                With Eurozone inflation at 2.3% and US core inflation at 2.8%
                (November 2024), tracking expenses is more important than ever.
                <span className="block text-xs mt-2 text-gray-500">
                  Sources:{" "}
                  <a
                    href="https://www.ft.com/content/da0cba5d-c0f5-4754-8b69-e0b615336a80"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-blue-500 transition-colors duration-200"
                  >
                    Financial Times
                  </a>
                  {", "}
                  <a
                    href="https://nypost.com/2024/11/27/business/feds-preferred-inflation-gauge-ticked-higher-to-2-8/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-blue-500 transition-colors duration-200"
                  >
                    New York Post
                  </a>
                </span>
              </p>
            </div>
            <div className="p-6 bg-blue-50 rounded-lg">
              <div className="text-blue-500 mb-4">
                <svg
                  className="w-12 h-12"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">
                International Spending
              </h3>
              <p className="text-gray-600">
                With increasing global commerce, managing expenses across
                different currencies is becoming essential.
              </p>
            </div>
            <div className="p-6 bg-blue-50 rounded-lg">
              <div className="text-blue-500 mb-4">
                <svg
                  className="w-12 h-12"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Smart Budgeting</h3>
              <p className="text-gray-600">
                Research shows that people who track their spending are more
                likely to achieve their financial goals.
                <span className="block text-xs mt-2 text-gray-500">
                  Source:{" "}
                  <a
                    href="https://www.consumerfinance.gov/about-us/blog/budgeting-how-to-create-a-budget-and-stick-with-it/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-blue-500 transition-colors duration-200"
                  >
                    Consumer Financial Protection Bureau
                  </a>
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
          Features That Make a Difference
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
              <svg
                className="w-8 h-8 text-blue-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Visual Analytics</h3>
            <p className="text-gray-600">
              Track your spending patterns with intuitive charts.
            </p>
          </div>
          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
              <svg
                className="w-8 h-8 text-blue-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M14 10l-2 1m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Currency Conversion</h3>
            <p className="text-gray-600">
              Convert between multiple currencies with real-time exchange rates.
            </p>
          </div>
          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
              <svg
                className="w-8 h-8 text-blue-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Monthly Tracking</h3>
            <p className="text-gray-600">
              Organise and review your expenses on a monthly basis.
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;
