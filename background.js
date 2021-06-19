console.log("background running")

// const firebase = require("firebase")

const firebaseConfig = {
    apiKey: "AIzaSyBPsxe57TCAqmhOAK95i_F3t0YkhyPXitQ",
    authDomain: "butcherbox-scraper.firebaseapp.com",
    projectId: "butcherbox-scraper",
    storageBucket: "butcherbox-scraper.appspot.com",
    messagingSenderId: "775652181812",
    appId: "1:775652181812:web:3a0893f62421e085ca0761",
    measurementId: "G-R64JQ27X4K"
};

firebase.initializeApp(firebaseConfig);

let database = firebase.database()
let ref = database.ref('products')

let outsideDataArray = []
let activePriceObject = {}
let inActivePriceObject = {}
ref.on('value', (snapshot) => {
    outsideData = snapshot.val()
        //this just pushes out everything, but what if we want to selectively push out data for use in comparison later? Lets create 2 objects with names and pricesm one for active: true, and one for active: false 
        //be ready to remove this
    outsideDataArray.push(outsideData)
        //remove above

    for (let key in outsideData) {
        // console.log("outside.key")
        // console.log(outsideData[key].active)

        if (outsideData[key].active) {
            activePriceObject[outsideData[key].name] = outsideData[key].fullPrice
        } else {
            inActivePriceObject[outsideData[key].name] = outsideData[key].fullPrice

        }

    }

})
console.log("active")
console.log(activePriceObject)
console.log("inactive")
console.log(inActivePriceObject)

// console.log("outsidedataArray")
// console.log(outsideDataArray)
// console.log("array 0")
// console.log(outsideDataArray[0])


// Add a listener for the browser action
chrome.browserAction.onClicked.addListener(buttonClicked);

function buttonClicked(tab) {
    let messageObj = {
        active: activePriceObject,
        inactive: inActivePriceObject
    }

    // chrome.tabs.sendMessage(tab.id, outsideDataArray[0]);
    chrome.tabs.sendMessage(tab.id, messageObj);


}