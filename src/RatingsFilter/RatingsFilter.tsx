import { Checkbox, FormControlLabel, FormGroup } from "@material-ui/core";
import React from "react";

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

  const createHandleCheckboxClick = (beerStyle: string) => (
    event: React.ChangeEvent<{}>,
  ) => {
    const { target } = event;
    if (!(target instanceof HTMLInputElement)) {
      throw new Error(
        "handleCheckboxClick was not passed to an HTMLInputElement",
      );
    }

    if (target.checked && beerStyles.indexOf(beerStyle) === -1) {
      setFilter({ ...filter, beerStyles: beerStyles.concat(beerStyle) });
    } else if (!target.checked) {
      setFilter({
        ...filter,
        beerStyles: beerStyles.filter(
          (existingStyle) => existingStyle !== beerStyle,
        ),
      });
    }
  };

  return (
    <FormGroup>
      {allBeerStyles.map((beerStyle) => {
        return (
          <FormControlLabel
            key={beerStyle}
            control={
              <Checkbox checked={beerStyles.indexOf(beerStyle) !== -1} />
            }
            label={beerStyle}
            onChange={createHandleCheckboxClick(beerStyle)}
            value={beerStyle}
          />
        );
      })}
    </FormGroup>
  );
}

export default BeerFilter;
