import { List, ListItem, Paper, Typography } from "@material-ui/core";
import { Theme } from "@material-ui/core/styles";
import { createStyles, makeStyles } from "@material-ui/styles";
import { Bar } from "@vx/shape";
import { Group } from "@vx/group";
import { scaleBand, scaleLinear } from "@vx/scale";
import React from "react";

export interface Props {
  barPadding: number;
  height: number;
  marginTop: number;
  width: number;
  ratings: Rating[];
}

const useClasses = makeStyles((theme: Theme) =>
  createStyles({
    paper: { marginBottom: theme.spacing.unit, padding: theme.spacing.unit },
  }),
);

interface Rating {
  frequency: number;
  value: number;
}

const getX = (rating: Rating) => rating.value;
const getY = (rating: Rating) => rating.frequency;
const sortAsc = (a: number, b: number) => a - b;

function useAverage(props: Props): number {
  const { ratings } = props;

  return React.useMemo(
    () =>
      ratings.reduce((avg, rating) => avg + rating.frequency * rating.value, 0),
    [ratings],
  );
}

function useMedian(props: Props): number | undefined {
  const sorted = useSortedRatings(props);

  return sorted[Math.floor(sorted.length / 2)];
}

function useSortedRatings(props: Props) {
  const values = useXValues(props);
  return React.useMemo(() => values.sort(sortAsc), [values]);
}

function useXRange(props: Props) {
  return React.useMemo(() => [0, props.width], [props.width]);
}

function useXScale(props: Props) {
  const { barPadding, ratings } = props;
  const domain = useSortedRatings(props);
  const rangeRound = useXRange(props);

  return React.useMemo(
    () =>
      scaleBand({
        domain,
        padding: barPadding,
        rangeRound,
      }),
    [barPadding, ratings],
  );
}

function useXValues(props: Props) {
  return React.useMemo(() => props.ratings.map(getX), [props.ratings]);
}

function useYRange(props: Props) {
  const yMax = getYMax(props);
  return React.useMemo(() => [yMax, 0], [yMax]);
}

function useYScale(props: Props) {
  const { ratings } = props;
  const rangeRound = useYRange(props);

  const domain = React.useMemo(() => [0, Math.max(...ratings.map(getY))], [
    ratings,
  ]);

  return React.useMemo(() => scaleLinear({ domain, rangeRound }), [domain]);
}

function getYMax(props: Props) {
  return props.height - props.marginTop;
}

function useYValues(props: Props) {
  return React.useMemo(() => props.ratings.map(getY), [props.ratings]);
}

function Ratings(props: Props) {
  const { height, marginTop, ratings, width } = props;

  const [activeRating, setActiveRating] = React.useState("");
  function handleRating(rating: Rating) {
    setActiveRating(
      `${rating.value}/5: ${(rating.frequency * 100).toFixed(2)}%`,
    );
  }

  const classes = useClasses();

  const yMax = height - marginTop;

  const xScale = useXScale(props);
  const yScale = useYScale(props);

  const average = useAverage(props);
  const median = useMedian(props);
  const tally = ratings.length;

  return (
    <Paper className={classes.paper}>
      <Typography variant="subtitle1">Summary</Typography>
      <List dense>
        <ListItem>{tally} different scores</ListItem>
        <ListItem>Average: {average}</ListItem>
        <ListItem>Median: {median}</ListItem>
        <ListItem>Hovered Rating: {activeRating}</ListItem>
      </List>
      <Typography variant="subtitle1">Graph</Typography>
      <svg height={height + marginTop} width={width}>
        <Group top={marginTop}>
          {ratings.map((rating) => {
            const width = xScale.bandwidth();
            const height = yMax - yScale(getY(rating));
            const x = xScale(getX(rating));
            const y = yMax - height;

            return (
              <Bar
                key={x}
                fill="black"
                height={height}
                width={width}
                x={x}
                y={y}
                onMouseOver={() => handleRating(rating)}
              />
            );
          })}
        </Group>
      </svg>
    </Paper>
  );
}

Ratings.defaultProps = {
  barPadding: 0.1,
  marginTop: 40,
};

export default Ratings;
