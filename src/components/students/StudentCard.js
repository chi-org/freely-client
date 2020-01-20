import React from 'react';
import { MDBCard, MDBIcon, MDBCardBody } from 'mdbreact';
import { deleteStudent } from '../../services/student_services';
// import Students from './Students';

export default ({data: student}) => {

    function myFunction() {
        console.log( "delete student", student.name);
        console.log(student);
        const deleteId = {
            "deleteId": student._id
        }
        console.log(deleteId)
        deleteStudent(deleteId).then((response) => {
            console.log("in deleteStudent")
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
                    {/* change icon onClick to set above to input */}
                    <MDBIcon size="sm" style={{marginLeft: "15px"}} icon="pen" />
                </div>
                <div style={{display: "flex", alignItems: "center", marginTop: "30px"}}>
                    <input
                    type="color"
                    value={student.color}
                    // onChange={} todo
                    style={{maxWidth: "30px", height: "30px", padding: "0px", marginBottom: "0px", border: "none"}} />
                    <p style={{marginLeft: "10px", marginBottom: "0px"}}>Color</p>
                    <div style={{display: "flex", justifyContent: "flex-end", alignItems: "center", width: "100%"}}>
                        <a href="#!" style={{marginBottom: "0px", marginRight: "10px"}}>View activities</a>
                        <MDBIcon
                            size="lg"
                            gradient="red"
                            className="click-action"
                            onClick={myFunction}
                            icon="trash" />
                    </div>
                </div>
            </MDBCardBody>
        </MDBCard>
    )
}
