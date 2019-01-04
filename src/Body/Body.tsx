import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

const Home = React.lazy(() => import("./Search"));
const Stats = React.lazy(() => import("./User"));

function Body() {
  return (
    <Router>
      <React.Suspense fallback={<div>Loading...</div>}>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/user/:username" component={Stats} />
        </Switch>
      </React.Suspense>
    </Router>
  );
}

export default Body;
