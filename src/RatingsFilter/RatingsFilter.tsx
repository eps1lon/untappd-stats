import { Divider, Snackbar } from "@material-ui/core";
import React from "react";

import BeerStyles from "./BeerStyles";
import Context from "./Context";

export interface Props {
  beerStyles: string[];
}

function BeerFilter(props: Props) {
  const { beerStyles } = props;

  const { filter, setFilter } = React.useContext(Context);

  const handleChange = React.useCallback(
    (beerStyles: string[]) => {
      setFilter({ ...filter, beerStyles });
    },
    [filter, setFilter],
  );

  return (
    <>
      <Divider />
      <BeerStyles
        availableStyles={beerStyles}
        onChange={handleChange}
        selectedStyles={filter.beerStyles}
      />
      <Divider />
    </>
  );
}

export default BeerFilter;
