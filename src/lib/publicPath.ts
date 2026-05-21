/** Encode each path segment for use in img/src and links (spaces, +, parentheses). */
export function publicAssetPath(path: string): string {
  if (!path) return path;
  const segments = path.split('/').filter(Boolean);
  return (
    '/' +
    segments
      .map((s) =>
        encodeURIComponent(s)
          // Keep + literal for folder names like S+P+11E.
          .replace(/%2B/gi, '+')
      )
      .join('/')
  );
}
