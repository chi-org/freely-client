import React, { useState, useEffect } from 'react';
import {MDBContainer, MDBBtn, MDBIcon, MDBAlert, MDBInput} from 'mdbreact';
import Activity from './Activity';
import NewActivity from './NewActivity';
import { getAllActivities } from '../../services/activity_services';
import { Multiselect } from 'multiselect-react-dropdown';

export default ({ activities, setActivities, students }) => {

    // TODO add assets
    // TODO add completion

    const [showNewActivityModal, setShowNewActivityModal] = useState(false);
    const [customDateFrom, setCustomDateFrom] = useState(null);
    const [customDateTo, setCustomDateTo] = useState(null);
    const [selectedStudent, setSelectedStudent] = useState([]);

    // Search field manipulation
    const filterActivitiesByToday = () => {
        const today = new Date();
        return activities.filter(activity => {
            const date = new Date(activity.date);
            return date.getDate() === today.getDate() &&
                date.getMonth() === today.getMonth() &&
                date.getFullYear() === today.getFullYear();
        });
    }

    const filterActivitiesByThisWeek = () => {
        const today = new Date();
        return activities.filter(activity => {
            const date = new Date(activity.date);
            return date.getDate() >= today.getDate() &&
                date.getDate() < today.getDate() + 7 &&
                date.getMonth() === today.getMonth() &&
                date.getFullYear() === today.getFullYear();
        });
    }

    const filterActivitiesByUnscheduled = () => {
        return activities.filter(activity => !activity.date);
    }

    const filterActivitiesByCustomDate = () => {
        if (customDateFrom && customDateTo) {
            return activities.filter(activity => {
                const date = new Date(activity.date);
                return date >= customDateFrom && date <= customDateTo;
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
            <div style={{
                padding: "30px 30% 0px 30%",
            }}>
                <Multiselect
                    placeholder="Select student"
                    singleSelect={true}
                    onSelect={(value) => setSelectedStudent(value)}
                    onRemove={(value) => setSelectedStudent(value)}
                    options={selectableStudentList}
                    displayValue="name"
                    style={{
                        chips: {
                            fontSize: "1rem",
                            margin: "0px"
                        },
                        searchBox: {
                            margin: "20px auto 40px auto",
                            border: "none", borderBottom: "1px solid #D0D0D0",
                            borderRadius: "0px"
                        }
                    }} />
            </div>
        )
    }

    const activityDateRange = () => {
        return (
            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", marginTop: "10px" }}>
                <MDBBtn color="primary"
                    onClick={() => {
                        setFilterMethod("today");
                        setShowCustomDateSelection(false);
                    }}>Today
                </MDBBtn>
                <MDBBtn color="primary"
                    onClick={() => {
                        setFilterMethod("week");
                        setShowCustomDateSelection(false);
                    }}>Next 7 Days
                </MDBBtn>
                <MDBBtn color="primary"
                    onClick={() => {
                        setFilterMethod("unscheduled");
                        setShowCustomDateSelection(false);
                    }}>Unscheduled
                </MDBBtn>
                <MDBBtn color="primary"
                    onClick={() => {
                        setFilterMethod("custom");
                        setCustomDateFrom(null);
                        setCustomDateTo(null);
                        setShowCustomDateSelection(true);
                    }} data-cy='activity-date-button'><MDBIcon icon="search" />
                </MDBBtn>
            </div>
        )
    }

    const showActivities = () => {
        let activitiesMatchingCriteria = [];

        switch (filterMethod) {
            case "today": activitiesMatchingCriteria = filterActivitiesByToday(); break;
            case "week": activitiesMatchingCriteria = filterActivitiesByThisWeek(); break;
            case "unscheduled": activitiesMatchingCriteria = filterActivitiesByUnscheduled(); break;
            case "custom": activitiesMatchingCriteria = filterActivitiesByCustomDate(); break;
            default: activitiesMatchingCriteria = []; break;
        }

        if (selectedStudent.length > 0 && selectedStudent[0].name !== "All students") {
            activitiesMatchingCriteria = activitiesMatchingCriteria.filter(activity => {
                return activity.students.indexOf(selectedStudent[0]._id) > -1
            })
        }

        return (
            <MDBContainer style={{marginTop: "30px", marginBottom: "30px"}}>
                {activitiesMatchingCriteria.length === 0 &&
                    <MDBAlert color="info">No activities match the search criteria</MDBAlert>
                }
                {activitiesMatchingCriteria.map((activity, i) =>
                    <Activity key={i} students={students} data={activity} activities={activities} setActivities={setActivities} />
                )}
            </MDBContainer>
        )
    }

    const newActivityButton = () => {
        return (
            <MDBBtn
                color="primary"
                onClick={() => setShowNewActivityModal(true)}
                style={{
                    position: "fixed",
                    bottom: "20px",
                    left: "calc(50% - 1.5em)",
                    borderRadius: "50%",
                    padding: "0px",
                    width: "3em",
                    height: "3em"
                }} data-cy='create-activity'>
                <MDBIcon icon="plus" />
            </MDBBtn>
        )
    }

    const customDateSelection = () => {
        return (
            <div>
                <form style={{ display: "flex", justifyContent: "space-around", padding: "30px 25% 0px" }}>
                    <MDBInput type="date" name="from" label="From" onChange={(event) => setCustomDateFrom(new Date(event.target.value))}  data-cy='activity-date-from'/>
                    <MDBInput type="date" name="to" label="To" onChange={(event) => setCustomDateTo(new Date(event.target.value))} data-cy='activity-date-to' />
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
            {showActivities()}
            {newActivityButton()}
            <NewActivity
                setActivities={setActivities}
                activities={activities}
                isOpen={showNewActivityModal}
                setShowNewActivityModal={setShowNewActivityModal}
                students={students} />
        </div>
    )
}
