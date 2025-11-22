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
import { AuthProvider } from './context/AuthContext';

function App() {
    return (
        <AuthProvider>
            <AppProvider>
                <DiagnosisProvider>
                    <Router>
                        <Routes>
                            <Route path="/" element={
                                <MainLayout>
                                    <HomePage />
                                </MainLayout>
                            } />
                            <Route path="/diagnosis" element={
                                <MainLayout>
                                    <DiagnosisPage />
                                </MainLayout>
                            } />
                            <Route path="/results" element={
                                <MainLayout>
                                    <ResultsPage />
                                </MainLayout>
                            } />
                            <Route path="/dashboard" element={
                                <MainLayout>
                                    <DashboardPage />
                                </MainLayout>
                            } />
                            <Route path="/help" element={
                                <MainLayout>
                                    <HelpPage />
                                </MainLayout>
                            } />
                        </Routes>
                    </Router>
                </DiagnosisProvider>
            </AppProvider>
        </AuthProvider>
    );
}

export default App;
