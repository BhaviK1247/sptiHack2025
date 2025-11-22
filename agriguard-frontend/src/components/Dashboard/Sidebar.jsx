import React from 'react';

const Sidebar = () => {
    const menuItems = [
        { name: 'Dashboard', icon: '📊', path: '/dashboard', active: true },
        { name: 'Diagnosis', icon: '🌿', path: '/diagnosis', active: false },
        { name: 'History', icon: '📜', path: '/history', active: false },
        { name: 'Help', icon: '❓', path: '/help', active: false },
        { name: 'About', icon: 'ℹ️', path: '/about', active: false },
    ];

    return (
        <div className="w-64 bg-white h-screen shadow-lg flex flex-col fixed left-0 top-0 z-10">
            <div className="p-6 flex items-center gap-3 border-b border-gray-100">
                <div className="w-8 h-8 bg-gradient-to-r from-pink-400 to-yellow-400 rounded-full flex items-center justify-center text-white font-bold">
                    AG
                </div>
                <span className="text-xl font-bold text-gray-800">AgriGuard</span>
            </div>

            <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
                {menuItems.map((item) => (
                    <a
                        key={item.name}
                        href={item.path}
                        className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${item.active
                                ? 'bg-pink-50 text-pink-600 font-semibold shadow-sm'
                                : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                            }`}
                    >
                        <span className="text-xl">{item.icon}</span>
                        <span>{item.name}</span>
                        {item.name === 'Dashboard' && (
                            <span className="ml-auto bg-pink-100 text-pink-600 text-xs font-bold px-2 py-0.5 rounded-full">
                                20
                            </span>
                        )}
                    </a>
                ))}
            </nav>

            <div className="p-4 border-t border-gray-100">
                <div className="flex items-center gap-3 p-3 rounded-xl bg-gray-50">
                    <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-500">
                        👤
                    </div>
                    <div>
                        <p className="text-sm font-semibold text-gray-800">User Name</p>
                        <p className="text-xs text-gray-500">Farmer</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
