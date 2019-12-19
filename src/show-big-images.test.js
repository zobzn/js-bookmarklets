function getUrlsFromCss(css) {
  const re = /url\(['"]?([^'")]+)['"]?\)/g;

  return [...css.matchAll(re)].map(i => i[1]);
}

const css = `
  @font-face {
    font-family: "myfont";
    src: url("fonts/awesome-font.woff") format('woff');
  }
  .some-selector {
    background: url('some.jpg'), url(other.jpg), url("third.gif");
  }
`;

it("works", () => {
  const urls = getUrlsFromCss(css);

  expect(urls).toEqual([
    "fonts/awesome-font.woff",
    "some.jpg",
    "other.jpg",
    "third.gif"
  ]);
});
