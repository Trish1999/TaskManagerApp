import React,{useState} from 'react'
import { Modal } from 'react-responsive-modal';
import 'react-responsive-modal/styles.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import styles from "../addEmailModal/AddEmailModal.module.css"
import ConfermationModal from './ConfermationModal';

function AddEmailModal(props) {
  const { close, open, userData, refresh } = props;
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [showConfermationModal, setShowConfermationModal] = useState(false)
  
    const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (email === '') {
      setError('email is required');
    }
    else if (!validateEmail(email)) {
      setError('Invalid email format');
    }
      else {
      setError('');
      setShowConfermationModal(true);
    }
  };


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
                  <h4 style={{textAlign:"left"}}>Add people to the board</h4>
          <input
            name="email"
            className={styles.email}
            value={email}
            type="email"
            onChange={(e) => {
            setError('')
            setEmail(e.target.value)
            }}
            placeholder='Enter the Email'
          />
          {error && <div style={{ color: 'red',textAlign:'center',fontSize:"0.8rem" }}>{error}</div>}
          <div className={styles.btn}>
               <button className={styles.cancel} onClick={close}>Cancel</button>
                <button className={styles.add} onClick={handleSubmit}>Add Email</button>
          </div>

          </div>
          </Modal>
      {showConfermationModal &&
        <ConfermationModal
              close={() => setShowConfermationModal(false)}
              open={() => setShowConfermationModal(true)}
        email={email}
        close1={close}
        userData={userData}
        refresh={refresh}
        />
      }
    </div>
  )
}
export default AddEmailModal
