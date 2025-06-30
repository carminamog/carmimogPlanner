//ToDoList component

//Importe para manejar el estado del componente
import { useState } from "react";

const ToDoList = () => {
    //lista de tareas con id, texto, y su estado
    const [tasks, setTasks] = useState([ 
        {id: 1, text: "Grabar Tiktok del día", done : false},
        {id: 2, text:"Editar reel para Instagram", done: false},]);

    //función para cambiar el estado de la tarea
    const toggleTask = (id) =>{
        //crea una nueva lista de tareas actualizada
        setTasks(tasks.map(t=> t.id === id ? {...t, done: !t.done} :t));

    };

    return (
        <div className="bg-white shadow-md p-4 rounded-xl">
            {/*título*/}

            <h2 className="text-xl font-bold text-pink-600 mb-4 tracking-wide"> ✅ To-Do List</h2>
            {/*mostrar lista de tareas*/}
            {tasks.map(task => (
                <div key={task.id} className="flex items-center mb-2">
                    {/*checkbox de la task*/}
                    <input 
                        type="checkbox"
                        checked={task.done}
                        onChange={() => toggleTask(task.id)}
                        className="mr-2"
                    />
                    {/*tachar texto*/}
                    <span className={task.done ? "line-through text-gray-400" : "" }>
                        {task.text}
                    </span>
                </div>
            ))}
       
        </div>
    );
};

export default ToDoList;