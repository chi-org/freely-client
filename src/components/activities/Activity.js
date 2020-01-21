import React, {useState} from 'react';
import {MDBCard, MDBCardBody, MDBCardText, MDBCollapse, MDBIcon, MDBBadge} from 'mdbreact';
import { Fragment } from 'react';
import { deleteActivity } from '../../services/activity_services';

export default ({data, activities, setActivities}) => {
    const [linksOpen, setLinksOpen] = useState(false);

    const description = () => {
        return (
            <Fragment>
                {data.name && <MDBCardText>{data.name}</MDBCardText>}
                <MDBCardText>{data.textContent}</MDBCardText>
            </Fragment>
        )
    }

    const date = () => {
        const date = new Date(data.date);
        return <MDBCardText>{`${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`}</MDBCardText>
    }

    const expandLinksButton = () => {
        // currently not attached to incoming data, remove comment when properly integrated
        return (
            <div onClick={() => {setLinksOpen(!linksOpen)}} style={{display: "flex", alignItems: "center"}}>
                <MDBIcon size="sm" icon={!linksOpen ? "angle-right" : "angle-down"} />
                <MDBCardText style={{marginLeft: "10px"}}>Links (3)</MDBCardText>
            </div>
        )
    }

    const links = () => {
        // currently not attached to incoming data, remove comment when properly integrated
        return (
            <MDBCollapse isOpen={linksOpen}>
                <ul style={{listStyle: "none", marginTop: "10px", marginBottom: "0px"}}>
                    <li>Link 1</li>
                    <li>Link 2</li>
                    <li>Link 3</li>
                </ul>
            </MDBCollapse>
        )
    }

    const students = () => {
        return (
            <div style={{display: "flex", flexWrap: "wrap", justifyContent: "flex-end", alignItems: "flex-end"}}>
                {data.students.map((student, i) =>
                    <MDBBadge key={i} pill color="indigo" style={{textAlign: "right",  marginBottom: "5px", marginLeft: "5px"}}>{student}</MDBBadge>
                )}
            </div>
        )
    }

    const assets = () => {
        return (
            <div style={{display: "flex", justifyContent: "flex-end", alignItems: "flex-end"}}>
                {data.assets.map((asset, i) =>
                    <img key={i} style={{marginLeft: "5px"}} src="https://via.placeholder.com/70" alt="" />
                )}
            </div>
        )
    }

    const removeActivity = () => {
        deleteActivity({ deleteId: data._id }).then(() => {
            setActivities(activities.filter(activity => activity._id !== data._id));
        }).catch(error => {
            console.log("Error:", error)
        });
    }

    return (
        <MDBCard>
            <MDBCardBody style={{display: "flex"}}>
                <div style={{ width: "70%" }}>
                    {description()}
                    {data.date && date()}
                    {expandLinksButton()}
                    {links()}
                </div>
                <div style={{width: "30%", display: "flex", flexDirection: "column", justifyContent: "space-between"}}>
                    {students()}
                    {assets()}
                    <div style={{ display: "flex", justifyContent: "flex-end", alignItems: "center", width: "100%" }}>
                        <MDBIcon className="click-action" size="md" icon="trash" onClick={removeActivity} />
                    </div>
                </div>
            </MDBCardBody>
        </MDBCard>
    )
}
