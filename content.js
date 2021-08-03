replaceText(document.body);

let observer = new MutationObserver(mutations => {
  for (let mutation of mutations) {
    for (let addedNode of mutation.addedNodes) {
      replaceText(addedNode);
    }
  }
});

observer.observe(document, { childList: true, subtree: true });

function replaceText(element) {
  if (element.hasChildNodes()) {
    if (element.nodeType == Element.ELEMENT_NODE && element.nodeName === "A") {
      if (element.href.match("https://.*facebook.com/coronavirus_info") && element.parentElement) {
        element.parentElement.parentElement.parentElement.remove();
      }
    } else {
      element.childNodes.forEach(replaceText);
    }
  } else if (element.nodeType === Text.TEXT_NODE) {
    element.textContent = element.textContent.replace(/covid/gi, "■■■■");
    element.textContent = element.textContent.replace(/-19/gi, "■■■■");

    if (element.textContent.match("Visit the .* Information Center") &&
        element.parentElement &&
        element.parentElement.nodeName !== "SCRIPT") {
      console.log(element.parentElement);
      element.parentElement.parentElement.parentElement.parentElement.parentElement.remove();
    }

    if (element.textContent.match(/coronavirus/gi)) {
      element.parentElement.remove();
    }
  }
}

chrome.runtime.onMessage.addListener(
  function (request, sender, sendResponse) {
    if (request.message === "clicked_browser_action") {
      alert("receive message");
      var firstHref = $("a[href^='http']").eq(0).attr("href");

      console.log(firstHref);
    }
  }
);
