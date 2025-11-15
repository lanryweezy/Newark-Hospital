
import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Specialties from './pages/Departments';
import FindDoctor from './pages/FindDoctor';
import Appointments from './pages/Appointments';
import Contact from './pages/Contact';
import ScrollToTop from './hooks/useScrollToTop';
import PatientPortal from './pages/PatientPortal';
import Telemedicine from './pages/Telemedicine';
import SymptomChecker from './pages/SymptomChecker';
import OnlineBillPay from './pages/OnlineBillPay';
import PatientEducation from './pages/PatientEducation';
import Careers from './pages/Careers';
import Admin from './pages/Admin';
import Chatbot from './components/Chatbot';

const App: React.FC = () => {
    return (
        <HashRouter>
            <ScrollToTop />
            <div className="bg-accent text-slate-dark font-sans min-h-screen">
                <Header />
                <main>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/about" element={<About />} />
                        <Route path="/specialties" element={<Specialties />} />
                        <Route path="/find-a-doctor" element={<FindDoctor />} />
                        <Route path="/appointments" element={<Appointments />} />
                        <Route path="/contact" element={<Contact />} />
                        <Route path="/patient-portal" element={<PatientPortal />} />
                        <Route path="/telemedicine" element={<Telemedicine />} />
                        <Route path="/symptom-checker" element={<SymptomChecker />} />
                        <Route path="/bill-pay" element={<OnlineBillPay />} />
                        <Route path="/blog" element={<PatientEducation />} />
                        <Route path="/careers" element={<Careers />} />
                        <Route path="/admin" element={<Admin />} />
                    </Routes>
                </main>
                <Chatbot />
                <Footer />
            </div>
        </HashRouter>
    );
};

export default App;
