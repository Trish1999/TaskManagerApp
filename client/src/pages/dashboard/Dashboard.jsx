import React, { useState,useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
toast.configure;
import { useNavigate } from 'react-router-dom';

import styles from "../dashboard/Dashboard.module.css";
import Navbar from '../../components/navbar/Navbar';
import {FormatDate1} from '../../components/FormatDate';
import AddPeople from '../../assets/addpeople.svg';
import CollapseAll  from '../../assets/codicon_collapse-all.svg'
import Add from "../../assets/Group 10.svg"
import Card from '../../components/card/Card';
import AddTaskModal from '../../modals/addTaskModal/AddTaskModal';
import Option from '../../assets/Group 544.svg'
import AddEmailModal from '../../modals/addEmailModal/AddEmailModal';
import { getAssignedTask, getAllTasks } from '../../apis/TaskApi';
import { getUserDetailsById } from '../../apis/UserApi';
import { isToday, isThisWeek, isThisMonth, parseISO, subWeeks, subMonths, format } from 'date-fns';
import { Navigate } from 'react-router-dom';

function Dashboard() {
  const [filter, setFilter] = useState();
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [showAddEmailModal, setShowAddEmailModal] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [userData, setUserData] = useState({});
  const [assignedData, setAssignedData] = useState([]);
  const navigate = useNavigate();
  
  const [collapsedStates, setCollapsedStates] = useState({
      backlog: true,
      todo: true,
      inProgress: true,
      done: true
  });

  const date = new Date();
  const userName = userData.name;
  const userEmail = userData.email;
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    fetchAllTasks();
  }, []);

  useEffect(() => {
    fetchAssignedTask();
  }, [userEmail]);

    useEffect(() => {
    fetchUserData();
  }, [userId]);
        
  const fetchAllTasks = async () => {
    const result = await getAllTasks();
    if (result === "Invalid token!") {
      navigate("/login")
    }
    setTasks(result?.data || 0);
  };

  const fetchAssignedTask = async () => {
    const result = await getAssignedTask(userEmail);
    setAssignedData(result?.data || 0)
  };

  let Data = [...tasks, ...assignedData]

  const fetchUserData = async () => {
    const result = await getUserDetailsById(userId);
    setUserData(result?.data || 0)
  };

  
   const toggleCollapse  = (category) => {
    setCollapsedStates((prevState) => ({
      ...prevState,
      [category]: !prevState[category],
    }));
  };

  const filterTasks = (Data, filter) => {
    const today = new Date();
    return Data.filter(task => {
      const createdAt = parseISO(task.createdAt);
      if (filter === 'today') {
        return isToday(createdAt);
      } else if (filter === 'week') {
        return createdAt > subWeeks(today, 1);
      } else if (filter === 'month') {
        return createdAt > subMonths(today, 1);
      } else {
        return createdAt > subWeeks(today, 1);
      }
    });
  };


  const filteredTasks = Array.isArray(Data) ? filterTasks(Data, filter) : [];


  const backlogCards = filteredTasks.filter(task => task.category === "backlog")

  const todoCards = filteredTasks.filter(task => task.category === "todo")

  const inProgressCards = filteredTasks.filter(task => task.category === "inProgress")

  const doneCards = filteredTasks.filter(task => task.category === "done")


   const handleFilterChange = (event) => {
        setFilter(event.target.value);
  };
  
