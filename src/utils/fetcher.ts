export const fetcher = <T>(url: string) =>
  fetch(url).then((r) => r.json() as T);
