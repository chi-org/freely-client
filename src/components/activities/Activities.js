import React from 'react';
import {MDBContainer, MDBBtn, MDBIcon} from 'mdbreact';
import Activity from './Activity';
import { useHistory } from 'react-router-dom';

export default ({activities: data}) => {

    const history = useHistory();

    const studentPicker = () => {
        return (
            <div style={{width:"100%", display:"flex", justifyContent:"center", marginTop:"30px"}}>
            <select className="browser-default custom-select" style={{width: "8em", border: "none", fontSize: "1.3em", fontWeight: "bolder"}}>
                <option>Student 1</option>
                <option>Student 2</option>
                <option>Student 3</option>
            </select>
            </div>
        )
    }

    const activityDateRange = () => {
        return (
            <div style={{display: "flex", flexWrap: "wrap", justifyContent: "center", marginTop: "10px"}}>
                <MDBBtn color="primary">Today</MDBBtn>
                <MDBBtn color="primary">Next 7 Days</MDBBtn>
                <MDBBtn color="primary">Unscheduled</MDBBtn>
                <MDBBtn color="primary">
                    <MDBIcon icon="search" />
                </MDBBtn>
            </div>
        )
    }

    const activities = () => {
        return (
            <MDBContainer style={{marginTop: "30px", marginBottom: "30px"}}>
                {data.map((activity, i) => <Activity key={i} data={activity} />)}
            </MDBContainer>
        )
    }

    const newActivityButton = () => {
        return (
            <MDBBtn onClick={() => history.push("/activities/new")} color="primary" style={{borderRadius: "50%", padding: "0px", width: "3em", height: "3em", margin: "0 auto 20px auto"}}>
                <MDBIcon icon="plus" />
            </MDBBtn>
        )
    }

    return (
        <div style={{display: "flex", flexDirection: "column", justifyContent: "flex-start"}}>
            {studentPicker()}
            {activityDateRange()}
            {activities()}
            {newActivityButton()}
        </div>
    )
}