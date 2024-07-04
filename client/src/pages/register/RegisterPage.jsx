import React, { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
toast.configure;

import styles from "../register/RegisterPage.module.css"
import { registerUser } from "../../apis/UserApi";
import Art from "../../assets/Art.svg"
import Back from "../../assets/Back.svg"
import Icon from "../../assets/icon.svg"
import Lock from "../../assets/lock.svg"
import View from "../../assets/view.svg"
import Vector from "../../assets/Vector.svg"
import User from "../../assets/Frame 1036.svg"


function RegisterPage() {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfPassword, setShowConfPassword] = useState(false);
    const [formData, setFormData] = useState({ name: "", email: "", password: "", confpassword: "" });
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();
    
    const handleFormChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });

        if (errors[name]) {
            setErrors({ ...errors, [name]: "" });
        }
    };
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        const newErrors = {};
        if (!formData.name) newErrors.name = "Name is required";
        if (!formData.email) newErrors.email = "Email is required";
        if (!formData.password) newErrors.password = "Password is required";
        if (!formData.confpassword) newErrors.confpassword = "Confirm password is required";
        if (formData.confpassword && formData.confpassword && formData.password !== formData.confpassword) newErrors.confpassword = "Password and confirm password is not matching";
            
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
        }
        else {
            const result = await registerUser(formData);
            if (result) {
                toast.success("You are registered successfully", {
                    onClose: () => {
                        navigate("/login");
                    },
                });
            }
        };
    }

    function togglePasswordVisibility(){
        setShowPassword(showPassword ? false : true);
    };

    function toggleConfPasswordVisibility(){
        setShowConfPassword(showConfPassword ? false : true);
    };

    return (
        <>
            <ToastContainer
            position="top-right"
            autoClose={500}
            />
            <div className={styles.mainContainer}>
                <div className={styles.leftContainer}>
                    <div className={styles.imageContainer} >
                        <img className={styles.logo} src={Art} alt="logo" />
                        <img className={styles.logoBack} src={Back} alt="logoBack" />
                        <div className={styles.text}>
                            <p style={{ fontSize: "1.7rem", fontWeight: "400" }}>Welcome aboard my friend</p>
                            <p> just a couple of clicks and we start</p>
                        </div>
                    </div>
                </div>
                <div className={styles.rightContainer}>
                    <p style={{ fontSize: "1.5rem", fontWeight: "500", margin: "4rem" }}>Register</p>
                    <form onSubmit={handleSubmit}>
                        <div className={styles.inputContainer}>
                            <img src={User} alt="icon" className={styles.icon} />
                            <input
                                className={styles.inputbox}
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleFormChange}
                                placeholder="Name"
                            />
                        </div>
                        {errors.name && <p className={styles.error}>{errors.name}</p>}
                        <div className={styles.inputContainer}>
                            <img src={Icon} alt="icon" className={styles.icon} />
                            <input
                                className={styles.inputbox}
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleFormChange}
                                placeholder="Email"
                            />
                        </div>
                        {errors.email && <p className={styles.error}>{errors.email}</p>}
                        <div className={styles.inputContainer}>
                            <img src={Lock} alt="icon" className={styles.icon} />
                            <input
                                className={styles.inputbox}
                                type={showPassword ? "text" : "password"} 
                                name="password" 
                                value={formData.password}
                                onChange={handleFormChange}
                                placeholder="Password"
                            />
                            <img className={styles.viewIcon} src={showPassword ? Vector : View} alt="passwordView" onClick={togglePasswordVisibility} />
                        </div>
                        {errors.password && <p className={styles.error}>{errors.password}</p>}
                        <div className={styles.inputContainer}>
                            <img src={Lock} alt="icon" className={styles.icon} />
                            <input
                                className={styles.inputbox}
                                type={showConfPassword ? "text" : "password"} 
                                name="confpassword" 
                                value={formData.confpassword}
                                onChange={handleFormChange}
                                placeholder="Confirm Password"
                            />
                            <img className={styles.viewIcon} src={showConfPassword ? Vector : View} alt="passwordView" onClick={toggleConfPasswordVisibility} />
                        </div>
                        {errors.confpassword && <p className={styles.error}>{errors.confpassword}</p>}
                        <button className={styles.register} type="submit">Register</button>
                        <p style={{ fontWeight: "400", color: "#828282" }}>Have an account ?</p>
                        <button className={styles.login} onClick={() => navigate("/login")}>Log in</button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default RegisterPage