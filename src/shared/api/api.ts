import { z } from "zod";

export const ApiErrorSchema = z.object({
  code: z.string(),
  message: z.string(),
  status: z.number().int(),
  details: z.record(z.string(), z.unknown()).nullable(),
});

export type ApiError = z.infer<typeof ApiErrorSchema>;

export class ApiRequestError extends Error {
  data: ApiError;
  constructor(data: ApiError) {
    super(data.message);
    this.name = "ApiRequestError";
    this.data = data;
  }
}

async function request<T>(
  url: string,
  options: RequestInit,
  schema: z.ZodSchema<T>,
): Promise<T> {
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  const res = await fetch(`${baseUrl}${url}`, options);

  if (!res.ok) {
    let errorData: ApiError;
    try {
      const rawError = await res.json();
      errorData = ApiErrorSchema.parse(rawError);
    } catch {
      errorData = {
        code: "UNKNOWN_ERROR",
        message: `서버 오류가 발생했습니다. (Status: ${res.status})`,
        status: res.status,
        details: null,
      };
    }
    throw new ApiRequestError(errorData);
  }

  if (res.status === 204) return {} as T;

  const data = await res.json();
  return schema.parse(data);
}

const createRequestOptions = (
  method: string,
  body?: unknown,
  options?: RequestInit,
): RequestInit => ({
  ...options,
  method,
  headers: {
    ...(body ? { "Content-Type": "application/json" } : {}),
    ...options?.headers,
  },
  ...(body ? { body: JSON.stringify(body) } : {}),
});

export const Api = {
  get: <T>(url: string, schema: z.ZodSchema<T>, options?: RequestInit) =>
    request<T>(url, { ...options, method: "GET" }, schema),

  post: <T>(
    url: string,
    schema: z.ZodSchema<T>,
    body?: unknown,
    options?: RequestInit,
  ) => request<T>(url, createRequestOptions("POST", body, options), schema),

  put: <T>(
    url: string,
    schema: z.ZodSchema<T>,
    body?: unknown,
    options?: RequestInit,
  ) => request<T>(url, createRequestOptions("PUT", body, options), schema),

  patch: <T>(
    url: string,
    schema: z.ZodSchema<T>,
    body?: unknown,
    options?: RequestInit,
  ) => request<T>(url, createRequestOptions("PATCH", body, options), schema),

  delete: <T>(url: string, schema: z.ZodSchema<T>, options?: RequestInit) =>
    request<T>(url, { ...options, method: "DELETE" }, schema),
};
