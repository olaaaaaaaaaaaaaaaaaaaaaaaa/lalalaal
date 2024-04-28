import { useState, useEffect } from "react";
import { Header } from "./components/Header";
import styles from './App.module.css'

function App() {
  const [task, setTask] = useState([]);
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/todos")
      .then((response) => response.json())
      .then((json) => {
        setTask(json);
      });
  }, []);

  return (
    <div>
      <Header />
     
      <div className={styles.container}> 
        {task &&
          task.map((item, id) => (
            <div key={id}>
              {" "}
              <input type="checkbox" />
              {item.title}
            </div>
          ))}
      </div>
    </div>
  );
}

export default App;
