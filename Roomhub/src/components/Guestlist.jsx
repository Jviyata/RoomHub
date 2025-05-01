import React, { useState } from 'react';
import Navbar from ' ../components/Navbar';
import Footer from '../components/Footer';

const Guests = () => {
  const roommate1 = 'ROOMMATE 1';
  const roommate2 = 'ROOMMATE 2';

  const [visitors, setVisitors] = useState([
    { id: 1, name: 'Belly Conklin', time: '2-3 PM', age: 17, overnight: false, assignedTo: roommate1 },
    { id: 2, name: 'Jeremiah Fisher', time: '5-6 PM', age: 18, overnight: true, assignedTo: roommate2 },
    { id: 3, name: 'Conrad Fisher', time: '7-9 PM', age: 19, overnight: false, assignedTo: roommate1 },
    { id: 4, name: 'Steven Conklin', time: '6-8 PM', age: 20, overnight: true, assignedTo: roommate2 },
  ]);

  const [formData, setFormData] = useState({ name: '', time: '', overnight: false, assignedTo: '' });

  const timeOptions = [
    '9-10 AM', '10-11 AM', '11-12 PM', '12-1 PM', '1-2 PM',
    '2-3 PM', '3-4 PM', '4-5 PM', '5-6 PM', '6-7 PM',
    '7-8 PM', '8-9 PM', '9-10 PM'
  ];

  const addGuest = (e) => {
    e.preventDefault();
    if (formData.name && formData.time && formData.assignedTo) {
      const newGuest = { ...formData, id: visitors.length + 1 };
      setVisitors([...visitors, newGuest]);
      setFormData({ name: '', time: '', overnight: false, assignedTo: '' });
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-r from-black via-blue-800 to-black py-10 px-6 sm:px-12 font-sans">
      <Navbar />

      <header className="mb-12 text-center">
        <h1 className="text-4xl font-extrabold text-white">Guest List</h1>
      </header>

      <div className="max-w-3xl mx-auto space-y-10">
        <section className="bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-xl font-semibold text-blue-700 mb-4">Add a Guest</h2>
          <form onSubmit={addGuest} className="space-y-4">
            <input
              type="text"
              placeholder="Guest Name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
              required
            />
            <select
              value={formData.time}
              onChange={(e) => setFormData({ ...formData, time: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
              required
            >
              <option value="">Select Time</option>
              {timeOptions.map((option, idx) => (
                <option key={idx} value={option}>{option}</option>
              ))}
            </select>
            <label className="block text-sm font-medium text-gray-700">
              <input
                type="checkbox"
                checked={formData.overnight}
                onChange={(e) => setFormData({ ...formData, overnight: e.target.checked })}
                className="mr-2"
              />
              Overnight Stay
            </label>
            <select
              value={formData.assignedTo}
              onChange={(e) => setFormData({ ...formData, assignedTo: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
              required
            >
              <option value="">Assign To</option>
              <option value="ROOMMATE 1">ROOMMATE 1</option>
              <option value="ROOMMATE 2">ROOMMATE 2</option>
            </select>
            <button type="submit" className="w-full bg-blue-700 hover:bg-blue-800 text-white font-semibold py-2 px-4 rounded-md">
              Add Guest
            </button>
          </form>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-white mb-2">Visitors</h2>
          {visitors.map((guest) => (
            <div key={guest.id} className="p-4 bg-white rounded-lg shadow flex justify-between items-center">
              <div>
                <p className="font-medium text-gray-800">{guest.name} (Age: {guest.age})</p>
                <p className="text-sm text-gray-500">Hosted by: {guest.assignedTo}</p>
                <p className="text-sm text-gray-500">{guest.overnight ? 'Overnight Stay' : 'No Overnight'}</p>
              </div>
              <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-3 py-1 rounded-full">
                {guest.time}
              </span>
            </div>
          ))}
        </section>
      </div>

      <Footer />
    </main>
  );
};

export default Guests;
