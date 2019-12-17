import React from 'react';
import {BrowserRouter, Route} from 'react-router-dom';

import Header from "./components/common/Header";
import Activities from "./components/activities/Activities";
import NewActivity from './components/activities/NewActivity';
import Students from './components/students/Students';

export default () => {
  return (
    <div>
      <Header />
      <BrowserRouter>
        <Route exact path="/activities" render={() => <Activities />} />
        <Route exact path="/activities/new" render={() => <NewActivity />} />
        <Route exact path="/students" render={() => <Students />} />
      </BrowserRouter>
    </div>
  );
}