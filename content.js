// var elts = document.getElementsByTagName('p');
// for (var i = 0; i < elts.length; i++) {
//     elts[i].style['background-color'] = '#F0C';
// }


// let h3s = document.getElementsByTagName("h3")
// for (let i = 0; i < h3s.length; i++) {
//     let h3 = h3s[i];
//     h3.style.color = "blue"
// }



// Listen for messages
chrome.runtime.onMessage.addListener(gotMessage);

// Callback for when a message is received
function gotMessage(message, sender, sendResponse) {
    // console.log(message.txt)

    // let paragraphs = document.getElementsByTagName('p')
    // for (elt of paragraphs) {
    //     elt.innerHTML = message.txt
    // }

    // Do something!
    // var elts = document.getElementsByTagName('p');
    // for (var i = 0; i < elts.length; i++) {
    //     elts[i].style['background-color'] = '#F0C';
    // }

    // let h3s = document.getElementsByTagName("h3")
    // for (let i = 0; i < h3s.length; i++) {
    //     let h3 = h3s[i];
    //     h3.style.color = "green"
    // }

    var elts = document.getElementsByTagName('p');
    for (var i = 0; i < elts.length; i++) {
        elts[i].style['background-color'] = '#F0C';
    }
    // let textchanges = document.getElementsByClassName("css-kr5i5c")
    // console.log(textchanges[0].innerHTML)
    // textchanges[0].innerHTML = "BALL CHANGE"

    // let someTexts = document.getElementsByClassName("css-1gy22ay");
    // console.log(someTexts.length);


    // let endList = document.getElementsByClassName("css-155za0w")
    // console.log(endList);
    // console.log(endList.length);

    //Main Page: https://www.butcherbox.com/member/
    //Recurring Add Ons 

    let addOns = document.getElementsByClassName("css-orvfwm");
    console.log(addOns);
    for (let i = 0; i < addOns.length; i++) {

        let amountString = addOns[i].getElementsByTagName("h5")[0].textContent;
        let priceString = addOns[i].getElementsByClassName("css-1jiogkd")[0].textContent;

        //add element and code
        let newElement = document.createElement("h4");
        newElement.innerHTML = calculateUnitPrice(priceString, amountString);
        addOns[i].getElementsByTagName("h4")[0].appendChild(newElement);
    }


    //Next Box Only Exclusive Member Deals
    let nextBoxDeals = document.getElementsByClassName("css-1swbghd")
    for (let i = 0; i < nextBoxDeals.length; i++) {
        let priceString = nextBoxDeals[i].getElementsByTagName("h3")[0].textContent
        let amountString = nextBoxDeals[i].getElementsByClassName("css-51ry97")[0].textContent
        console.log(amountString)
        console.log(priceString)

        //add element and code
        let newElement = document.createElement("h3");
        newElement.innerHTML = calculateUnitPrice(priceString, amountString);
        nextBoxDeals[i].getElementsByTagName("h3")[0].appendChild(newElement);
    }


}