import React from "react";
import { useAppContext } from "../../contexts/useApp";

export default function Days() {
  const { currentDays } = useAppContext();

  if (!currentDays.length) return null;

  return (
    <ul className="dates">
      {currentDays.map((item, index) => {
        return (
          <div className="grid-item" key={index + 1}>
            <span>{item.card_header}</span>
            <span>{item.date}</span>
          </div>
        );
      })}
    </ul>
  );
}
