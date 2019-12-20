import "isomorphic-fetch";

function xhrresponseheader(surl) {
  var xhr = new XMLHttpRequest();
  xhr.open("HEAD", surl);
  //xhr.withCredentials = false;
  xhr.onreadystatechange = function() {
    if (xhr.readyState === 4) {
      contenttype = xhr.getResponseHeader("Content-Type");
      console.log("Content Type (XHR): ", contenttype);
    }
  };
  xhr.send();
}

async function fetchresponseheader(surl) {
  try {
    const response = await fetch(surl, { method: "HEAD" });
    return response.headers.get("content-type");
  } catch (e) {
    return null;
  }
}

export default url => {
  return fetchresponseheader(url);
};
