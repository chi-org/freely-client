import React from 'react';
import {MDBBtn, MDBIcon} from 'mdbreact';

export default () => {
    return (
        <div style={{display: "flex", flexWrap: "wrap", justifyContent: "center", marginTop: "10px"}}>
            <MDBBtn color="primary">Today</MDBBtn>
            <MDBBtn color="primary">Next 7 Days</MDBBtn>
            <MDBBtn color="primary">Unscheduled</MDBBtn>
            <MDBBtn color="primary">
                <MDBIcon icon="search" />
            </MDBBtn>
        </div>
    )
}