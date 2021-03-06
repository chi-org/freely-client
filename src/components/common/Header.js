import React, { Fragment, useState } from "react";
import { useHistory } from "react-router-dom";
import { MDBNavbar, MDBNavbarBrand, MDBNavbarToggler, MDBCollapse, MDBNavbarNav, MDBNavItem, MDBNavLink } from "mdbreact";
import Login from "../auth/Login";
import Register from "../auth/Register";
import Logout from "../auth/Logout";
import { useGlobalState } from "../../config/store";

export default ({ setActivities, setStudents }) => {

    const history = useHistory();

    const [isOpen, setIsOpen] = useState(false);
    const [showLogin, setShowLogin] = useState(false);
    const [showLogout, setShowLogout] = useState(false);
    const [showRegister, setShowRegister] = useState(false);

    const { store } = useGlobalState()
    const { loggedInUser } = store

    const pageTitle = () => {
        switch (history.location.pathname) {
            case "/activities": return "Activities";
            case "/students": return "Student Setup";
            case "/landing": return "Landing";
            default: return "";
        }
    }

    function navLoggedIn() {
        return (
            <Fragment>
                <MDBNavbarNav left>
                    {pageTitle() !== "Activities" &&
                        <MDBNavItem>
                            <MDBNavLink style={{ color: "white" }} to="/activities"
                                onClick={() => { setIsOpen(false); }} data-cy='header-activities'> Activities</MDBNavLink>
                        </MDBNavItem>
                    }
                    {pageTitle() !== "Student Setup" &&
                        <MDBNavItem>
                            <MDBNavLink style={{ color: "white" }} to="/students"
                                onClick={() => { setIsOpen(false); }} data-cy='header-students'>Student Setup</MDBNavLink>
                        </MDBNavItem>
                    }
                </MDBNavbarNav>
                <MDBNavbarNav right>
                    <MDBNavItem>
                        <MDBNavLink style={{ color: "white" }} to="#"
                            onClick={() => { setIsOpen(false); setShowLogout(true) }} data-cy={'logout'}>Log out</MDBNavLink>
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
                        <MDBNavLink style={{ color: "white" }} to="#"
                            onClick={() => { setIsOpen(false); setShowLogin(true) }} data-cy={'login'} >Log in</MDBNavLink>
                    </MDBNavItem>
                    <MDBNavItem>
                        <MDBNavLink style={{ color: "white" }} to="#"
                            onClick={() => { setIsOpen(false); setShowRegister(true) }} data-cy={'register'} >Register</MDBNavLink>
                    </MDBNavItem>
                </MDBNavbarNav>
            </Fragment>
        )
    }

    return (
        <MDBNavbar style={{ backgroundColor: "#612F41" }} light expand="md">
            <MDBNavbarBrand style={{ color: "white" }} center="true">{loggedInUser ? pageTitle() : "Freely"}</MDBNavbarBrand>
            <MDBNavbarToggler onClick={() => setIsOpen(!isOpen)} />

            <MDBCollapse isOpen={isOpen} navbar>
                {loggedInUser ? navLoggedIn() : navLoggedOut()}
            </MDBCollapse>

            <Login showLogin={showLogin} setShowLogin={setShowLogin} setActivities={setActivities} setStudents={setStudents} />
            <Register showRegister={showRegister} setShowRegister={setShowRegister} />
            <Logout showLogout={showLogout} setShowLogout={setShowLogout} />
        </MDBNavbar>
    )
}
