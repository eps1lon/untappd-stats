import { Button, TextField, Typography } from "@material-ui/core";
import { createStyles, makeStyles } from "@material-ui/styles";
import React from "react";
import { RouterProps } from "react-router";

import useDocumentTitle from "../useDocumentTitle";

const styles = createStyles({
  root: {},
  input: {},
});
const useClasses = makeStyles(styles);

export interface Props extends RouterProps {}

function Landing(props: Props) {
  const { history } = props;
  useDocumentTitle("untappd-stats");

  const classes = useClasses(props);

  const [name, setName] = React.useState("");
  const handleChange = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setName(event.target.value);
    },
    [setName],
  );
  const handleSearch = React.useCallback(
    () => {
      history.push(`/user/${name}`);
    },
    [history, name],
  );
  const handleKeyDown = React.useCallback(
    (event: React.KeyboardEvent) => {
      if (event.key === "Enter") {
        handleSearch();
      }
    },
    [handleSearch],
  );

  return (
    <div className={classes.root}>
      <Typography variant="h1">Untappd Stats</Typography>
      <TextField
        className={classes.input}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        value={name}
      />
      <Button onClick={handleSearch} variant="contained">
        Open Profile
      </Button>
    </div>
  );
}

export default Landing;
