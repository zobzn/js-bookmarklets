import getUrlsFromDocumentStylesheets from "./get-urls-from-document-stylesheets";

const fakeDocument = {
  styleSheets: [
    {
      href: "https://examplex.com/assets/app.css",
      rules: [
        {
          cssText: `@font-face { font-family: "myfont"; src: url("fonts/awesome-font.woff") format('woff'); }`
        }
      ]
    },
    {
      href: "https://examplex.com/assets/app.css",
      rules: [
        {
          cssText: ".selector { background: url(some.jpg); }"
        }
      ]
    },
    {
      href: "https://examplex.com/assets/app.css",
      rules: [
        {
          cssText: ".other { color: green; }"
        },
        {
          cssText: ".cursor { cursor: url('cursor.cur'); }"
        },
        {
          cssText: `.some-selector { background: url('/some.jpg'), url(other.jpg), url("https://aws.amazon.com/favicon.ico"); }`
        }
      ]
    }
  ]
};

it("works", () => {
  expect(getUrlsFromDocumentStylesheets(fakeDocument)).toEqual([
    "https://examplex.com/assets/fonts/awesome-font.woff",
    "https://examplex.com/assets/some.jpg",
    "https://examplex.com/assets/cursor.cur",
    "https://examplex.com/some.jpg",
    "https://examplex.com/assets/other.jpg",
    "https://aws.amazon.com/favicon.ico"
  ]);
});
