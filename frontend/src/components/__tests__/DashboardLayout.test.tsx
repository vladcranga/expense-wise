import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import DashboardLayout from '../dashboard/DashboardLayout';
import { BrowserRouter } from 'react-router-dom';

// Mock the child components
vi.mock('../shared/Navbar', () => ({
    default: () => <div data-testid="mock-navbar">Navbar</div>
}));

vi.mock('../shared/Sidebar', () => ({
    default: ({ isCollapsed, toggleSidebar }: { isCollapsed: boolean; toggleSidebar: () => void }) => (
        <div data-testid="mock-sidebar" onClick={toggleSidebar}>
            Sidebar {isCollapsed ? 'Collapsed' : 'Expanded'}
        </div>
    )
}));

// Mock the Outlet component from react-router-dom
vi.mock('react-router-dom', async () => {
    const actual = await vi.importActual('react-router-dom');
    return {
        ...actual,
        Outlet: () => <div data-testid="mock-outlet">Outlet Content</div>
    };
});

describe('DashboardLayout', () => {
    const renderWithRouter = () => {
        return render(
            <BrowserRouter>
                <DashboardLayout />
            </BrowserRouter>
        );
    };

    it('renders navbar and sidebar', () => {
        renderWithRouter();
        
        expect(screen.getByTestId('mock-navbar')).toBeInTheDocument();
        expect(screen.getByTestId('mock-sidebar')).toBeInTheDocument();
        expect(screen.getByTestId('mock-outlet')).toBeInTheDocument();
    });

    it('toggles sidebar state when clicked', () => {
        renderWithRouter();
        
        const sidebar = screen.getByTestId('mock-sidebar');
        expect(sidebar).toHaveTextContent('Expanded');
        
        fireEvent.click(sidebar);
        expect(sidebar).toHaveTextContent('Collapsed');
        
        fireEvent.click(sidebar);
        expect(sidebar).toHaveTextContent('Expanded');
    });
});
