import React, { useState } from "react";
import styles from "./css/Todo.module.css";
import axios from "axios";
import { useEffect } from "react";

export const Todo = () => {
  // State to store the input data and todo list
  const [data, setData] = useState("");
  const [todo, setTodo] = useState([]);

  // Function to add a new task
  const add = () => {
    console.log("hello");
    console.log(data);
    post(data); // Call the post function to send the task to the server
  };

  // Function to make a POST request to add a task
  const post = (data) => {
    axios
      .post("http://localhost:8080/todo", {
        task: data,
      })
      .then((res) => {
        getdata(); // After posting, fetch the updated task list
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // Fetch initial data when the component is mounted
  useEffect(() => {
    getdata();
  }, []);

  // Function to get the task list from the server
  const getdata = () => {
    axios
      .get("http://localhost:8080/todo")
      .then((res) => {
        let a = res.data.reverse();
        setTodo(a); // Update the todo state with the fetched data
      })
      .catch((err) => {
        console.log("err", err);
      });
  };

  // Function to delete a task by its ID
  const deltetodo = (id) => {
    axios
      .delete(`http://localhost:8080/todo/${id}`)
      .then((res) => {
        getdata(); // After deleting, fetch the updated task list
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <div className={styles.FirstBox}>
        <h1> Full Stack : Task Management</h1>
        <textarea
          onChange={(e) => setData(e.target.value)}
          placeholder="Enter The Task"
          name=""
          id=""
          cols="50"
          rows="3"
        />
        <br />
        <br />
        <button className={styles.btn} onClick={add}>
          Add Task
        </button>
      </div>

      <div className={styles.table}>
        {todo.map((e, index) => {
          return (
            <div key={index}>
              <p className={styles.todotext}> 🎯 {e.task}</p>
              <button
                onClick={() => deltetodo(e._id)}
                className={styles.deltebtn}
              >
                Delete ❌
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};
