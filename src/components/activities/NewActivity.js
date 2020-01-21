import React, { Fragment } from 'react';
import { MDBIcon, MDBBtn, MDBInput, MDBModal, MDBModalHeader, MDBModalBody, MDBModalFooter, MDBListGroup, MDBListGroupItem } from 'mdbreact';
import { submitNewActivity as addNewActivity } from '../../services/activity_services';
import { Multiselect } from 'multiselect-react-dropdown';
import { useState } from 'react';

export default ({ activities, isOpen, setShowNewActivityModal, students, setActivities }) => {

    const [assets, setAssets] = useState([]);

    const hideModal = () => {
        setAssets([]);
        setShowNewActivityModal(false);
    }

    const submitNewActivity = (event) => {
        event.preventDefault();

        const form = event.target;
        const data = {
            name: "",
            textContent: form.details.value,
            date: form.date.value || null,
            completed: false,
            students: studentsToInclude.map(student => student._id),
            assets: assets
        }

        addNewActivity(data).then((response) => {
            setActivities([...activities, response.data.data]);
            hideModal();
        }).catch(error => {
            console.log("An error occurred during submission:", error);
        });
    }

    const date = () => {
        return (
            <Fragment>
                <h4 style={{ marginTop: "30px" }}>Date</h4>
                <MDBInput name="date" type="date" />
            </Fragment>
        )
    }

    let studentsToInclude = [];
    const studentSelector = () => {
        const addStudent = (value) => studentsToInclude = value;
        const removeStudent = (value) => studentsToInclude = value;

        return (
            <Fragment>
                <h4 style={{ marginTop: "30px" }}>Students</h4>
                <Multiselect
                    onSelect={addStudent}
                    onRemove={removeStudent}
                    options={students}
                    displayValue="name"
                    style={{ searchBox: { border: "none", borderBottom: "1px solid #D0D0D0", borderRadius: "0px" } }} />
            </Fragment>
        )
    }

    const details = () => {
        return (
            <Fragment>
                <h4>Details</h4>
                <MDBInput required name="details" type="textarea" label="Enter your text here..."></MDBInput>
            </Fragment>
        )
    }

    const addAssets = () => {
        return (
            <Fragment>
                <h4 style={{ marginTop: "30px" }}>Assets</h4>
                <MDBListGroup>
                    {assets.map((asset, i) => {
                        return <MDBListGroupItem value={i} key={i} style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>{asset}
                            <MDBIcon icon="backspace" className="click-action" onClick={(event) => {
                                setAssets(assets.filter((_ass, i) => i !== event.target.parentNode.value));
                            }} />
                        </MDBListGroupItem>
                    })}
                </MDBListGroup>
                <MDBInput icon="save" iconSize="sm" id="new-asset" type="url" label="Add new asset link" onIconClick={() => {
                    const assetInput = document.getElementById("new-asset");
                    if (assetInput.value) {
                        setAssets([...assets, assetInput.value]);
                        assetInput.value = "";
                    }
                }
                } />
            </Fragment>
        )
    }

    return (
        <MDBModal fullHeight position="left" isOpen={isOpen}>
            <MDBModalHeader
                toggle={hideModal}
                style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>New Activity
            </MDBModalHeader>

            <MDBModalBody>
                <form id="form" onSubmit={submitNewActivity}>
                <br />
                    {details()}
                    {date()}
                    {studentSelector()}
                    {addAssets()}
                </form>
            </MDBModalBody>
            <MDBModalFooter>
                <MDBBtn form="form" onClick={hideModal} color="secondary">Cancel</MDBBtn>
                <MDBBtn form="form" type="submit" color="primary">Done</MDBBtn>
            </MDBModalFooter>
        </MDBModal>
    )
}
