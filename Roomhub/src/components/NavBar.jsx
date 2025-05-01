import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-black text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold">RoomHub</Link>
        
        <div className="space-x-6">
          <Link to="/" className="hover:text-blue-400 transition-colors">Dashboard</Link>
          <Link to="/guests" className="hover:text-blue-400 transition-colors">Guests</Link>
          <Link to="/reminders" className="hover:text-blue-400 transition-colors">Reminders</Link>
          <Link to="/schedule" className="hover:text-blue-400 transition-colors">Schedule</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;