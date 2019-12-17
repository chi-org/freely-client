import React, {useState} from 'react';
import {MDBContainer, MDBIcon, MDBInput, MDBCollapse} from 'mdbreact';
import Activity from './Activity';

export default () => {
    const today = new Date();
    const todayString = `${today.getFullYear()}-${today.getMonth()}-${today.getDate()}`;
    const [completedDateOpen, setCompletedDateOpen] = useState(false);

    return (
        <div style={{display: "flex", flexDirection: "column", justifyContent: "center"}}>
            <MDBContainer>
                <form style={{display: "flex", flexDirection: "column"}}>
                    <div style={{display: "flex", alignItems: "center"}}>
                        <MDBIcon icon="search" style={{marginRight: "10px"}} />
                        <MDBInput type="text" label="Keyword" style={{width: "auto"}} />
                    </div>

                    <div style={{display: "flex", justifyContent: "space-evenly", alignItems: "center"}}>
                        <input style={{width: "100%", marginRight: "20px"}} type="date" label="From" value={todayString} />
                        <input style={{width: "100%", marginLeft: "20px"}} type="date" label="To" />
                    </div>

                    <div style={{display: "flex", alignItems: "center", marginTop: "30px"}}>
                        <select className="browser-default custom-select" style={{marginRight: "20px"}}>
                            <option>Completed</option>
                            <option>All Activities</option>
                        </select>

                        <select className="browser-default custom-select" style={{marginLeft: "20px"}}>
                            <option>Student 1</option>
                            <option>Student 2</option>
                            <option>Student 3</option>
                        </select>
                    </div>

                    <div style={{marginTop: "30px", display: "flex", flexWrap: "wrap", justifyContent: "space-evenly", alignItems: "center"}}>
                        <div onClick={() => {setCompletedDateOpen(!completedDateOpen)}} style={{flexBasis: "100%", justifyContent: "center", display: "flex", alignItems: "baseline"}}>
                            <MDBIcon size="sm" icon={!completedDateOpen ? "angle-right" : "angle-down"} />
                            <p style={{marginLeft: "10px"}}> Completed Date</p>
                        </div>
                        <MDBCollapse isOpen={completedDateOpen} style={{flexBasis: "100%"}}>
                            <div style={{display: "flex", justifyContent: "space-evenly", alignItems: "center"}}>
                                <input style={{width: "100%", marginRight: "20px"}} type="date" label="From"/>
                                <input style={{width: "100%", marginLeft: "20px"}} type="date" label="To" value={todayString} />
                            </div>
                        </MDBCollapse>
                    </div>
                </form>
            </MDBContainer>
            <MDBContainer style={{marginTop: "30px", marginBottom: "30px"}}>
                <Activity />
                <Activity />
                <Activity />
            </MDBContainer>
        </div>
    )
}