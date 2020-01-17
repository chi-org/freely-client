import React from 'react';
import { MDBCard, MDBIcon, MDBCardBody } from 'mdbreact';

export default ({data}) => {

    return (
        <MDBCard style={{marginBottom: "6px"}}>
            <MDBCardBody>
                <div style={{display: "flex", alignItems: "center"}}>
                    <MDBIcon size="lg" icon="user" />
                    <p style={{marginLeft: "10px", minWidth: "20%", marginBottom: "0px"}}>{data.name}</p>
                    <MDBIcon size="sm" style={{marginLeft: "15px"}} icon="pen" />
                </div>
                <div style={{display: "flex", alignItems: "center", marginTop: "30px"}}>
                    <input type="color" value={data.color} style={{maxWidth: "30px", height: "30px", padding: "0px", marginBottom: "0px", border: "none"}} />
                    <p style={{marginLeft: "10px", marginBottom: "0px"}}>Color</p>
                    <div style={{display: "flex", justifyContent: "flex-end", alignItems: "center", width: "100%"}}>
                        <a href="#!" style={{marginBottom: "0px", marginRight: "10px"}}>View activities</a>
                        <MDBIcon size="lg" icon="trash" />
                    </div>
                </div>
            </MDBCardBody>
        </MDBCard>
    )
}
