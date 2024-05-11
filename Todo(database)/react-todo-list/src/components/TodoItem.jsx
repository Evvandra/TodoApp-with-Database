import { async } from "@firebase/util";
import { doc, updateDoc } from "firebase/firestore";
import { useState } from "react";

export function TodoItem({ completed, id, title, toggleTodo, deleteTodo, editTodo }) {

  // async function handleSave() {
  //   const todoDocRef = doc(db, "todo", id);
  //   try {
  //     await updateDoc(todoDocRef, {
  //       title: editItem
  //     })

  //     setIsEditing(false)
  //   } catch (error) {
  //       alert(error);
  //   }
  // }

  // async function handleChecked(e) {
  //   const checked = e.target.checked;
  //   setChecked(checked);
  //   const todoDocRef = doc(db, "todo", id);
  //   try {
  //     await updateDoc(todoDocRef, {
  //       completed: checked,
  //     })
      
  //   } catch(error) {
  //     alert(error)
  //   }
  // }

  return (
    <li key={id}>
      <label className={`grow text-black ${completed ? 'line' : ''}`}>
        <input
          type="checkbox"
          checked={completed}
          onChange={(e) => toggleTodo(id, e.target.checked)}
        />
        {title}
      </label>
      <button className="btn flex-none" onClick={() => editTodo(id)}>
        Edit
      </button>
      <button className="btn btn-danger flex-none" onClick={() => deleteTodo(id)}>
        Delete
      </button>
    </li>
  );
}