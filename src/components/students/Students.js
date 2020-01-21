import React from "react";
import { MDBContainer, MDBAlert } from "mdbreact";
import StudentCard from "./StudentCard";
import AddStudentCard from "./AddStudentCard";

export default ({ students: data, setStudents }) => {

    const students = () => {
        return (
            <MDBContainer>
                {data.length === 0 && <MDBAlert color="info">Add a student</MDBAlert>}
                {data.map((student, i) => <StudentCard key={i} data={student} students={data} setStudents={setStudents} />)}
            </MDBContainer>
        )
    }

    return (
        <MDBContainer style={{marginTop: "30px", marginBottom: "30px"}}>
            {students()}
            <AddStudentCard students={data} />
        </MDBContainer>
    )
}
