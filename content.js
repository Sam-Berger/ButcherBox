// Listen for messages
chrome.runtime.onMessage.addListener(gotMessage);

// Callback for when a message is received
function gotMessage(message, sender, sendResponse) {

    let activePriceObj = message.active
    let nonActivePriceObj = message.inactive

    //AddOns
    addPricePerUnit("css-orvfwm", "css-1s1lv4r", "css-13rzl1b", "css-1jiogkd", activePriceObj)

    //Deals (Most)
    addPricePerUnit("css-1swbghd", "css-1g1weue", "css-51ry97", "css-t6djce", activePriceObj)

    //Big Deal Cards on /deals
    addPricePerUnit("css-stah3p", "css-1g1weue", "css-51ry97", "css-a0bgxe", activePriceObj)

    determineBoxItemValue(activePriceObj, nonActivePriceObj);

    addLegendToHeader();
}

function addPricePerUnit(parentClass, nameClass, amountClass, priceClass, prices) {

    let products = document.getElementsByClassName(parentClass);
    for (let i = 0; i < products.length; i++) {

        if (products[i].getElementsByClassName(amountClass).length > 0 && products[i].getElementsByClassName(priceClass).length > 0) {

            let productName = products[i].getElementsByClassName(nameClass)[0].textContent.replace(/\s+/g, '')
            let amountString
            let priceString = products[i].getElementsByClassName(priceClass)[0].textContent;

            //From Database
            if (prices[productName]) {
                amountString = prices[productName].weight + prices[productName].weightType
            }
            //From WebPage
            else {
                amountString = products[i].getElementsByClassName(amountClass)[0].textContent;
            }

            //add element and code
            let newElement1 = document.createElement("h1");

            if (isNaN(calculateUnitPrice(priceString, amountString)) || amountString.includes("10000")) {
                let display = "Not enought info for calculation"
                newElement1.innerHTML = display
                newElement1.className = priceClass
                newElement1.style.color = colors.red
                products[i].appendChild(newElement1);
            } else {
                let pricePerLb1 = "$" + calculateUnitPrice(priceString, amountString) + "/lb"
                newElement1.innerHTML = pricePerLb1
                newElement1.className = priceClass
                newElement1.style.color = colors.green
                products[i].appendChild(newElement1);
            }
        }
    }
}


let colors = {
    yellow: "#FFBF00",
    green: '#238823',
    red: '#D2222D',
    pink: '#EDA7AB',
    lightGreen: "#65AC65"
}

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

        if (prices[productName] == undefined) {
            if (nonActivePrices[productName] == undefined) {
                products[i].style['background-color'] = colors.yellow;
            } else if (nonActivePrices[productName].fullPrice <= comparePrice) {
                products[i].style['background-color'] = colors.pink;
            } else if (nonActivePrices[productName].fullPrice > comparePrice) {
                products[i].style['background-color'] = colors.lightGreen;
            }
        } else if (prices[productName].fullPrice > comparePrice) {
            products[i].style['background-color'] = colors.green;
        } else if (prices[productName].fullPrice <= comparePrice) {
            products[i].style['background-color'] = colors.red;
        }

    }
}

function addLegendToHeader() {
    let header = document.getElementsByTagName("header")[0]

    let htmlData =
        `
        <p class="explanation">ButcherBox Price Comparison Key: Is This Worth Buying in Custom Box</p>
        <ul class="legend">
            <li><span class="worthIt"></span>Yes</li>
            <li><span class="unknown"></span>Unknown</li>
            <li><span class="notWorthIt"></span> No, Buy in Add-Ons or Deals</li>
            <li><span class="onlyChoice"></span> No, But You Can Only Buy It Here</li>
        </ul>
    `

    let newElement = document.createElement("div");
    newElement.innerHTML = htmlData
    header.appendChild(newElement)
}