import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

import styles from '../settings/Settings.module.css';
import Navbar from '../../components/navbar/Navbar';
import Icon from '../../assets/icon.svg';
import Lock from '../../assets/lock.svg';
import View from '../../assets/view.svg';
import Vector from '../../assets/Vector.svg';
import User from '../../assets/Frame 1036.svg';
import { updateUserDetailsById } from '../../apis/UserApi';

function Settings() {
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [updatedName, setUpdatedName] = useState(localStorage.getItem('name') || '');
  const [updatedEmail, setUpdatedEmail] = useState(localStorage.getItem('email') || '');
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const userId = localStorage.getItem('userId');
  let updatePassword;
  const navigate = useNavigate();

  const handleNameChange = (e) => {
    setUpdatedName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setUpdatedEmail(e.target.value);
  };

  const handleOldPasswordChange = (e) => {
    setOldPassword(e.target.value);
  };

  const handleNewPasswordChange = (e) => {
    setNewPassword(e.target.value);
  };

  const oldPasswordVisibility = () => {
    setShowOldPassword(!showOldPassword);
  };

  const newPasswordVisibility = () => {
    setShowNewPassword(!showNewPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const originalName = localStorage.getItem('name');
    const originalEmail = localStorage.getItem('email');

    const isFieldUpdated = (original, updated) => original !== updated;

    const nameUpdated = isFieldUpdated(originalName, updatedName);
    const emailUpdated = isFieldUpdated(originalEmail, updatedEmail);
    const passwordUpdated = !!oldPassword || !!newPassword;
    console.log(nameUpdated, emailUpdated, passwordUpdated);

    const updatedFieldsCount = [nameUpdated, emailUpdated, passwordUpdated].filter(Boolean).length;

    let newErrors = {};

    if (!nameUpdated && !emailUpdated && !oldPassword && !newPassword) {
      newErrors = "Please update at least one field.";
    } else if (updatedFieldsCount !== 1) {
      newErrors = "Please update only one field at a time.";
    } else if ((oldPassword && !newPassword) || (!oldPassword && newPassword)) {
      newErrors = "Both old and new passwords are required to update the password.";
    }

    if (Object.keys(newErrors).length > 0) {
      toast.error(newErrors);
      return;
    }

    try {
      if (!oldPassword && !newPassword) {
        updatePassword = "false";
        const result = await updateUserDetailsById(userId, updatedName, updatedEmail, "", "", updatePassword);
        if (result) {
          toast.success("Successfully updated ");
        } else {
          toast.error("Failed to update");
        }
      } else {
        updatePassword = "true"
        const result = await updateUserDetailsById(userId, updatedName, updatedEmail, oldPassword, newPassword, updatePassword);
        if (result) {
          toast.success("Successfully updated please login again", {
            onClose: () => {
              navigate("/login");
            },
          })
        } else {
          toast.error("Failed to update");
        }
      }
    } catch (error) {
      console.log(error);
      toast.error("An error occurred while updating");
    }
  };

  return (
    <div>
      <div className={styles.mains}>
        <ToastContainer position="top-right" autoClose={1000} />
        <Navbar />
        <div className={styles.container}>
          <h3>Settings</h3>
          <form style={{ marginTop: '3rem' }} onSubmit={handleSubmit}>
            <div className={styles.inputContainer}>
              <img src={User} alt="icon" className={styles.icon} />
              <input
                className={styles.inputbox}
                type="text"
                name="updatedName"
                value={updatedName}
                onChange={handleNameChange}
                placeholder="Name"
              />
            </div>
            <div className={styles.inputContainer}>
              <img src={Icon} alt="icon" className={styles.icon} />
              <input
                className={styles.inputbox}
                type="email"
                name="updatedEmail"
                value={updatedEmail}
                onChange={handleEmailChange}
                placeholder="Update Email"
              />
            </div>
            <div className={styles.inputContainer}>
              <img src={Lock} alt="icon" className={styles.icon} />
              <input
                className={styles.inputbox}
                type={showOldPassword ? 'text' : 'password'}
                name="oldPassword"
                value={oldPassword}
                onChange={handleOldPasswordChange}
                placeholder="Old Password"
              />
              <img
                className={styles.viewIcon}
                src={showOldPassword ? Vector : View}
                alt="passwordView"
                onClick={oldPasswordVisibility}
              />
            </div>
            <div className={styles.inputContainer}>
              <img src={Lock} alt="icon" className={styles.icon} />
              <input
                className={styles.inputbox}
                type={showNewPassword ? 'text' : 'password'}
                name="newPassword"
                value={newPassword}
                onChange={handleNewPasswordChange}
                placeholder="New Password"
              />
              <img
                className={styles.viewIcon}
                src={showNewPassword ? Vector : View}
                alt="passwordView"
                onClick={newPasswordVisibility}
              />
            </div>
            <button className={styles.update} type="submit">Update</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Settings;
