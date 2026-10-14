/**
 * Formats a number to Vietnamese Dong currency string
 * e.g. 1300000 -> "1.300.000 ₫"
 */
export function formatCurrency(amount: number | undefined | null): string {
  if (amount === undefined || amount === null || isNaN(amount)) return '0 ₫';
  return new Intl.NumberFormat('vi-VN').format(amount) + ' ₫';
}

/**
 * Formats an integer or float with dot separators
 */
export function formatNumber(val: number | undefined | null): string {
  if (val === undefined || val === null || isNaN(val)) return '0';
  return new Intl.NumberFormat('vi-VN').format(val);
}

/**
 * Masks phone number for privacy display
 * e.g. "0912345678" -> "0912 *** 678"
 */
export function maskPhone(phone: string): string {
  if (!phone || phone.length < 9) return phone;
  const clean = phone.replace(/\s+/g, '');
  return `${clean.slice(0, 4)} *** ${clean.slice(-3)}`;
}

/**
 * Spaces phone number cleanly
 * e.g. "0912345678" -> "0912 345 678"
 */
export function formatPhone(phone: string): string {
  if (!phone) return '';
  const clean = phone.replace(/\D/g, '');
  if (clean.length === 10) {
    return `${clean.slice(0, 4)} ${clean.slice(4, 7)} ${clean.slice(7)}`;
  }
  return phone;
}

/**
 * Masks national ID number
 * e.g. "001201008921" -> "0012 0100 ****"
 */
export function maskIdNumber(idNumber: string): string {
  if (!idNumber) return '';
  const clean = idNumber.replace(/\s+/g, '');
  if (clean.length === 12) {
    return `${clean.slice(0, 4)} ${clean.slice(4, 8)} ****`;
  }
  return idNumber;
}

/**
 * Spaces 12-digit national ID
 * e.g. "001201008921" -> "0012 0100 8921"
 */
export function formatIdNumber(idNumber: string): string {
  if (!idNumber) return '';
  const clean = idNumber.replace(/\s+/g, '');
  if (clean.length === 12) {
    return `${clean.slice(0, 4)} ${clean.slice(4, 8)} ${clean.slice(8)}`;
  }
  return idNumber;
}

/**
 * Formats seconds into HH : mm : ss for countdowns
 */
export function formatCountdown(totalSeconds: number): string {
  if (totalSeconds <= 0) return '00 : 00 : 00';
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  return `${String(hours).padStart(2, '0')} : ${String(minutes).padStart(2, '0')} : ${String(seconds).padStart(2, '0')}`;
}
