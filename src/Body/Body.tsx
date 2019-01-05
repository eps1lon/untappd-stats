import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

const Landing = React.lazy(() => import("./Landing"));
const Stats = React.lazy(() => import("./Stats"));

function Body() {
  return (
    <Router>
      <React.Suspense fallback={<div>Loading...</div>}>
        <Switch>
          <Route exact path="/" component={Landing} />
          <Route path="/user/:username" component={Stats} />
        </Switch>
      </React.Suspense>
    </Router>
  );
}

export default Body;
