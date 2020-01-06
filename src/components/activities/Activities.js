import React from 'react';
import {MDBContainer, MDBBtn, MDBIcon} from 'mdbreact';
import StudentPicker from './StudentPicker';
import ActivityDateRange from './ActivityDateRange';
import Activity from './Activity';

export default ({activities}) => {
    console.log(activities)
    return (
        <div style={{display: "flex", flexDirection: "column", justifyContent: "center"}}>
            <StudentPicker />
            <ActivityDateRange />
            <MDBContainer style={{marginTop: "30px", marginBottom: "30px"}}>
                {activities.map((activity, i) => <Activity key={i} data={activity} />)}
            </MDBContainer>
            <MDBBtn color="primary" style={{borderRadius: "50%", padding: "0px", width: "3em", height: "3em", margin: "0 auto 20px auto"}}>
                <MDBIcon icon="plus" />
            </MDBBtn>
        </div>
    )
}