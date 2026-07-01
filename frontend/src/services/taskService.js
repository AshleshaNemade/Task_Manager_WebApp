import api from "./api";

const getHeader = () => ({

    headers:{
        Authorization:`Bearer ${localStorage.getItem("token")}`
    }

});

export const getTasks = async () => {

    const response = await api.get(
        "/tasks",
        getHeader()
    );

    return response.data;

};

export const createTask = async (data) => {

    const response = await api.post(
        "/tasks",
        data,
        getHeader()
    );

    return response.data;

};

export const updateTask = async (id,data) => {

    const response = await api.put(
        `/tasks/${id}`,
        data,
        getHeader()
    );

    return response.data;

};

export const deleteTask = async (id) => {

    const response = await api.delete(
        `/tasks/${id}`,
        getHeader()
    );

    return response.data;

};

export const getTask = async (id) => {

    const response = await api.get(
        `/tasks/${id}`,
        getHeader()
    );

    return response.data;

};

export const getActivityLogs = async () => {

    const response = await api.get(
        "/activity",
        getHeader()
    );

    return response.data;

};