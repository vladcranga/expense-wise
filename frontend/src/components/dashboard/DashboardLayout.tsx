import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../shared/Navbar';
import Sidebar from '../shared/Sidebar';

const DashboardLayout: React.FC = () => {
    const [isCollapsed, setIsCollapsed] = useState(false);

    const toggleSidebar = () => {
        setIsCollapsed(!isCollapsed);
    };

    return (
        <div className="flex flex-col h-screen">
            <Navbar />
            <div className="flex flex-1 overflow-hidden">
                <Sidebar isCollapsed={isCollapsed} toggleSidebar={toggleSidebar} />
                <main className="flex-1 overflow-auto bg-gray-100 p-4">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default DashboardLayout;
