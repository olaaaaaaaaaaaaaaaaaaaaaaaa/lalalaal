import React, { useState } from "react";
import styles from "./Task.module.css";
import {  Button } from "react-bootstrap";

const TaskTodo = ({ todo, deleteTask, updateTask }) => {
  const [edit, setEdit] = useState(null);
  const [value, setValue] = useState("");

  const editTodo = (id, title) => {
    setEdit(id);
    setValue(title);
  };

  const handleSave = (id) => {
    updateTask(id, value);
    setEdit(null);
  };

  return (
    <div >
      {todo.map((e) => (
        <div key={e.id} className={styles.listItems}>
          {edit === e.id ? (
            <div >
              <input
                value={value}
                onChange={({ target }) => setValue(target.value)}
              />
              <Button
                type="button"
                onClick={() => handleSave(e.id)}
                className={styles.btn}
              >
                Сохранить
              </Button>
            </div>
          ) : (
            <div className={styles.abc}>
              <input type="checkbox" />
              {e.title}
            </div>
          )}

          <div >
            <Button
              type="button"
              onClick={() => deleteTask(e.id)}
              className={styles.btn}
            >
              удалить
            </Button>
            <Button
              type="button"
              onClick={() => editTodo(e.id, e.title)}
              className={styles.btn}
            >
              редактировать
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TaskTodo;
