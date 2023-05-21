export function buildQueryParams(
  obj: Record<string, any>,
  parentKey?: string
): string[] {
  let params: string[] = [];

  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      const value = obj[key];
      const paramKey = parentKey ? `${parentKey}[${key}]` : key;

      if (typeof value === "object" && !Array.isArray(value)) {
        const nestedParams = buildQueryParams(value, paramKey);
        params = [...params, ...nestedParams];
      } else {
        params.push(
          `${encodeURIComponent(paramKey)}=${encodeURIComponent(value)}`
        );
      }
    }
  }

  return params;
}
