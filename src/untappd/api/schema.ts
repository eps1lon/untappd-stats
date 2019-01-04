export namespace User {
  export interface Beers {
    items: BeersItem[];
  }

  interface BeersItem {
    rating_score: number;
    beer: { beer_style: string };
  }
}
