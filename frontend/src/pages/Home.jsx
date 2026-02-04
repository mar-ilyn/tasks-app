import { useEffect, useState } from "react";
import Form from '../components/TaskForm';
import TasksList from "../components/TasksList";

const API_URL = import.meta.env.VITE_API_URL;


export default function Home() {
    const [tasks, setTasks] = useState([]);

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


    return(
        <section className="w-full h-screen bg-indigo-700 bg-opacity-35">
            <h1 className="text-slate-600 dark:text-gray-50 inline-block my-10 w-full text-center text-3xl font-bold">Lista de tareas</h1>
            <div className="flex flex-col gap-5 md:ml-32 md:mr-10 items-center">
                <Form addItem={addTask} />
                 <TasksList tasks={tasks} toggleTask={toggleTask} deleteTask={deleteTask} />
            </div>
        </section>
    )
}