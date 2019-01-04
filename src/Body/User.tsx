import { Checkbox, FormControlLabel, FormGroup } from "@material-ui/core";
import {
  createStyles,
  makeStyles,
  withStyles,
  WithStyles,
} from "@material-ui/styles";
import React from "react";
import { RouteComponentProps } from "react-router-dom";

import processRatings from "./processRatings";
import Ratings from "./Ratings";
import { User as UserSchema } from "../untappd/api/schema";

const userBeers: UserSchema.Beers = {
  items: require("./MOCK_DATA.json"),
};

const allBeerStyles = [
  "Adambier",
  "American IPA",
  "Imperial / Double IPA",
  "Altbier",
];

const styles = createStyles({
  root: {},
  input: {},
});
const useClasses = makeStyles(styles);

export interface UserRoute {
  username: string;
}
export interface Props
  extends RouteComponentProps<UserRoute>,
    WithStyles<typeof styles> {}

function User(props: Props) {
  const { username } = props.match.params;
  const classes = useClasses(props);
  const [beerStyles, setBeerStyles] = React.useState(new Set<string>());
  const ratings = React.useMemo(
    () => processRatings(userBeers, { beerStyles: Array.from(beerStyles) }),
    [beerStyles],
  );
  const createHandleCheckboxClick = (beerStyle: string) => (
    event: React.ChangeEvent<{}>,
  ) => {
    const { target } = event;
    if (!(target instanceof HTMLInputElement)) {
      throw new Error(
        "handleCheckboxClick was not passed to an HTMLInputElement",
      );
    }

    if (target.checked && !beerStyles.has(beerStyle)) {
      setBeerStyles(new Set(beerStyles).add(beerStyle));
    } else if (!target.checked) {
      const newBeerStyles = new Set(beerStyles);
      newBeerStyles.delete(beerStyle);
      setBeerStyles(newBeerStyles);
    }
  };

  return (
    <div className={classes.root}>
      {username}
      <FormGroup>
        {allBeerStyles.map((beerStyle) => {
          return (
            <FormControlLabel
              key={beerStyle}
              control={<Checkbox checked={beerStyles.has(beerStyle)} />}
              label={beerStyle}
              onChange={createHandleCheckboxClick(beerStyle)}
              value={beerStyle}
            />
          );
        })}
      </FormGroup>
      <Ratings ratings={ratings} width={800} height={300} />
    </div>
  );
}

export default withStyles(styles)(User);