return (
  <div>
    <ToastContainer
      position="top-right"
      autoClose={500}
    />
    <div className={styles.mains}>
      <div>
        <Navbar />
      </div>
      <div className={styles.container}>
        <div className={styles.top}>
          <h4 style={{textTransform:"capitalize"}}>Wellcome! {userName}</h4>
          <p className={styles.date}>{FormatDate1(date)}</p>
          <div className={styles.header}>
            <h2 style={{ fontWeight: "600" }}>Board</h2>
            <button className={styles.addPeople} onClick={() => setShowAddEmailModal(true)}>
              <img className={styles.logo} src={AddPeople} alt="logo" onClick={() => setShowAddEmailModal(true)} />Add People</button>
            <select className={styles
              .filter} onChange={handleFilterChange} defaultValue={'week'} name="filter">
              <option value="today">Today</option>
              <option value="week" selected>This Week</option>
              <option value="month">This Month</option>
            </select>
          </div>
        </div>
        <div className={styles.categories}>
          <div className={styles.category}>
            <div className={styles.boxheader}>
              <p> Backlog</p>
              <div className={styles.icon}>
                <img src={CollapseAll} onClick={() => toggleCollapse('backlog')} />
              </div>
            </div>
            <div className={styles.cardsContainer}>
              {backlogCards.map((card, index) => (<Card key={index} id={card._id} title={card.title} priority={card.priority} assignedTo={card.assignedTo} category={card.category} checklistItems={card.checklistItems} dueDate={card.dueDate} collapsed={collapsedStates.backlog} userData={userData} refUserId={card.refUserId} userId={userId} refresh={fetchAllTasks}
    />
              ))}
            </div>

          </div>
          <div className={styles.category}>
            <div className={styles.boxheader}>
              <p> To do</p>
              <div className={styles.icon}>
                <img className={styles.add}
                  src={Add} alt="add" onClick={() => setShowTaskModal(true)}></img>
                <img src={CollapseAll} onClick={() => toggleCollapse('todo')} />
              </div>
            </div>
            <div className={styles.cardsContainer}>
              {todoCards.map((card, index) => (<Card key={index} id={card._id} title={card.title} priority={card.priority} assignedTo={card.assignedTo} category={card.category} checklistItems={card.checklistItems} dueDate={card.dueDate} collapsed={collapsedStates.todo} userData={userData} refUserId={card.refUserId} userId={userId} refresh={fetchAllTasks} />
              ))}
            </div>
            
          </div>
          <div className={styles.category}>
            <div className={styles.boxheader}>
              <p> In progress</p>
              <div className={styles.icon}>
                <img src={CollapseAll} alt="collasped" onClick={() => toggleCollapse('inProgress')} />
              </div>
            </div>
            <div className={styles.cardsContainer}>
              {inProgressCards.map((card, index) => (<Card key={index} id={card._id} title={card.title} priority={card.priority} assignedTo={card.assignedTo} category={card.category} checklistItems={card.checklistItems} dueDate={card.dueDate} collapsed={collapsedStates.inProgress} userData={userData} refUserId={card.refUserId} userId={userId} refresh={fetchAllTasks} />
              ))}
            </div>
          </div>
          <div className={styles.category}>
            <div className={styles.boxheader}>
              <p> Done</p>
              <div className={styles.icon}>
                <img src={CollapseAll} alt="collasped" onClick={() => toggleCollapse('done')} />
              </div>
            </div>
            
            <div className={styles.cardsContainer}>
              {doneCards.map((card, index) => (<Card key={index} id={card._id} title={card.title} priority={card.priority} assignedTo={card.assignedTo} category={card.category} checklistItems={card.checklistItems} dueDate={card.dueDate} collapsed={collapsedStates.done} userData={userData} refUserId={card.refUserId} userId={userId} refresh={fetchAllTasks} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
    {showTaskModal && (
      <AddTaskModal
        close={() => setShowTaskModal(false)}
        open={() => setShowTaskModal(true)}
        tasks={tasks}
        userData={userData.registeredEmail || []}
        refresh={fetchAllTasks}
      />
   )}
    {showAddEmailModal && (
      <AddEmailModal
        close={() => setShowAddEmailModal(false)}
        open={() => setShowAddEmailModal(true)}
        userData={userData.registeredEmail || []}
        refresh={fetchAllTasks}
      />
    )}

  </div>
);
}

export default Dashboard
