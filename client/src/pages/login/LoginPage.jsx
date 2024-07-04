import React, { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
toast.configure;

import styles from "../login/LoginPage.module.css"
import { loginUser } from "../../apis/UserApi";
import Art from "../../assets/Art.svg"
import Back from "../../assets/Back.svg"
import Icon from "../../assets/icon.svg"
import Lock from "../../assets/lock.svg"
import View from "../../assets/view.svg"
import Vector from "../../assets/Vector.svg"


function LoginPage() {
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({ email: "", password: "" });
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
        if (!formData.email) newErrors.email = "Email is required";
        if (!formData.password) newErrors.password = "Password is required";

        if (Object.keys(newErrors).length > 0) {
        setErrors(newErrors);
        } else {
        const result = await loginUser(formData);
            if (result) {
                toast.success("Successfully loggedin ", {
                    onClose: () => {
                        navigate("/");
                    },
                });
            }
        }
    };

    function togglePasswordVisibility(){
        setShowPassword(showPassword ? false : true);
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
                    <p style={{ fontSize: "1.5rem", fontWeight: "500", margin: "4rem" }}>Login</p>
                    <form onSubmit={handleSubmit}>
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
                        <button className={styles.login} type="submit">Log in</button>
                        <p style={{ fontWeight: "400", color: "#828282" }}>Have no account yet?</p>
                        <button className={styles.register} onClick={() => navigate("/register")}>Register</button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default LoginPage
