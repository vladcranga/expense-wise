import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaChartPie, FaExchangeAlt, FaCalculator } from 'react-icons/fa';
import { IoChevronForwardOutline, IoChevronBackOutline } from 'react-icons/io5';

interface SidebarProps {
    isCollapsed: boolean;
    toggleSidebar: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isCollapsed, toggleSidebar }) => {
    const location = useLocation();

    const menuItems = [
        {
            path: '/dashboard/expenses',
            name: 'Expenses',
            icon: FaChartPie
        },
        {
            path: '/dashboard/converter',
            name: 'Converter',
            icon: FaExchangeAlt
        },
        {
            path: '/dashboard/calculator',
            name: 'Calculator',
            icon: FaCalculator
        }
    ];

    return (
        <motion.div
            initial={{ width: isCollapsed ? '64px' : '240px' }}
            animate={{ width: isCollapsed ? '64px' : '240px' }}
            className="bg-gradient-to-b from-gray-50 via-gray-50 to-gray-100
                h-full shadow-lg flex flex-col border-r border-gray-200"
        >
            {/* Toggle Button */}
            <button
                onClick={toggleSidebar}
                className="p-3 hover:bg-white/50 self-end text-gray-600
                hover:text-gray-800 transition-colors"
            >
                {isCollapsed ? (
                    <IoChevronForwardOutline size={24} />
                ) : (
                    <IoChevronBackOutline size={24} />
                )}
            </button>

            {/* Navigation Links */}
            <nav className="flex-1 px-2">
                {menuItems.map((item) => {
                    const isActive = location.pathname === item.path;
                    return (
                        <Link
                            key={item.path}
                            to={item.path}
                            className={`
                                flex items-center px-3 py-3 my-1 rounded-lg
                                transition-all duration-200 group
                                ${isActive 
                                    ? 'bg-indigo-500 text-white shadow-md' 
                                    : 'text-gray-600 hover:bg-white/50 hover:text-gray-900'
                                }
                            `}
                        >
                            <div className={`
                                ${isActive 
                                    ? 'text-white' 
                                    : 'text-gray-500 group-hover:text-gray-700'
                                }
                                transition-colors duration-200
                            `}>
                                <item.icon size={20} />
                            </div>
                            {!isCollapsed && (
                                <span className={`
                                    ml-4 font-medium
                                    ${isActive 
                                        ? 'text-white' 
                                        : 'text-gray-600 group-hover:text-gray-900'
                                    }
                                `}>
                                    {item.name}
                                </span>
                            )}
                        </Link>
                    );
                })}
            </nav>
        </motion.div>
    );
};

export default Sidebar;