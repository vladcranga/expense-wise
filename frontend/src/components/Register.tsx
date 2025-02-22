import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import CurrencySelect from "./CurrencySelect";
import Footer from "./shared/Footer";

const Register: React.FC = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    baseCurrency: "",
  });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8080/api/v1/users/register", formData);
      setMessage(response.data);
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setMessage(error.response?.data || "Error occurred");
      } else {
        setMessage("An unknown error occurred");
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 flex flex-col">
      <div className="flex-grow flex flex-col items-center justify-center px-4">
        <div className="max-w-md w-full">
          <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">Create Account</h1>

          <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-lg space-y-6">
            <div>
              <label className="block text-gray-700 text-sm font-semibold mb-2">Username</label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="Choose a username"
              />
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-semibold mb-2">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="Choose a password"
              />
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-semibold mb-2">
                Base Currency
              </label>
              <CurrencySelect
                label=""
                value={formData.baseCurrency}
                onChange={(e) => setFormData({ ...formData, baseCurrency: e })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
            </div>
            <div className="space-y-3">
              <button
                type="submit"
                className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-300"
              >
                Sign Up
              </button>
              <Link
                to="/"
                className="block w-full px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors duration-300 text-center"
              >
                Back to Home
              </Link>
            </div>
          </form>
          {message && (
            <div
              className={`mt-4 p-4 rounded-lg text-center ${
                message.toLowerCase().includes("successfully")
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {message}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Register;
