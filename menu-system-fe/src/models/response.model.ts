export type ApiResponse<T = undefined> =
  | {
      ok: false;
      message: string;
    }
  | { ok: true; data: T };
