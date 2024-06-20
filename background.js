chrome.runtime.onMessage.addListener(function(message) {
    chrome.browserAction.setPopup({popup: "popup.html"});
});
