function matchPath(url: string, path: string, route?: React.ReactElement) {
  const urlSegments = url.split("/").filter((segment) => segment !== "");
  const pathSegments = path.split("/").filter((segment) => segment !== "");
  if (route?.props?.children) {
    for (let i = 0; i < pathSegments.length; i++) {
      const pathSegment = pathSegments[i];
      const urlSegment = urlSegments[i];
      if (pathSegment.startsWith(":")) {
        continue;
      }
      if (pathSegment !== urlSegment) {
        return false;
      }
    }
    return true;
  }
  if (urlSegments.length !== pathSegments.length) return false;
  // console.log(pathSegments, urlSegments);
  for (let i = 0; i < pathSegments.length; i++) {
    const pathSegment = pathSegments[i];
    const urlSegment = urlSegments[i];
    if (pathSegment.startsWith(":")) {
      continue;
    }
    if (pathSegment !== urlSegment) {
      return false;
    }
  }
  return true;
}

export default matchPath;
