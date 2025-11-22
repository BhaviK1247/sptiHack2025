import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import { DiagnosisProvider } from './context/DiagnosisContext';
import MainLayout from './components/Layouts/MainLayout';
import HomePage from './pages/HomePage';
import DiagnosisPage from './pages/DiagnosisPage';
import ResultsPage from './pages/ResultsPage';
import DashboardPage from './pages/DashboardPage';
import HelpPage from './pages/HelpPage';

function App() {
    return (
        <AppProvider>
            <DiagnosisProvider>
                <Router>
                    <MainLayout>
                        <Routes>
                            <Route path="/" element={<HomePage />} />
                            <Route path="/diagnosis" element={<DiagnosisPage />} />
                            <Route path="/results" element={<ResultsPage />} />
                            <Route path="/dashboard" element={<DashboardPage />} />
                            <Route path="/help" element={<HelpPage />} />
                        </Routes>
                    </MainLayout>
                </Router>
            </DiagnosisProvider>
        </AppProvider>
    );
}

export default App;
