import React from 'react';
import { MDBCard, MDBIcon, MDBBtn, MDBCardBody } from 'mdbreact';

export default () => {
    return (
        <MDBCard>
            <MDBCardBody>
                <div style={{display: "flex", alignItems: "center"}}>
                    <MDBIcon size="lg" icon="user" style={{marginRight: "10px"}} />
                    <input placeholder="Enter name" style={{minWidth: "20%", marginBottom: "0px"}} />
                </div>
                <div style={{display: "flex", alignItems: "center", marginTop: "30px"}}>
                    <input type="color" value="#ffe082" style={{maxWidth: "30px", height: "30px", padding: "0px", marginBottom: "0px", border: "none"}} />
                    <p style={{marginLeft: "10px", marginBottom: "0px"}}>Color</p>
                </div>

                <MDBBtn color="primary" style={{position: "absolute", right: "20px", bottom: "20px", borderRadius: "50%", padding: "0px", width: "3em", height: "3em", margin: "0px"}}>
                    <MDBIcon icon="plus" />
                </MDBBtn>
            </MDBCardBody>
        </MDBCard>
    )
}
