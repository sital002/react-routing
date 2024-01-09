function matchPath(url: string, path: string) {
  const urlSegments = url.split("/").filter((segment) => segment !== "");
  const pathSegments = path.split("/").filter((segment) => segment !== "");

  if (urlSegments.length !== pathSegments.length) {
    return false;
  }

  for (let i = 0; i < pathSegments.length; i++) {
    const pathSegment = pathSegments[i];
    const urlSegment = urlSegments[i];

    if (pathSegment.startsWith(":")) {
      // If the path segment is a parameter, continue to the next iteration
      continue;
    }

    if (pathSegment !== urlSegment) {
      // If the non-parameter segments don't match, return false
      return false;
    }
  }

  // All segments match or are parameters
  return true;
}
