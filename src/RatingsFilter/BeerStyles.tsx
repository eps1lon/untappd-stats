import { Checkbox, FormControlLabel, FormGroup } from "@material-ui/core";
import React from "react";

export type BeerStyle = string;
export interface Props {
  availableStyles: BeerStyle[];
  selectedStyles: BeerStyle[];
  onChange: (beerStyles: BeerStyle[]) => void;
}

function BeerStyles(props: Props) {
  const { availableStyles, onChange, selectedStyles } = props;

  const createHandleCheckboxClick = (beerStyle: string) => (
    event: React.ChangeEvent<{}>,
  ) => {
    const { target } = event;
    if (!(target instanceof HTMLInputElement)) {
      throw new Error(
        "handleCheckboxClick was not passed to an HTMLInputElement",
      );
    }

    if (target.checked && selectedStyles.indexOf(beerStyle) === -1) {
      onChange(selectedStyles.concat(beerStyle));
    } else if (!target.checked) {
      onChange(
        selectedStyles.filter((existingStyle) => existingStyle !== beerStyle),
      );
    }
  };

  return (
    <FormGroup>
      {availableStyles.map((beerStyle) => {
        return (
          <FormControlLabel
            key={beerStyle}
            control={
              <Checkbox checked={selectedStyles.indexOf(beerStyle) !== -1} />
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

export default BeerStyles;
