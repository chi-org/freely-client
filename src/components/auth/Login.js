import React, { useState } from "react"
import {useGlobalState} from "../../config/store"
import { loginUser, setLoggedInUser } from "../../services/authServices"
import { MDBInput, MDBBtn, MDBModal, MDBModalHeader, MDBModalBody, MDBModalFooter, MDBAlert } from "mdbreact"
import { useHistory } from "react-router-dom";

export default ({showLogin, setShowLogin, setActivities}) => {

	const { dispatch } = useGlobalState();
	const [loginError, setLoginError] = useState("");
	const history = useHistory();

	// handles login
	function handleLogin(event) {
		event.preventDefault()
		const form = event.target

		loginUser({username: form.username.value, password: form.password.value}).then((response) => {
			setActivities(response.activities);
			dispatch({type: "setLoggedInUser", data: response.username});
			setLoggedInUser(response.username);
			setShowLogin(false);
			history.push("/activities");
		}).catch((error) => {
			console.log(`An error occurred authenticating: ${error} with status: ${error.response.status || 500}`)
			setLoginError("There was an error logging in. Please check your credentials and try again.")
		})
	}

    const dismiss = () => {
        setLoginError("");
        setShowLogin(false);
    }

	return (
		<MDBModal toggle={dismiss} isOpen={showLogin}>
			<MDBModalHeader toggle={dismiss}>Login</MDBModalHeader>
			<MDBModalBody>
				{loginError && <MDBAlert color="danger">{loginError}</MDBAlert>}
				<form id="form" onSubmit={handleLogin}>
					<MDBInput icon="user" size="sm" name="username" label="username" data-cy={'username'} />
					<MDBInput icon="lock" size="sm" name="password" type="password" label="password" data-cy={'password'} />
				</form>
			</MDBModalBody>
			<MDBModalFooter>
				<MDBBtn color="secondary" onClick={dismiss}>Cancel</MDBBtn>
				<MDBBtn form="form" type="submit" color="primary" data-cy={'login-button'} >Login</MDBBtn>
			</MDBModalFooter>
		</MDBModal>
	)
}
