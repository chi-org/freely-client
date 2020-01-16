import api from "../config/api";

export const getStudents = async () => {
  try {
    return await api.get("myStudents");
  }
  catch (error) {
    console.log(error);
    throw(error);
  }
}

export const addStudent = async (data) => {
  try {
    return await api.post("newStudent", data);
  }
  catch (error) {
    console.log(error);
    throw(error);
  }
}
