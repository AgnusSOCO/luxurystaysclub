import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import HomePage from './pages/HomePage';
import PropertiesPage from './pages/PropertiesPage';
import PropertyDetailPage from './pages/PropertyDetailPage';
import RentPropertyPage from './pages/RentPropertyPage';
import AdminPage from './pages/AdminPage';
import AdminAccess from './components/admin/AdminAccess';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import { PropertyProvider } from './context/PropertyContext';
import { AdminProvider } from './context/AdminContext';
import ProtectedRoute from './components/auth/ProtectedRoute';
import BackToTop from './components/ui/BackToTop';
import CookieConsent from './components/ui/CookieConsent';

function App() {
  return (
    <Router>
      <AdminProvider>
        <PropertyProvider>
          <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/properties" element={<PropertiesPage />} />
                <Route path="/properties/:id" element={<PropertyDetailPage />} />
                <Route path="/rent-property" element={<RentPropertyPage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/admin-access" element={<AdminAccess />} />
                <Route
                  path="/admin"
                  element={
                    <ProtectedRoute>
                      <AdminPage />
                    </ProtectedRoute>
                  }
                />
              </Routes>
            </main>
            <Footer />
            <BackToTop />
            <CookieConsent />
          </div>
        </PropertyProvider>
      </AdminProvider>
    </Router>
  );
}

export default App;