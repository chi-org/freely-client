import React, { useState } from 'react';
import {MDBContainer, MDBBtn, MDBIcon, MDBAlert} from 'mdbreact';
import Activity from './Activity';
import NewActivity from './NewActivity';

export default ({activities: data}) => {

    const [showNewActivityModal, setShowNewActivityModal] = useState(false);

    const todayActivities = () => {
        return data.filter(activity => {
            let today = new Date();
            let date = new Date(activity.date);
            
            return date.getDate() === today.getDate() && date.getMonth() === today.getMonth() && date.getFullYear() === today.getFullYear();
        });
    }

    const nextSevenDaysActivities = () => {
        return data.filter(activity => {
            let today = new Date();
            let date = new Date(activity.date);
            
            return date.getDate() >= today.getDate() && date.getDate() < today.getDate() + 7 && date.getMonth() === today.getMonth() && date.getFullYear() === today.getFullYear();
        });
    }

    const [activitiesMatchingCriteria, setActivitiesMatchingCriteria] = useState(todayActivities());

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
                <MDBBtn color="primary" onClick={() => setActivitiesMatchingCriteria(todayActivities)}>Today</MDBBtn>
                <MDBBtn color="primary" onClick={() => setActivitiesMatchingCriteria(nextSevenDaysActivities)}>Next 7 Days</MDBBtn>
                <MDBBtn color="primary" onClick={() => setActivitiesMatchingCriteria(data)}>Unscheduled</MDBBtn>
                <MDBBtn color="primary">
                    <MDBIcon icon="search" />
                </MDBBtn>
            </div>
        )
    }

    const activities = () => {
        return (
            <MDBContainer style={{marginTop: "30px", marginBottom: "30px"}}>
                {activitiesMatchingCriteria.length === 0 && <MDBAlert color="info">No activities match the search criteria</MDBAlert>}
                {activitiesMatchingCriteria.map((activity, i) => <Activity key={i} data={activity} />)}
            </MDBContainer>
        )
    }

    const newActivityButton = () => {
        return (
            <MDBBtn onClick={() => setShowNewActivityModal(true)} color="primary" style={{position:"fixed", bottom:"20px", left:"calc(50% - 1.5em)", borderRadius: "50%", padding: "0px", width: "3em", height: "3em"}}>
                <MDBIcon icon="plus" />
            </MDBBtn>
        )
    }

    const newActivityModal = () => {
        return (
            <NewActivity activities={data} isOpen={showNewActivityModal} setShowNewActivityModal={setShowNewActivityModal} />
        )
    }

    return (
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "flex-start", marginBottom: "60px" }}>
            {studentPicker()}
            {activityDateRange()}
            {activities()}
            {newActivityButton()}
            {newActivityModal()}
        </div>
    )
}