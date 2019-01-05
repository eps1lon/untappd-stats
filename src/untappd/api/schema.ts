export interface Response<Body> {
  meta: {
    code: number;
    response_time: {
      time: number;
      measure: "seconds";
    };
  };
  notifications: {};
  response: Body;
}

export interface UserBeers {
  beers: {
    items: UserBeersItem[];
  };
}

export interface UserBeersItem {
  rating_score: number;
  beer: { beer_style: string };
}
