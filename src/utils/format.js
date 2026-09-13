export function formatBalance(value) {
  const n = Math.round(Number(value) || 0);
  return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
}