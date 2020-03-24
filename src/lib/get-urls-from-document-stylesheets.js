const re = /url\(['"]?([^'")]+)['"]?\)/g;

const getUrlsFromStyleSheet = (sheet) => {
  let base = sheet.href;
  let result = [];
  let rules = [];

  try {
    rules = [...(sheet.rules || sheet.cssRules)];
  } catch (e) {}

  rules.forEach((rule) => {
    const css = rule.cssText;
    const urls = [...css.matchAll(re)].map((i) => "" + new URL(i[1], base));
    result = result.concat(urls);
  });

  return [...new Set(result)];
};

export default (document) => {
  let result = [];

  [...(document.styleSheets || [])].forEach((sheet) => {
    result = result.concat(getUrlsFromStyleSheet(sheet));
  });

  return [...new Set(result)];
};
