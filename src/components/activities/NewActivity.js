import React, { useState, Fragment } from 'react';
import { MDBIcon, MDBBtn, MDBInput, MDBBadge, MDBModal, MDBModalHeader, MDBModalBody, MDBModalFooter } from 'mdbreact';
import { useHistory } from 'react-router-dom';
import {submitNewActivity as addNewActivity} from '../../services/activity_services';

export default ({activities, isOpen, setShowNewActivityModal}) => {

    const [showStudentsModal, setShowStudentsModal] = useState(false);
    const history = useHistory();

    const submitNewActivity = (event) => {
        event.preventDefault();

        const form = event.target;
        const data = {
            name: "",
            textContent: form.details.value,
            date: form.date.value || null,
            completed: false,
            students: [],
            assets: []
        }
        
        addNewActivity(data).then((response) => {
            activities.push(response.data.data);
            history.push("/activities");
            setShowNewActivityModal(false);
        }).catch(error => {
            console.log("An error occurred during submission:", error);
        });
    }

    const header = () => {
        return (
            <MDBModalHeader toggle={() => setShowNewActivityModal(false)} style={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
                New Activity
            </MDBModalHeader>
        )
    }

    const date = () => {
        return (
            <Fragment>
                <h4 style={{marginTop: "30px"}}>Date</h4>
                <MDBInput name="date" type="date" />
            </Fragment>
        )
    }

    const students = () => {
        return (
            <Fragment>
                <h4 style={{marginTop: "30px"}}>Students</h4>
                <div style={{display:"flex", flexWrap:"wrap"}}>
                    <MDBBadge pill className="student-pill click-action"><p>Bob</p></MDBBadge>
                    <MDBBadge pill className="student-pill click-action student-selected"><p style={{color:"gray", padding:"5px", margin:"0px"}}>Rogrido Gutierrez</p></MDBBadge>
                    <MDBBadge pill className="student-pill click-action"><p style={{color:"gray", padding:"5px", margin:"0px"}}>Bill</p></MDBBadge>
                </div>
            </Fragment>
        )
    }

    const studentModal = () => {
        const students = ["Student 1", "Student 2", "Student 3"];

        return (
            <MDBModal isOpen={showStudentsModal}>
                <MDBModalHeader toggle={() => setShowStudentsModal(false)}>Students</MDBModalHeader>
                <MDBModalBody>
                    <div>
                        {students.map((student, i) => {
                            return <span key={i} className="click-action" onClick={() => {setShowStudentsModal(false)}} style={{marginRight: "10px"}}>
                                <MDBBadge pill color="indigo">{student}</MDBBadge>
                            </span>
                        })}
                    </div>
                </MDBModalBody>
            </MDBModal>
        )
    }

    const details = () => {
        return (
            <Fragment>
                <h4>Details</h4>
                <MDBInput required name="details" type="textarea" label="Enter your text here..."></MDBInput>
            </Fragment>
        )
    }

    const images = () => {
        return (
            <Fragment>
                <h4 style={{marginTop: "30px"}}>Images</h4>
                <div style={{display: "flex", alignItems: "center"}}>
                    <div style={{width: "70px", display: "flex", justifyContent: "center"}}>
                        <MDBIcon size="lg" icon="camera" />
                    </div>
                    <img style={{marginLeft: "5px"}} src="https://via.placeholder.com/70" alt="" />
                    <img style={{marginLeft: "5px"}} src="https://via.placeholder.com/70" alt="" />
                </div>
            </Fragment>
        )
    }
    
    return (
        <MDBModal fullHeight toggle={() => setShowStudentsModal(false)} position="left" isOpen={isOpen}>
            {header()}
            <MDBModalBody>
                <form id="form" onSubmit={submitNewActivity}>
                <br />
                    {details()}
                    {/* {completed()} */}
                    {date()}
                    {students()}
                    {images()}
                    {studentModal()}
                </form>
            </MDBModalBody>
            <MDBModalFooter>
                <MDBBtn form="form" onClick={() => setShowNewActivityModal(false)} color="secondary">Cancel</MDBBtn>
                <MDBBtn form="form" type="submit" color="primary">Done</MDBBtn>
            </MDBModalFooter>
        </MDBModal>
    )
}
