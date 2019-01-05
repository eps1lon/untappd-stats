import { Chip, TextField, Typography } from "@material-ui/core";
import { Theme } from "@material-ui/core/styles";
import SelectedIcon from "@material-ui/icons/Done";
import NotSelectedIcon from "@material-ui/icons/RadioButtonUnchecked";
import { createStyles, makeStyles } from "@material-ui/styles";
import classNames from "classnames";
import React from "react";

export type BeerStyle = string;
export interface Props {
  availableStyles: BeerStyle[];
  isLoading?: boolean;
  onChange: (beerStyles: BeerStyle[]) => void;
  selectedStyles: BeerStyle[];
}

const useClasses = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      marginBottom: theme.spacing.unit * 2,
    },
    active: {},
    chip: {
      marginTop: theme.spacing.unit / 2,
      marginRight: theme.spacing.unit,
      marginBottom: theme.spacing.unit / 2,
      marginLeft: theme.spacing.unit,
    },
    chips: {
      display: "flex",
      flexWrap: "wrap",
      maxHeight: 122,
      overflowY: "scroll",
    },
  }),
);

function BeerStyles(props: Props) {
  const { availableStyles, isLoading, onChange, selectedStyles } = props;

  const classes = useClasses();

  const [focused, setFocused] = React.useState(false);

  const [searchTerm, setSearchTerm] = React.useState("");
  const handleSearchTermChange = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setSearchTerm(event.target.value);
    },
    [setSearchTerm],
  );

  const shownStyles = React.useMemo(
    () => {
      if (searchTerm === "") {
        return availableStyles;
      }
      return availableStyles.filter(
        (beerStyle) => beerStyle.indexOf(searchTerm) !== -1,
      );
    },
    [searchTerm, availableStyles],
  );

  function createHandleClick(clickedStyle: string, isSelected: boolean) {
    return () => {
      if (isSelected) {
        onChange(
          selectedStyles.filter((beerStyle) => beerStyle !== clickedStyle),
        );
      } else {
        onChange(selectedStyles.concat(clickedStyle));
      }
    };
  }

  return (
    <div className={classNames(classes.root, { [classes.active]: focused })}>
      <Typography variant="subtitle1">Beer Style</Typography>
      <TextField
        label="beer style"
        onChange={handleSearchTermChange}
        onFocus={setFocused}
        placeholder="type to filter beer styles"
        value={searchTerm}
      />
      <Typography>
        Found {shownStyles.length} styles {searchTerm && `matching "${searchTerm}"`}
      </Typography>
      <div className={classes.chips}>
        {shownStyles.map((beerStyle) => {
          const isSelected = selectedStyles.indexOf(beerStyle) !== -1;
          const icon = isSelected ? <SelectedIcon /> : <NotSelectedIcon />;

          return (
            <Chip
              key={beerStyle}
              className={classes.chip}
              onClick={createHandleClick(beerStyle, isSelected)}
              icon={icon}
              label={beerStyle}
            />
          );
        })}
      </div>
    </div>
  );
}

export default BeerStyles;
