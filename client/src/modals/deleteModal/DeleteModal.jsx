import React from 'react'
import { Modal } from 'react-responsive-modal';
import 'react-responsive-modal/styles.css';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import styles from "../deleteModal/DeleteModal.module.css";
import "../../modals/Custom-styling.css";
import { deleteTask } from '../../apis/TaskApi';

function DeleteModal(props) {
  const { close, open, taskId, refresh } = props;

  const handleDelete = async(taskId) => {
    const result = await deleteTask(taskId);
    if (result) {
      
      toast.info("Task deleted successfully",{
         onClose: () => {
          close();
          refresh();

        },
      })
    }  
    }
    

  return (
      <div>
        <ToastContainer
        position="top-right"
        autoClose={500}
      />
      <Modal open={open} onClose={close} showCloseIcon={false} center
      classNames={{ modal: 'customModal2' }}
            >
              <div className={styles.container}>
                  <h4>Are you sure you want to Delete?</h4>
                  <div className={styles.btn}>
                <button className={styles.delete} onClick={()=>handleDelete(taskId)}>Yes, Delete</button>
               <button className={styles.cancel} onClick={close}>Cancel</button>
              </div>
          </div>
      </Modal>
    </div>
  )
}

export default DeleteModal