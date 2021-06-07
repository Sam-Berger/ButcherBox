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

    fillPriceMap("css-orvfwm", "css-13rzl1b", "css-1jiogkd", "css-1s1lv4r")

    console.log(fillPriceMap("css-orvfwm", "css-13rzl1b", "css-1jiogkd", "css-1s1lv4r"))
        // fillPriceMap("css-1swbghd", "css-51ry97", "css-t6djce", "css-1g1weue")

    console.log(fillPriceMap("css-1swbghd", "css-51ry97", "css-t6djce", "css-1g1weue"))

    determineBoxItemValue();
}

function addPricePerUnit(parentClass, amountClass, priceClass, newElementTag, newElementPlacementTagName) {

    let products = document.getElementsByClassName(parentClass);
    for (let i = 0; i < products.length; i++) {

        if (products[i].getElementsByClassName(amountClass).length > 0 && products[i].getElementsByClassName(priceClass).length > 0) {

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
}

function fillPriceMap(parentClass, amountClass, priceClass, nameClass) {
    //repeat of first half of addPriceperUnit
    let priceMap = {}
    let products = document.getElementsByClassName(parentClass);
    for (let i = 0; i < products.length; i++) {
        if (products[i].getElementsByClassName(nameClass).length > 0 && products[i].getElementsByClassName(priceClass).length > 0) {

            let productName = products[i].getElementsByClassName(nameClass)[0].textContent;
            let amountString = products[i].getElementsByClassName(amountClass)[0].textContent;
            let priceString = products[i].getElementsByClassName(priceClass)[0].textContent;
            console.log("productName: " + productName)
            console.log("priceString: " + priceString)
            console.log(i)

            priceMap[productName] = Number(calculatePrice(priceString))
        }
    }
    return priceMap
}


//give feedback on if stuff in the box is worth it
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
    "Boneless Pork Chops": 11,
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

function determineBoxItemValue() {
    let products = document.getElementsByClassName("css-s66rfc")
    for (let i = 0; i < products.length; i++) {
        let productName = products[i].getElementsByClassName("css-16oe755")[0].textContent

        if (prices[productName] > 22.5) {
            products[i].style['background-color'] = 'green';
        }
        if (prices[productName] <= 22.5) {
            products[i].style['background-color'] = 'red';
        }
    }

}