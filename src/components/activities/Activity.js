import React, {useState} from 'react';
import {MDBCard, MDBCardBody, MDBCardText, MDBCollapse, MDBIcon, MDBBadge} from 'mdbreact';

export default () => {
    const date = new Date;
    const [linksOpen, setLinksOpen] = useState(false);

    return (
        <MDBCard>
            <MDBCardBody style={{display: "flex"}}>
                <div style={{width: "70%"}}>
                    <MDBCardText>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Semper auctor neque vitae tempus quam pellentesque nec
                    </MDBCardText>
                    <MDBCardText>{`${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`}</MDBCardText>
                    <div onClick={() => {setLinksOpen(!linksOpen)}} style={{display: "flex", alignItems: "center"}}>
                        <MDBIcon size="sm" icon={!linksOpen ? "chevron-right" : "chevron-down"} />
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
                        <MDBBadge pill color="indigo" style={{textAlign: "right",  marginBottom: "5px", marginLeft: "5px"}}>Student 1</MDBBadge>
                    </div>
                    <div style={{display: "flex", justifyContent: "flex-end", alignItems: "flex-end"}}>
                        <img style={{marginLeft: "5px"}} src="https://via.placeholder.com/70" />
                        <img style={{marginLeft: "5px"}} src="https://via.placeholder.com/70" />
                    </div>
                </div>
            </MDBCardBody>
        </MDBCard>
    )
}