console.log("background running")

// Add a listener for the browser action
chrome.browserAction.onClicked.addListener(buttonClicked);

function buttonClicked(tab) {
    let i = 1
    console.log(i);

    // console.log(tab)
    // var msg = {
    //     txt: "user clicked!"
    // }
    let msg = {
        txt: "hello"
    }
    console.log(msg.txt);
    chrome.tabs.sendMessage(tab.id, msg);
}