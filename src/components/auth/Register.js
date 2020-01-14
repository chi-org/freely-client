import React from "react";
import { useHistory } from "react-router-dom";
import { MDBContainer, MDBInput, MDBBtn } from "mdbreact";
import { registerUser } from "../../services/authServices";

export default () => {

    const history = useHistory();

	const register = (event) => {
        event.preventDefault();

        const form = event.target;
        
        registerUser({
            username: form.username.value,
            password: form.password.value
        }).then((response) => {
            console.log(response);
            history.push("/");
        }).catch(error => {
            console.log("An error occurred during registration:", error);
        });
    }

	return (
		<MDBContainer>
            <form onSubmit={register}>
                <MDBInput name="username" label="username" />
                <MDBInput name="password" type="password" label="password" />
                <MDBBtn type="submit" color="primary">Register</MDBBtn>
            </form>
        </MDBContainer>
	)
}
