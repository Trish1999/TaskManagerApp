import React from 'react'
import { Modal } from 'react-responsive-modal';
import 'react-responsive-modal/styles.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { addEmails } from '../../apis/UserApi';
import styles from "../addEmailModal/AddEmailModal.module.css"
toast.configure;

function ConfermationModal(props) {
  const { close, open, email, close1, userData, refresh, refresh1 } = props;
      
  const handleSubmit = async () => {
    const adminEmail = localStorage.getItem("email");
    const userId = localStorage.getItem("userId");
    const registeredEmail = userData.map((i) => i.regEmail)
    
      if (registeredEmail.includes(email)) {
      toast.error("user allready added", {
        onClose: () => {
          close();
          close1();
        },
      });
    } 
    else if (email === adminEmail) {
      toast.error("You cannot add yourself", {
        onClose: () => {
          close();
          close1();
          
        },
      });
    } else {
      const result = await addEmails(email, userId, adminEmail);
      if (result) {
        toast.success("Successfully added", {
        onClose: () => {
          close();
            close1();
            refresh();
            refresh1();

        },
      });
      }
    }
  }

  return (
      <div>
              <ToastContainer
        position="top-right"
        autoClose={500}
      />
      
      <Modal open={open} onClose={close} showCloseIcon={false} center
      classNames={{ modal: 'customModal3' }}
            >
              <div className={styles.container}>
                     <h4 style={{textAlign:"center",marginTop:"3rem"}}>{email} Aadded to board</h4>
                  <div className={styles.okbtn}>
               <button className={styles.ok} onClick={handleSubmit} >Okay, got it!</button>
              </div>
          </div>
      </Modal>
    </div>
  )
}

export default ConfermationModal
