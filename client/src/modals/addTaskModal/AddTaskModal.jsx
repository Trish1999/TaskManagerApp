import React from 'react'
import { useState, forwardRef } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Modal } from 'react-responsive-modal';
import 'react-responsive-modal/styles.css';
import DatePicker from 'react-datepicker';
import { format } from 'date-fns';
import Select from 'react-select';
import 'react-datepicker/dist/react-datepicker.css';

import { createTask,updateTaskDetailsById} from "../../apis/TaskApi";
import styles from './AddTaskModal.module.css'
import "../../modals/Custom-styling.css";
import Delete from "../../assets/Delete.svg"

function AddTaskModal(props) {
    const { close, open, userData, refresh, editable, taskId, title, editClose, editOpen, category, refUserId, priority, checklistItems, assignedTo, dueDate, userId
    } = props;
    const [formData, setFormData] = useState({
        title: editable ? title :"",
        priority: editable ? priority :"",
        category: editable ? category :"todo",
        assignedTo: editable ? assignedTo :"",
        dueDate: editable ? dueDate : "",
        checklistItems: editable ? checklistItems :[],
        
    });
    const [errors, setErrors] = useState({});
    const [idCounter, setIdCounter] = useState(checklistItems ? checklistItems.length + 1 : 1);

    const handleFormChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });

        if (errors[name]) {
            setErrors({ ...errors, [name]: "" });
        }
    };

    const handleAddItem = () => {
        const newItem = { id: idCounter, text:'', isChecked: false };
        setFormData({
            ...formData,
            checklistItems: [...formData.checklistItems, newItem]
        });
        setIdCounter(idCounter + 1);
              if (errors.checklistItems) {
            setErrors({ ...errors, checklistItems: '' });
        }
    };

    const handleRemoveItem = (id) => {
        setFormData({
            ...formData,
            checklistItems: formData.checklistItems.filter(item => item.id !== id)
        });
    };

    const handleCheckItem = (id) => {
        setFormData({
            ...formData,
            checklistItems: formData.checklistItems.map(item =>
                item.id === id ? { ...item, isChecked: !item.isChecked } : item
            )
        });
    };

   const handleOnChange = (id, text) => {
        setFormData({
            ...formData,
            checklistItems: formData.checklistItems.map(item =>
                item.id === id ? { ...item, text } : item
            )
        });

       if (errors.checklistItems || errors.checklistItems1) {
        setErrors({ ...errors, checklistItems: "", checklistItems1: "" });
    }
    };

    const handleDateChange = (date) => {
        setFormData({ ...formData, dueDate:date });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newErrors = {};
        if (!formData.title) newErrors.title = "Title is required";
        if (!formData.priority) newErrors.priority = "Priority is required";
        if (formData.checklistItems.length < 1) newErrors.checklistItems = "At least one checklist item is required";
        if (formData.checklistItems.some(item => !item.text)) newErrors.checklistItems1 = "Checklist items cannot be empty";

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
        } else {
            if (editable) {
                const res = await updateTaskDetailsById(taskId, formData);
                if (res) {
                    toast.success("Successfully updated", {
                        onClose: () => {
                            editClose();
                            refresh();
                        },
                    });
                }
            } else {
                const result = await createTask(formData);
                if (result) {
                    toast.success("Successfully added task");
                    close();
                    refresh();
                }
            }
        };
    }

    const CustomInput = forwardRef(({ value, onClick }, ref) => (
        <button
            className={styles.footerbtn1}
            onClick={(e) => {
                e.preventDefault();
                onClick(e);
            }}
            ref={ref}
        >
            {value || 'Select Due Date'}
        </button>
    ));

    const IsAdmin = (userId === refUserId ? true : false);

  const customOption = ({ data, innerRef, innerProps }) => {
    return (
      <div ref={innerRef} {...innerProps} className={styles.option}>
            <div className={styles.icon}>{(data.label).slice(0, 2).toUpperCase()}</div>
        <div className={styles.email}>{data.label}</div>
        <button         
                onClick={(e) => {
            setFormData({ ...formData, assignedTo: data.value });
          }}
          className={styles.assignButton}
        >
          Assign
        </button>
      </div>
    );
  };

  const options = userData.map((user, index) => ({
    value: user.regEmail,
    label: user.regEmail,
  }));

    return (
        <div>
            <ToastContainer
                position="top-right"
                autoClose={500}
            />
            <Modal
                open={editable? editOpen:open} 
                onClose={editable? editClose:close} 
                showCloseIcon={false}
                center
                classNames={{ modal: 'customModal1' }}
            >
                <div className={styles.container}>
                    <form onSubmit={handleSubmit}>
                        <div className={styles.input}>
                            <label>Title <span className={styles.required}>*</span></label>
                            <br />
                            <input
                                className={styles.inputbox1}
                                type="text"
                                name="title"
                                value={formData.title}
                                onChange={handleFormChange}
                                placeholder='Enter Task Title'
                            />
                            {errors.title && <span className={styles.error}>{errors.title}</span>}
                        </div>
                        <div className={styles.priority}>
                            <label>Select Priority <span className={styles.required}>*</span></label>
                            <button
                                type="button"
                                className={styles.prioritybtn}
                                style={{ backgroundColor: (formData.priority) === "high" ? '#EEECEC' : 'white' }}
                                onClick={() => setFormData({ ...formData, priority: 'high' })}
                            >
                                <span className={styles.dot1} /> HIGH PRIORITY
                            </button>
                            <button
                                type="button"
                                className={styles.prioritybtn}
                                style={{ backgroundColor: (formData.priority) === "moderate" ? '#EEECEC' : 'white' }}

                                onClick={() => setFormData({ ...formData, priority: 'moderate' })}
                            >
                                <span className={styles.dot2} /> MODERATE PRIORITY
                            </button>
                            <button
                                type="button"
                                className={styles.prioritybtn}
                                style={{ backgroundColor: (formData.priority) === "low" ? '#EEECEC' : 'white' }}

                                onClick={() => setFormData({ ...formData, priority: 'low' })}
                            >
                                <span className={styles.dot3} /> LOW PRIORITY
                            </button>
                        </div>
                        {errors.priority && <span className={styles.error}>{errors.priority}</span>}
                        {IsAdmin &&
                            <div className={styles.select}>
                                <label>Assign To</label>
                                <Select
                                    className={styles.inputbox2}
                                    value={options.find(
                                        (option) => option.value === formData.assignedTo
                                    )}
                                    options={options}
                                    components={{ Option: customOption }}
                                    placeholder="Add an Assignee"
                                    onChange={(selectedOption) => {
                                        setFormData({ ...formData, assignedTo: selectedOption.value });
                                        if (errors.assignedTo) {
                                            setErrors({ ...errors, assignedTo: "" });
                                        }
                                    }}
                                />
                            </div>}
                        <div className={styles.checkls}>
                            <label>Checklist ({(formData.checklistItems).filter(item => item.isChecked).length}/{(formData.checklistItems).length})<span className={styles.required}>*</span></label>
                            <div className={styles.checklist}>
                            
                            {errors.checklistItems && <span className={styles.error}>{errors.checklistItems}</span>}
                            {errors.checklistItems1 && <span className={styles.error}>{errors.checklistItems1}</span>}

                                {formData.checklistItems.map((item,index) => (
                                    <div key={item.id} className={styles.checklistItem}>
                                        <input
                                            type="checkbox"
                                            checked={item.isChecked}
                                            onChange={() => handleCheckItem(item.id)}
                                            className={styles.checkbox}
                                        />
                                        <input
                                            type="text"
                                            value={item.text}
                                            onChange={(e) => handleOnChange(item.id, e.target.value)}
                                            placeholder="Add a task"
                                            className={styles.checklistInput}
                                        />
                                        <img
                                            src={Delete}
                                            onClick={() => handleRemoveItem(item.id)}
                                            className={styles.removeItemBtn}
                                            alt="Delete"
                                        />

                                    </div>
                                ))}
                                <br/>
                                <button
                                type="button"
                                onClick={handleAddItem}
                                className={styles.addNewItemBtn}
                            >
                                <span className={styles.add}>+</span>Add New
                            </button>
                            </div>
                        </div>
                        <div className={styles.footer}>
                            <DatePicker
                                selected={formData.dueDate}
                                onChange={handleDateChange}
                                customInput={<CustomInput />}
                                dateFormat="dd/MM/yyyy"
                            />
                            <div>
                                <button
                                    className={styles.footerbtn2}
                                    onClick={editable ? editClose :
                                        close
                                    }
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className={styles.footerbtn3}
                                >
                                    Save
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </Modal>
        </div>
    );
};

export default AddTaskModal;
