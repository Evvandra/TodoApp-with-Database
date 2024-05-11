import { addDoc, collection } from 'firebase/firestore';
import { useState } from 'react'
import '../pages/Login'
import '../pages/Todo'
import {db} from '../firebase/config.js';

export function TodoForm({editTodoForm, addTodo, editItem, userCredential}) {
  const [newItem, setNewItem] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    if (editItem != null) {
      // Edit existing todo
      editTodoForm(newItem);
    } else {
      // Add new todo
      addTodo(newItem);
    }

    setNewItem('');
  }

  return (
    <div>
      <form className="new-item-form" onSubmit={handleSubmit}>
        <div className="form-row">
          <div className="text-black font-bold text-xl">
            <label htmlFor="item">New item</label>
          </div>
          <div className="flex">
            <input
              placeholder="What do you need to do?"
              id="item"
              value={newItem}
              onChange={(e) => setNewItem(e.target.value)}
              className="mr-2 my-6 w-72"
            />
            <button type="submit" className="btn my-6 bg-white">
              {editItem !== null ? 'Save' : 'Add'}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
