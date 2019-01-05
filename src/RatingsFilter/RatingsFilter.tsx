import React from "react";

import BeerStyles from "./BeerStyles";
import Context from "./Context";

const allBeerStyles = [
  "Adambier",
  "American IPA",
  "Imperial / Double IPA",
  "Altbier",
];

export interface Props {}

function BeerFilter(props: Props) {
  const { filter, setFilter } = React.useContext(Context);
  const { beerStyles } = filter;

  const handleChange = React.useCallback(
    (beerStyles: string[]) => {
      setFilter({ ...filter, beerStyles });
    },
    [filter, setFilter],
  );

  return (
    <BeerStyles
      availableStyles={allBeerStyles}
      onChange={handleChange}
      selectedStyles={beerStyles}
    />
  );
}

export default BeerFilter;
