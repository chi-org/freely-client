import React, {Fragment, useState} from "react";
import {MDBNavbar, MDBNavbarBrand, MDBNavbarToggler, MDBCollapse, MDBNavbarNav, MDBNavItem, MDBNavLink} from "mdbreact";
import {useGlobalState} from "../../config/store";
import Login from "../auth/Login";
import Register from "../auth/Register";
import Logout from "../auth/Logout";
import { getLoggedInUser } from "../../services/authServices";
import { useHistory } from "react-router-dom";

export default ({ setActivities }) => {

    const history = useHistory();

    const [isOpen, setIsOpen] = useState(false);
    const [showLogin, setShowLogin] = useState(false);
    const [showLogout, setShowLogout] = useState(false);
    const [showRegister, setShowRegister] = useState(false);
    const [pageTitle, setPageTitle] = useState(history.location.pathname === "/activities" ? "Activities" : "Student Setup");

    const { store } = useGlobalState()
    const {loggedInUser} = store

    function navLoggedIn() {
        return (
            <Fragment>
                <MDBNavbarNav left>
                    {pageTitle !== "Activities" && <MDBNavItem>
                        <MDBNavLink to="/activities" onClick={() => { setIsOpen(false); setPageTitle("Activities") }}>Activities</MDBNavLink>
                    </MDBNavItem>}
                    {pageTitle !== "Student Setup" && <MDBNavItem>
                        <MDBNavLink to="/students" onClick={() => { setIsOpen(false); setPageTitle("Student Setup") }}>Student Setup</MDBNavLink>
                    </MDBNavItem>}
                </MDBNavbarNav>
                <MDBNavbarNav right>
                    <MDBNavItem>
                        <MDBNavLink to="#" onClick={() => { setIsOpen(false); setShowLogout(true) }}>Log out</MDBNavLink>
                    </MDBNavItem>
                </MDBNavbarNav>
            </Fragment>
        )
    }

    function navLoggedOut() {
        return (
            <Fragment>
                <MDBNavbarNav right>
                    <MDBNavItem>
                        <MDBNavLink to="#" onClick={() => { setIsOpen(false); setShowLogin(true) }}>Log in</MDBNavLink>
                    </MDBNavItem>
                    <MDBNavItem>
                        <MDBNavLink to="#" onClick={() => { setIsOpen(false); setShowRegister(true) }}>Register</MDBNavLink>
                    </MDBNavItem>
                </MDBNavbarNav>
            </Fragment>
        )
    }

    return (
        <MDBNavbar light expand="md">
            <MDBNavbarBrand center="true">{getLoggedInUser() ? pageTitle : "Freely"}</MDBNavbarBrand>
            <MDBNavbarToggler onClick={() => setIsOpen(!isOpen)} />

            <MDBCollapse isOpen={isOpen} navbar>
                {loggedInUser ? navLoggedIn() : navLoggedOut()}
            </MDBCollapse>

            <Login showLogin={showLogin} setShowLogin={setShowLogin} setActivities={setActivities} />
            <Register showRegister={showRegister} setShowRegister={setShowRegister} />
            <Logout showLogout={showLogout} setShowLogout={setShowLogout} />
        </MDBNavbar>
    )
}
