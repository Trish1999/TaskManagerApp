import React, { useState,useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import styles from './Card.module.css';
import OptionIcon from '../../assets/Group 544.svg';
import DownArrow from '../../assets/Arrow - Down 2.svg';
import NameIcon from '../nameIcon/NameIcon';
import DeleteModal from '../../modals/deleteModal/DeleteModal';
import AddTaskModal from '../../modals/addTaskModal/AddTaskModal';
import { FormatDate2, FormatDate3 } from '../FormatDate';
import {updateTaskDetailsById,updateCategoryById} from '../../apis/TaskApi';

function Card(props) {
  const { id,title, priority , category, checklistItems ,assignedTo,dueDate, collapsed,userData,refresh}=props;
  const [expanded, setExpanded] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  useEffect(() => {
    setExpanded(!collapsed);
  }, [collapsed]);
      
  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const closeDropdown = () => {
    setDropdownVisible(false);
  };

  const updateCategory = async (taskId, category) => {
    const payload = {
      category: category
    }
    const result = await updateCategoryById(taskId, payload);
    if (result) {
       toast.success("category updated");
      refresh();
    }

  }
  
  const renderPriorityDot = () => {
    let color;
    switch (priority) {
      case 'high':
        color = '#ea0a0a';
        break;
      case 'moderate':
        color = '#4683e6';
        break;
      case 'low':
        color = 'rgba(21, 191, 61, 0.94)'; 
        break;
    }
   
    
    return <div className={styles.priority} ><span className={styles.priorityDot} style={{ backgroundColor: color }} ></span>{priority} Priority
      {assignedTo &&
        <NameIcon
          email={assignedTo} />}
      </div>
  };

    const generateLink = (taskId) => {
      const link = `${window.location.origin}/task/${taskId}`;
      navigator.clipboard.writeText(link)
        .then(() => {
          toast.info("Link copied to clipboard");
            console.log("successs");
        })
      .catch((error) => {
        toast.error('Error copying link: ', error);
      });
  } 
  

  return (
    <div className={styles.card}>
                    <ToastContainer
        position="top-right"
        autoClose={500}
      />
      <div className={styles.cardHeader}>
        {renderPriorityDot()}
        <div className={styles.options}>
          <img src={OptionIcon} alt="Options" className={styles.optionIcon}  onClick={toggleDropdown}/>
         {dropdownVisible && (
            <div className={styles.dropdown}>
              <a onClick={() => { setShowEditModal(true); closeDropdown(); }}>Edit</a>
              <a onClick={() => { generateLink(id); closeDropdown(); }}>Share</a>
              <a onClick={() => { setShowDeleteModal(true); closeDropdown(); }} style={{ color: "red" }}>Delete</a>
            </div>
        )}
        </div>
          </div>

      <div className={styles.cardTitle}>
        <span className={styles.tooltip}>{title}
          <span className={styles.tooltiptext}>{title}</span>
        </span>
        </div>
      <div className={styles.checklistheader}>
         <p>Checklist ({checklistItems.filter(item => item.isChecked).length}/{checklistItems.length})</p>
        <img src={DownArrow} alt="expand" onClick={toggleExpand} ></img>
      </div>
      <div className={styles.checklist}>
 {expanded && checklistItems.map((item, index) => (
    <div key={index} className={styles.checklistItem}>
      <input type="checkbox" id={`item-${index}`} checked={item.isChecked} style={{marginRight:"0.3rem"}} />
      <label htmlFor={`item-${index}`}>{item.text}</label>
    </div>
        ))}
      </div>
      {category==="backlog" && (
        <div className={(dueDate) ? `${styles.footer}` : `${styles.footer2}`}>
          {
            dueDate ?
              <button className={FormatDate3(dueDate) ? `${styles.duedate}` : `${styles.duedate1}`}> {FormatDate2(dueDate)}</button> : ""
            }
          <div>
            <button className={styles.footerbtn} onClick={()=>updateCategory(id,"inProgress")}>PROGRESS</button>
            <button type="submit" className={styles.footerbtn} onClick={()=>updateCategory(id, "todo")}>TO-DO</button>
            <button type="submit" className={styles.footerbtn} onClick={()=>updateCategory(id, "done")}>DONE</button>
          </div>
        </div>
      )}
           {category==="todo" && (
        <div className={(dueDate) ? `${styles.footer}` : `${styles.footer2}`}>
          {dueDate ?
            <button className={FormatDate3(dueDate) ? `${styles.duedate}` : `${styles.duedate1}`}> {FormatDate2(dueDate)}</button> : ""
            }
          <div>
            <button className={styles.footerbtn} onClick={()=>updateCategory(id, "backlog")}>BACKLOG</button>
            <button type="submit" className={styles.footerbtn} onClick={()=>updateCategory(id, "inProgress")}>IN-PROGRESS</button>
            <button type="submit" className={styles.footerbtn} onClick={()=>updateCategory(id, "done")}>DONE</button>
          </div>
        </div>
      )}
      {category==="inProgress" && (
        <div className={(dueDate) ? `${styles.footer}` : `${styles.footer2}`}>
          {dueDate ?
            <button className={FormatDate3(dueDate) ? `${styles.duedate}` : `${styles.duedate1}`}> {FormatDate2(dueDate)}</button> : ""
            }
          <div>
            <button className={styles.footerbtn} onClick={()=>updateCategory(id, "backlog")}>BACKLOG</button>
            <button type="submit" className={styles.footerbtn} onClick={()=>updateCategory(id, "todo")}>TO-DO</button>
            <button type="submit" className={styles.footerbtn} onClick={()=>updateCategory(id, "done")}>DONE</button>
          </div>
        </div>
      )}
           {category==="done" && (
        <div className={(dueDate) ? `${styles.footer}` : `${styles.footer2}`}>
          {dueDate ?
            <button className={styles.duedate} style={{ backgroundColor: '#63C05B', color: "white" }}>{FormatDate2(dueDate)}</button> : ""}
          <div>
            <button className={styles.footerbtn} onClick={()=>updateCategory(id, "backlog")}>BACKLOG</button>
            <button type="submit" className={styles.footerbtn} onClick={()=>updateCategory(id, "todo")}>TO-DO</button>
            <button type="submit" className={styles.footerbtn} onClick={()=>updateCategory(id, "inProgress")}>IN-PROGRESS</button>
          </div>
        </div>
      )}
      {showDeleteModal &&
        <DeleteModal
        open={() => setShowDeleteModal(true)}
        close={() => setShowDeleteModal(false)}
        taskId={id}
        refresh={refresh}
        />
      }
        {showEditModal &&
        <AddTaskModal
        editOpen={() => setShowEditModal(true)}
        editClose={() => setShowEditModal(false)}
        taskId={id}
        title={title}
        priority={priority}
        assignedTo={assignedTo}
        dueDate={dueDate}
        checklistItems={checklistItems}
        category={category}
        editable={true}
        userData={userData.registeredEmail || []}
        refresh={refresh}
        />
      }
    </div>
  );
}

export default Card;
