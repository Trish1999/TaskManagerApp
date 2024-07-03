import axios from "axios";
import { Navigate } from "react-router-dom";

const backendUrl = ` http://localhost:3000/api/v1/task`;

export const createTask = async (postPayload) => {
    try {
        const reqUrl = `${backendUrl}/create`;
        const token = JSON.parse(localStorage.getItem("token"));
        axios.defaults.headers.common["Authorization"] = token;
        const response = axios.post(reqUrl, postPayload);
        return response;
    } catch (error) {
        if (error.isTokenExpired) {
            localStorage.clear();
            Navigate("/login");
        }
         console.log(error);
    }
};

export const getTaskDetailsById = async (taskId) => {
    try {
        const reqUrl = `${backendUrl}/task-details/${taskId}`;
        const token = localStorage.getItem("token");
        axios.defaults.headers.common["Authorization"] = token;
        const response = await axios.get(reqUrl);
        return response.data;
    } catch (error) {
        console.log(error);
    }
};

export const updateAssignee = async (taskId) => {
    try {
        const reqUrl = `${backendUrl}/update/assignee/${taskId}`;
        const response = await axios.put(reqUrl);
        return response.data;
    } catch (error) {
        console.log(error);
        
    }
};

export const updateTaskDetailsById = async ( taskId,postPayload) => {
    try {
        const reqUrl = `${backendUrl}/update/${taskId}`;
        const response = await axios.put(reqUrl,postPayload);
        return response.data;
    } catch (error) {
        console.log(error);
       
    }
};

export const updateCategoryById = async ( taskId,postPayload) => {
    try {
        const reqUrl = `${backendUrl}/update/category/${taskId}`;
        const response = await axios.put(reqUrl,postPayload);
        return response.data;
    } catch (error) {
        console.log(error);
       
    }
};



export const deleteTask = async (taskId) => {
    try {
        const reqUrl = `${backendUrl}/delete/${taskId}`;
        const token = JSON.parse(localStorage.getItem("token"));
        axios.defaults.headers.common["Authorization"] = token;
        const response = await axios.delete(reqUrl);
        return response.data;
    } catch (error) {
        console.log(error);
       
    }
};

export const getAllTasks = async () => {
    try {
        const reqUrl = `${backendUrl}/all`;
        const token = JSON.parse(localStorage.getItem("token"));
        axios.defaults.headers.common["Authorization"] = token;
        const response = await axios.get(reqUrl);
        return response.data;
    } catch (error) {
        console.log(error);
        
    }
};
