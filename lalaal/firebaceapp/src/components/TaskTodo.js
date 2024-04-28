import React, { useState } from "react";
import { ref, set } from "firebase/database";
import { db } from "../firebase";
import styles from "../App.module.css";

const TaskTodo = ({ task, setTask }) => {
  const [newValue, setNewValue] = useState('');
  const [flafId, setIdFlag] = useState(null);

  const removeTask = (id) => {
    const newTask = [...task].filter((item) => id !== item.id);
    setTask(newTask);
    set(ref(db, `tasks/${id}`), null); 

  };

  const editTask = (id,text) => {
    setIdFlag(id);
    setNewValue(text)
  };

  const saveChanges = (id) => {
    const newTasks = task.map((item) =>
    id === item.id  ? { ...task, text: newValue } : item
    );
    setTask(newTasks);
    setIdFlag(null)
  };

  return (
    <div>
      {task.map((item) => (
        <div className={styles.tasks} key={item.id}>
          {flafId === item.id ? (
            <div className={styles.task2}>
              <input
                className={styles.inputTodod2}
                value={newValue}
                onChange={(e) => setNewValue(e.target.value)}
              />
              <div >
                <button onClick={() => saveChanges(item.id)}>Сохранить</button>
              </div>
            </div>
          ) : (
            <div className={styles.task}>
              <input className={styles.checkboxInput} type="checkbox" />
              <div className={styles.item}>{item.text}</div>

              <div className={styles.buttonsContainer}>
                <button onClick={() => removeTask(item.id)}>удалить</button>
                <button onClick={() => editTask(item.id,item.text)}>редактировать</button>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default TaskTodo;
