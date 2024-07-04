import React, { useState,useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
toast.configure;

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
import { getTaskDetailsById, getAllTasks } from '../../apis/TaskApi';
import { getUserDetailsById } from '../../apis/UserApi';
 
function Dashboard() {
  const [filter, setFilter] = useState();
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [showAddEmailModal, setShowAddEmailModal] = useState(false);
  const [tasks, setTasks] = useState([]);
  const[userData,setUserData]=useState({})
  
  const [collapsedStates, setCollapsedStates] = useState({
      backlog: true,
      todo: true,
      inProgress: true,
      done: true
  });
  const date = new Date();
  const userName = localStorage.getItem('name');
  const userId=localStorage.getItem('userId');
     console.log(tasks)
  useEffect(() => {
    fetchAllTasks();
  }, []);

    useEffect(() => {
    fetchUserData();
  }, [userId]);
        
       const fetchAllTasks = async () => {
       const result = await getAllTasks();
        setTasks(result?.data || 0)
  };

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
  

  const backlogCards =tasks.filter(task=>task.category==="backlog")

  const todoCards =tasks.filter(task=>task.category==="todo")

  const inProgressCards = tasks.filter(task=>task.category==="inProgress")

  const doneCards = tasks.filter(task=>task.category==="done")


   const handleFilterChange = (event) => {
        setFilter(event.target.value);
  };
  
return (
  <div>
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
              {backlogCards.map((card, index) => (<Card key={index} id={card._id} title={card.title} priority={card.priority} assignedTo={card.assignedTo} category={card.category} checklistItems={card.checklistItems} dueDate={card.dueDate} collapsed={collapsedStates.backlog} userData={userData}refresh={fetchAllTasks}
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
              {todoCards.map((card, index) => (<Card key={index} id={card._id} title={card.title} priority={card.priority} assignedTo={card.assignedTo} category={card.category} checklistItems={card.checklistItems} dueDate={card.dueDate} collapsed={collapsedStates.todo} userData={userData} refresh={fetchAllTasks} />
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
              {inProgressCards.map((card, index) => (<Card key={index} id={card._id} title={card.title} priority={card.priority} assignedTo={card.assignedTo} category={card.category} checklistItems={card.checklistItems} dueDate={card.dueDate} collapsed={collapsedStates.inProgress} userData={userData}refresh={fetchAllTasks} />
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
              {doneCards.map((card, index) => (<Card key={index} id={card._id} title={card.title} priority={card.priority} assignedTo={card.assignedTo} category={card.category} checklistItems={card.checklistItems} dueDate={card.dueDate} collapsed={collapsedStates.done}  userData={userData} refresh={fetchAllTasks}/>
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
      />
    )}

  </div>
);
}

export default Dashboard
