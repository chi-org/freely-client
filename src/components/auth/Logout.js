import React from "react"
import {useGlobalState} from "../../config/store"
import { logoutUser, setLoggedInUser } from "../../services/authServices"
import { MDBBtn, MDBModal, MDBModalHeader, MDBModalBody, MDBModalFooter } from "mdbreact"
import { useHistory } from "react-router-dom";

export default ({showLogout, setShowLogout}) => {

	const { dispatch } = useGlobalState();
	const history = useHistory();

	function logout() {
		logoutUser();
		dispatch({type: "setLoggedInUser", data: null});
        setLoggedInUser(null);
		history.push("/");
	}

    const dismiss = () => {
        setShowLogout(false);
    }

	return (
		<MDBModal toggle={dismiss} isOpen={showLogout}>
			<MDBModalHeader toggle={dismiss}>Logout</MDBModalHeader>
			<MDBModalBody>
				Are you sure you want to end your session?
			</MDBModalBody>
			<MDBModalFooter>
				<MDBBtn color="secondary" onClick={dismiss}>Cancel</MDBBtn>
				<MDBBtn color="danger" onClick={() => {dismiss(); logout()}} data-cy='logout-button' >Logout</MDBBtn>
			</MDBModalFooter>
		</MDBModal>
	)
}
