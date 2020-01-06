import React, { useState, useEffect } from 'react';
import {BrowserRouter, Route} from 'react-router-dom';

import Header from "./components/common/Header";
import Activities from "./components/activities/Activities";
import NewActivity from './components/activities/NewActivity';
import ActivitySearch from './components/activities/ActivitySearch';
import Students from './components/students/Students';

import {getAllActivities} from './services/activity_services';

export default () => {
  const [activities, setActivities] = useState([]);

  const getActivities = () => {
    getAllActivities()
    .then((response) => setActivities(response.data.activities))
    .catch((error) => console.log(error))
  }

  useEffect(() => {
    getActivities();
  }, [])

  return (
    <div>
      <Header />
      <BrowserRouter>
        <Route exact path="/activities" render={() => <Activities activities={activities} />} />
        <Route exact path="/activities/new" render={() => <NewActivity />} />
        <Route exact path="/activities/search" render={() => <ActivitySearch />} />
        <Route exact path="/students" render={() => <Students />} />
      </BrowserRouter>
    </div>
  );
}
