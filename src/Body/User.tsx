import { Typography } from "@material-ui/core";
import {
  createStyles,
  makeStyles,
  withStyles,
  WithStyles,
} from "@material-ui/styles";
import React from "react";

import processRatings from "./processRatings";
import Ratings from "./Ratings";
import RatingsFilter, { useFilter } from "../RatingsFilter";
import { User as UserSchema } from "../untappd/api/schema";

const userBeers: UserSchema.Beers = {
  items: require("./MOCK_DATA.json"),
};

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
  const filter = useFilter();
  const ratings = React.useMemo(() => processRatings(userBeers, filter), [
    filter,
  ]);

  return (
    <div className={classes.root}>
      <Typography variant="h6">{name}</Typography>
      <RatingsFilter />
      <Ratings ratings={ratings} width={800} height={300} />
    </div>
  );
}

export default withStyles(styles)(User);
