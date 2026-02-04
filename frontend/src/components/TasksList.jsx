import TaskItem from "./TaskItem"

export default function TasksList({tasks, deleteTask, toggleTask}) {

  return (
    <>
        <ul className="w-11/12 md:w-2/3"> 
            {tasks.map((item) => 
                <TaskItem key={item.id} task={item} deleteTask={deleteTask} toggleTask={toggleTask}/>
            )}
        </ul>
    </>);
}
