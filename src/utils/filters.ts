export function includesKeyword(value: string, keyword: string) {
  const normalizedKeyword = keyword.trim().toLowerCase();

  if (!normalizedKeyword) {
    return true;
  }

  return value.toLowerCase().includes(normalizedKeyword);
}