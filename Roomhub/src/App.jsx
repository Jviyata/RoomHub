import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from " ./components/Navbar";
import Footer from "./components/Footer";
import DashboardPage from "./pages/DashboardPage";
import GuestsPage from "./pages/GuestsPage";
import RemindersPage from "./pages/RemindersPage";
import SchedulePage from "./pages/SchedulePage";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="app-container">
        <Navbar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<DashboardPage />} />
            <Route path="/guests" element={<GuestsPage />} />
            <Route path="/reminders" element={<RemindersPage />} />
            <Route path="/schedule" element={<SchedulePage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
