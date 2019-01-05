import React from "react";
import { RouteComponentProps } from "react-router-dom";

import { RatingsFilterProvider } from "../RatingsFilter";
import User from "./User";

export interface UserRoute {
  username: string;
}
export interface Props extends RouteComponentProps<UserRoute> {}

function Stats(props: Props) {
  const {
    match: {
      params: { username },
    },
  } = props;

  return (
    <RatingsFilterProvider>
      <User name={username} />
    </RatingsFilterProvider>
  );
}

export default Stats;
