import React from "react"
import {useGlobalState} from "../../config/store"
import { logoutUser, setLoggedInUser } from "../../services/auth_services"
import { MDBBtn, MDBModal, MDBModalHeader, MDBModalBody, MDBModalFooter } from "mdbreact"

export default ({showLogout, setShowLogout}) => {

	const { dispatch } = useGlobalState();

	const hideModal = () => {
		setShowLogout(false);
	}

	function logout() {
		logoutUser();
		dispatch({type: "setLoggedInUser", data: null});
        setLoggedInUser(null);
	}

	return (
		<MDBModal toggle={hideModal} isOpen={showLogout}>
			<MDBModalHeader toggle={hideModal}>Logout</MDBModalHeader>
			<MDBModalBody>
				Are you sure you want to end your session?
			</MDBModalBody>
			<MDBModalFooter>
				<MDBBtn color="secondary" onClick={hideModal}>Cancel</MDBBtn>
				<MDBBtn color="primary" onClick={() => {hideModal(); logout()}}  data-cy='logout-button'>Logout</MDBBtn>
			</MDBModalFooter>
		</MDBModal>
	)
}
