/** @format */

import { React, useState, useEffect } from "react";
import TodoButtons from "./TodoButtons";
import TimeStamp from "./TimeStamp";
import { formatDistanceToNow } from "date-fns";

const TodoDataItems = ({ item, handleToggleDone, handleDelete }) => {
  const { id, title, content, done, date } = item;

  const [elapsedTime, setElapsedTime] = useState(() =>
    calculateElapsedTime(date)
  );

  useEffect(() => {
    const intervalId = setInterval(() => {
      setElapsedTime(calculateElapsedTime(date));
    }, 30000); // Update every minute

    return () => clearInterval(intervalId); // Cleanup on component unmount
  }, [date]);

  function calculateElapsedTime(date) {
    return formatDistanceToNow(new Date(date), {
      addSuffix: true,
    });
  }

  return (
    <li className="lg:w-[348px] w-full bg-slate-300 py-2 px-4 relative rounded-md my-2">
      <div className={done ? "text-slate-400" : "text-black"}>
        <h1 className="text-[20px] font-bold text-start">{title}</h1>
        <p className="text-[10px] py-2 text-start w-1/2">{content}</p>
        <TimeStamp timestamp={elapsedTime} />
      </div>
      <TodoButtons
        setDone={handleToggleDone}
        setDelete={handleDelete}
        id={id}
        doneData={done}
      />
    </li>
  );
};

export default TodoDataItems;
