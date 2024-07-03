import React from 'react'
import { useParams } from 'react-router-dom';

import styles from "../../pages/publicPage/PublicPage.module.css"
import { getTaskDetailsById } from '../../apis/TaskApi';
 
    function PublicPage() {
        const { taskId } = useParams();
        
  return (
    <div>
    </div>
  )
}

export default PublicPage
