import createClient from "openapi-fetch";
import createQueryClient from "openapi-react-query";
import type { paths } from "./generated/api";

export const fetchClient = createClient<paths>({
  baseUrl: "http://localhost:4010",
});

export const $api = createQueryClient(fetchClient);
