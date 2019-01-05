import { Typography } from "@material-ui/core";
import {
  createStyles,
  makeStyles,
  withStyles,
  WithStyles,
} from "@material-ui/styles";
import React from "react";
import { Link } from "react-router-dom";

import processRatings from "./processRatings";
import Ratings from "../Ratings";
import RatingsFilter, { useFilter } from "../RatingsFilter";
import { schema, useApi } from "../untappd/api";
import { LoadingState } from "../untappd/api/useApi";
import useDocumentTitle from "../useDocumentTitle";

const styles = createStyles({
  root: {},
  input: {},
});
const useClasses = makeStyles(styles);

export interface Props extends WithStyles<typeof styles> {
  name: string;
}

function User(props: Props) {
  const { name } = props;
  const classes = useClasses(props);

  useDocumentTitle(`${name} | untappd-stats`);

  const filter = useFilter();
  const [userBeers, loadingState] = useUserBeers(name);

  const ratings = React.useMemo(() => processRatings(userBeers, filter), [
    filter,
  ]);
  const ratedStyles = React.useMemo(
    () => {
      return unique(
        userBeers.map(({ beer: { beer_style } }) => {
          return beer_style;
        }),
      );
    },
    [userBeers],
  );

  return (
    <div className={classes.root}>
      <Link to="/">
        <Typography>Look at another user</Typography>
      </Link>
      <Typography variant="h6">
        User <em>{name}</em>
      </Typography>
      <RequestFallback state={loadingState}>
        <RatingsFilter beerStyles={ratedStyles} />
        <Ratings ratings={ratings} width={800} height={300} />
      </RequestFallback>
    </div>
  );
}

interface RequestFallbackProps {
  children?: React.ReactNode;
  state: LoadingState;
}
function RequestFallback(props: RequestFallbackProps) {
  const { children, state } = props;

  if (state === "done") {
    return <>{children}</>;
  }

  const message = state === "error" ? "NotFound" : "Loading";
  return <Typography variant="subtitle1">{message}</Typography>;
}

function useUserBeers(name: string): [schema.UserBeersItem[], LoadingState] {
  const [userBeers, loadingState] = useApi<schema.UserBeers>(
    `user/beers/${name}.json`,
  );
  if (userBeers == null) {
    return [[], loadingState];
  }

  return [userBeers.beers.items, loadingState];
}

function unique<T>(arr: T[]): T[] {
  return Array.from(new Set(arr));
}

export default withStyles(styles)(User);
