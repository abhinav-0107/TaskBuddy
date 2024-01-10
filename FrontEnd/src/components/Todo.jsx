import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import TodoCard from "./TodoCard";

export default function Todo() {
  const [userdetail, setUserDetail] = useState({});
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [todos, setTodos] = useState([]);
  const navigate = useNavigate();

  async function getUsername() {
    const response = await axios.get("http://localhost:3000/user/me", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });
    setUserDetail(response.data);
  }

  async function getAllTodos() {
    const response = await axios.get("http://localhost:3000/todos/", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });
    setTodos(response.data);
  }

  async function createNewTodo() {
    const response = await axios.post(
      "http://localhost:3000/todos/",
      {
        title,
        description,
        IsDone: false,
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
      setTodos((prevTodoList) => { return [
        ...prevTodoList,
        {
          title,
          description,
          IsDone : false,
        },
      ]});
      setTitle("");
      setDescription("");
      alert("New todo created!");
    }
  }

  useEffect(() => {
    getUsername();
    getAllTodos();
  }, []);

  return (
    <div style={{ marginLeft: 10 }}>
      <div style={{ display: "flex", marginTop: 20 }}>
        {/* Username */}
        <div style={{ fontSize: 30, marginRight: 10 }}>
          {" "}
          Welcome {userdetail.username}!{" "}
        </div>

        {/* Logout button */}
        <button
          onClick={() => {
            if(confirm("Are you sure you want to logout?")){ 
              localStorage.setItem("token", null);
              navigate("/login");
            }
          }}
        >
          Logout
        </button>
      </div>

      <div style={{ fontSize: 25, marginTop: 30, marginBottom: 20 }}>
        Todo List
      </div>

      {/* Title Input */}
      <input
        placeholder={"Title"}
        type={"text"}
        value={title}
        onChange={(event) => {
          setTitle(event.target.value);
        }}
      />

      {/* Description Input */}
      <input
        placeholder={"Description"}
        type={"text"}
        value={description}
        onChange={(event) => {
          setDescription(event.target.value);
        }}
      />

      {/* Add Todo button */}
      <button
        onClick={() => {
          createNewTodo();
        }}
      >
        Add todo
      </button>

      {todos.map((item) => {
        return <TodoCard todo={item} setTodos={setTodos}/>;
      })}
    </div>
  );
}
