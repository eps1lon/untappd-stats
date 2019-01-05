import axios from "axios";
import { useEffect, useMemo, useState } from "react";

import { Response } from "./schema";
import { didError } from "./utils";

export type LoadingState = "init" | "request" | "error" | "done";
/**
 * @param S - type on success, undefined else
 */
export type Result<S> = S | undefined;

/**
 * use official untappd api if client id and secret are set in env variables
 * otherwise uses mock data in public
 * @param endpoint
 * @param parameters
 */
export default function useUntappdApi<S>(
  endpoint: string,
  parameters?: {},
): [Result<S>, LoadingState] {
  const [loadingState, setLoadingState] = useState<LoadingState>("init");
  const [result, setResult] = useState<Result<S>>(undefined);
  const params = useParameters(parameters);

  useEffect(
    () => {
      setLoadingState("request");
      setResult(undefined);

      axios
        .get<Response<S>>(apiUrl(endpoint), { params })
        .then((axiosResponse) => {
          const { data: untappdResponse } = axiosResponse;
          if (didError(untappdResponse)) {
            throw new Error("untappd returnd error");
          }

          setLoadingState("done");
          setResult(untappdResponse.response);
        })
        .catch((err) => {
          setLoadingState("error");
        });
    },
    [endpoint, parameters],
  );

  return [result, loadingState];
}

function apiUrl(endpoint: string): string {
  if (process.env.REACT_APP_UNTAPPD_API_CLIENT_ID) {
    return `https://api.untappd.com/v4/{endpoint}`;
  }
  return `/${endpoint}`;
}

function useParameters(parameters: {} = {}) {
  return useMemo(
    () => {
      return {
        ...parameters,
        client_id: process.env.REACT_APP_UNTAPPD_API_CLIENT_ID,
        client_secret: process.env.REACT_APP_UNTAPPD_API_CLIENT_SECRET,
      };
    },
    [parameters],
  );
}
