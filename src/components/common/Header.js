import React, {Fragment, useState} from "react";
import { Redirect } from "react-router-dom"
import {MDBNavbar, MDBNavbarBrand, MDBNavbarToggler, MDBCollapse, MDBNavbarNav, MDBNavItem, MDBNavLink} from "mdbreact";
import {useGlobalState} from "../../config/store";
import {logoutUser, setLoggedInUser} from "../../services/authServices"

export default () => {

	function handleLogout() {
		logoutUser()
		dispatch({
			type: "setLoggedInUser",
			data:  null
		})
        setLoggedInUser(null)
        setIsOpen()
		return <Redirect to="/" />
    }

    function navLoggedIn() {
        return (
            <MDBNavItem>
                Logged in as ,<MDBNavLink to="#">Log out</MDBNavLink>
            </MDBNavItem>
        )
    }

    function navLoggedOut() {
        return (
            <Fragment>
                <MDBNavItem>
                    <MDBNavLink to="/login">Log in</MDBNavLink>
                </MDBNavItem>
                <MDBNavItem>
                    <MDBNavLink to="/register">Register</MDBNavLink>
                </MDBNavItem>
            </Fragment>
        )
    }
    const [isOpen, setIsOpen] = useState(false);
    const [pageTitle, setPageTitle] = useState("Activities");

    const { store, dispatch } = useGlobalState()
    const {loggedInUser} = store

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
                <MDBNavbarNav right>
                    {loggedInUser ? navLoggedIn() : navLoggedOut()}
                </MDBNavbarNav>
            </MDBCollapse>
        </MDBNavbar>
    )
}
