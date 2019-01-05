import { useContext } from "react";

import Context, { Filter } from "./Context";

export default function useFilter(): Filter {
  return useContext(Context).filter;
}
