import React from 'react';

const HomePage = () => {
    return (
        <main className="min-h-screen bg-gray-50">
            <section className="max-w-6xl mx-auto px-6 py-20">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    {/* Left: Headline + CTA */}
                    <div>
                        <div className="inline-block mb-4 rounded-full bg-white/60 px-4 py-2 text-sm text-gray-700">
                            Introducing plant-health insights
                        </div>

                        <h1 className="text-4xl md:text-6xl font-extrabold leading-tight text-gray-900">
                            <span className="text-pink-400 underline decoration-pink-300 decoration-4 underline-offset-6">Stress-Free</span>
                            <span className="ml-4">Plant Health Monitoring</span>
                        </h1>

                        <p className="mt-6 text-lg text-gray-600 max-w-xl">
                            AgriGuard brings images, analytics and diagnosis together in one simple
                            platform — helping you spot issues earlier and get targeted treatment faster.
                        </p>

                        <div className="mt-8 flex items-center gap-4">
                            <a
                                href="/diagnosis"
                                className="inline-flex items-center justify-center rounded-full px-8 py-3 bg-gradient-to-r from-pink-400 to-yellow-400 text-black font-semibold shadow-lg hover:opacity-95"
                            >
                                Get Started
                            </a>

                            <a href="/help" className="text-sm text-gray-700 hover:underline">
                                Learn more →
                            </a>
                        </div>

                        <div className="mt-10 text-gray-500 text-sm">
                            <div className="flex items-center gap-6 flex-wrap">
                                <span className="uppercase tracking-wider">Trusted by</span>
                                <div className="flex items-center gap-4 opacity-90">
                                    <span className="px-3 py-2 bg-white rounded shadow-sm">Digital Brew</span>
                                    <span className="px-3 py-2 bg-white rounded shadow-sm">FarmStore</span>
                                    <span className="px-3 py-2 bg-white rounded shadow-sm">IdeaMachine</span>
                                    <span className="px-3 py-2 bg-white rounded shadow-sm">Planet Nutshell</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right: Hero image / screenshot placeholder */}
                    <div className="flex justify-center lg:justify-end">
                        <div className="w-full max-w-xl bg-white rounded-3xl shadow-2xl overflow-hidden">
                            <img
                                src="/index.png"
                                alt="App preview"
                                className="w-full h-72 object-cover"
                                onError={(e) => {
                                    // fallback: simple colored box when image not found
                                    e.currentTarget.style.display = 'none';
                                }}
                            />

                            <div className="p-6">
                                <h3 className="text-xl font-semibold text-gray-800">Dashboard preview</h3>
                                <p className="mt-2 text-gray-500">View crop health trends and recent diagnoses at a glance.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
};

export default HomePage;
