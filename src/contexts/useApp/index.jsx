import React, { useState, useEffect, createContext, useContext } from "react";
import { CalendarService } from "../../services/calendar";

const contextDefaultValues = {
  monthsArray: [],
  setMonthsArray: () => {},
  currentMonth: [],
  setMonth: () => {},
  currentDays: [],
  setCurrentDays: () => {},
};

export const AppContext = createContext(contextDefaultValues);

let isWorking = false;
export function AppWrapper({ children }) {
  const [monthsArray, setMonthsArray] = useState([]);
  const [currentMonth, setCurrentMonth] = useState(null);
  const [currentDays, setCurrentDays] = useState([]);

  useEffect(() => {
    const getMonths = async () => {
      if (isWorking) return;

      isWorking = true;
      await new CalendarService()
        .getMonths()
        .then((data) => {
          setMonthsArray(data);
        })
        .catch((err) => {
          console.error(err);
        })
        .finally(() => {
          isWorking = false;
        });
    };

    if (!monthsArray.length) getMonths();
  }, [monthsArray, setMonthsArray]);

  useEffect(() => {
    const getMonth = async () => {
      if (isWorking) return;

      isWorking = true;
      await new CalendarService()
        .getMonth(currentMonth?.month)
        .then((data) => {
          setCurrentMonth(data);
          setCurrentDays(data.days);
        })
        .catch((err) => {
          console.error(err);
        })
        .finally(() => {
          isWorking = false;
        });
    };

    if (currentMonth?.month && !currentDays?.length) getMonth();
  }, [currentMonth, currentDays]);

  const setMonth = (newMonth) => {
    if (newMonth?.month && currentMonth?._id !== newMonth?._id) {
      setCurrentMonth(newMonth);
      setCurrentDays([]); //
    }
  };

  return (
    <AppContext.Provider
      value={{
        monthsArray,
        setMonthsArray,
        currentMonth,
        setMonth,
        currentDays,
        setCurrentDays,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}
