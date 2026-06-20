// Format a toman amount with Persian digits and grouping, e.g. "۱۲۵٬۰۰۰ تومان".
export function formatToman(amount: number): string {
  return `${amount.toLocaleString("fa-IR")} تومان`
}

// Format a plain number with Persian digits, e.g. cart counts.
export function formatNumber(value: number): string {
  return value.toLocaleString("fa-IR")
}
