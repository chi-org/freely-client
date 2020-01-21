import React, { useState, useEffect } from 'react';
import {MDBContainer, MDBBtn, MDBIcon, MDBAlert, MDBInput} from 'mdbreact';
import Activity from './Activity';
import NewActivity from './NewActivity';
import { getAllActivities } from '../../services/activity_services';
import { Multiselect } from 'multiselect-react-dropdown';

export default ({ activities: data, setActivities, students }) => {

    const [showNewActivityModal, setShowNewActivityModal] = useState(false);
    const [from, setFrom] = useState(null);
    const [to, setTo] = useState(null);
    const [selectedStudent, setSelectedStudent] = useState([]);

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

    const unscheduledActivities = () => {
        return data.filter(activity => !activity.date);
    }

    const onCustomDateChange = () => {
        if (from && to) {
            return data.filter(activity => {
                const date = new Date(activity.date);
                return date >= from && date <= to;
            });
        }
        else {
            return [];
        }
    }

    // Elements
    const [showCustomDateSelection, setShowCustomDateSelection] = useState(false);
    const [filterMethod, setFilterMethod] = useState("today");

    const studentPicker = () => {
        let selectableStudentList = [{ name: "All students" }, ...students]
        return (
            <div style={{ width: "100%", display: "flex", justifyContent: "center", marginTop: "30px" }}>
                <Multiselect placeholder="Select student" singleSelect={true} onSelect={(value) => setSelectedStudent(value)} onRemove={(value) => setSelectedStudent(value)} options={selectableStudentList} displayValue="name"
                    style={{ chips: {fontSize: "1rem", margin: "0px"}, searchBox: { maxWidth: "80%", margin: "20px auto 40px auto", border: "none", borderBottom: "1px solid #D0D0D0", borderRadius: "0px" } }} />
            </div>
        )
    }

    const activityDateRange = () => {
        return (
            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", marginTop: "10px" }}>
                <MDBBtn color="primary" onClick={() => { setFilterMethod("today"); setShowCustomDateSelection(false) }}>Today</MDBBtn>
                <MDBBtn color="primary" onClick={() => { setFilterMethod("week"); setShowCustomDateSelection(false) }}>Next 7 Days</MDBBtn>
                <MDBBtn color="primary" onClick={() => { setFilterMethod("unscheduled"); setShowCustomDateSelection(false) }}>Unscheduled</MDBBtn>
                <MDBBtn color="primary" onClick={() => { setFilterMethod("custom"); setFrom(null); setTo(null); setShowCustomDateSelection(true) }} >
                    <MDBIcon icon="search" />
                </MDBBtn>
            </div>
        )
    }

    const activities = () => {
        let activitiesMatchingCriteria = [];

        switch (filterMethod) {
            case "today": activitiesMatchingCriteria = todayActivities(); break;
            case "week": activitiesMatchingCriteria = nextSevenDaysActivities(); break;
            case "unscheduled": activitiesMatchingCriteria = unscheduledActivities(); break;
            case "custom": activitiesMatchingCriteria = onCustomDateChange(); break;
            default: activitiesMatchingCriteria = []; break;
        }

        if (selectedStudent.length > 0 && selectedStudent[0].name !== "All students") {
            activitiesMatchingCriteria = activitiesMatchingCriteria.filter(activity => {
                return activity.students.indexOf(selectedStudent[0]._id) > -1
            })
        }

        return (
            <MDBContainer style={{marginTop: "30px", marginBottom: "30px"}}>
                {activitiesMatchingCriteria.length === 0 && <MDBAlert color="info">No activities match the search criteria</MDBAlert>}
                {activitiesMatchingCriteria.map((activity, i) => <Activity key={i} students={students} data={activity} activities={data} setActivities={setActivities} />)}
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
                <form style={{ display: "flex", justifyContent: "space-around", padding: "30px 25% 0px" }}>
                    <MDBInput type="date" name="from" label="From" onChange={(event) => setFrom(new Date(event.target.value))} />
                    <MDBInput type="date" name="to" label="To" onChange={(event) => setTo(new Date(event.target.value))} />
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
            <NewActivity activities={data} isOpen={showNewActivityModal} setShowNewActivityModal={setShowNewActivityModal} students={students} />
        </div>
    )
}