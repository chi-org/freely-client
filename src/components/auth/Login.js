import React, { useState } from "react"
import { useGlobalState } from "../../config/store"
import { loginUser, setLoggedInUser } from "../../services/auth_services"
import { MDBInput, MDBBtn, MDBModal, MDBModalHeader, MDBModalBody, MDBModalFooter, MDBAlert } from "mdbreact"
import { useHistory } from "react-router-dom";

export default ({showLogin, setShowLogin, setActivities, setStudents}) => {

	const { dispatch } = useGlobalState();
	const [loginError, setLoginError] = useState("");
	const history = useHistory();

	const hideModal = () => {
		setLoginError("");
		setShowLogin(false);
	}

	function handleLogin(event) {
		event.preventDefault()
		const form = event.target

		loginUser({username: form.username.value, password: form.password.value}).then((response) => {
			setActivities(response.activities);
			setStudents(response.students);
			dispatch({type: "setLoggedInUser", data: response.username});
			setLoggedInUser(response.username);
			hideModal();
			history.push("/activities");
		}).catch((error) => {
			console.log(`An error occurred authenticating: ${error} with status:`)
			setLoginError("There was an error logging in. Please check your credentials and try again.")
		})
	}

	return (
		<MDBModal toggle={hideModal} isOpen={showLogin}>
			<MDBModalHeader toggle={hideModal}>Login</MDBModalHeader>
			<MDBModalBody>
				{loginError && <MDBAlert color="danger">{loginError}</MDBAlert>}
				<form id="form" onSubmit={handleLogin}>
					<MDBInput icon="user" size="sm" name="username" label="username" required />
					<MDBInput icon="lock" size="sm" name="password" type="password" label="password" required />
				</form>
			</MDBModalBody>
			<MDBModalFooter>
				<MDBBtn color="secondary" onClick={hideModal}>Cancel</MDBBtn>
				<MDBBtn form="form" type="submit" color="primary">Login</MDBBtn>
			</MDBModalFooter>
		</MDBModal>
	)
}
