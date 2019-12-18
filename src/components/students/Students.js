import React from 'react';
import { MDBContainer } from 'mdbreact';
import StudentCard from './StudentCard';
import AddStudentCard from './AddStudentCard';

export default () => {
    return (
        <MDBContainer style={{marginTop: "30px", marginBottom: "30px"}}>
            <StudentCard name={'Ben'} color={"#317821"} />
            <StudentCard name={'Jerry'} color={"#4285F4"} />
            <StudentCard name={'Bob'} color={"#fffff"} />
            <AddStudentCard />
        </MDBContainer>
    )
}