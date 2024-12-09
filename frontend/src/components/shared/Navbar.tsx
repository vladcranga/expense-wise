import { useNavigate } from 'react-router-dom';

const Navbar = () => {
    const navigate = useNavigate();
    const username = localStorage.getItem('username');

    const handleLogout = () => {
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('username');
        localStorage.removeItem('userId');
        localStorage.removeItem('baseCurrency');
        navigate('/');
    };
    
    return (
        <div
            className="w-full bg-gradient-to-r from-blue-500 to-indigo-600
            text-white p-4 flex justify-between items-center shadow-md"
        >
            <span className="text-lg font-semibold">
                Welcome, {username}.
            </span>
            <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-500 text-white rounded-lg
                hover:bg-red-600 transition-all duration-300"
            >
                Logout
            </button>
        </div>
    );
};

export default Navbar;
