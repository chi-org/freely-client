import React, {useState} from "react";
import {MDBNavbar, MDBNavbarBrand, MDBNavbarToggler, MDBCollapse, MDBNavbarNav, MDBNavItem, MDBNavLink} from "mdbreact";

export default () => {
    const [isOpen, setIsOpen] = useState(false);
    const [pageTitle, setPageTitle] = useState("Activities");

    return (
<<<<<<< HEAD
        <MDBNavbar light expand="md">
            <MDBNavbarBrand center className="d-block d-md-none">{pageTitle}</MDBNavbarBrand>
            <MDBNavbarToggler onClick={() => setIsOpen(!isOpen)} />
=======
        // <MDBNavbar light expand="md"> use for desktop navbar, commented for testing mobile layout
        <MDBNavbar light>
            <MDBNavbarBrand >Activites</MDBNavbarBrand>
            <MDBNavbarToggler onClick={() => {console.log("isOpen:", isOpen); setIsOpen(!isOpen)}} />
>>>>>>> axios-basic-activities

            <MDBCollapse isOpen={isOpen} navbar>
                <MDBNavbarNav left>
                    <MDBNavItem>
                        <MDBNavLink to="/activities" onClick={() => (setIsOpen(false), setPageTitle("Activities"))}>Activities</MDBNavLink>
                    </MDBNavItem>
                    <MDBNavItem>
                        <MDBNavLink to="/students" onClick={() => (setIsOpen(false), setPageTitle("Student Setup"))}>Student Setup</MDBNavLink>
                    </MDBNavItem>
                </MDBNavbarNav>
            </MDBCollapse>
        </MDBNavbar>
    )
}