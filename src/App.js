import {BrowserRouter, Route, Redirect} from 'react-router-dom';
import React, { useState, useReducer, useEffect } from 'react';

import Header from "./components/common/Header";
import Activities from "./components/activities/Activities";
import ActivitySearch from './components/activities/ActivitySearch';
import Students from './components/students/Students';

import stateReducer from "./config/stateReducer";
import { userAuthenticated, setLoggedInUser, getLoggedInUser } from "./services/authServices";
import { StateContext } from "./config/store";

import { getAllActivities } from './services/activity_services';

export default () => {
  const [activities, setActivities] = useState([]);

  const initialState = {loggedInUser: null, activities: []};
  const [store, dispatch] = useReducer(stateReducer,initialState);

  useEffect(() => {
	// If we have login information persisted and we're still logged into the server, set the state
      userAuthenticated().then(() => {
          dispatch({ type: "setLoggedInUser", data: getLoggedInUser() });
          getAllActivities()
          .then((response) => setActivities(response.data))
          .catch((error) => console.log(error))
	}).catch((error) => {
        console.log("got an error trying to check authenticated user:", error)
		setLoggedInUser(null)
		dispatch({
			type: "setLoggedInUser",
			data: null
		})
    });
	return () => {}
  }, []);

  return (
    <div>
      <StateContext.Provider value={{store, dispatch}} >
        <BrowserRouter>
          <Route path="/" render={() => <Header setActivities={setActivities} />} />
          <Route exact path="/" render={() => <Redirect to="/activities" />} />
          <Route exact path="/activities" render={() => <Activities activities={activities} />} />
          <Route exact path="/activities/search" render={() => <ActivitySearch />} />
          <Route exact path="/students" render={() => <Students />} />
        </BrowserRouter>
      </StateContext.Provider>
    </div>
  );
}
