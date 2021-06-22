// Listen for messages
chrome.runtime.onMessage.addListener(gotMessage);

// Callback for when a message is received
function gotMessage(message, sender, sendResponse) {

    // var elts = document.getElementsByTagName('p');
    // for (var i = 0; i < elts.length; i++) {
    //     elts[i].style['background-color'] = '#F0C';
    // }

    console.log(message.active)
    console.log(message.inactive)
    let activePriceObj = message.active
    let nonActivePriceObj = message.inactive

    //AddOns
    addPricePerUnit("css-orvfwm", "css-13rzl1b", "css-1jiogkd", "css-1jiogkd")

    //Deals (Most)
    addPricePerUnit("css-1swbghd", "css-51ry97", "css-t6djce", "css-t6djce")

    //Big Deal Cards on /deals
    addPricePerUnit("css-stah3p", "css-51ry97", "css-a0bgxe", "css-a0bgxe")

    determineBoxItemValue(activePriceObj, nonActivePriceObj);
}

function addPricePerUnit(parentClass, amountClass, priceClass, newElementPlacementTagName) {

    let products = document.getElementsByClassName(parentClass);
    for (let i = 0; i < products.length; i++) {

        if (products[i].getElementsByClassName(amountClass).length > 0 && products[i].getElementsByClassName(priceClass).length > 0) {

            let amountString = products[i].getElementsByClassName(amountClass)[0].textContent;
            let priceString = products[i].getElementsByClassName(priceClass)[0].textContent;

            //add element and code
            let newElement1 = document.createElement("h1");

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


//green means its worth it, red means you can buy it as a deal or an addon, yellow means we have no history on if you can buy it elsewhere for cheaper, and pink means it is better to buy as an add on when it is available
function determineBoxItemValue(prices, nonActivePrices) {

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
        let productName = products[i].getElementsByClassName("css-16oe755")[0].textContent.replace(/\s+/g, '')
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