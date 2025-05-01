import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const ReminderPage = () => {
  const roommate1 = 'ROOMMATE 1';
  const roommate2 = 'ROOMMATE 2';
  const chores = [
    'Take out trash',
    'Clean kitchen',
    'Vacuum living room',
    'Wash dishes',
    'Laundry',
    'Pay utility bills',
    'Water plants'
  ];

  // Initial filler data
  const [reminders, setReminders] = useState([
    { id: 1, text: 'Clean kitchen', assignedTo: roommate1, completed: false },
    { id: 2, text: 'Take out trash', assignedTo: roommate2, completed: true },
    { id: 3, text: 'Vacuum living room', assignedTo: roommate1, completed: false },
    { id: 4, text: 'Wash dishes', assignedTo: roommate2, completed: true }
  ]);
  const [selectedChore, setSelectedChore] = useState(chores[0]);
  const [selectedRoommate, setSelectedRoommate] = useState(roommate1);

  const handleAddReminder = () => {
    setReminders([
      ...reminders,
      { id: Date.now(), text: selectedChore, assignedTo: selectedRoommate, completed: false }
    ]);
  };

  const handleCompleteTask = (id) => {
    setReminders(reminders.map(r =>
      r.id === id ? { ...r, completed: true } : r
    ));
  };

  const handleDeleteReminder = (id) => {
    setReminders(reminders.filter(r => r.id !== id));
  };

  const upcomingReminders = reminders.filter(r => !r.completed);
  const completedReminders = reminders.filter(r => r.completed);

  return (
    <main className="min-h-screen bg-gradient-to-r from-black via-blue-800 to-black py-10 px-6 sm:px-12 font-sans">
      <Navbar />

      <section className="max-w-3xl mx-auto space-y-10">
        <h1 className="text-4xl font-extrabold text-white text-center mb-8">Reminders</h1>

        <div className="bg-white p-6 rounded-xl shadow-lg">
          <h2 className="text-xl font-semibold text-blue-700 mb-4">Create a New Reminder</h2>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Task</label>
            <select
              value={selectedChore}
              onChange={(e) => setSelectedChore(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
            >
              {chores.map((chore, idx) => (
                <option key={idx} value={chore}>{chore}</option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Assign To</label>
            <select
              value={selectedRoommate}
              onChange={(e) => setSelectedRoommate(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
            >
              <option value={roommate1}>{roommate1}</option>
              <option value={roommate2}>{roommate2}</option>
            </select>
          </div>
          <button
            onClick={handleAddReminder}
            className="w-full bg-blue-700 hover:bg-blue-800 text-white font-semibold py-2 px-4 rounded-md"
          >
            Add Reminder
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Upcoming Tasks */}
          <section className="bg-white p-6 rounded-xl shadow-lg">
            <h2 className="text-xl font-semibold text-blue-700 mb-4">Upcoming Tasks</h2>
            <ul className="space-y-4 h-64 overflow-y-auto">
              {upcomingReminders.map(r => (
                <li key={r.id} className="p-4 border border-blue-200 rounded-lg">
                  <p className="mb-3 text-gray-800">{r.text}</p>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleCompleteTask(r.id)}
                      className="flex-1 py-1 text-sm font-medium rounded bg-green-600 text-white"
                    >
                      Mark Complete
                    </button>
                    <button
                      onClick={() => handleDeleteReminder(r.id)}
                      className="flex-1 py-1 text-sm font-medium rounded bg-red-600 text-white"
                    >
                      Delete
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </section>

          {/* Completed Tasks */}
          <section className="bg-white p-6 rounded-xl shadow-lg">
            <h2 className="text-xl font-semibold text-blue-700 mb-4">Completed Tasks</h2>
            <ul className="space-y-4 h-64 overflow-y-auto">
              {completedReminders.map(r => (
                <li key={r.id} className="p-4 border border-blue-200 rounded-lg">
                  <p className="mb-3 text-gray-800 line-through">{r.text}</p>
                  <p className="text-sm text-gray-500">Completed by: {r.assignedTo}</p>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default ReminderPage;
