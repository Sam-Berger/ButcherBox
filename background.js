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

// let outsideDataArray = []
let activePriceObject = {}
let inActivePriceObject = {}
ref.on('value', (snapshot) => {
    outsideData = snapshot.val()

    for (let key in outsideData) {
        if (outsideData[key].active) {
            // activePriceObject[outsideData[key].noWhiteSpaceName] = outsideData[key].fullPrice

            activePriceObject[outsideData[key].noWhiteSpaceName] = {
                fullPrice: outsideData[key].fullPrice,
                weight: outsideData[key].weight,
                weightType: outsideData[key].weightType
            }
        } else {
            inActivePriceObject[outsideData[key].noWhiteSpaceName] = {
                fullPrice: outsideData[key].fullPrice,
                weight: outsideData[key].weight,
                weightType: outsideData[key].weightType
            }
        }
    }
})

console.log("end")
console.log(activePriceObject)
    // Add a listener for the browser action
chrome.browserAction.onClicked.addListener(buttonClicked);

function buttonClicked(tab) {
    let messageObj = {
        active: activePriceObject,
        inactive: inActivePriceObject
    }
    chrome.tabs.sendMessage(tab.id, messageObj);


}