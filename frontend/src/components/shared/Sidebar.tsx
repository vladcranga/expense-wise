import React from 'react';
import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaChartPie, FaExchangeAlt, FaChevronLeft } from 'react-icons/fa';

interface SidebarProps {
    isCollapsed: boolean;
    toggleSidebar: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isCollapsed, toggleSidebar }) => {
    const sidebarVariants = {
        expanded: { width: '240px' },
        collapsed: { width: '72px' }
    };

    const menuItems = [
        { path: '/dashboard/expenses', icon: <FaChartPie />, text: 'Expenses' },
        { path: '/dashboard/converter', icon: <FaExchangeAlt />, text: 'Converter' }
    ];

    return (
        <motion.div
            className="h-full bg-gradient-to-b from-blue-500 to-indigo-600 text-white shadow-xl flex flex-col"
            initial="expanded"
            animate={isCollapsed ? 'collapsed' : 'expanded'}
            variants={sidebarVariants}
            transition={{ duration: 0.3 }}
        >
            <div className="p-4 flex justify-end">
                <motion.button
                    onClick={toggleSidebar}
                    className="p-2 rounded-full hover:bg-blue-400 transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                >
                    <motion.div
                        animate={{ rotate: isCollapsed ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        <FaChevronLeft />
                    </motion.div>
                </motion.button>
            </div>

            <nav className="flex-1">
                {menuItems.map((item) => (
                    <NavLink
                        key={item.path}
                        to={item.path}
                        className={({ isActive }) =>
                            `flex items-center p-4 space-x-4 hover:bg-blue-400 transition-colors ${
                                isActive ? 'bg-blue-400' : ''
                            }`
                        }
                    >
                        <div className="text-xl">{item.icon}</div>
                        <motion.span
                            animate={{ opacity: isCollapsed ? 0 : 1 }}
                            transition={{ duration: 0.2 }}
                            className={`whitespace-nowrap ${isCollapsed ? 'hidden' : 'block'}`}
                        >
                            {item.text}
                        </motion.span>
                    </NavLink>
                ))}
            </nav>
        </motion.div>
    );
};

export default Sidebar;