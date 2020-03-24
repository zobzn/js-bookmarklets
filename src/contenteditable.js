(function (d, x, y) {
  d[x] = d[x] == "false";
  d[y] = !d[x];
})(document.documentElement, "contentEditable", "spellcheck");
