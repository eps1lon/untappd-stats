import { Paper } from "@material-ui/core";
import { Theme } from "@material-ui/core/styles";
import { createStyles, makeStyles } from "@material-ui/styles";
import React from "react";

import BeerStyles from "./BeerStyles";
import Context from "./Context";

export interface Props {
  beerStyles: string[];
}

const useClasses = makeStyles((theme: Theme) =>
  createStyles({
    paper: { marginBottom: theme.spacing.unit, padding: theme.spacing.unit },
  }),
);

function BeerFilter(props: Props) {
  const { beerStyles } = props;

  const { filter, setFilter } = React.useContext(Context);
  const classes = useClasses();

  const handleChange = React.useCallback(
    (beerStyles: string[]) => {
      setFilter({ ...filter, beerStyles });
    },
    [filter, setFilter],
  );

  return (
    <Paper className={classes.paper}>
      <BeerStyles
        availableStyles={beerStyles}
        onChange={handleChange}
        selectedStyles={filter.beerStyles}
      />
    </Paper>
  );
}

export default BeerFilter;
