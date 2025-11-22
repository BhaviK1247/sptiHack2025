import React, { useEffect, useState } from 'react';

const StatsModal = ({ isOpen, onClose, stat }) => {
    const [animate, setAnimate] = useState(false);

    useEffect(() => {
        if (isOpen) {
            setTimeout(() => setAnimate(true), 50);
        } else {
            setAnimate(false);
        }
    }, [isOpen]);

    if (!isOpen) return null;

    const LineChart = ({ data, color }) => {
        const max = Math.max(...data);
        const points = data.map((val, i) => {
            const x = (i / (data.length - 1)) * 100;
            const y = 100 - (val / max) * 80; // Keep some padding at top
            return `${x},${y}`;
        }).join(' ');

        return (
            <div className="h-64 w-full relative mt-8 bg-gray-50 rounded-2xl p-4 border border-gray-100">
                <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full overflow-visible">
                    {/* Grid lines */}
                    <line x1="0" y1="20" x2="100" y2="20" stroke="#e5e7eb" strokeWidth="0.5" />
                    <line x1="0" y1="40" x2="100" y2="40" stroke="#e5e7eb" strokeWidth="0.5" />
                    <line x1="0" y1="60" x2="100" y2="60" stroke="#e5e7eb" strokeWidth="0.5" />
                    <line x1="0" y1="80" x2="100" y2="80" stroke="#e5e7eb" strokeWidth="0.5" />

                    {/* Chart Line */}
                    <polyline
                        fill="none"
                        stroke={color}
                        strokeWidth="2"
                        points={points}
                        className="animate-draw-line"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />

                    {/* Area under curve (optional, simplified) */}
                    <polygon
                        fill={color}
                        fillOpacity="0.1"
                        points={`0,100 ${points} 100,100`}
                    />
                </svg>
                {/* Labels */}
                <div className="absolute bottom-0 left-0 w-full flex justify-between text-xs text-gray-400 px-2 pb-2">
                    <span>Week 1</span>
                    <span>Week 2</span>
                    <span>Week 3</span>
                    <span>Week 4</span>
                </div>
            </div>
        );
    };

    const PieChart = ({ data }) => {
        // Simple 2-segment pie for demo
        const total = data.reduce((a, b) => a + b.value, 0);
        let currentAngle = 0;

        return (
            <div className="h-64 w-full flex items-center justify-center mt-8 relative">
                <svg viewBox="0 0 100 100" className="w-48 h-48 transform -rotate-90">
                    {data.map((item, i) => {
                        const percentage = (item.value / total) * 100;
                        const dashArray = `${percentage} 100`;
                        const offset = 100 - currentAngle;
                        currentAngle += percentage;

                        return (
                            <circle
                                key={i}
                                cx="50"
                                cy="50"
                                r="40"
                                fill="transparent"
                                stroke={item.color}
                                strokeWidth="20"
                                strokeDasharray={dashArray}
                                strokeDashoffset={offset} // This logic is simplified for SVG circle strokes
                                className="animate-pie-segment"
                            />
                        );
                    })}
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                    <span className="text-3xl font-bold text-gray-800">{total}</span>
                    <span className="text-xs text-gray-500">Total</span>
                </div>
                {/* Legend */}
                <div className="absolute bottom-0 right-0 flex flex-col gap-2 text-xs">
                    {data.map((item, i) => (
                        <div key={i} className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                            <span className="text-gray-600">{item.label}</span>
                        </div>
                    ))}
                </div>
            </div>
        );
    };

    return (
        <div className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-all duration-300 ${isOpen ? 'visible' : 'invisible'}`}>
            {/* Backdrop */}
            <div
                className={`absolute inset-0 bg-black/20 backdrop-blur-sm transition-opacity duration-300 ${animate ? 'opacity-100' : 'opacity-0'}`}
                onClick={onClose}
            ></div>

            {/* Modal Content */}
            <div
                className={`bg-white rounded-3xl w-full max-w-2xl p-8 shadow-2xl relative z-10 transition-all duration-500 cubic-bezier(0.34, 1.56, 0.64, 1) ${animate ? 'scale-100 opacity-100 translate-y-0' : 'scale-90 opacity-0 translate-y-10'}`}
            >
                <button
                    onClick={onClose}
                    className="absolute top-6 right-6 p-2 rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors"
                >
                    ✕
                </button>

                <div className="flex items-center gap-4 mb-6">
                    <div className={`w-16 h-16 rounded-2xl flex items-center justify-center text-3xl ${stat.color} bg-opacity-10`}>
                        {stat.icon}
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold text-gray-900">{stat.title} Analytics</h2>
                        <p className="text-gray-500">Detailed breakdown for this month</p>
                    </div>
                </div>

                {stat.type === 'line' && (
                    <LineChart data={stat.chartData} color={stat.chartColor} />
                )}

                {stat.type === 'pie' && (
                    <PieChart data={stat.chartData} />
                )}

                <div className="mt-8 grid grid-cols-3 gap-4">
                    <div className="bg-gray-50 rounded-xl p-4 text-center">
                        <p className="text-xs text-gray-500 uppercase tracking-wider">Weekly Avg</p>
                        <p className="text-lg font-bold text-gray-800 mt-1">+12%</p>
                    </div>
                    <div className="bg-gray-50 rounded-xl p-4 text-center">
                        <p className="text-xs text-gray-500 uppercase tracking-wider">Best Day</p>
                        <p className="text-lg font-bold text-gray-800 mt-1">Friday</p>
                    </div>
                    <div className="bg-gray-50 rounded-xl p-4 text-center">
                        <p className="text-xs text-gray-500 uppercase tracking-wider">Projection</p>
                        <p className="text-lg font-bold text-gray-800 mt-1">Growing</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StatsModal;
