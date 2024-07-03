import React from 'react'
import styles from "../../components/nameIcon/NameIcon.module.css"

function NameIcon({ email }) {
console.log(email)
  const getInitials = (email) => {
    return email.slice(0, 2).toUpperCase();
  }

  const initials = getInitials(email);

  return (
    <div className={styles.emailIcon}>
      {initials}
    </div>
  );
};

export default NameIcon
