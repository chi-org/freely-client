import React, { Fragment } from 'react';
import { MDBIcon, MDBBtn, MDBInput, MDBModal, MDBModalHeader, MDBModalBody, MDBModalFooter } from 'mdbreact';
import { useHistory } from 'react-router-dom';
import { submitNewActivity as addNewActivity } from '../../services/activity_services';
import { Multiselect } from 'multiselect-react-dropdown';

export default ({ activities, isOpen, setShowNewActivityModal, students }) => {

    const history = useHistory();

    const submitNewActivity = (event) => {
        event.preventDefault();

        const form = event.target;
        const data = {
            name: "",
            textContent: form.details.value,
            date: form.date.value || null,
            completed: false,
            students: studentsToInclude.map(student => student._id),
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
            <MDBModalHeader toggle={() => setShowNewActivityModal(false)} style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                New Activity
            </MDBModalHeader>
        )
    }

    const date = () => {
        return (
            <Fragment>
                <h4 style={{ marginTop: "30px" }}>Date</h4>
                <MDBInput name="date" type="date" />
            </Fragment>
        )
    }

    let studentsToInclude = [];
    const studentSelector = () => {
        return (
            <Fragment>
                <h4 style={{ marginTop: "30px" }}>Students</h4>
                <Multiselect onSelect={addStudent} onRemove={removeStudent} options={students} displayValue="name" style={{ searchBox: { border: "none", borderBottom: "1px solid #D0D0D0", borderRadius: "0px" } }} />
            </Fragment>
        )
    }

    const addStudent = (value) => studentsToInclude = value;
    const removeStudent = (value) => studentsToInclude = value;

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
        <MDBModal fullHeight position="left" isOpen={isOpen}>
            {header()}
            <MDBModalBody>
                <form id="form" onSubmit={submitNewActivity}>
                <br />
                    {details()}
                    {date()}
                    {studentSelector()}
                    {images()}
                </form>
            </MDBModalBody>
            <MDBModalFooter>
                <MDBBtn form="form" onClick={() => setShowNewActivityModal(false)} color="secondary">Cancel</MDBBtn>
                <MDBBtn form="form" type="submit" color="primary">Done</MDBBtn>
            </MDBModalFooter>
        </MDBModal>
    )
}
