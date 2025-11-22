import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
    const location = useLocation();
    const isActive = (path) => location.pathname === path ? 'text-pink-600 font-bold' : 'text-gray-600 hover:text-pink-500';

    return (
        <nav className="sticky top-0 z-50 glass shadow-sm">
            <div className="max-w-7xl mx-auto px-6 py-3 flex justify-between items-center">
                {/* Logo Section */}
                <Link to="/" className="flex items-center gap-2 group">
                    <img 
                        src="/favicon.ico" 
                        alt="AgriGuard Logo" 
                        className="h-12 w-auto object-contain group-hover:scale-105 transition-transform" 
                    />
                </Link>

                {/* Center Navigation Links */}
                <div className="hidden md:flex items-center space-x-8">
                    <Link to="/" className={`text-base font-medium transition-colors ${isActive('/')}`}>Home</Link>
                    <Link to="/diagnosis" className={`text-base font-medium transition-colors ${isActive('/diagnosis')}`}>Diagnosis</Link>
                    <Link to="/dashboard" className={`text-base font-medium transition-colors ${isActive('/dashboard')}`}>Dashboard</Link>
                    <Link to="/help" className={`text-base font-medium transition-colors ${isActive('/help')}`}>Help</Link>
                </div>

                {/* Right Action Buttons */}
                <div className="flex items-center gap-4">
                    <button className="hidden md:block px-5 py-2 text-base text-gray-700 font-semibold hover:text-pink-600 transition-colors">
                        Log In
                    </button>
                    <button className="px-5 py-2 text-base text-white font-semibold bg-gradient-to-r from-pink-500 to-violet-500 hover:opacity-90 rounded-lg shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5">
                        Sign Up
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
