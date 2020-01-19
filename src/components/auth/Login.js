import React, { useState } from "react"
import {useGlobalState} from "../../config/store"
import { loginUser, setLoggedInUser } from "../../services/authServices"
import { MDBInput, MDBBtn, MDBModal, MDBModalHeader, MDBModalBody, MDBModalFooter, MDBAlert } from "mdbreact"
import { useHistory } from "react-router-dom";

export default ({showLogin, setShowLogin, setActivities, setStudents}) => {

	const { dispatch } = useGlobalState();
	const [loginError, setLoginError] = useState("");
	const history = useHistory();

	// handles login
	function handleLogin(event) {
		event.preventDefault()
		const form = event.target
		const username = form.elements.username.value
		const password = form.elements.password.value

		loginUser({username: form.username.value, password: form.password.value}).then((response) => {
			console.log(response);
			setActivities(response.activities);
			console.log(response.students)
			setStudents(response.students);
			console.log('past setStudents')
			dispatch({type: "setLoggedInUser", data: username});
			setLoggedInUser(username);
			setShowLogin(false);
			history.push("/");
		}).catch((error) => {
			console.log(`An error occurred authenticating: ${error} with status:`)
			//  ${error.response.status || 500}`)
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
					<MDBInput icon="user" size="sm" name="username" label="username" />
					<MDBInput icon="lock" size="sm" name="password" type="password" label="password" />
				</form>
			</MDBModalBody>
			<MDBModalFooter>
				<MDBBtn color="secondary" onClick={dismiss}>Cancel</MDBBtn>
				<MDBBtn form="form" type="submit" color="primary">Login</MDBBtn>
			</MDBModalFooter>
		</MDBModal>
	)
}
