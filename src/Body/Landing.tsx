import { Button, TextField, Typography } from "@material-ui/core";
import { Theme } from "@material-ui/core/styles";
import { createStyles, makeStyles } from "@material-ui/styles";
import React from "react";
import { RouterProps } from "react-router";

import useDocumentTitle from "../useDocumentTitle";

const styles = (theme: Theme) =>
  createStyles({
    root: {
      alignContent: "center",
      display: "flex",
      flexFlow: "column",
    },
    button: {
      margin: "0 auto",
      marginTop: theme.spacing.unit,
      width: 150,
    },
    title: {
      margin: "0 auto",
      marginBottom: 20,
    },
    input: {
      margin: "0 auto",
      width: 200,
    },
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
      <Typography className={classes.title} variant="h1">
        Untappd Stats
      </Typography>
      <TextField
        className={classes.input}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        label="name of the connoisseur"
        value={name}
      />
      <Button
        className={classes.button}
        onClick={handleSearch}
        variant="contained"
      >
        Open Profile
      </Button>
    </div>
  );
}

export default Landing;
