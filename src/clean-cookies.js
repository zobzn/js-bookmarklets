let src = document.cookie;
let cookies = document.cookie
  .split(/;\s*/)
  .map(c => decodeURIComponent(c.replace(/=.*/, "").trim()))
  .filter(c => c != "");
let parts_host = window.location.hostname.split(".");
let parts_path = location.pathname.split("/");
let del = (n, d, p = "") => {
  let k = encodeURIComponent(n);
  let e = new Date().toUTCString();
  let s = `${k}=0; expires=${e}; domain=${d}; path=${p}`;
  console.log((document.cookie = s + "; secure"));
  console.log((document.cookie = s));
};

cookies.forEach(c => {
  let d = [].concat(parts_host);

  while (d.length > 0) {
    let p = [].concat(parts_path);

    while (p.length > 0) {
      del(c, "." + d.join("."), (p.join("/") + "/").replace("//", "/"));
      del(c, "." + d.join("."), p.join("/"));
      del(c, d.join("."), (p.join("/") + "/").replace("//", "/"));
      del(c, d.join("."), p.join("/"));
      p.pop();
    }

    d.shift();
  }
});

console.log("src: " + src);
console.log("res: " + document.cookie);
