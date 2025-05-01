import React, { createContext, useState, useContext } from 'react';

const AppContext = createContext();

export const useAppContext = () => useContext(AppContext);

export const AppProvider = ({ children }) => {
  const [isLocked, setIsLocked] = useState(true);
  const [reminders, setReminders] = useState([
    { id: 1, text: 'Trash needs to be taken out tonight!', assignedTo: null, completed: false },
    { id: 2, text: 'Please clean kitchen after cooking', assignedTo: null, completed: false },
    { id: 3, text: 'Utility bills due this Friday', assignedTo: null, completed: false },
    { id: 4, text: 'House meeting Sunday @ 7pm', assignedTo: null, completed: false },
  ]);
  
  const [visitors, setVisitors] = useState([
    { id: 1, name: 'Belly Conklin', time: '2-3 PM', age: 17, overnight: false, assignedTo: 'ROOMMATE 1' },
    { id: 2, name: 'Jeremiah Fisher', time: '5-6 PM', age: 18, overnight: true, assignedTo: 'ROOMMATE 2' },
    { id: 3, name: 'Conrad Fisher', time: '7-9 PM', age: 19, overnight: false, assignedTo: 'ROOMMATE 1' },
    { id: 4, name: 'Steven Conklin', time: '6-8 PM', age: 20, overnight: true, assignedTo: 'ROOMMATE 2' },
  ]);
  
  const [scheduleEvents, setScheduleEvents] = useState([
    { day: 'Mon', hour: '9-10 AM', space: 'Kitchen', person: 'ROOMMATE 2' },
    { day: 'Wed', hour: '2-3 PM', space: 'Living Room', person: 'ROOMMATE 1' },
    { day: 'Fri', hour: '5-6 PM', space: 'Laundry', person: 'ROOMMATE 2' },
  ]);

  return (
    <AppContext.Provider 
      value={{
        isLocked, 
        setIsLocked,
        reminders,
        setReminders,
        visitors,
        setVisitors,
        scheduleEvents,
        setScheduleEvents
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppContext;