import { useState } from "react";
import axios from "axios";

export default function EditBox({ todo, setIsEditing, setTodos }) {
  const [newTitle, setNewTitle] = useState(todo.title);
  const [newDescription, setNewDescription] = useState(todo.description);

  async function editTodo(todoId) {
    const response = await axios.put(
      `http://localhost:3000/todos/${todoId}`,
      {
        title: newTitle,
        description: newDescription,
      },
      {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      }
    );
    if (response.data.message) {
      alert(response.data.message);
    } else {
      setIsEditing(false);
      alert("Todo updated!");

      setTodos((prevTodoList) => {
        return prevTodoList.map((todoObj) => {
          if(todoObj._id == todo._id){
            return {...todo, title : newTitle , description : newDescription};
          }
        })
      });
    }
  }

  return (
    <div
      key={todo._id}
      style={{
        width: 150,
        padding: 6,
        marginTop: 10,
        marginBottom: 10,
        marginLeft: 10,
        border: "1px solid black",
        borderWidth: 2,
      }}
    >
      {/* New Todo Title Input */}
      <div style={{ fontWeight: "bold", fontSize: 20, marginBottom: 5 }}>
        <input
          placeholder="New Title"
          value={newTitle}
          onChange={(event) => {
            setNewTitle(event.target.value);
          }}
        ></input>
      </div>

      {/* New Todo description Input */}
      <div style={{ marginBottom: 5 }}>
        <input
          placeholder="New Description"
          value={newDescription}
          onChange={(event) => {
            setNewDescription(event.target.value);
          }}
        ></input>
      </div>

      {/* Cancel and Update Button */}
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <button
          onClick={() => {
            setIsEditing(false);
          }}
        >
          Cancel
        </button>

        <button
          onClick={() => {
            editTodo(todo._id);
          }}
        >
          Update
        </button>
      </div>
    </div>
  );
}
