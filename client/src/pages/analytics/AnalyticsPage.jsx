import React, { useState,useEffect} from 'react'

import styles from "../analytics/AnalyticPage.module.css"
import Navbar from '../../components/navbar/Navbar'
import { getAllTasks } from '../../apis/TaskApi';

function AnalyticsPage() {
    const [tasks, setTasks] = useState([]);
    
    
        useEffect(() => {
        fetchAllTasks();
     }, []);
        
       const fetchAllTasks = async () => {
       const result = await getAllTasks();
        setTasks(result?.data || 0)
    };
    
    const backlogTasks = tasks.filter(task => task.category === "backlog")
    const todoTasks = tasks.filter(task => task.category === "todo")
    const inProgressTasks = tasks.filter(task => task.category === "inProgress")
     const completedTasks = tasks.filter(task => task.category === "done")
    const lowPriorityTasks = tasks.filter(task => task.priority === "low")
    const highPriorityTasks = tasks.filter(task => task.priority === "high")
    const moderatePriorityTasks = tasks.filter(task => task.priority === "moderate")
    const dueDateTasks = tasks.filter(task => task.dueDate)


  return (
      <div className={styles.mains}>
          <Navbar/>
          <div className={styles.container}>
              <h3>Analytics</h3>
               <div className={styles.boxes}>
              <div className={styles.box}>
                  <ul>
                      <li>
                          <span className={styles.boxstyle}>
                              <p className={styles.text}>Backlog Tasks</p>
                             <p className={styles.number}>{backlogTasks.length}</p>
                          </span>
                      </li>
                      <li>
                          <span className={styles.boxstyle}>
                              <p className={styles.text}>To-do Tasks</p>
                                  <p className={styles.number}>{todoTasks.length}</p>
                          </span>
                      </li>
                      <li>
                          <span className={styles.boxstyle}>
                              <p className={styles.text}>In-Progress Tasks</p>
                                  <p className={styles.number}> {inProgressTasks.length}</p>
                          </span>
                      </li>
                      <li>
                          <span className={styles.boxstyle}>
                              <p className={styles.text}>completed Tasks</p>
                                  <p className={styles.number}>{completedTasks.length}</p>
                          </span>
                      </li>
                  </ul>
              </div>
                            <div className={styles.box}>
                  <ul>
                      <li>
                          <span className={styles.boxstyle}>
                              <p className={styles.text}>Low Priority</p>
                              <p className={styles.number}>{lowPriorityTasks.length}</p>
                          </span>
                      </li>
                      <li>
                          <span className={styles.boxstyle}>
                              <p className={styles.text}>Moderate Priority</p>
                              <p className={styles.number}>{moderatePriorityTasks.length}</p>
                          </span>
                      </li>
                      <li>
                          <span className={styles.boxstyle}>
                              <p className={styles.text}>High Priority</p>
                              <p className={styles.number}>{highPriorityTasks.length}</p>
                          </span>
                      </li>
                      <li>
                          <span className={styles.boxstyle}>
                              <p className={styles.text}>Due Date Tasks</p>
                                  <p className={styles.number}>{dueDateTasks.length}</p>
                          </span>
                      </li>
                  </ul>
                </div>
                </div>
          </div>
    </div>
  )
}

export default AnalyticsPage
