import React from 'react';
import {BrowserRouter, Route, Redirect} from 'react-router-dom';

import Header from "./components/common/Header";
import Activities from "./components/activities/Activities";
import NewActivity from './components/activities/NewActivity';
import ActivitySearch from './components/activities/ActivitySearch';
import Students from './components/students/Students';

export default () => {
  return (
    <div>
      <BrowserRouter>
        <Route path="/" render={() => <Header />} />
        <Route exact path="/" render={() => <Redirect to="/activities" />} />
        <Route exact path="/activities" render={() => <Activities />} />
        <Route exact path="/activities/new" render={() => <NewActivity />} />
        <Route exact path="/activities/search" render={() => <ActivitySearch />} />
        <Route exact path="/students" render={() => <Students />} />
      </BrowserRouter>
    </div>
  );
}
