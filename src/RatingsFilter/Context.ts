import { createContext } from "react";

export interface Filter {
  beerStyles: string[];
}

export interface ContextProps {
  filter: Filter;
  setFilter: (filter: Filter) => void;
}

const Context = createContext<ContextProps>({
  filter: { beerStyles: [] },
  setFilter: () => {},
});

export default Context;
