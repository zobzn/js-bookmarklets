// [x] jest
// [ ] eslint
// [ ] picture > source[srcset]
// [ ] img[srcset]
// [x] url() in stylesheets

import getUrlsFromDocumentStylesheets from "./lib/get-urls-from-document-stylesheets";

const imagesQueue = new Set();
const imagesSuccess = new Set();
const imagesFail = new Set();
const minWidth = 10;
const minHeight = 10;
const previewWidth = 200;
const previewHeight = 200;
const imageExtensionsRegExp = /(?:image\/|\.)(gif|jpg|jpeg|png|webp|tiff|svg|ico|cur)(?:\?|\#|$)/i;

const getImageExtension = (src) => {
  const ext = src.match(imageExtensionsRegExp);
  return ext ? ext[1] : null;
};

const suggestFilename = (src) => {
  return src
    .split(/\?|#/)
    .shift()
    .replace(/^\/+|\/+$/, "")
    .split("/")
    .pop();
};

const sortBySizeDesc = (a, b) => {
  if (a.width > b.width) {
    return -1;
  } else if (a.width < b.width) {
    return 1;
  } else if (a.height > b.height) {
    return -1;
  } else if (a.height < b.height) {
    return 1;
  } else {
    return 0;
  }
};

const styles = `
    body {
      background: #fafafa;
    }

    .item {
        font: 12px/18px Arias, sans-serif;
        width: ${previewWidth}px;
        display: inline-block;
        margin: 10px;
    }

    .item a {
        height: ${previewHeight}px;
        width: ${previewWidth}px;
        justify-content: center;
        align-items: center;
        text-align: center;
        display: flex;
    }

    .item img {
        max-height: ${previewHeight}px;
        max-width: ${previewWidth}px;
        object-fit: contain;
        height: "auto";
        width: "auto";
        border: none;
    }

    .item__name {
        text-overflow: ellipsis;
        box-sizing: border-box;
        white-space: nowrap;
        text-align: center;
        overflow: hidden;
        color: #797979;
        padding: 2px;
        width: 100%;
        margin: 0;
    }

    .item__size {
        box-sizing: border-box;
        text-align: center;
        color: #797979;
        padding: 2px;
        margin: 0;
    }
  `;

const render = () => {
  const items = [...imagesSuccess.values()]
    .filter(({ width, height }) => width >= minWidth && height >= minHeight)
    .sort(sortBySizeDesc)
    .map(({ src, width, height }) => {
      const ext = getImageExtension(src);
      const fileName = suggestFilename(src);

      const sizeAndExt = width + "x" + height + (ext ? ", " + ext : "");

      return `
            <div class="item" title="${fileName}">
                <a target="_top" href="${src}">
                    <img src="${src}" alt="" />
                </a>
                <div class="item__name">${fileName}</div>
                <div class="item__size">${sizeAndExt}</div>
            </div>
        `;
    });

  const html = []
    .concat([`<!doctype html>`])
    .concat([`<style>${styles}</style>`])
    .concat(items)
    .join("\n");

  document.open();
  document.write(html);
  document.close();
};

const onError = function () {
  const { src } = this;

  imagesFail.add({ src });

  if (imagesFail.size + imagesSuccess.size) {
    setTimeout(render, 0);
  }
};

const onLoad = function () {
  const { src, naturalWidth: width, naturalHeight: height } = this;

  imagesSuccess.add({ src, width, height });

  if (imagesFail.size + imagesSuccess.size) {
    setTimeout(render, 0);
  }
};

const doDownload = (src) => {
  const link = document.createElement("a");
  link.download = "";
  link.href = src;
  link.click();
};

const enqueue = (src) => {
  if (location.href == src) {
    doDownload(src);
  } else if (!imagesQueue.has(src)) {
    imagesQueue.add(src);
    const img = new Image();
    img.onerror = onError;
    img.onload = onLoad;
    img.src = src;
  }
};

[...document.querySelectorAll("img[src]")].forEach((element) => {
  enqueue(element.getAttribute("src"));
});

[...document.querySelectorAll('[style*="url("]')].forEach((element) => {
  const style = element.getAttribute("style");
  const match = style.match(/url\(['"]([^)]+)['"]\)/);
  match && enqueue(match[1]);
});

[...document.querySelectorAll("a[href]")].forEach((element) => {
  const href = element.getAttribute("href");
  const ext = getImageExtension(href);
  ext && enqueue(href);
});

getUrlsFromDocumentStylesheets(document).forEach((url) => {
  console.log(url);
  const ext = getImageExtension(url);
  ext && enqueue(url);
});
