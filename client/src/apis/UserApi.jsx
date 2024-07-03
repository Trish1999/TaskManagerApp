import axios from "axios";
import "react-toastify/dist/ReactToastify.css";

const backendUrl = ` http://localhost:3000/api/v1/user`;

export const registerUser = async ({ name,email, password }) => {
    try {
        const reqUrl = `${backendUrl}/register`;
        const response = await axios.post(reqUrl, {
            name,
            email,
            password,
        });
        return (response);
    } catch (error) {
         console.log(error);
    }
};

export const loginUser = async ({ email, password }) => {
    try {
        const reqUrl = `${backendUrl}/login`;
        const response = await axios.post(reqUrl, {
            email,
            password,
        });
        if (response.data?.token) {
            localStorage.setItem("token", JSON.stringify(response.data?.token));
            localStorage.setItem("email", (response.data?.email));
             localStorage.setItem("name",(response.data?.name));
            localStorage.setItem(
                "userId",
                (response.data?.userId)
            );
            localStorage.setItem("password",(response.data?.password));
        }
        return true;
        
    } catch (error) {
         console.log(error);
    }
};

export const addEmails = async (email,userId,adminEmail) => {
    try {
        const reqUrl = `${backendUrl}/add/emails`;
        const response = await axios.post(reqUrl, {
            email,
            userId,
            adminEmail
        });
        return (response);
    } catch (error) {
         console.log(error);
    }
};

export const getUserDetailsById = async (userId) => {
    try {
        const reqUrl = `${backendUrl}/user-details/${userId}`;
        const response = await axios.get(reqUrl);
        return response.data;
    } catch (error) {
        console.log(error);
    }
};

export const updateUserDetailsById = async ( userId, updatedName,
    updatedEmail,
    oldPassword,
    newPassword ) => {
    try {
        const reqUrl = `${backendUrl}/user-details/update/${userId}`;
        const response = await axios.put(reqUrl, {
            updatedName,
          updatedEmail,
          oldPassword,
            newPassword
        });
        return response.data;
    } catch (error) {
        console.log(error);
    }
};

