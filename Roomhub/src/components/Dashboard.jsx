import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Dashboard = () => {
  const [isLocked, setIsLocked] = useState(true);
  const roommate1 = 'ROOMMATE 1';
  const roommate2 = 'ROOMMATE 2';

  const [reminders, setReminders] = useState([
    { id: 1, message: 'Trash needs to be taken out tonight!', assignedTo: null },
    { id: 2, message: 'Please clean kitchen after cooking', assignedTo: null },
    { id: 3, message: 'Utility bills due this Friday', assignedTo: null },
    { id: 4, message: 'House meeting Sunday @ 7pm', assignedTo: null },
  ]);

  const visitors = [
    { id: 1, name: 'Belly Conklin', time: '2-3 PM', age: 17, overnight: false, assignedTo: roommate1 },
    { id: 2, name: 'Jeremiah Fisher', time: '5-6 PM', age: 18, overnight: true, assignedTo: roommate2 },
    { id: 3, name: 'Conrad Fisher', time: '7-9 PM', age: 19, overnight: false, assignedTo: roommate1 },
    { id: 4, name: 'Steven Conklin', time: '6-8 PM', age: 20, overnight: true, assignedTo: roommate2 },
  ];

  const weekDays = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];
  const timeSlots = [
    { time: 'Morning', events: Array(7).fill(null) },
    { time: 'Afternoon', events: ['ROOMMATE 1 - Cooking 2-3', ...Array(6).fill(null)] },
    { time: 'Evening', events: [null, null, 'ROOMMATE 2 - Cleaning 5-6', ...Array(4).fill(null)] },
    { time: 'Night', events: [null, null, null, null, 'ROOMMATE 1 - Studying 8-10', null, null] },
  ];

  const handleLockToggle = () => setIsLocked(!isLocked);

  const assignTo = (id, roommate) => {
    setReminders(reminders.map(r =>
      r.id === id ? { ...r, assignedTo: r.assignedTo === roommate ? null : roommate } : r
    ));
  };

  const scheduleEvents = [];
  timeSlots.forEach(({ time, events }) => {
    events.forEach((evt, idx) => {
      if (evt) {
        scheduleEvents.push({ day: weekDays[idx], time, description: evt });
      }
    });
  });

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gradient-to-r from-black via-blue-800 to-black py-10 px-6 sm:px-12 font-sans">
        <header className="mb-16">
          <h1 className="text-5xl font-extrabold text-white mb-2 text-left text-shadow-lg">Hello, ROOMMATE 1</h1>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Schedule */}
          <section className="lg:col-span-2 bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-semibold text-white bg-gradient-to-r from-blue-500 via-blue-700 to-blue-500 py-2 px-4 rounded-full text-center mb-4 text-shadow-lg">
              <a href="/Schedule" className="hover:underline">Weekly Schedule</a>
            </h2>
            <ul className="space-y-3">
              {scheduleEvents.map((evt, idx) => (
                <li key={idx} className="border-l-4 border-blue-400 bg-blue-50 px-4 py-2">
                  <strong>{`${evt.day} - ${evt.time}`}</strong>: {evt.description}
                </li>
              ))}
            </ul>
          </section>

          {/* Door Lock */}
          <section className="bg-white text-center rounded-xl shadow-lg p-8 flex flex-col justify-center items-center">
            <h2 className="text-xl font-semibold text-white bg-gradient-to-r from-blue-500 via-blue-700 to-blue-500 py-2 px-4 rounded-full text-center mb-4 text-shadow-lg">Door Lock</h2>
            <motion.div
              animate={{ backgroundColor: isLocked ? '#ef4444' : '#4ade80' }}
              transition={{ duration: 0.5 }}
              className="w-20 h-20 mb-6 rounded-full"
            />
            <motion.button
              aria-label={isLocked ? 'Lock the door' : 'Unlock the door'}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleLockToggle}
              className="px-6 py-2 text-white font-semibold rounded bg-gray-800 hover:bg-gray-900 text-shadow-lg"
            >
              {isLocked ? 'Locked' : 'Unlocked'}
            </motion.button>
          </section>
        </div>

        {/* Visitors & Reminders */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Visitors */}
          <section className="bg-white rounded-xl shadow-md p-6">
            <div className="text-center bg-gradient-to-r from-blue-500 via-blue-700 to-blue-500 text-white font-bold py-2 px-4 rounded-full mb-4 text-shadow-lg">Visitors</div>
            <ul className="divide-y">
              {visitors.map(v => (
                <li key={v.id} className="py-3 flex items-center gap-4">
                  <img src="visitorplaceholder.png" alt="Visitor" className="w-12 h-12 rounded-full" />
                  <div>
                    <p className="text-gray-800 font-medium">{v.name}</p>
                    <p className="text-sm text-gray-500">Hosted by: {v.assignedTo}</p>
                    <p className="text-sm text-gray-500">Age: {v.age}, {v.overnight ? 'Staying Overnight' : 'Not Staying Overnight'}</p>
                  </div>
                  <span className="ml-auto bg-blue-100 text-blue-800 text-xs font-semibold px-3 py-1 rounded-full">{v.time}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Reminders */}
          <section className="bg-white rounded-xl shadow-md p-6">
            <div className="text-center bg-gradient-to-r from-blue-500 via-blue-700 to-blue-500 text-white font-bold py-2 px-4 rounded-full mb-4 text-shadow-lg">Reminders</div>
            <ul className="space-y-4">
              {reminders.map(r => (
                <li key={r.id} className="p-4 border border-blue-200 rounded-lg">
                  <p className="mb-3 text-gray-800">{r.message}</p>
                  <div className="flex gap-2">
                    {[roommate1, roommate2].map(rm => (
                      <button
                        key={rm}
                        onClick={() => assignTo(r.id, rm)}
                        className={`flex-1 py-1 text-sm font-medium rounded ${r.assignedTo === rm ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}
                      >
                        {rm}
                      </button>
                    ))}
                  </div>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </main>

      <Footer />
    </>
  );
};

export default Dashboard;
