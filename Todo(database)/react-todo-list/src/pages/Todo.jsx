import React, { useState, useEffect } from 'react';
import '../App.css';
import { Header } from '../components/Header';
import { TodoForm } from '../components/TodoForm';
import { TodoList } from '../components/TodoList';

function Todo({userCredential}) {
  const [todos, setTodos] = useState([]);
  const [newItem, setNewItem] = useState("");
  const [todoCounter, setTodoCounter] = useState(1);
  const [editItem, setEditItem] = useState(null);
  const [filter, selectedFilter] = useState("All");
  
  useEffect(() => {
    setTodoCounter(todos.length + 1);
  }, [todos]);

  function addTodo(newItem) {
    setTodos((currentTodos) => [
      ...currentTodos,
      { id: crypto.randomUUID(), number: todoCounter, title: `${todoCounter}. ${newItem}`, completed: false },
    ]);
    setTodoCounter((prevCounter) => prevCounter + 1);
  }

  function toggleTodo(id, completed) {
    setTodos((currentTodos) =>
      currentTodos.map((todo) =>
        todo.id === id ? { ...todo, completed } : todo
      )
    );
  }

  function deleteTodo(id) {
    setTodos((currentTodos) => {
      const updatedTodos = currentTodos.filter((todo) => todo.id !== id);
      return updatedTodos.map((todo, index) => ({ ...todo, number: index + 1 }));
    });
  }

  function editTodo(id) {
    const todoToEdit = todos.find((todo) => todo.id === id);
    setEditItem(todoToEdit);
    setNewItem(todoToEdit.title.slice(todoToEdit.title.indexOf('. ') + 2));
  }

  function editTodoForm(newItem) {
    setTodos((currentTodos) =>
      currentTodos.map((todo) =>
        todo.id === editItem.id ? { ...todo, title: `${editItem.number}. ${newItem}` } : todo
      )
    );
    setEditItem(null);

    console.log(newItem);
  }

  function handleFilterCompleted() {
    switch (filter) {
      case "Completed":
        return todos.filter((todo) => todo.completed);
      case "Ongoing":
        return todos.filter((todo) => !todo.completed);
      default:
        return todos;
    }
  };
  
  

  return (
    <>
      <Header />
      <div className="flex  w-full bg-white h-96 shadow-xl">
        <div className="flex justify-center place-items-center mx-20">
          <TodoForm editTodoForm={editTodoForm} addTodo={addTodo} editItem={editItem} userCredential={userCredential}/>
        </div>
        <div className="w-full flex justify-center place-items-center ">
          <TodoList 
            todos={handleFilterCompleted()}
            toggleTodo={toggleTodo}
            deleteTodo={deleteTodo}
            editTodo={editTodo}
            handleFilterCompleted={handleFilterCompleted}
            selectedFilter={selectedFilter}
          />
        </div>
      </div>
      
    </>
  );
}

export default Todo;
