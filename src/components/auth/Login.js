import React, { useState } from "react"
import {useGlobalState} from "../../config/store"
import { MDBContainer, MDBInput, MDBBtn } from "mdbreact";
import { loginUser, setLoggedInUser } from "../../services/authServices"
import { useHistory } from "react-router-dom";

const Login = ({activities, setActivities}) => {

	const { dispatch } = useGlobalState();
	const [loginError, setLoginError] = useState(null);
	const history = useHistory();

	// handles login
	function handleLogin(event) {
		event.preventDefault()
		const form = event.target
		const username = form.elements.username.value
		const password = form.elements.password.value

		loginUser({username: username, password: password}).then((response) => {

			console.log(response);
			
			setActivities(response.activities);
			
			dispatch({
				type: "setLoggedInUser",
				data: username
			})
			setLoggedInUser(username)
			setLoginError("success!")

			history.push("../");
		}).catch((error) => {
			const status = error.response ? error.response.status : 500
			console.log(`An error occurred authenticating: ${error} with status: ${status}`)
			setLoginError("Authentication failed! Check your username and password")
		})
	}
	return (
		<MDBContainer>
			<form onSubmit={handleLogin}>
				<MDBInput name="username" label="username" />
				<MDBInput name="password" type="password" label="password" />
				<MDBBtn type="submit" color="primary">Login</MDBBtn>
			</form>
		</MDBContainer>
	)

}

export default Login
