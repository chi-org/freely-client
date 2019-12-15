import React from 'react';
import {MDBBtn, MDBIcon} from 'mdbreact';

export default () => {
    return (
        <div style={{display: "flex", justifyContent: "center", marginTop: "10px"}}>
            <MDBBtn color="white">Today</MDBBtn>
            <MDBBtn color="white">Next 7 Days</MDBBtn>
            <MDBBtn color="white">Unscheduled</MDBBtn>
            <MDBBtn color="white">
                <MDBIcon icon="search" />
            </MDBBtn>
        </div>
    )
}