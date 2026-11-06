import type { InfiniteData } from '@tanstack/react-query'

interface ItemsPage<T> {
  items: T[]
}

/** Maps every item of every page (patch one item wherever it is). */
export const mapInfiniteItems = <T, P extends ItemsPage<T>>(data: InfiniteData<P> | undefined, map: (item: T) => T) =>
  data ? { ...data, pages: data.pages.map((page) => ({ ...page, items: page.items.map(map) })) } : data

/** Adds an item at the front of the first page unless an item with the same key is already cached. */
export const prependInfiniteItem = <T, P extends ItemsPage<T>>(
  data: InfiniteData<P> | undefined,
  item: T,
  keyOf: (item: T) => string
) => {
  if (!data || data.pages.length === 0) return data
  const exists = data.pages.some((page) => page.items.some((candidate) => keyOf(candidate) === keyOf(item)))
  if (exists) return mapInfiniteItems(data, (candidate: T) => (keyOf(candidate) === keyOf(item) ? item : candidate))
  const [first, ...rest] = data.pages
  return { ...data, pages: [{ ...first, items: [item, ...first.items] }, ...rest] }
}

/** Removes matching items from every page. */
export const removeInfiniteItems = <T, P extends ItemsPage<T>>(data: InfiniteData<P> | undefined, isMatch: (item: T) => boolean) =>
  data ? { ...data, pages: data.pages.map((page) => ({ ...page, items: page.items.filter((item) => !isMatch(item)) })) } : data
