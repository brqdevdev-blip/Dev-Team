export function formatBalance(value: number | string): string {
  const n = Math.round(Number(value) || 0);
  return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
}

/** "0612345678" or "06 12 34 56 78" -> "06 12 34 56 78" (pairs) */
export function formatPhone(phone: string): string {
  const digits = String(phone).replace(/\D/g, '');
  if (!digits) return String(phone);
  return digits.match(/.{1,2}/g)?.join(' ') ?? digits;
}