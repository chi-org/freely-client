import React, {useState} from "react";
import {MDBNavbar, MDBNavbarBrand, MDBNavbarToggler, MDBCollapse, MDBNavbarNav, MDBNavItem, MDBBtn} from "mdbreact";

export default () => {
    const [isOpen, setIsOpen] = useState(false);
    // const { isAuthenticated, loginWithRedirect, logout } = useAuth0();

    return (
        // use for desktop navbar, commented for testing mobile layout
        // <MDBNavbar light expand="md">
        // Mobile layout
        <MDBNavbar light>
            <MDBNavbarBrand center>Activites</MDBNavbarBrand>
            <MDBNavbarToggler onClick={() => {console.log("isOpen:", isOpen); setIsOpen(!isOpen)}} />

            <MDBCollapse isOpen={isOpen} navbar>
                <MDBNavbarNav left>
                    <MDBNavItem active>
                        <MDBNavbarBrand>Student Setup</MDBNavbarBrand>
                    </MDBNavItem>
                    <MDBNavItem>
                    <MDBBtn href="/auth/login" color="primary">Login</MDBBtn>
                    {/* {!isAuthenticated && (
        <button onClick={() => loginWithRedirect({})}>Log in</button>
      )}

      {isAuthenticated && <button onClick={() => logout()}>Log out</button>} */}
                    </MDBNavItem>

                </MDBNavbarNav>
            </MDBCollapse>
        </MDBNavbar>
    )
}
