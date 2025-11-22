import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import AuthModal from '../Auth/AuthModal';

const Navbar = () => {
    const location = useLocation();
    const { currentUser, logout } = useAuth();
    const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
    const [authMode, setAuthMode] = useState('login');

    const isActive = (path) => location.pathname === path ? 'text-pink-600 font-bold' : 'text-gray-600 hover:text-pink-500';

    const handleLogout = async () => {
        try {
            await logout();
        } catch (error) {
            console.error("Failed to log out", error);
        }
    };

    const openAuthModal = (mode) => {
        setAuthMode(mode);
        setIsAuthModalOpen(true);
    };

    return (
        <>
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
                    {currentUser ? (
                        <>
                            <span className="text-sm text-gray-600 hidden md:block font-medium">
                                {currentUser.email?.split('@')[0]}
                            </span>
                            <button 
                                onClick={handleLogout}
                                className="px-5 py-2 text-base text-gray-700 font-semibold hover:text-pink-600 transition-colors"
                            >
                                Log Out
                            </button>
                        </>
                    ) : (
                        <>
                            <button 
                                onClick={() => openAuthModal('login')}
                                className="hidden md:block px-5 py-2 text-base text-gray-700 font-semibold hover:text-pink-600 transition-colors"
                            >
                                Log In
                            </button>
                            <button 
                                onClick={() => openAuthModal('signup')}
                                className="px-5 py-2 text-base text-white font-semibold bg-gradient-to-r from-pink-500 to-violet-500 hover:opacity-90 rounded-lg shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5"
                            >
                                Sign Up
                            </button>
                        </>
                    )}
                </div>
            </div>
        </nav>

        <AuthModal 
            isOpen={isAuthModalOpen} 
            onClose={() => setIsAuthModalOpen(false)} 
            initialMode={authMode}
        />
        </>
    );
};

export default Navbar;
