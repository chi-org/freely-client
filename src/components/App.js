import React,{ useReducer, useEffect} from 'react';
import {BrowserRouter, Route} from 'react-router-dom';
import Login from "./auth/Login"
import Register from "./auth/Register"
import Header from "./common/Header";
import Activities from "./activities/Activities";
import NewActivity from './activities/NewActivity';
import ActivitySearch from './activities/ActivitySearch';
import Students from './students/Students';

import stateReducer from "../config/stateReducer"
import { userAuthenticated, setLoggedInUser, getLoggedInUser } from "../services/authServices"
import {StateContext} from "../config/store"

export default () => {

	// Set initial state
	const initialState = {
		loggedInUser: null,
		activities: []
	}

	// Use reducer hook to handle state items
	const [store, dispatch] = useReducer(stateReducer,initialState)

	useEffect(()=> {
			// If we have login information persisted and we're still logged into the server, set the state
			userAuthenticated().then(() => {
				dispatch({
					type: "setLoggedInUser",
					data: getLoggedInUser()
				})
			}).catch((error) => {
				console.log("got an error trying to check authenticated user:", error)
				setLoggedInUser(null)
				dispatch({
					type: "setLoggedInUser",
					data: null
				})
			})
		}, [])

  // // Use reducer hook to handle state items
	// const [loggedInUser, dispatchLoggedInUser] = useReducer(stateReducer, null)
	const [loginError, dispatchLoginError] = useReducer(stateReducer, null)
  return (
    <div>

			<StateContext.Provider value={{store,dispatch}} >
      <BrowserRouter>
			<Header />
        <Route exact path="/activities" render={() => <Activities />} />
        <Route exact path="/activities/new" render={() => <NewActivity />} />
        <Route exact path="/activities/search" render={() => <ActivitySearch />} />
        <Route exact path="/students" render={() => <Students />} />
        <Route exact path="/auth/login" render={ (props) => <Login /> }/>
      </BrowserRouter>
			</StateContext.Provider>
    </div>
  );
}
