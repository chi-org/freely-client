import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { MDBModal, MDBModalHeader, MDBModalBody, MDBAlert, MDBModalFooter, MDBInput, MDBBtn } from "mdbreact";
import { registerUser } from "../../services/authServices";

export default ({showRegister, setShowRegister}) => {

    const history = useHistory();
	const [registrationError, setRegistrationError] = useState("");

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
            setShowRegister(false);
            history.push("/");
        }).catch(error => {
            console.log("An error occurred during registration:", error);
            setRegistrationError("There was an error registering your account. Please check required fields and try again.");
        });
    }

    const dismiss = () => {
        setRegistrationError("");
        setShowRegister(false);
    }

    return (
		<MDBModal toggle={dismiss} isOpen={showRegister}>
			<MDBModalHeader toggle={dismiss}>Register</MDBModalHeader>
			<MDBModalBody>
				{registrationError && <MDBAlert color="danger">{registrationError}</MDBAlert>}
				<form id="form" onSubmit={register}>
					<MDBInput icon="user" size="sm" name="username" label="username" required />
					<MDBInput icon="lock" size="sm" name="password" type="password" label="password" required />
                    <MDBInput icon="lock" size="sm" name="confirm" type="password" label="confirm password" required />
				</form>
			</MDBModalBody>
			<MDBModalFooter>
				<MDBBtn color="secondary" onClick={dismiss}>Cancel</MDBBtn>
				<MDBBtn id="submit-btn" form="form" type="submit" color="primary">Register</MDBBtn>
			</MDBModalFooter>
		</MDBModal>
	)

	// return (
    //     <MDBContainer>
    //     <MDBRow>
    //     <MDBCol md="6">
    //         <form onSubmit={register}>
    //         <p className="pt-3 h5 text-center mb-4">Sign up</p>
    //         <div className="grey-text">
    //             <MDBInput
    //             label="Your name"
    //             icon="user"
    //             group
    //             type="text"
    //             name= "name"
    //             validate
    //             error="wrong"
    //             success="right"
    //             />
    //             <MDBInput
    //             label="Your email"
    //             icon="envelope"
    //             group
    //             type="email"
    //             name="username"
    //             validate
    //             error="wrong"
    //             success="right"
    //             />
    //             <MDBInput
    //             label="Confirm your email"
    //             icon="exclamation-triangle"
    //             group
    //             type="text"
    //             validate
    //             error="wrong"
    //             success="right"
    //             />
    //             <MDBInput
    //             label="Your password"
    //             icon="lock"
    //             group
    //             type="password"
    //             name="password"
    //             validate
    //             />
    //             <MDBInput
    //             label="Confirm your password"
    //             icon="exclamation-triangle"
    //             group
    //             type="text"
    //             validate
    //             error="wrong"
    //             success="right"
    //             />
    //         </div>
    //         <div className="text-center">
    //             <MDBBtn color="primary">Register</MDBBtn>
    //         </div>
    //         </form>
    //     </MDBCol>
    //     </MDBRow>
    //     </MDBContainer>
	// )
}
