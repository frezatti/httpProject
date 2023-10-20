function normalizeUrl(urlstring) {
  const url = new URL(urlstring);
  const hostpath = `${url.hostname}${url.pathname}`
  if (hostpath.length >= 0 & hostpath.slice(-1) === "/") {
    return hostpath.slice(0, -1);
  }
  return hostpath
};

module.exports = {
  normalizeUrl
}
