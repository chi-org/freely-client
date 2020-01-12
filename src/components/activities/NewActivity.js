import React, { useState, Fragment } from 'react';
import { MDBContainer, MDBIcon, MDBBtn, MDBInput, MDBBadge, MDBModal, MDBModalHeader, MDBModalBody, MDBListGroup, MDBListGroupItem } from 'mdbreact';
import { useHistory } from 'react-router-dom';

export default () => {

    const [showStudentsModal, setShowStudentsModal] = useState(false);
    const history = useHistory();

    const header = () => {
        return (
            <div style={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
                <MDBBtn onClick={() => history.push("/activities")} color="primary" style={{borderRadius: "50%", padding: "0px", width: "3em", height: "3em"}}>
                    <MDBIcon icon="chevron-left" />
                </MDBBtn>
                <h3 className="text-center">Add Activity</h3>
                <div />
            </div>
        )
    }

    const date = () => {
        return <MDBInput type="date" />;
    }

    const completed = () => {
        return (
            <div style={{display: "flex"}}>
                <MDBInput style={{height: "1em"}} type='checkbox' />
                <p style={{marginLeft: "10px"}}>Completed</p>
            </div>
        )
    }

    const students = () => {
        return (
            <Fragment>
                <h4 style={{marginTop: "30px"}}>Students</h4>
                <MDBBadge pill style={{marginRight: "5px"}} color="indigo">Student 1</MDBBadge>
                <span className="click-action" onClick={() => setShowStudentsModal(true)} >
                    <MDBBadge pill style={{marginRight: "5px"}} color="white">
                        <MDBIcon style={{color: "black"}} icon="plus" />
                    </MDBBadge>
                </span>
            </Fragment>
        )
    }

    const studentModal = () => {
        const students = ["Student 1", "Student 2", "Student 3"];

        return (
            <MDBModal isOpen={showStudentsModal}>
                <MDBModalHeader toggle={() => setShowStudentsModal(!showStudentsModal)}>Students</MDBModalHeader>
                <MDBModalBody>
                    <MDBListGroup>
                        <div>
                            {students.map((student, i) => {
                                return <span className="click-action" onClick={() => {setShowStudentsModal(false)}} style={{marginRight: "10px"}}>
                                    <MDBBadge key={i} pill color="indigo">{student}</MDBBadge>
                                </span>
                            })}
                        </div>
                    </MDBListGroup>
                </MDBModalBody>
            </MDBModal>
        )
    }

    const details = () => {
        return (
            <Fragment>
                <h4 style={{marginTop: "30px"}}>Details</h4>
                <MDBInput type="textarea" label="Enter your text here..."></MDBInput>
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
    
    const categories = () => {
        return (
            <Fragment>
                <h4 style={{marginTop: "30px"}}>Categories</h4>
                <MDBBtn style={{marginTop: "30px"}} color="primary">
                    <MDBIcon style={{marginRight: "10px"}} icon="plus" />Add
                </MDBBtn>
            </Fragment>
        )
    }
    
    return (
        <MDBContainer style={{marginTop: "30px"}}>
            {header()}
            <form>
                {date()}
                {completed()}
                {students()}
                {details()}
                {images()}
                {/* {categories()} */}
                <MDBBtn style={{marginTop: "30px", width: "100%"}} color="primary">Done</MDBBtn>
                {studentModal()}
            </form>
        </MDBContainer>
    )
}
