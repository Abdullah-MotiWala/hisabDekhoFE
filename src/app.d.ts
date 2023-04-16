export interface API_INTERFACE {
  isSecure: boolean;
  method: string;
  url: string;
  body?: Object;
  query?: string;
}
