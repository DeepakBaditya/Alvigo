export function toKebabCase(str: string): string {
  return str.toLowerCase().replace(/\s+/g, "-");
}
