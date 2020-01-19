import React, { useState } from "react";
import { MDBContainer, MDBAlert } from "mdbreact";
import StudentCard from "./StudentCard";
import AddStudentCard from "./AddStudentCard";
import { useHistory } from "react-router-dom";

export default ({students: data}) => {

    const history = useHistory();


    const students = () => {
        return (
            <MDBContainer>
                {data.length === 0 && <MDBAlert color="info">Add a student</MDBAlert>}
                {data.map((student, i) => <StudentCard key={i} data={student} />)}
            </MDBContainer>
        )
    }

    return (
        <MDBContainer style={{marginTop: "30px", marginBottom: "30px"}}>
            {students()}
            {/* <StudentCard name={'Ben'} color={"#317821"} />
            <StudentCard name={'Jerry'} color={"#4285F4"} />
            <StudentCard name={'Bob'} color={"#fffff"} /> */}
            <AddStudentCard />
        </MDBContainer>
    )
}
