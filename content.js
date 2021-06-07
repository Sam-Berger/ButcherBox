// Listen for messages
chrome.runtime.onMessage.addListener(gotMessage);

// Callback for when a message is received
function gotMessage(message, sender, sendResponse) {

    var elts = document.getElementsByTagName('p');
    for (var i = 0; i < elts.length; i++) {
        elts[i].style['background-color'] = '#F0C';

    }
    //Main Page: https://www.butcherbox.com/member/
    //Recurring Add Ons 

    // let addOns = document.getElementsByClassName("css-orvfwm");
    // for (let i = 0; i < addOns.length; i++) {

    //     let amountString = addOns[i].getElementsByTagName("h5")[0].textContent;
    //     let priceString = addOns[i].getElementsByClassName("css-1jiogkd")[0].textContent;

    //     //add element and code
    //     let newElement = document.createElement("h4");
    //     newElement.innerHTML = calculateUnitPrice(priceString, amountString);
    //     addOns[i].getElementsByTagName("h4")[0].appendChild(newElement);
    // }


    //Next Box Only Exclusive Member Deals
    // let nextBoxDeals = document.getElementsByClassName("css-1swbghd")
    // for (let i = 0; i < nextBoxDeals.length; i++) {
    //     let priceString = nextBoxDeals[i].getElementsByTagName("h3")[0].textContent
    //     let amountString = nextBoxDeals[i].getElementsByClassName("css-51ry97")[0].textContent
    //     console.log(amountString)
    //     console.log(priceString)

    //     //add element and code
    //     let newElement = document.createElement("h3");
    //     newElement.innerHTML = calculateUnitPrice(priceString, amountString);
    //     nextBoxDeals[i].getElementsByTagName("h3")[0].appendChild(newElement);
    // }

    addPricePerUnit("css-orvfwm", "css-13rzl1b", "css-1jiogkd", "h4", "h4")

    addPricePerUnit("css-1swbghd", "css-51ry97", "css-t6djce", "h3", "h3")

    fillPriceMap("css-orvfwm", "css-1s1lv4r", "h5", "css-1jiogkd")
    console.log(fillPriceMap("css-orvfwm", "css-1s1lv4r", "h5", "css-1jiogkd"))


}

function addPricePerUnit(parentClass, amountClass, priceClass, newElementTag, newElementPlacementTagName) {

    let products = document.getElementsByClassName(parentClass);
    for (let i = 0; i < products.length; i++) {

        let amountString = products[i].getElementsByClassName(amountClass)[0].textContent;
        let priceString = products[i].getElementsByClassName(priceClass)[0].textContent;

        //add element and code
        // let newElement = document.createElement(newElementTag);
        let newElement = document.createElement("div");

        //TODO: not working for deals. It calculates it but does not display it
        //TODO: what if NaN or undefined?
        let pricePerLb = "$" + calculateUnitPrice(priceString, amountString) + "/lb"
        console.log("Per $ to Go to price object: " + calculateUnitPrice(priceString, amountString))
        newElement.innerHTML = pricePerLb
        products[i].appendChild(newElement);

        // products[i].getElementsByTagName(newElementPlacementTagName)[0].appendChild(newElement);


    }
}

function fillPriceMap(parentClass, nameClass, amountTag, priceClass) {
    //repeat of first half of addPriceperUnit
    let priceMap = {}
    let products = document.getElementsByClassName(parentClass);
    for (let i = 0; i < products.length; i++) {
        let productName = products[i].getElementsByClassName(nameClass)[0].textContent;
        let amountString = products[i].getElementsByTagName(amountTag)[0].textContent;
        let priceString = products[i].getElementsByClassName(priceClass)[0].textContent;
        console.log("productName: " + productName)

        priceMap[productName] = Number(calculateUnitPrice(priceString, amountString))

    }
    return priceMap
}



//give feedback on if stuff in the box is worth it
let prices = {
    "Boneless Skinless Breast": 8,
    "Boneless Pork Chops": 7,
    "Breakfast Sausage": 9,
    "Wild Alaskan Sockeye Salmon": 12.5,
    "ButcherBox Bacon": 11.2,
    "Ground Beef (85/15)": 7.5,
    "Ribeyes": 20,
    "NY Strip Steaks": 17.6,
    "Ground Turkey": 7,
    "Uncured Hot Dog": 7,
    "ButcherBox Burgers": 8.05,
    "Bacon 3 Pack": 9.6
}

function determineBoxItemValue() {
    let products = document.getElementsByClassName("css-s66rfc")
    for (let i = 0; i < products.length; i++) {
        let productName = products[i].getElementsByClassName("css-16oe755")[0].textContent
        console.log(productName)
        console.log(i)

    }

}

determineBoxItemValue();