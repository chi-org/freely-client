import React, { useState, useEffect } from 'react';
import {MDBContainer, MDBBtn, MDBIcon, MDBAlert, MDBInput} from 'mdbreact';
import Activity from './Activity';
import NewActivity from './NewActivity';
import { getAllActivities } from '../../services/activity_services';

export default ({ activities: data, setActivities, students }) => {

    const [showNewActivityModal, setShowNewActivityModal] = useState(false);

    // Search field manipulation
    const todayActivities = () => {
        const today = new Date();
        return data.filter(activity => {
            const date = new Date(activity.date);
            return date.getDate() === today.getDate() && date.getMonth() === today.getMonth() && date.getFullYear() === today.getFullYear();
        });
    }

    const nextSevenDaysActivities = () => {
        const today = new Date();
        return data.filter(activity => {
            const date = new Date(activity.date);
            return date.getDate() >= today.getDate() && date.getDate() < today.getDate() + 7 && date.getMonth() === today.getMonth() && date.getFullYear() === today.getFullYear();
        });
    }

    const unscheduledActivities = () => data.filter(activity => !activity.date);

    const onCustomDateChange = () => {
        const form = document.getElementById("date-picker");
        const from = new Date(form.from.value);
        const to = new Date(form.to.value);

        if (from && to) {
            setActivitiesMatchingCriteria(data.filter(activity => {
                const date = new Date(activity.date);
                return date >= from && date <= to;
            }));
        }
        else {
            setActivitiesMatchingCriteria([]);
        }
    }

    // Elements
    const [activitiesMatchingCriteria, setActivitiesMatchingCriteria] = useState(todayActivities());
    const [showCustomDateSelection, setShowCustomDateSelection] = useState(false);

    const studentPicker = () => {
        return (
            <div style={{width:"100%", display:"flex", justifyContent:"center", marginTop:"30px"}}>
            <select className="browser-default custom-select" style={{width: "8em", border: "none", fontSize: "1.3em", fontWeight: "bolder"}}>
                    {students.map((student, i) => {
                        return <option key={i}>{student.name}</option>
                    })}
            </select>
            </div>
        )
    }

    const activityDateRange = () => {
        return (
            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", marginTop: "10px" }}>
                <MDBBtn color="primary" onClick={() => { setActivitiesMatchingCriteria(todayActivities); setShowCustomDateSelection(false) }}>Today</MDBBtn>
                <MDBBtn color="primary" onClick={() => { setActivitiesMatchingCriteria(nextSevenDaysActivities); setShowCustomDateSelection(false) }}>Next 7 Days</MDBBtn>
                <MDBBtn color="primary" onClick={() => { setActivitiesMatchingCriteria(unscheduledActivities); setShowCustomDateSelection(false) }}>Unscheduled</MDBBtn>
                <MDBBtn color="primary" onClick={() => { setShowCustomDateSelection(true); setActivitiesMatchingCriteria([]) }} >
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

    const customDateSelection = () => {
        return (
            <div>
                <form id="date-picker" style={{ display: "flex", justifyContent: "space-around", padding: "30px 25% 0px" }}>
                    <MDBInput type="date" name="from" label="From" onChange={onCustomDateChange} />
                    <MDBInput type="date" name="to" label="To" onChange={onCustomDateChange} />
                </form>
            </div>
        )
    }

    useEffect(() => {
        getAllActivities()
            .then((response) => setActivities(response.data))
            .catch((error) => console.log(error))
    }, [setActivities]);

    return (
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "flex-start", marginBottom: "60px" }}>
            {studentPicker()}
            {activityDateRange()}
            {showCustomDateSelection && customDateSelection()}
            {activities()}
            {newActivityButton()}
            <NewActivity activities={data} isOpen={showNewActivityModal} setShowNewActivityModal={setShowNewActivityModal} />
        </div>
    )
}