import React, {Fragment, useState} from "react";
import { NavLink, Redirect } from "react-router-dom"
import {MDBNavbar, MDBNavbarBrand, MDBNavbarToggler, MDBCollapse, MDBNavbarNav, MDBNavItem, MDBBtn, MDBNavLink} from "mdbreact";
import {useGlobalState} from "../../config/store";
import {logoutUser, setLoggedInUser} from "../../services/authServices"

const Header = (props) => {
    // const { isAuthenticated, loginWithRedirect, logout } = useAuth0();

        // handles logout
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
            <Fragment>
                <MDBNavItem>
                    Logged in
                </MDBNavItem>
            </Fragment>
        )
    }

    function navLoggedOut() {
        return (
            <Fragment>
                <MDBNavItem>
                    Logged out
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
                    {loggedInUser ? navLoggedIn() : navLoggedOut()}
                </MDBNavbarNav>
            </MDBCollapse>
        </MDBNavbar>
    )
}

export default Header


// <MDBNavItem active>
// <MDBNavbarBrand>Student Setup</MDBNavbarBrand>
// </MDBNavItem>
// <MDBNavItem>
// <MDBBtn href="/auth/login" color="primary">Login</MDBBtn>
// {/* {!isAuthenticated && (
// <button onClick={() => loginWithRedirect({})}>Log in</button>
// )}

// {isAuthenticated && <button onClick={() => logout()}>Log out</button>} */}
// </MDBNavItem>
