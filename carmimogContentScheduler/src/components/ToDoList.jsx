//ToDoList component

//Importe para manejar el estado del componente
import { useState } from "react";
import styled from "styled-components";
import { useLocalStorage } from '../useLocalStorage';

const [tasks, setTasks] = useLocalStorage("plannerTasks", []);


// Estilos
const Container = styled.div`
  background-color: #ffe7f0;
  border-radius: 1rem;
  padding: 1.5rem;
  margin-bottom: 2rem;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
  font-family: 'Inter', sans-serif;
`;

const Title = styled.h2`
  font-size: 1.25rem;
  font-weight: 700;
  color: #dc1474;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const Emoji = styled.span`
  font-size: 1.5rem;
`;

const List = styled.ul`
  list-style: none;
  padding: 0;
`;

const Item = styled.li`
  display: flex;
  align-items: center;
  margin-bottom: 0.75rem;
`;

const Checkbox = styled.input`
  margin-right: 0.75rem;
  width: 1.1rem;
  height: 1.1rem;
  accent-color: #ec4899;
`;

const Label = styled.label`
  font-size: 0.95rem;
  color: #333;
`;


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
        <Container>
            {/*título*/}

            <Title> <Emoji>✅</Emoji> To-Do List</Title>
            {/*mostrar lista de tareas*/}
            <List>
                {tasks.map(task => (
                <Item key={task.id} className="flex items-center mb-2">
                    {/*checkbox de la task*/}
                    <Checkbox 
                        type="checkbox"
                        checked={task.done}
                        onChange={() => toggleTask(task.id)}
                        className="mr-2"
                    />
                    {/*tachar texto*/}
                    <Label>
                        {task.text}
                    </Label>
                </Item>
            ))}
            </List>
            
       
        </Container>
    );
};

export default ToDoList;