import {BrowserRouter, Route, Redirect} from 'react-router-dom';
import React, { useState, useReducer, useEffect } from 'react';

import Header from "./components/common/Header";
import Activities from "./components/activities/Activities";
import Students from './components/students/Students';
import Landing from './components/common/Landing';

import { getAllActivities } from './services/activity_services';
import { userAuthenticated, setLoggedInUser, getLoggedInUser } from "./services/auth_services";
import { getStudents } from "./services/student_services";

import stateReducer from "./config/state_reducer";
import { StateContext } from "./config/store";

export default () => {
  const [activities, setActivities] = useState([]);
  const [students, setStudents] = useState([]);
  const initialState = {loggedInUser: null};
  const [store, dispatch] = useReducer(stateReducer, initialState);

  useEffect(() => {
      userAuthenticated().then(() => {
          dispatch({ type: "setLoggedInUser", data: getLoggedInUser() });

          getAllActivities()
              .then((response) => setActivities(response.data))
              .catch((error) => console.log(error))

          getStudents()
              .then((response) => setStudents(response.data))
              .catch((error) => console.log(error))
	}).catch((error) => {
        console.log("got an error trying to check authenticated user:", error)
		setLoggedInUser(null)
        dispatch({ type: "setLoggedInUser", data: null });
    });
	return () => {}
  }, []);

  return (
    <div>
      <StateContext.Provider value={{store, dispatch}} >
         <BrowserRouter>
            <Route path="*" render={() => <Header setActivities={setActivities} setStudents={setStudents} />} />
            <Route exact path="/" render={() => getLoggedInUser() ? < Redirect to="/activities" /> : <Redirect to="/landing" />} />
            <Route exact path="/activities" render={() => <Activities activities={activities} students={students} setActivities={setActivities} />} />
            <Route exact path="/students" render={() => <Students students={students} setStudents={setStudents} />} />
            <Route exact path="/landing" render={() => <Landing />} />
            {!getLoggedInUser() && <Route path="*" render={() => <Redirect to="/landing" />} />}
        </BrowserRouter>
      </StateContext.Provider>
    </div>
  );
}
