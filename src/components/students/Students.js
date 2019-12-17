import React from 'react';
import { MDBContainer } from 'mdbreact';
import StudentCard from './StudentCard';
import AddStudentCard from './AddStudentCard';

export default () => {
    return (
        <MDBContainer style={{marginTop: "30px", marginBottom: "30px"}}>
            <StudentCard />
            <StudentCard />
            <StudentCard />
            <AddStudentCard />
        </MDBContainer>
    )
}