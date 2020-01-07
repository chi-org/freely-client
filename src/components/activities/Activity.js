import React, {useState} from 'react';
import {MDBCard, MDBCardBody, MDBCardText, MDBCollapse, MDBIcon, MDBBadge} from 'mdbreact';

export default ({data}) => {

    // Create date from dateString
    const date = new Date(data.date);

    const [linksOpen, setLinksOpen] = useState(false);

    console.log(data)

    return (
        <MDBCard>
            <MDBCardBody style={{display: "flex"}}>
                <div style={{width: "70%"}}>
                    {data.name && <MDBCardText>{data.name}</MDBCardText>}
                    <MDBCardText>{data.textContent}</MDBCardText>
                    <MDBCardText>{`${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`}</MDBCardText>
                    <div onClick={() => {setLinksOpen(!linksOpen)}} style={{display: "flex", alignItems: "center"}}>
                        <MDBIcon size="sm" icon={!linksOpen ? "angle-right" : "angle-down"} />
                        <MDBCardText style={{marginLeft: "10px"}}>Links (3)</MDBCardText>
                    </div>
                    <MDBCollapse isOpen={linksOpen}>
                        <ul style={{listStyle: "none", marginTop: "10px", marginBottom: "0px"}}>
                            <li>Link 1</li>
                            <li>Link 2</li>
                            <li>Link 3</li>
                        </ul>
                    </MDBCollapse>
                </div>
                <div style={{width: "30%", display: "flex", flexDirection: "column", justifyContent: "space-between"}}>
                    <div style={{display: "flex", flexWrap: "wrap", justifyContent: "flex-end", alignItems: "flex-end"}}>
                        {data.students.map((student, i) =>
                            <MDBBadge key={i} pill color="indigo" style={{textAlign: "right",  marginBottom: "5px", marginLeft: "5px"}}>{student}</MDBBadge>
                        )}
                    </div>
                    <div style={{display: "flex", justifyContent: "flex-end", alignItems: "flex-end"}}>
                        {data.assets.map((asset, i) =>
                            <img key={i} style={{marginLeft: "5px"}} src="https://via.placeholder.com/70" />
                        )}
                    </div>
                </div>
            </MDBCardBody>
        </MDBCard>
    )
}