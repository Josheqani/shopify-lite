/**
 * Format an integer amount of Toman as a Persian price string,
 * e.g. 4900000 -> "۴٬۹۰۰٬۰۰۰ تومان". Toman has no subunit in everyday use,
 * so the stored integer is treated as whole Toman.
 */
export function formatPrice(toman: number): string {
  return `${new Intl.NumberFormat("fa-IR").format(toman)} تومان`;
}
