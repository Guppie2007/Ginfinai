/** Lijst uit vertalingen halen; lege lijst als de namespace (nog) niet geladen is, bv. op de 404-pagina. */
export function asArray<T>(value: unknown): T[] {
  return Array.isArray(value) ? (value as T[]) : []
}
