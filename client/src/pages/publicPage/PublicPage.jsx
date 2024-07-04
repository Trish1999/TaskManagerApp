import React,{useEffect,useState} from 'react'
import { useParams } from 'react-router-dom';

import styles from "../../pages/publicPage/PublicPage.module.css"
import { getTaskDetailsById } from '../../apis/TaskApi';
import logo from "../../assets/Group 1.svg"
import { FormatDate2 } from '../../components/FormatDate';
 
export default function PublicPage() {
    const [taskData, setTaskData] = useState({});
    const {taskId}  = useParams();
    const { id, title, assignedTo, priority, category, dueDate, checklistItems=[] } = taskData;
    useEffect(() => {
        fetchTaskDetails();
    }, [taskId]);
        
    const fetchTaskDetails = async () => {
        const result = await getTaskDetailsById(taskId);
        setTaskData(result?.data || {})
    };
    console.log(priority)
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


              
        return <div className={styles.priority} ><span className={styles.priorityDot} style={{ backgroundColor: color }} ></span>{priority} Priority</div>
        }; 
        
    return (
        <div >
            <div className={styles.header}>
                <img src={logo} alt="logo"></img>
                </div>
                <div className={styles.card}>
                    <div className={priority}>
                        {renderPriorityDot()}</div>
                    <div className={styles.cardTitle}>{title}
                    </div>
                    <div className={styles.checklistheader}>
                        <p>Checklist ({checklistItems.filter(item => item.isChecked).length}/{checklistItems.length})</p>
                    </div>
                    <div className={styles.checklist}>
                    {(checklistItems).map((item, index) => (
                        <div key={index} className={styles.checklistItem}>
                            <input type="checkbox" id={`item-${index}`} checked={item.isChecked} readOnly style={{ marginRight: "0.7rem" }} />
                            <label htmlFor={`item-${index}`}>{item.text}</label>
                        </div>
                     ))}
                    </div>
                <div className={styles.footer}>
                    {dueDate ? <>Due Date
                     <button className={styles.duedate} >{FormatDate2(dueDate)}</button></> : ""
                    }
                </div>
                </div>
            </div>
    )
}
    