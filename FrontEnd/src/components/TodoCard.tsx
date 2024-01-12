import { useState } from "react";
import axios from "axios";
import EditBox from "./EditBox";

export default function TodoCard({ todo, setTodos }) {
  const [IsEditing, setIsEditing] = useState(false);

  async function deleteTodo(todoId) {
    const response = await axios.delete(
      `http://localhost:3000/todos/${todoId}`,
      {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      }
    );
    alert(response.data.message);
    setTodos((prevTodoList) => {
      return prevTodoList.filter(item => item._id != todoId );
    });
  }

  async function changeTodoStatus(todoId) {
    const response = await axios.put(
      `http://localhost:3000/todos/status/${todoId}`,
      {
        IsDone: true,
      },
      {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      }
    );
    if (response.data.message) {
      alert(response.data.message);
      window.location = "/todo";
    }
  }

  return (
    <div style={{ display: "flex" }}>
      <div
        key={todo._id}
        style={{
          width: 200,
          padding: 10,
          marginTop: 10,
          marginBottom: 10,
          border: "1px solid black",
          borderWidth: 2,
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          {/* Todo Title */}
          <div style={{ fontWeight: "bold", fontSize: 20, marginBottom: 5 }}>
            {todo.title}
          </div>

          {/* Todo Status */}
          <div>
            {todo.IsDone ? (
              <div style={{ color: "green" }}>Done</div>
            ) : (
              <div style={{ color: "orange" }}>Pending</div>
            )}
          </div>
        </div>

        {/* Todo description */}
        <div style={{ marginBottom: 5 }}>{todo.description}</div>

        <div>
          {/* Done Button */}
          <button
            style={{ backgroundColor: "#A4D7A5" }}
            onClick={() => {
              changeTodoStatus(todo._id);
            }}
          >
            Mark as Done
          </button>

          {/* Edit button */}
          <button
            onClick={() => {
              setIsEditing(true);
            }}
          >
            Edit
          </button>

          {/* Delete Button */}
          <button
            style={{ backgroundColor: "#E55451" }}
            onClick={() => {
              if (confirm("Are you sure you want to delete this Todo?")) {
                deleteTodo(todo._id);
              }
            }}
          >
            Delete
          </button>
        </div>
      </div>
      {IsEditing && <EditBox todo={todo} setIsEditing={setIsEditing} setTodos={setTodos} />}
    </div>
  );
}
