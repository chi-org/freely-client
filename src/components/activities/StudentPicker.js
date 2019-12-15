import React from 'react';
import {MDBContainer} from 'mdbreact';

export default () => {
    return (
        <MDBContainer style={{display: "flex", justifyContent: "center", marginTop: "30px"}}>
            <select className="browser-default custom-select" style={{width: "30%", border: "none", fontSize: "1.3em", fontWeight: "bolder"}}>
                <option>Student 1</option>
                <option>Student 2</option>
                <option>Student 3</option>
            </select>
        </MDBContainer>
    )
}