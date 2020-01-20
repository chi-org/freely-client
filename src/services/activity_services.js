import api from "../config/api";

export const getAllActivities = async () => {
    try {
        return await api.get("activities/getActivitiesByUser");
    }
    catch (error) {
        console.log(error);
        throw(error);
    }
}

export const submitNewActivity = async (data) => {
    try {
        return await api.post("activities/createActivity", data);
    }
    catch (error) {
        console.log(error);
        throw(error);
    }
}
