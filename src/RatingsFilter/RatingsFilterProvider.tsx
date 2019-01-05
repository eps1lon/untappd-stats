import React from "react";

import Context, { Filter } from "./Context";

export interface Props {
  children?: React.ReactNode;
}

function RatingsFilterProvider(props: Props) {
  const { children } = props;
  const [filter, setFilter] = React.useState<Filter>({ beerStyles: [] });
  const contextValue = React.useMemo(() => ({ filter, setFilter }), [
    filter,
    setFilter,
  ]);

  return <Context.Provider value={contextValue}>{children}</Context.Provider>;
}

export default RatingsFilterProvider;
