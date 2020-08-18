export class BaseRequest {
  constructor() {
    this.headers.set("Accept", "application/json");
    this.headers.set("Content-type", "application/json");
  }
  public static handleError = (error: Error) => {
    throw error;
  };

  public headers: Headers = new Headers();
  protected baseUrl = "/api/";

  public async fetch(url: string, config?: Record<string, unknown>): Promise<Response> {
    const res = await fetch(this.baseUrl + url, { headers: this.headers, ...config });
    if (!res.status || res.status < 200 || res.status >= 300) throw res;
    return res;
  }
}
