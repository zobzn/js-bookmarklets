((l) => {
  l.href =
    "https://whois.netlify.com/.netlify/functions/whois?q=" +
    encodeURIComponent(l.hostname);
})(location);
