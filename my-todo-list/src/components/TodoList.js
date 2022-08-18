import React,{useState} from 'react';
import TodoForm from "./TodoForm";
import Todo from "./Todo";


function TodoList() {
    const [todos,setTodos]=useState([]);

    const addTodo=(todo)=>{
        if(!todo.text ||  /^\s*$/.test(todo.text)){
            return;
        }
        const newTodos=[todo,...todos];
        setTodos(newTodos);
    };

    const completeTodo=(id)=>{
      let updatedtodos=todos.map(todo=>{
        if(todo.id===id){
          todo.isComplete=!todo.isComplete;
        }
        return todo;
      });
      setTodos(updatedtodos);
    };

    const removeTodo=(id)=>{
        const removearr=[...todos].filter(todo=>todo.id!==id);
        setTodos(removearr);
    }

    const updateTodo=(todoid,newValue)=>{
      if(!newValue.text ||  /^\s*$/.test(newValue.text)){
        return;
      }
      setTodos(prev=>prev.map(item=>(item.id===todoid?newValue:item)));
    };
    
    return (  
    <div>
        <h1>Whats the plan for today ?</h1>
        <TodoForm onSubmit={addTodo}/>
        <Todo todos={todos} completeTodo={completeTodo} removeTodo={removeTodo} updateTodo={updateTodo}/>
    </div>
  )
}

export default TodoList;
