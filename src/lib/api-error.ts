/** Error body shape used by every eygn-api error response. */
export interface ApiErrorBody {
  error: string;
  message?: string;
  fieldErrors?: Record<string, string[]>;
}

/** Thrown by the API client for any non-2xx response. Mirrors eygn-api's `{ error, message, fieldErrors }` shape. */
export class ApiRequestError extends Error {
  readonly status: number;
  readonly code: string;
  readonly fieldErrors?: Record<string, string[]>;

  constructor(status: number, body: ApiErrorBody) {
    super(body.message ?? body.error);
    this.name = 'ApiRequestError';
    this.status = status;
    this.code = body.error;
    this.fieldErrors = body.fieldErrors;
  }

  /** First message for a given field, if the API reported a validation error on it. */
  fieldError(field: string): string | undefined {
    return this.fieldErrors?.[field]?.[0];
  }
}
