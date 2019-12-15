import React, {useState} from 'react';
import StudentPicker from './StudentPicker';
import ActivityDateRange from './ActivityDateRange';

export default () => {
    return (
        <div style={{display: "flex", flexDirection: "column", justifyContent: "center"}}>
            <StudentPicker />
            <ActivityDateRange />
        </div>
    )
}