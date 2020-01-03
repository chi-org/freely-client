import React, {useState} from "react";
import {MDBNavbar, MDBNavbarBrand, MDBNavbarToggler, MDBCollapse, MDBNavbarNav, MDBNavItem, MDBNavLink} from "mdbreact";

export default () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleNavbar = () => {
        setIsOpen(!isOpen);
    }

    return (
        // <MDBNavbar light expand="md"> use for desktop navbar, commented for testing mobile layout
        <MDBNavbar light>
            <MDBNavbarBrand center>Activites</MDBNavbarBrand>
            <MDBNavbarToggler onClick={toggleNavbar} />

            <MDBCollapse isOpen={isOpen} navbar>
                <MDBNavbarNav left>
                    <MDBNavItem active>
                        <MDBNavLink to="/activities" onClick={toggleNavbar}>Activities</MDBNavLink>
                    </MDBNavItem>
                    <MDBNavItem active>
                        <MDBNavLink to="/students" onClick={toggleNavbar}>Student Setup</MDBNavLink>
                    </MDBNavItem>
                </MDBNavbarNav>
            </MDBCollapse>
        </MDBNavbar>
    )
}