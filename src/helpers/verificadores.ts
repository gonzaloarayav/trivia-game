export function similarity(a: string, b: string) {
  const longer = a.length > b.length ? a : b;
  const shorter = a.length > b.length ? b : a;
  const longerLength = longer.length;
  if (longerLength === 0) return 1.0;
  const editDistance = levenshtein(longer, shorter);
  return (longerLength - editDistance) / longerLength;
}

export function levenshtein(a: string, b: string): number {
  const matrix = Array.from({ length: a.length + 1 }, (_, i) => Array(b.length + 1).fill(0));
  for (let i = 0; i <= a.length; i++) matrix[i][0] = i;
  for (let j = 0; j <= b.length; j++) matrix[0][j] = j;

  for (let i = 1; i <= a.length; i++) {
    for (let j = 1; j <= b.length; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      matrix[i][j] = Math.min(
        matrix[i - 1][j] + 1,         // eliminación
        matrix[i][j - 1] + 1,         // inserción
        matrix[i - 1][j - 1] + cost   // sustitución
      );
    }
  }
  return matrix[a.length][b.length];
}
