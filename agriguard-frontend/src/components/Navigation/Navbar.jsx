import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav className="bg-green-600 p-4 text-white">
            <div className="container mx-auto flex justify-between">
                <Link to="/" className="font-bold text-xl">AgriGuard</Link>
                <div className="space-x-4">
                    <Link to="/">Home</Link>
                    <Link to="/diagnosis">Diagnosis</Link>
                    <Link to="/dashboard">Dashboard</Link>
                    <Link to="/help">Help</Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
