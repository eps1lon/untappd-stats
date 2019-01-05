import { Divider, Snackbar } from "@material-ui/core";
import React from "react";

import BeerStyles from "./BeerStyles";
import Context from "./Context";

export interface Props {}

function BeerFilter(props: Props) {
  const [loading, setLoading] = React.useState(true);
  const [errorMessage, setErrorMessage] = React.useState<null | string>(null);
  const [allBeerStyles, setAllBeerStyles] = React.useState<string[]>([]);
  React.useEffect(() => {
    fetch("/beer-styles.json")
      .then((response) => response.json())
      .then((json) => {
        if (Array.isArray(json) && typeof json[0] === "string") {
          setAllBeerStyles(json);
        } else {
          throw new TypeError(`json response didnt match string[]`);
        }
      })
      .catch((err) => {
        setErrorMessage(String(err));
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const { filter, setFilter } = React.useContext(Context);
  const { beerStyles } = filter;

  const handleChange = React.useCallback(
    (beerStyles: string[]) => {
      setFilter({ ...filter, beerStyles });
    },
    [filter, setFilter],
  );

  return (
    <>
      <Snackbar open={errorMessage != null}>{errorMessage}</Snackbar>
      <Divider />
      <BeerStyles
        availableStyles={allBeerStyles}
        isLoading={loading}
        onChange={handleChange}
        selectedStyles={beerStyles}
      />
      <Divider />
    </>
  );
}

export default BeerFilter;
