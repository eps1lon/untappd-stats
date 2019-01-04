import { User } from "../untappd/api/schema";

export interface Filter {
  beerStyles: string[];
}

export type Result = Array<{
  frequency: number;
  value: number;
}>;

/**
 * given a list of entries from User.Beers
 * calculate the relative percentage of a given rating according to the filter
 * @param param0
 * @param filter
 */
export default function processRatings(
  { items }: User.Beers,
  filter: Filter,
): Result {
  const consideredItems = filterItems(items, {
    beerStyles: new Set(filter.beerStyles),
  });

  const tallies: Record<number, number> = consideredItems.reduce(
    (acc, item) => {
      const { rating_score } = item;

      if (acc[rating_score] == null) {
        acc[rating_score] = 0;
      }
      acc[rating_score] += 1;

      return acc;
    },
    {} as Record<number, number>,
  );
  const sum = consideredItems.length;

  return Object.entries(tallies).map(([score, tally]) => {
    const resultEntry: Result[0] = {
      frequency: tally / sum,
      value: +score,
    };

    return resultEntry;
  });
}

interface FilterItemsFilter {
  beerStyles: Set<string>;
}
function filterItems(
  items: User.Beers["items"],
  filter: FilterItemsFilter,
): User.Beers["items"] {
  return items.filter((item) => filter.beerStyles.has(item.beer.beer_style));
}
