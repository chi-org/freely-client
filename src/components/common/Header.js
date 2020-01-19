import React, {Fragment, useState} from "react";
import { Redirect } from "react-router-dom"
import {MDBNavbar, MDBNavbarBrand, MDBNavbarToggler, MDBCollapse, MDBNavbarNav, MDBNavItem, MDBNavLink} from "mdbreact";
import {useGlobalState} from "../../config/store";
import {logoutUser, setLoggedInUser} from "../../services/authServices"
import Login from "../auth/Login";
import Register from "../auth/Register";
import Logout from "../auth/Logout";

export default ({setActivities, setStudents}) => {

    const [isOpen, setIsOpen] = useState(false);
    const [showLogin, setShowLogin] = useState(false);
    const [showLogout, setShowLogout] = useState(false);
    const [showRegister, setShowRegister] = useState(false);
    const [pageTitle, setPageTitle] = useState("Activities");

    const { store } = useGlobalState()
    const {loggedInUser} = store

    function navLoggedIn() {
        return (
            <MDBNavItem>
                <MDBNavLink to="#" onClick={() => {setIsOpen(false); setShowLogout(true)}}>Log out</MDBNavLink>
            </MDBNavItem>
        )
    }

    function navLoggedOut() {
        return (
            <Fragment>
                <MDBNavItem>
                    <MDBNavLink to="#" onClick={() => {setIsOpen(false); setShowLogin(true)}}>Log in</MDBNavLink>
                </MDBNavItem>
                <MDBNavItem>
                    <MDBNavLink to="#" onClick={() => {setIsOpen(false); setShowRegister(true)}}>Register</MDBNavLink>
                </MDBNavItem>
            </Fragment>
        )
    }

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

            <Login showLogin={showLogin} setShowLogin={setShowLogin} setActivities={setActivities} setStudents={setStudents} />
            <Register showRegister={showRegister} setShowRegister={setShowRegister} />
            <Logout showLogout={showLogout} setShowLogout={setShowLogout} />
        </MDBNavbar>
    )
}
