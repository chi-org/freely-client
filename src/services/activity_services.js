import api from "../config/api";

export const getAllActivities = async () => {
    try {
        return await api.get("getAllActivities");
    }
    catch (error) {
        console.log(error);
        throw(error);
    }
}
