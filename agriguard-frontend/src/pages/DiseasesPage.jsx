import React, { useState } from 'react';
import { Search, Filter, Leaf, AlertCircle } from 'lucide-react';

const DiseasesPage = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCrop, setSelectedCrop] = useState('All');
    const [selectedSeverity, setSelectedSeverity] = useState('All');

    const diseases = [
        {
            id: 1,
            name: 'Early Blight',
            scientific: 'Alternaria solani',
            crop: 'Tomato',
            severity: 'Moderate',
            confidence: '92-96%',
            image: 'https://via.placeholder.com/400x300/10b981/ffffff?text=Early+Blight',
            symptoms: [
                'Round brown spots with concentric target-like rings on older leaves',
                'Yellowing around the spots',
                'Leaf drop in severe cases',
                'Dark lesions on stems and fruit'
            ],
            treatment: [
                'Remove and destroy affected leaves immediately',
                'Apply copper-based fungicide every 7-10 days',
                'Improve air circulation by proper spacing',
                'Avoid overhead watering',
                'Rotate crops annually'
            ],
            prevention: [
                'Use disease-resistant varieties',
                'Mulch around plants to prevent soil splash',
                'Water at the base of plants',
                'Remove plant debris at end of season'
            ],
            season: 'Mid-summer, hot weather (77-86°F)',
            spread: 'Fungal spores spread by wind, rain, and contaminated tools'
        },
        {
            id: 2,
            name: 'Late Blight',
            scientific: 'Phytophthora infestans',
            crop: 'Tomato',
            severity: 'Severe',
            confidence: '94-98%',
            image: 'https://via.placeholder.com/400x300/ef4444/ffffff?text=Late+Blight',
            symptoms: [
                'Dark water-soaked spots that enlarge rapidly',
                'White fuzzy mold on leaf undersides',
                'Brown lesions on stems',
                'Firm brown rot on fruit',
                'Entire plant can collapse within days'
            ],
            treatment: [
                'Immediate removal and destruction of infected plants',
                'Apply fungicide containing chlorothalonil or mancozeb',
                'Avoid overhead watering completely',
                'Increase spacing between plants',
                'Do not compost infected material'
            ],
            prevention: [
                'Plant certified disease-free seeds',
                'Avoid planting near potatoes',
                'Ensure good drainage',
                'Monitor weather for cool, wet conditions'
            ],
            season: 'Cool, wet weather (60-70°F with high humidity)',
            spread: 'Highly contagious, spreads via wind-borne spores and water'
        },
        {
            id: 3,
            name: 'Potato Virus Y',
            scientific: 'PVY',
            crop: 'Potato',
            severity: 'Severe',
            confidence: '87-93%',
            image: 'https://via.placeholder.com/400x300/f59e0b/ffffff?text=Potato+Virus+Y',
            symptoms: [
                'Yellow mottling and mosaic patterns on leaves',
                'Leaf distortion and curling',
                'Stunted plant growth',
                'Tuber necrosis (brown spots inside)',
                'Reduced yield by up to 80%'
            ],
            treatment: [
                'No cure available - remove infected plants',
                'Control aphid populations with insecticides',
                'Use reflective mulches to deter aphids',
                'Destroy volunteer potato plants',
                'Sanitize tools between plants'
            ],
            prevention: [
                'Use certified virus-free seed potatoes',
                'Plant resistant varieties',
                'Control aphid vectors early in season',
                'Remove infected plants immediately',
                'Maintain weed-free fields'
            ],
            season: 'Throughout growing season, peak in warm weather',
            spread: 'Transmitted by aphids and mechanical contact'
        },
        {
            id: 4,
            name: "Stewart's Wilt",
            scientific: 'Erwinia stewartii',
            crop: 'Corn',
            severity: 'Moderate',
            confidence: '84-90%',
            image: 'https://via.placeholder.com/400x300/8b5cf6/ffffff?text=Stewarts+Wilt',
            symptoms: [
                'Long, pale green to yellow streaks on leaves',
                'Leaf wilting and drying',
                'Bacterial ooze visible in morning',
                'Stunted plant growth',
                'Premature death in severe cases'
            ],
            treatment: [
                'Plant resistant hybrid varieties',
                'Control corn flea beetles with insecticides',
                'Remove and destroy infected plants',
                'Avoid planting in fields with history of disease',
                'Use crop rotation with non-host crops'
            ],
            prevention: [
                'Use treated seeds',
                'Plant after soil warms (above 65°F)',
                'Control flea beetle populations',
                'Choose resistant hybrids',
                'Avoid early planting in endemic areas'
            ],
            season: 'Early to mid-season, warm weather',
            spread: 'Transmitted by corn flea beetles and contaminated seeds'
        }
    ];

    const crops = ['All', ...new Set(diseases.map(d => d.crop))];
    const severities = ['All', 'Severe', 'Moderate', 'Mild'];

    const getSeverityColor = (severity) => {
        switch (severity) {
            case 'Severe': return 'bg-red-100 text-red-700 border-red-300';
            case 'Moderate': return 'bg-yellow-100 text-yellow-700 border-yellow-300';
            case 'Mild': return 'bg-green-100 text-green-700 border-green-300';
            default: return 'bg-gray-100 text-gray-700 border-gray-300';
        }
    };

    const filteredDiseases = diseases.filter(disease => {
        const matchesSearch = disease.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            disease.scientific.toLowerCase().includes(searchQuery.toLowerCase()) ||
            disease.crop.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCrop = selectedCrop === 'All' || disease.crop === selectedCrop;
        const matchesSeverity = selectedSeverity === 'All' || disease.severity === selectedSeverity;
        return matchesSearch && matchesCrop && matchesSeverity;
    });

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
            {/* Header Section */}
            <div className="bg-gradient-to-r from-pink-500 via-purple-500 to-violet-500 text-white py-16 px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="flex items-center gap-3 mb-4">
                        <Leaf size={40} />
                        <h1 className="text-5xl font-bold">Disease Database</h1>
                    </div>
                    <p className="text-xl text-white/90 mb-8">
                        Comprehensive guide to plant diseases detectable by AgriGuard AI
                    </p>

                    {/* Search and Filters */}
                    <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6">
                        <div className="grid md:grid-cols-3 gap-4">
                            {/* Search */}
                            <div className="relative">
                                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/70" size={20} />
                                <input
                                    type="text"
                                    placeholder="Search diseases..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full pl-12 pr-4 py-3 rounded-xl bg-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50"
                                />
                            </div>

                            {/* Crop Filter */}
                            <div className="relative">
                                <Filter className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/70" size={20} />
                                <select
                                    value={selectedCrop}
                                    onChange={(e) => setSelectedCrop(e.target.value)}
                                    className="w-full pl-12 pr-4 py-3 rounded-xl bg-white/20 text-white focus:outline-none focus:ring-2 focus:ring-white/50 appearance-none cursor-pointer"
                                >
                                    {crops.map(crop => (
                                        <option key={crop} value={crop} className="text-gray-900">{crop} Crops</option>
                                    ))}
                                </select>
                            </div>

                            {/* Severity Filter */}
                            <div className="relative">
                                <AlertCircle className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/70" size={20} />
                                <select
                                    value={selectedSeverity}
                                    onChange={(e) => setSelectedSeverity(e.target.value)}
                                    className="w-full pl-12 pr-4 py-3 rounded-xl bg-white/20 text-white focus:outline-none focus:ring-2 focus:ring-white/50 appearance-none cursor-pointer"
                                >
                                    {severities.map(severity => (
                                        <option key={severity} value={severity} className="text-gray-900">{severity} Severity</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div className="mt-4 text-white/80 text-sm">
                            Showing {filteredDiseases.length} of {diseases.length} diseases
                        </div>
                    </div>
                </div>
            </div>

            {/* Disease Cards Grid */}
            <div className="max-w-7xl mx-auto px-6 py-12">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredDiseases.map((disease) => (
                        <div
                            key={disease.id}
                            className="bg-white rounded-3xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
                        >
                            {/* Disease Image */}
                            <div className="relative h-48 bg-gradient-to-br from-gray-200 to-gray-300">
                                <img
                                    src={disease.image}
                                    alt={disease.name}
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute top-4 right-4">
                                    <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getSeverityColor(disease.severity)}`}>
                                        {disease.severity}
                                    </span>
                                </div>
                            </div>

                            {/* Disease Info */}
                            <div className="p-6">
                                {/* Header */}
                                <div className="mb-4">
                                    <div className="flex items-center gap-2 mb-2">
                                        <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-semibold">
                                            {disease.crop}
                                        </span>
                                        <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-semibold">
                                            {disease.confidence} Accuracy
                                        </span>
                                    </div>
                                    <h3 className="text-2xl font-bold text-gray-900 mb-1">{disease.name}</h3>
                                    <p className="text-sm text-gray-500 italic">{disease.scientific}</p>
                                </div>

                                {/* Symptoms */}
                                <div className="mb-4">
                                    <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                                        <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                                        Symptoms
                                    </h4>
                                    <ul className="space-y-1">
                                        {disease.symptoms.slice(0, 3).map((symptom, idx) => (
                                            <li key={idx} className="text-sm text-gray-600 flex items-start gap-2">
                                                <span className="text-red-500 mt-1">•</span>
                                                <span>{symptom}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                {/* Treatment */}
                                <div className="mb-4">
                                    <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                                        <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                                        Treatment
                                    </h4>
                                    <ul className="space-y-1">
                                        {disease.treatment.slice(0, 2).map((treat, idx) => (
                                            <li key={idx} className="text-sm text-gray-600 flex items-start gap-2">
                                                <span className="text-green-500 mt-1">•</span>
                                                <span>{treat}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                {/* Season & Spread */}
                                <div className="pt-4 border-t border-gray-200">
                                    <div className="mb-2">
                                        <span className="text-xs font-semibold text-gray-700">Season: </span>
                                        <span className="text-xs text-gray-600">{disease.season}</span>
                                    </div>
                                    <div>
                                        <span className="text-xs font-semibold text-gray-700">Spread: </span>
                                        <span className="text-xs text-gray-600">{disease.spread}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {filteredDiseases.length === 0 && (
                    <div className="text-center py-16">
                        <div className="text-gray-400 mb-4">
                            <Leaf size={64} className="mx-auto" />
                        </div>
                        <h3 className="text-2xl font-bold text-gray-700 mb-2">No diseases found</h3>
                        <p className="text-gray-500">Try adjusting your search or filters</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default DiseasesPage;
