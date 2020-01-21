import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { MDBModal, MDBModalHeader, MDBModalBody, MDBAlert, MDBModalFooter, MDBInput, MDBBtn } from "mdbreact";
import { registerUser } from "../../services/auth_services";

export default ({showRegister, setShowRegister}) => {

    const history = useHistory();
    const [registrationError, setRegistrationError] = useState("");

    const hideModal = () => {
        setRegistrationError("");
        setShowRegister(false);
    }

	const register = (event) => {
        event.preventDefault();
        const form = event.target;

        if (form.password.value !== form.confirm.value) {
            return setRegistrationError("Passwords do not match.");
        }

        registerUser({
            username: form.username.value,
            password: form.password.value
        }).then((response) => {
            console.log(response);
            hideModal();
            history.push("/");
        }).catch(error => {
            console.log("An error occurred during registration:", error);
            setRegistrationError("There was an error registering your account. Please check required fields and try again.");
        });
    }

    return (
		<MDBModal toggle={hideModal} isOpen={showRegister}>
			<MDBModalHeader toggle={hideModal}>Register</MDBModalHeader>
			<MDBModalBody>
				{registrationError && <MDBAlert color="danger">{registrationError}</MDBAlert>}
				<form id="form" onSubmit={register}>
					<MDBInput icon="user" size="sm" name="username" label="username" required />
					<MDBInput icon="lock" size="sm" name="password" type="password" label="password" required />
                    <MDBInput icon="lock" size="sm" name="confirm" type="password" label="confirm password" required />
				</form>
			</MDBModalBody>
			<MDBModalFooter>
				<MDBBtn color="secondary" onClick={hideModal}>Cancel</MDBBtn>
				<MDBBtn id="submit-btn" form="form" type="submit" color="primary">Register</MDBBtn>
			</MDBModalFooter>
		</MDBModal>
	)
}
