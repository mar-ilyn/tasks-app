import { useState } from "react";

export default function Form({ addItem }) {
  const [newTask, setNewTask] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newTask.trim()) return;
    addItem(newTask);
    setNewTask("");
  }
  return (
    <>
        <form className="flex items-center justify-center gap-2 w-4/5  md:w-2/4 lg:w-1/3" onSubmit={handleSubmit}>
            <input type="text" className="w-full bg-gray-100 px-4 py-2 rounded outline-none shadow-xl border-2 border-lightpurple focus:border-white" value={newTask} onChange={(e) => setNewTask(e.target.value)} />
            <button className="bg-violet-400 border-2 border-violet-400 hover:bg-violet-100 text-white hover:text-violet-500 font-bold px-4 py-2 rounded transition-all duration-200">Agregar</button>
        </form>
    </>
);}
