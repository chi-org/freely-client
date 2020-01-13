import React, { useState } from "react"
import {useGlobalState} from "../../config/store"
import { loginUser, setLoggedInUser } from "../../services/authServices"

const Login = props => {

	const { dispatch } = useGlobalState();
	const [loginError, setLoginError] = useState(null)

	// handles login
	function handleLogin(event) {
		event.preventDefault()
		const form = event.target
		const username = form.elements.username.value
		const password = form.elements.password.value

		loginUser({username: username, password: password}).then(() => {
			dispatch({
				type: "setLoggedInUser",
				data: username
			})
			setLoggedInUser(username)
			setLoginError("success!")
			// props.history.push("../");
		}).catch((error) => {
			const status = error.response ? error.response.status : 500
			console.log(`An error occurred authenticating: ${error} with status: ${status}`)
			setLoginError("Authentication failed! Check your username and password")
		})
	}

	return (
		<form data-cy="loginForm"onSubmit={(event) => handleLogin(event)}>
			{ loginError && <p className="has-text-danger">{ loginError }</p> }
			<label className="label">Username</label>
			<input data-cy="username"type="text" className="input" name="username" placeholder="Username" required></input>
			<label className="label">Password</label>
			<input data-cy="password"type="password" className="input" name="password" placeholder="Password" required></input>
			<input data-cy="loginButton" type="submit" value="Login" className="button is-info"></input>
		</form>
	)
}

export default Login
