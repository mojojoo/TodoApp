/** @format */

import React, { useState } from "react";
import More from "../assets/More.svg";
import Done from "../assets/Done.svg";
import Delete from "../assets/Delete.svg";
import Close from "../assets/Close.svg";

const TodoButtons = ({ setDone, setDelete, id, doneData }) => {
  const [isMoreShow, setIsMoreShow] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsMoreShow(!isMoreShow)}
        className="absolute top-3 right-4"
      >
        <img className="h-[20px]" src={!isMoreShow ? More : Close} alt="" />
      </button>
      <div
        className={` ${
          isMoreShow ? "flex" : "hidden"
        } absolute top-8 right-5 bg-white flex-col w-[100px] rounded-lg z-50`}
      >
        <button
          onClick={() => {
            setDone(id);
            setIsMoreShow(false);
          }}
          className="px-3 p-2 border-b-2 flex justify-between items-center gap-2 hover:bg-slate-100 transition-colors rounded-tr-lg rounded-tl-lg"
        >
          <img src={Done} alt="Done" />
          <h3
            className={`text-center ${
              !doneData ? "text-black" : "text-red-600 text-[14px]"
            }`}
          >
            {!doneData ? "Done" : "Undone"}
          </h3>
        </button>
        <button
          onClick={() => {
            setDelete(id);
            setIsMoreShow(false);
          }}
          className="px-3 p-2 flex justify- items-center gap-2 hover:bg-slate-100 transition-colors rounded-br-lg rounded-bl-lg"
        >
          <img src={Delete} alt="Delete" />
          <h3>Delete</h3>
        </button>
      </div>
    </>
  );
};

export default TodoButtons;
