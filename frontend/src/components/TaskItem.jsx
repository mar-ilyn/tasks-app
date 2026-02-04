import React, { useReducer, useState } from "react";
import { IoRemoveCircleSharp } from "react-icons/io5";
import { FaCheck } from "react-icons/fa";

export default function Tasks({task, deleteTask, toggleTask}) {

  return (
    <>
        <li className="bg-gray-100 px-4 py-2 mb-4 rounded font-bold flex justify-between items-center shadow">
            <h2 className={`flex-1 break-words overflow-hidden mr-2 md:mr-4 text-slate-600 ${task.done ? "line-through decoration-2" : ""}`}>
            {task.description}
            </h2>
            <div className="flex gap-4 items-center">
                <label className="cursor-pointer">
                    <input type="checkbox" className="hidden peer-checked:bg-transparent" checked={task.done} onChange={() => toggleTask(task.id)} />
                    <div className="w-7 h-7 rounded border-2 border-gray-400 hover:border-green-500 peer-checked:bg-purple-600 peer-checked:border-green-500 transition">
                        <FaCheck className={`${task.done ? "text-green-500 h-full mx-auto" : "hidden"}`} />
                    </div>
                </label>
                <IoRemoveCircleSharp className="h-full w-7 text-red-400 hover:cursor-pointer hover:text-red-500" onClick={() => deleteTask(task.id)} />
            </div>
        </li>
    </>);
}
