import React from 'react';
import {BrowserRouter, Route} from 'react-router-dom';

import Header from "./components/common/Header";
import Activities from "./components/activities/Activities";

export default () => {
  return (
    <div>
      <Header />
      <BrowserRouter>
        <Route exact path="/activities" render={() => <Activities />} />
      </BrowserRouter>
    </div>
  );
}