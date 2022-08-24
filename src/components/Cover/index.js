import React, { useEffect, useState } from "react";
import { useAppContext } from "../../contexts/useApp";

export default function Cover() {
  const { monthsArray, currentMonth, setMonth } = useAppContext();
  const [selectedMonth, setCurrentMonth] = useState(0);

  useEffect(() => {
    setMonth(monthsArray[selectedMonth]);
  }, [monthsArray, selectedMonth, setMonth]);

  const previousMonth = () => {
    setCurrentMonth(selectedMonth - 1);
  };

  const nextMonth = () => {
    setCurrentMonth(selectedMonth + 1);
  };

  if (!monthsArray.length) return null;

  return (
    <div
      className="cover"
      style={{
        backgroundImage: `url(${currentMonth?.calendar_banner_url})`,
      }}
    >
      <div>
        <button disabled={selectedMonth - 1 < 0} onClick={previousMonth}>
          {"<"}
        </button>
        <h3>{currentMonth?.calendar_banner_text}</h3>
        <button disabled={selectedMonth + 1 > 11} onClick={nextMonth}>
          {">"}
        </button>
      </div>
    </div>
  );
}
