export interface Api<T> {
  success: boolean;
  errorMessage: string;
  data: T;
}
