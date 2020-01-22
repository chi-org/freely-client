import React from 'react';
import { MDBCard, MDBIcon, MDBCardBody } from 'mdbreact';
import { deleteStudent } from '../../services/student_services';

export default ({data: student, students, setStudents}) => {

    function removeStudent() {
        deleteStudent({deleteId: student._id}).then((response) => {
            setStudents(students.filter(st => st._id !== student._id))
        }).catch(error => {
            console.log("An error occurred trying to delete ", student.name, ": ", error);
        })
    }

    return (
        <MDBCard style={{marginBottom: "6px"}}>
            <MDBCardBody>
                <div style={{display: "flex", alignItems: "center"}}>
                    <MDBIcon size="lg" icon="user" />
                    <p style={{marginLeft: "10px", minWidth: "20%", marginBottom: "0px"}}>{student.name}</p>
                    <MDBIcon size="sm" style={{marginLeft: "15px"}} icon="pen" />
                </div>
                <div style={{display: "flex", alignItems: "center", marginTop: "30px"}}>
                    <input
                        readOnly
                        type="color"
                        value={student.color}
                        onChange={console.log("todo: change color")}
                        style={{maxWidth: "30px", height: "30px", padding: "0px", marginBottom: "0px", border: "none"}} />
                    <p style={{marginLeft: "10px", marginBottom: "0px"}}>Color</p>
                    <div style={{display: "flex", justifyContent: "flex-end", alignItems: "center", width: "100%"}}>
                        <a href="#!" style={{marginBottom: "0px", marginRight: "10px"}}>View activities</a>
                        <MDBIcon
                            size="lg"
                            gradient="red"
                            className="click-action"
                            onClick={removeStudent}
                            icon="trash" />
                    </div>
                </div>
            </MDBCardBody>
        </MDBCard>
    )
}
