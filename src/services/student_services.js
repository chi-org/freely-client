import api from "../config/api";

export const getStudents = async () => {
  try {
    return await api.get("students/getStudents");
  }
  catch (error) {
    console.log(error);
    throw(error);
  }
}

export const addStudent = async (data) => {
  try {
    return await api.post("students/newStudent", data);
  }
  catch (error) {
    console.log(error);
    throw(error);
  }
}

export const deleteStudent = async (studentId) => {
  try {
    return await api.delete("students/deleteStudent", { data: studentId });
  }
  catch (error) {
    console.log(error);
    throw(error);
  }
}
