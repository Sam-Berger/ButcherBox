// Listen for messages
chrome.runtime.onMessage.addListener(gotMessage);

// let prices
// let nonActivePrices
// Callback for when a message is received
function gotMessage(message, sender, sendResponse) {

    var elts = document.getElementsByTagName('p');
    for (var i = 0; i < elts.length; i++) {
        elts[i].style['background-color'] = '#F0C';

    }

    console.log(message.active)
    console.log(message.inactive)
        // prices = message.active
        // nonActivePrices = message.inactive

    //AddOns
    addPricePerUnit("css-orvfwm", "css-13rzl1b", "css-1jiogkd", "css-1jiogkd")

    //Deals (Most)
    addPricePerUnit("css-1swbghd", "css-51ry97", "css-t6djce", "css-t6djce")

    //Big Deal Cards on /deals
    addPricePerUnit("css-stah3p", "css-51ry97", "css-a0bgxe", "css-a0bgxe")

    // fillPriceMap("css-orvfwm", "css-13rzl1b", "css-1jiogkd", "css-1s1lv4r")
    // console.log(fillPriceMap("css-orvfwm", "css-13rzl1b", "css-1jiogkd", "css-1s1lv4r"))

    // fillPriceMap("css-1swbghd", "css-51ry97", "css-t6djce", "css-1g1weue")
    // console.log(fillPriceMap("css-1swbghd", "css-51ry97", "css-t6djce", "css-1g1weue"))

    // populateDataTable("css-orvfwm", "css-13rzl1b", "css-1jiogkd", "css-1s1lv4r")

    // populateDataTable("css-1swbghd", "css-51ry97", "css-t6djce", "css-1g1weue")

    determineBoxItemValue();
}

function addPricePerUnit(parentClass, amountClass, priceClass, newElementPlacementTagName) {

    let products = document.getElementsByClassName(parentClass);
    for (let i = 0; i < products.length; i++) {

        if (products[i].getElementsByClassName(amountClass).length > 0 && products[i].getElementsByClassName(priceClass).length > 0) {

            let amountString = products[i].getElementsByClassName(amountClass)[0].textContent;

            let priceString = products[i].getElementsByClassName(priceClass)[0].textContent;


            //add element and code
            let newElement = document.createElement("h1");

            //TODO: what if NaN or undefined?
            // let pricePerLb = "$" + calculateUnitPrice(priceString, amountString) + "/lb"
            // console.log("Per $ to Go to price object: " + calculateUnitPrice(priceString, amountString))
            // newElement.innerHTML = pricePerLb
            // newElement.style.color = "blue"
            // products[i].getElementsByClassName(newElementPlacementTagName)[0].appendChild(newElement);


            let newElement1 = document.createElement("h1");

            //TODO: not working for deals. It calculates it but does not display it
            //TODO: what if NaN or undefined?
            if (isNaN(calculateUnitPrice(priceString, amountString))) {
                let display = "problems with calculation"
                newElement1.innerHTML = display
                newElement1.className = priceClass
                newElement1.style.color = "green"
                products[i].appendChild(newElement1);
            } else {
                let pricePerLb1 = "$" + calculateUnitPrice(priceString, amountString) + "/lb"
                newElement1.innerHTML = pricePerLb1
                newElement1.className = priceClass
                newElement1.style.color = "green"
                products[i].appendChild(newElement1);
            }


        }
    }
}



// function populateDataTable(parentClass, amountClass, priceClass, nameClass) {
//     //repeats of first half of addPriceperUnit
//     let allProductInfo = []
//     let productInfo
//     console.log("Start of PopulateDataTable")

//     let products = document.getElementsByClassName(parentClass);
//     for (let i = 0; i < products.length; i++) {
//         if (products[i].getElementsByClassName(nameClass).length > 0 && products[i].getElementsByClassName(priceClass).length > 0) {

//             productInfo = {}
//             let productName = products[i].getElementsByClassName(nameClass)[0].textContent;
//             let amountString = products[i].getElementsByClassName(amountClass)[0].textContent;
//             let priceString = products[i].getElementsByClassName(priceClass)[0].textContent;

//             productInfo["name"] = productName
//             productInfo["priceString"] = priceString
//             productInfo["fullPrice"] = calculatePrice(priceString)
//             productInfo["amountString"] = amountString
//             productInfo.weight = calculateAmount(amountString).weight
//             productInfo.weightType = calculateAmount(amountString).weightType
//             productInfo.dateAdded = new Date().toISOString().slice(0, 10)

//             console.log(productInfo)
//             allProductInfo.push(productInfo)
//         }
//     }
//     console.log(allProductInfo)
//     return allProductInfo
// }


//give feedback on if stuff in the box is worth it
//TODO: when populating list, add "s" to chicken breast, remove "ButcherBox" from burgers, also remove all middle space and trim
let prices = {
    "Boneless Skinless Breast": 24,
    "Boneless Skinless Breasts": 24,
    "Boneless Pork Chops": 14,
    "Breakfast Sausage": 9,
    "Wild Alaskan Sockeye Salmon": 25,
    "ButcherBox Bacon": 7,
    "Ground Beef (85/15)": 15,
    "Ribeyes": 25,
    "NY Strip Steaks": 22,
    "Ground Turkey": 14,
    "Uncured Hot Dog": 7,
    "ButcherBox Burgers": 16,
    "Bacon 3 Pack": 18,
    "Scallops": 24,
    "Flank Steak": 19.5,
    "Cooked Spare Rib": 12,
    "Tri Tip": 15,
    "Chicken Breast Bundle ": 64,
    "Hot Dog Bundle": 19,
    "Baby Back Ribs": 16,
    "Thick Cut Ribeye": 24,
    "Ground Beef Blast": 60,
    "Tenderloin Tips": 16,
    "ButcherBox Burgers": 16,
    "Cold Cracked Lobster": 17,
    "Chicken Wings": 14,
    "Sirloin Tips": 15,
    "Thick Cut NY Strip": 24,
    "Ground Bison": 13,
    "Pulled Pork": 7,
    "Wild Alaskan Sockeye Salmon": 25
}

let nonActivePrices = {
    "Chuck Roast": 19,
    "Pork Tenderloin": 13.71
}

//green means its worth it, red means you can buy it as a deal or an addon, yellow means we have no history on if you can buy it elsewhere for cheaper, and pink means it is better to buy as an add on when it is available
function determineBoxItemValue() {

    let comparePrice
        //Determines whether we are paying $149 for 6 items or a better value of $270 for 12 items
    let checked = document.getElementsByClassName("css-xgsddu")
    if (checked[0].getElementsByClassName("css-hjiplg")[0].getAttribute("data-name") == "radioSmallChecked") {
        comparePrice = 22.5
    } else {
        comparePrice = 24.83
    }


    let products = document.getElementsByClassName("css-s66rfc")
    for (let i = 0; i < products.length; i++) {
        let productName = products[i].getElementsByClassName("css-16oe755")[0].textContent
        if (prices[productName] > comparePrice) {
            products[i].style['background-color'] = 'green';
        }
        if (prices[productName] <= comparePrice) {
            products[i].style['background-color'] = 'red';
        }
        if (prices[productName] == undefined) {
            if (nonActivePrices[productName] <= comparePrice) {
                products[i].style['background-color'] = 'pink';
            } else {
                products[i].style['background-color'] = 'yellow';
            }
        }

    }
}