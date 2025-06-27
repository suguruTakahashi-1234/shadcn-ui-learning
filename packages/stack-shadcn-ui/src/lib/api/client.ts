import createClient from "openapi-fetch";
import createQueryClient from "openapi-react-query";
import type { paths } from "@/generated/api";

/**
 * OpenAPI Fetchクライアント
 */
const fetchClient = createClient<paths>({
  baseUrl: "http://localhost:4010",
});

/**
 * React Query統合APIクライアント
 */
export const $api = createQueryClient(fetchClient);
