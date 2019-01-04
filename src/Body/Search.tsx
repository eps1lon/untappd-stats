import {
  Button,
  List,
  ListItem,
  TextField,
  Typography,
} from "@material-ui/core";
import {
  createStyles,
  makeStyles,
  withStyles,
  WithStyles,
} from "@material-ui/styles";
import React from "react";
import { Link } from "react-router-dom";

const styles = createStyles({
  root: {},
  input: {},
});
const useClasses = makeStyles(styles);

export interface Props extends WithStyles<typeof styles> {}

function Search(props: Props) {
  const classes = useClasses(props);
  const [name, setName] = React.useState("");
  const handleChange = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setName(event.target.value);
    },
    [setName],
  );
  const users = [{ name: "eps1lon" }];

  return (
    <div className={classes.root}>
      <Typography variant="h1">Untappd Stats</Typography>
      <TextField
        className={classes.input}
        onChange={handleChange}
        value={name}
      />
      <Button variant="contained">Search</Button>
      <List>
        {users.map((user) => {
          return (
            <ListItem key={user.name}>
              <Link to={`/user/${user.name}`}>{user.name}</Link>
            </ListItem>
          );
        })}
      </List>
    </div>
  );
}

export default withStyles(styles)(Search);
