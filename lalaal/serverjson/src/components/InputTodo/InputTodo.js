import { useState, useEffect } from "react";
import TaskTodo from "../TaskTodo/TaskTodo";
import styles from "./Input.module.css";
import {  Button , FormControl } from "react-bootstrap";

const InputTodo = () => {
  const [value, setValue] = useState("");
  const [todo, setTodo] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch("http://localhost:3001/products")
      .then((response) => response.json())
      .then((data) => {
        setTodo(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const addTask = () => {
    fetch("http://localhost:3001/products", {
      method: "POST",
      headers: { "Content-Type": "application/json;charset=utf-8" },
      body: JSON.stringify({
        title: value,
        status: false,
      }),
    })
      .then((rawResponse) => rawResponse.json())
      .then((response) => {
        let newTask = [response, ...todo];
        setTodo(newTask);
        setValue("");
      });
  };

  const deleteTask = (id) => {
    fetch(`http://localhost:3001/products/${id}`, {
      method: "DELETE",
    });
    const newTask = [...todo].filter((e) => e.id !== id);
    setTodo(newTask);
  };

  const onSubmit = (e) => {
    e.preventDefault();
  };

  const updateTask = (id, newValue) => {
    fetch(`http://localhost:3001/products/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: newValue,
        status: false,
      }),
    }).then((response) => {
      const newTask = todo.map((task) =>
        task.id === id ? { ...task, title: newValue } : task
      );
      setTodo(newTask);
    });
  };

  const filter = () => {
    const filteredTodo = todo.filter((task) =>
      task.title.toLowerCase().includes(search.toLowerCase())
    );
    setTodo(filteredTodo);
  };
  const sortTodo = () => {
    const sorted = [...todo].sort((a, b) => {
      return a.title.localeCompare(b.title);
    });
    setTodo(sorted);
  };

  return (
    <div > 
      <header className={styles.title}>To Do List</header>
      <div >
        
          <form onSubmit={onSubmit} className={styles.addToDoForma}>
            <FormControl
              value={value}
              onChange={({ target }) => setValue(target.value)}
              placeholder="сюда можно вписать задачу"
            />
            <Button type="submit" onClick={addTask}className={styles.btn}> 
              Сохранить
            </Button>
          </form>
      </div>

      <div className={styles.addToDoForma}>
        <FormControl 
          value={search}
          onChange={({ target }) => setSearch(target.value)}
          placeholder="поиск задач"
        />
        <Button className={styles.btn} type="button" onClick={filter}>
          Поиск
        </Button>
      </div>

      <TaskTodo todo={todo} deleteTask={deleteTask} updateTask={updateTask} />
      <Button className={styles.sort} onClick={sortTodo}>Отсортировать задачи</Button>

    </div>
  );
};

export default InputTodo;
