import React from "react";
import { useHistory } from "react-router-dom";
import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn } from "mdbreact";
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

// <MDBContainer>
// <MDBRow>
//   <MDBCol md="6">
//     <form onSubmit={register}>
//       <p className="pt-3 h5 text-center mb-4">Sign up</p>
//       <div className="grey-text">
//         <MDBInput
//           label="Your name"
//           icon="user"
//           group
//           type="text"
//           name= "name"
//           validate
//           error="wrong"
//           success="right"
//         />
//         <MDBInput
//           label="Your email"
//           icon="envelope"
//           group
//           type="email"
//           name="username"
//           validate
//           error="wrong"
//           success="right"
//         />
//         <MDBInput
//           label="Confirm your email"
//           icon="exclamation-triangle"
//           group
//           type="text"
//           validate
//           error="wrong"
//           success="right"
//         />
//         <MDBInput
//           label="Your password"
//           icon="lock"
//           group
//           type="password"
//           name="password"
//           validate
//         />
//          <MDBInput
//           label="Confirm your password"
//           icon="exclamation-triangle"
//           group
//           type="text"
//           validate
//           error="wrong"
//           success="right"
//         />
//       </div>
//       <div className="text-center">
//         <MDBBtn color="primary">Register</MDBBtn>
//       </div>
//     </form>
//   </MDBCol>
// </MDBRow>
// </MDBContainer>

	)
}
