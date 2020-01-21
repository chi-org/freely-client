import React, { useState } from 'react';
import { MDBCard, MDBCardBody, MDBCardText, MDBCollapse, MDBIcon, MDBBadge, MDBListGroup, MDBListGroupItem } from 'mdbreact';
import { deleteActivity } from '../../services/activity_services';

export default ({ data, activities, setActivities, students }) => {

    const [assetListOpen, setAssetListOpen] = useState(false);

    const date = () => {
        const date = new Date(data.date);
        return <MDBCardText>{`${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`}</MDBCardText>
    }

    const expandAssetList = () => {
        if (data.assets.length > 0) {
            return (
                <div onClick={() => { setAssetListOpen(!assetListOpen) }} style={{ display: "flex", alignItems: "center" }}>
                    <MDBIcon size="sm" icon={!assetListOpen ? "angle-right" : "angle-down"} />
                    <MDBCardText style={{ marginLeft: "10px" }}>Assets ({data.assets.length})</MDBCardText>
                </div>
            )
        }
        else {
            return <p style={{ color: "#B0B0B0", fontSize: "0.8em", marginBottom: "0px" }}><i>No attachments</i></p>
        }
    }

    const assetList = () => {
        return (
            <MDBCollapse isOpen={assetListOpen}>
                <MDBListGroup>
                    {data.assets.map((asset, i) => {
                        return <MDBListGroupItem key={i}><a href={asset} target="_blank">{asset}</a>
                        </MDBListGroupItem>
                    })}
                </MDBListGroup>
            </MDBCollapse>
        )
    }

    const displayStudents = () => {
        return (
            <div style={{display: "flex", flexWrap: "wrap", justifyContent: "flex-end", alignItems: "flex-end"}}>
                {data.students.map((student_id, i) => {
                    let studentRecord = students.find(student => student._id === student_id);
                    if (studentRecord) {
                        return <MDBBadge
                            pill
                            key={i}
                            className="student-pill"
                            color={studentRecord.color}
                            style={{ backgroundColor: `${studentRecord.color}` }}>{studentRecord.name}
                        </MDBBadge>
                    }
                    else return false;
                })}
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
                    {data.name && <MDBCardText>{data.name}</MDBCardText>}
                    <MDBCardText>{data.textContent}</MDBCardText>
                    {data.date && date()}
                    {expandAssetList()}
                    {assetList()}
                </div>
                <div style={{width: "30%", display: "flex", flexDirection: "column", justifyContent: "space-between"}}>
                    {displayStudents()}
                    <div style={{ display: "flex", justifyContent: "flex-end", alignItems: "center", width: "100%" }}>
                        <MDBIcon className="click-action" size="md" icon="trash" onClick={removeActivity} />
                    </div>
                </div>
            </MDBCardBody>
        </MDBCard>
    )
}
