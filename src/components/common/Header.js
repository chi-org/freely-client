import React, {useState} from "react";
import {MDBNavbar, MDBNavbarBrand, MDBNavbarToggler, MDBCollapse, MDBNavbarNav, MDBNavItem} from "mdbreact";

export default () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        // <MDBNavbar light expand="md"> use for desktop navbar, commented for testing mobile layout
        <MDBNavbar light>
            <MDBNavbarBrand center>Activites</MDBNavbarBrand>
            <MDBNavbarToggler onClick={() => {console.log("isOpen:", isOpen); setIsOpen(!isOpen)}} />

            <MDBCollapse isOpen={isOpen} navbar>
                <MDBNavbarNav left>
                    <MDBNavItem active>
                        <MDBNavbarBrand>Student Setup</MDBNavbarBrand>
                    </MDBNavItem>
                </MDBNavbarNav>
            </MDBCollapse>
        </MDBNavbar>
    )
}