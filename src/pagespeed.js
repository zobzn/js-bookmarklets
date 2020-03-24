((l) => {
  l.href =
    "https://developers.google.com/speed/pagespeed/insights/?url=" +
    encodeURIComponent(l.protocol + "//" + l.host + l.pathname + l.search);
})(location);
