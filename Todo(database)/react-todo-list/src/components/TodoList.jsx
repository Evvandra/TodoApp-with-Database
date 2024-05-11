import { TodoItem } from "./TodoItem";

export function TodoList ({ todos, toggleTodo, deleteTodo, editTodo, handleFilterCompleted, selectedFilter }) {
  return (
    <div className="app-content w-96">
      <div className="flex place-items-center w-full bg-white mr-12 mb-5">
        <h1 className="grow text-black font-bold text-xl">Todo List</h1>
        <div className="text-black flex-none">
            <select id="filter" className="w-35 border-0 border-b-2 border-violet-700 text-sm py-2 px-0 bg-transparent text-black focus:outline-none focus:ring-0 focus:border-gray-500 peer"
                onChange={e => selectedFilter(e.target.value)}>
                <option value="All">All</option>
                <option value="Completed">Completed</option>
                <option value="Ongoing">Ongoing</option>
            </select>
        </div>
      </div>

      
      <ul className="list">
        {todos.map((todo) => {
          return (
            <TodoItem 
              {...todo}
              key={todo.id}
              toggleTodo={toggleTodo}
              deleteTodo={deleteTodo}
              editTodo={editTodo}
            />
          );
        })}
      </ul>
    </div>
  )
}