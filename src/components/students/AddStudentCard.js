import React, {useState} from 'react';
import { MDBCard, MDBIcon, MDBBtn, MDBCardBody } from 'mdbreact';
import { useHistory } from 'react-router-dom';
import {addStudent} from '../../services/student_services';

export default ({students}) => {
    const history = useHistory();

    const submitNewStudent = (event) => {
        event.preventDefault();

        const form = event.target;
        const data = {
            name: form.name.value,
            color: form.color.value
        }
        addStudent(data).then((response) => {
            students.push(data)
            history.push("/students");
            document.getElementById("form").reset()

        }).catch(error =>{
            console.log("An error occured during student submission:", error);
        });
    }

    return (
        <MDBCard>
            <MDBCardBody>
                <form id="form" onSubmit={submitNewStudent}>
                <div style={{display: "flex", alignItems: "center"}}>
                    <MDBIcon size="lg" icon="user" style={{marginRight: "10px"}} />
                    <input name="name" placeholder="Enter name" style={{minWidth: "20%", marginBottom: "0px"}} data-cy={"new-student-name"}/>
                </div>
                <div style={{display: "flex", alignItems: "center", marginTop: "30px"}}>
                    <input name="color" type="color"  style={{maxWidth: "30px", height: "30px", padding: "0px", marginBottom: "0px", border: "none"}} data-cy={"new-student-color"}/>
                    <p style={{marginLeft: "10px", marginBottom: "0px"}}>Color</p>
                </div>

                <MDBBtn type="submit" color="primary" style={{position: "absolute", right: "20px", bottom: "20px", borderRadius: "50%", padding: "0px", width: "3em", height: "3em", margin: "0px"}} data-cy={"new-student-button"}>
                    <MDBIcon icon="plus" />
                </MDBBtn>
                </form>
            </MDBCardBody>
        </MDBCard>
    )
}
