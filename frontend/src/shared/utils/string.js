// shared/utils/string.js

/**
 * Normalize a string for searching: lowercase, remove Vietnamese accents, trim spaces
 */
export function normalizeString(str) {
  if (!str) return '';
  return str
    .toLowerCase()
    .trim()
    .normalize('NFD') // decompose accents
    .replace(/[\u0300-\u036f]/g, '') // remove accent marks
    .replace(/đ/g, 'd') // special for Vietnamese đ
    .replace(/Đ/g, 'D');
}