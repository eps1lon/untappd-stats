import React from "react";
import { Route, Switch } from "react-router-dom";

const Landing = React.lazy(() => import("./Landing"));
const Stats = React.lazy(() => import("./Stats"));

function Body() {
  return (
    <React.Suspense fallback={<div>Loading...</div>}>
      <Switch>
        <Route exact path="/" component={Landing} />
        <Route path="/user/:username" component={Stats} />
      </Switch>
    </React.Suspense>
  );
}

export default Body;
