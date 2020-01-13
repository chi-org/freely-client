import React, {useState} from "react";
import {MDBNavbar, MDBNavbarBrand, MDBNavbarToggler, MDBCollapse, MDBNavbarNav, MDBNavItem, MDBNavLink} from "mdbreact";

export default () => {
    const [isOpen, setIsOpen] = useState(false);
    const [pageTitle, setPageTitle] = useState("Activities");

    return (
        <MDBNavbar light expand="md">
            <MDBNavbarBrand center="true">{pageTitle}</MDBNavbarBrand>
            <MDBNavbarToggler onClick={() => setIsOpen(!isOpen)} />

            <MDBCollapse isOpen={isOpen} navbar>
                <MDBNavbarNav left>
                    {pageTitle !== "Activities" && <MDBNavItem>
                        <MDBNavLink to="/activities" onClick={() => {setIsOpen(false); setPageTitle("Activities")}}>Activities</MDBNavLink>
                    </MDBNavItem>}
                    {pageTitle !== "Student Setup" && <MDBNavItem>
                        <MDBNavLink to="/students" onClick={() => {setIsOpen(false); setPageTitle("Student Setup")}}>Student Setup</MDBNavLink>
                    </MDBNavItem>}
                </MDBNavbarNav>
            </MDBCollapse>
        </MDBNavbar>
    )
}