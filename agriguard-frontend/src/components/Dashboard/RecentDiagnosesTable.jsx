import React from 'react';

const RecentDiagnosesTable = () => {
    const diagnoses = [
        {
            id: 1,
            date: '2025-09-02',
            time: '09:30 AM',
            image: '/leaf1.jpg', // Placeholder
            disease: 'Late Blight',
            confidence: 98,
            status: 'Critical',
            recommendation: 'Apply fungicide immediately',
        },
        {
            id: 2,
            date: '2025-09-02',
            time: '11:15 AM',
            image: '/leaf2.jpg', // Placeholder
            disease: 'Healthy',
            confidence: 99,
            status: 'Healthy',
            recommendation: 'No action needed',
        },
        {
            id: 3,
            date: '2025-09-01',
            time: '04:45 PM',
            image: '/leaf3.jpg', // Placeholder
            disease: 'Septoria Leaf Spot',
            confidence: 85,
            status: 'Warning',
            recommendation: 'Monitor closely',
        },
        {
            id: 4,
            date: '2025-08-31',
            time: '02:20 PM',
            image: '/leaf4.jpg', // Placeholder
            disease: 'Powdery Mildew',
            confidence: 92,
            status: 'Warning',
            recommendation: 'Increase air circulation',
        },
    ];

    const getStatusColor = (status) => {
        switch (status) {
            case 'Healthy': return 'bg-green-100 text-green-700';
            case 'Warning': return 'bg-yellow-100 text-yellow-700';
            case 'Critical': return 'bg-red-100 text-red-700';
            default: return 'bg-gray-100 text-gray-700';
        }
    };

    return (
        <div className="bg-white/80 backdrop-blur-md rounded-3xl shadow-sm border border-white/50 overflow-hidden animate-fade-in-up" style={{ animationDelay: '500ms' }}>
            <div className="p-6 border-b border-gray-100/50 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h3 className="text-lg font-bold text-gray-800">Recent Diagnoses</h3>
                    <p className="text-gray-500 text-sm">Latest plant health checks</p>
                </div>
                <div className="flex items-center gap-3">
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Search..."
                            className="pl-10 pr-4 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-transparent text-sm w-64"
                        />
                        <span className="absolute left-3 top-2.5 text-gray-400">🔍</span>
                    </div>
                    <button className="p-2 rounded-xl border border-gray-200 hover:bg-gray-50 text-gray-600">
                        ⚙️
                    </button>
                    <button className="px-4 py-2 bg-gray-900 text-white rounded-xl text-sm font-medium hover:bg-gray-800">
                        Export CSV
                    </button>
                </div>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-gray-50/50 text-gray-500 text-xs uppercase tracking-wider">
                            <th className="p-6 font-semibold">Image</th>
                            <th className="p-6 font-semibold">Date & Time</th>
                            <th className="p-6 font-semibold">Disease Detected</th>
                            <th className="p-6 font-semibold">Confidence</th>
                            <th className="p-6 font-semibold">Status</th>
                            <th className="p-6 font-semibold">Action</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                        {diagnoses.map((item) => (
                            <tr key={item.id} className="hover:bg-gray-50/50 transition-colors">
                                <td className="p-6">
                                    <div className="w-12 h-12 rounded-lg bg-gray-200 flex items-center justify-center text-xs text-gray-500 overflow-hidden">
                                        {/* Placeholder for image */}
                                        IMG
                                    </div>
                                </td>
                                <td className="p-6">
                                    <p className="text-sm font-medium text-gray-900">{item.date}</p>
                                    <p className="text-xs text-gray-500">{item.time}</p>
                                </td>
                                <td className="p-6">
                                    <p className="text-sm font-medium text-gray-900">{item.disease}</p>
                                    <p className="text-xs text-gray-500 truncate max-w-[150px]">{item.recommendation}</p>
                                </td>
                                <td className="p-6">
                                    <div className="flex items-center gap-2">
                                        <div className="w-16 h-2 bg-gray-100 rounded-full overflow-hidden">
                                            <div
                                                className="h-full bg-gradient-to-r from-pink-400 to-yellow-400"
                                                style={{ width: `${item.confidence}%` }}
                                            />
                                        </div>
                                        <span className="text-xs font-medium text-gray-600">{item.confidence}%</span>
                                    </div>
                                </td>
                                <td className="p-6">
                                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${getStatusColor(item.status)}`}>
                                        {item.status}
                                    </span>
                                </td>
                                <td className="p-6">
                                    <button className="text-gray-400 hover:text-gray-600">
                                        •••
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default RecentDiagnosesTable;
