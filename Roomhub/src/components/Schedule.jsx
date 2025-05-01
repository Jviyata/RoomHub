import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Timetable = () => {
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const hours = [
    '9-10 AM', '10-11 AM', '11-12 PM',
    '12-1 PM', '1-2 PM', '2-3 PM',
    '3-4 PM', '4-5 PM', '5-6 PM',
    '6-7 PM', '7-8 PM', '8-9 PM'
  ];
  const spaces = ['Kitchen', 'Living Room', 'Laundry'];
  const housemates = ['ROOMMATE 1', 'ROOMMATE 2'];

  const [bookedSlots, setBookedSlots] = useState([
    { day: 'Mon', hour: '9-10 AM', space: 'Kitchen', person: 'ROOMMATE 2' },
    { day: 'Wed', hour: '2-3 PM', space: 'Living Room', person: 'ROOMMATE 1' },
    { day: 'Fri', hour: '5-6 PM', space: 'Laundry', person: 'ROOMMATE 2' },
  ]);

  const toggleBooking = (day, hour) => {
    const slotExists = bookedSlots.find(slot => slot.day === day && slot.hour === hour);
    if (slotExists) {
      setBookedSlots(bookedSlots.filter(slot => !(slot.day === day && slot.hour === hour)));
    } else {
      const defaultSpace = 'Kitchen';
      const defaultPerson = 'ROOMMATE 1';
      setBookedSlots([
        ...bookedSlots,
        { day, hour, space: defaultSpace, person: defaultPerson }
      ]);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-black via-blue-800 to-black p-10 font-sans">
      <Navbar />

      <header className="text-center mb-16">
        <h1 className="text-5xl font-extrabold text-white text-left text-shadow-lg">Roommate Schedule</h1>
      </header>

      <div className="overflow-x-auto mb-16">
        <table className="min-w-full table-auto text-center border-collapse">
          <thead>
            <tr>
              <th className="px-3 py-2 text-white"></th>
              {days.map(day => (
                <th key={day} className="px-5 py-3 text-white">{day}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {hours.map(hour => (
              <tr key={hour}>
                <td className="px-3 py-2 font-semibold text-white bg-gray-800">{hour}</td>
                {days.map(day => {
                  const isBooked = bookedSlots.some(slot => slot.day === day && slot.hour === hour);
                  return (
                    <td
                      key={`${day}-${hour}`}
                      className={`cursor-pointer px-6 py-4 border ${
                        isBooked ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-200'
                      } hover:bg-blue-700 transition-all duration-300`}
                      onClick={() => toggleBooking(day, hour)}
                    >
                      {isBooked ? 'Booked' : '—'}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <section>
        <h2 className="text-3xl font-semibold text-white mb-5">Occupied Slots</h2>
        <div className="overflow-x-auto bg-white rounded-lg shadow-lg border-l-4 border-blue-400">
          <table className="min-w-full table-auto">
            <thead>
              <tr className="bg-blue-800 text-white">
                <th className="px-4 py-3">Day</th>
                <th className="px-4 py-3">Time</th>
                <th className="px-4 py-3">Space</th>
                <th className="px-4 py-3">Booked By</th>
              </tr>
            </thead>
            <tbody>
              {bookedSlots.map((slot, index) => (
                <tr key={index} className={index % 2 === 0 ? 'bg-gray-100' : 'bg-white'}>
                  <td className="px-4 py-3 text-gray-800">{slot.day}</td>
                  <td className="px-4 py-3 text-gray-800">{slot.hour}</td>
                  <td className="px-4 py-3 text-gray-800">{slot.space}</td>
                  <td className="px-4 py-3 text-gray-800">{slot.person}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Timetable;
