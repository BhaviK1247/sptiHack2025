import React from 'react';
import Navbar from '../Navigation/Navbar';

const MainLayout = ({ children }) => {
    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-grow bg-gray-50">
                {children}
            </main>
            <footer className="bg-gray-800 text-white p-4 text-center">
                &copy; 2025 AgriGuard
            </footer>
        </div>
    );
};

export default MainLayout;
