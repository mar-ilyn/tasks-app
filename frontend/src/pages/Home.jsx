import { useEffect, useState } from "react";
import Form from '../components/TaskForm';
import TasksList from "../components/TasksList";
import { IoFilterSharp } from "react-icons/io5";
import { IoIosArrowDown } from "react-icons/io";

const API_URL = import.meta.env.VITE_API_URL;


export default function Home() {
    const [tasks, setTasks] = useState([]);
    const [taskStatus, setTaskStatus] = useState("all"); 

    useEffect(() => {
        fetch(`${API_URL}/api/tasks`)
        .then(res => res.json())
        .then(data => setTasks(data));
    }, []);

    const addTask = async (description) => {
        const res = await fetch(`${API_URL}/api/tasks`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ description }),
        });
        const newTask = await res.json();
        setTasks(prev => [...prev, newTask]);
    };

    const toggleTask = async (id) => {
        await fetch(`${API_URL}/api/tasks/${id}`, {
            method: "PUT",
        });

        setTasks(prev =>
            prev.map(i =>
            i.id === id ? { ...i, done: !i.done } : i
            )
    );};

    const deleteTask = async (id) => {
        await fetch(`${API_URL}/api/tasks/${id}`, { method: "DELETE" });
        setTasks(prev => prev.filter(i => i.id !== id));
    };

    const filteredTasks = tasks.filter(task => {
        if (taskStatus === "completed") return task.done;
        if (taskStatus === "pending") return !task.done;
        return true;
    });


    return(
        <section className="w-full h-screen bg-indigo-700 bg-opacity-35">
            <h1 className="text-slate-600 dark:text-gray-50 inline-block my-10 w-full text-center text-3xl font-bold">Lista de tareas</h1>
            <div className="flex flex-col gap-5 md:ml-32 md:mr-10 items-center">
                <Form addItem={addTask} />
                <div className="relative inline-flex items-center gap-2">
                    <IoFilterSharp className="text-white absolute left-4" />
                    <select value={taskStatus} onChange={(e) => setTaskStatus(e.target.value)} className="appearance-none px-4 py-2 pl-10 rounded-lg border bg-violet-400 text-white font-bold shadow focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-200 pr-5" >
                        <option value="all">Todas</option>
                        <option value="pending">Pendientes</option>
                        <option value="done">Hechas</option>
                    </select >
                    <IoIosArrowDown className="text-white absolute left-28" />
                </div>
                 <TasksList tasks={filteredTasks} toggleTask={toggleTask} deleteTask={deleteTask} />
            </div>
        </section>
    )
}