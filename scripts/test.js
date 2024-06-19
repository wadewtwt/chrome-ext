chrome.runtime.sendMessage({ type: "checkFlag" }, (response) => {
    if (response && response.hasOwnProperty("runtime")) {
        if (response.runtime) {

            document.getElementById("su").style.color="red";

        }
    }
});
