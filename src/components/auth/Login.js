import React, { useState } from "react"
import {useGlobalState} from "../../config/store"
import { loginUser, setLoggedInUser } from "../../services/authServices"
import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn } from "mdbreact"
import { useHistory } from "react-router-dom";

const Login = ({setActivities}) => {

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

			setLoggedInUser(username);
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
	<MDBRow pt="2">
		<MDBCol md="6" xl="6">
				<form data-cy="loginForm" onSubmit={(event) => handleLogin(event)}>
				<p className="pt-3 h5 text-center mb-4">Sign in</p>
				{ loginError && <p className="has-text-danger">{ loginError }</p> }
				<div className="grey-text">
					<MDBInput
						label="Type your email"
						icon="envelope"
						group
						type="email"
						name="username"
						validate
						error="wrong"
						success="right"
					/>
					<MDBInput
						label="Type your password"
						icon="lock"
						group
						type="password"
						name="password"
						validate
					/>
				</div>
				<div className="text-center">
					<MDBBtn type="submit" value="Login" >Login</MDBBtn>
				</div>
			</form>
		</MDBCol>
	</MDBRow>
	</MDBContainer>
	)

}

export default Login
