function calculateUnitPrice(priceString, amountString) {

    let price = calculatePrice(priceString)
    let weight = calculateAmount(amountString).weight
    let weightType = calculateAmount(amountString).weightType

    // console.log("price: " + price)
    // console.log("weight: " + weight)
    let pricePerUnit = (price / weight)
        // console.log("price per unit " + pricePerUnit)
    if (weightType == "lb") {
        return pricePerUnit.toFixed(2)
    }
    if (weightType == "oz") {
        return (pricePerUnit * 16).toFixed(2)
    }
}

function calculatePrice(priceString) {
    let index = priceString.indexOf("$")
    let price = Number(priceString.slice(index + 1))
    return price
}

function calculateAmount(amountString) {
    //some amount boxes have descriptions like "Each unit of Ground Beef (85/15) contains 2 x 1 lb packs" so we need to get around just choosing the first number for index
    // console.log("before ' x ':" + amountString)
    if (amountString.includes(" x ")) {
        let index = amountString.indexOf(" x ")
        amountString = amountString.slice(index - 5, index + 9)
    }

    //TODO: some give amounts like "Get two 10 oz steaks" so we need to translate this into workable numbers
    // if (amountString.includes(" two ")) {
    //     let index = amountString.indexOf(" two ")
    //     amountString = amountString.slice()
    // }

    // console.log("after ' x ':" + amountString)
    // console.log("before include lb:" + amountString)

    //What to do if "lb" is mentioned twice? Use the bigger of the 2
    let weight
        // let doubleLb = false
    if (amountString.includes("lb")) {
        let index = amountString.indexOf("lb")
        let lastIndex = amountString.lastIndexOf("lb")
        if (index == lastIndex) {
            amountString = amountString.slice(index - 6, index + 4)
        } else {
            doubleLb = true
            let amountStringFirst = amountString.slice(index - 6, index + 4)
            let amountStringLast = amountString.slice(lastIndex - 6, lastIndex + 4)
            amountStringFirst = sliceAndTight(amountStringFirst)
            amountStringLast = sliceAndTight(amountStringLast)
                // console.log("First Amt String:" + amountStringFirst)
                // console.log("Lsdy Amt String:" + amountStringLast)
            amountStringFirst = amountStringFirst.slice(0, findIndexUnit(amountString, /l|o/))
            amountStringLast = amountStringLast.slice(0, findIndexUnit(amountString, /l|o/))
            if (amountStringFirst > amountStringLast) {
                // weight = amountStringFirst
                amountString = amountStringFirst
            } else {
                // weight = amountStringLast
                amountString = amountStringLast
            }
            // console.log("2 uses of LB weight: " + amountString)



        }
    }

    // console.log("after include lb:" + amountString)

    if (amountString.includes("oz")) {
        let index = amountString.indexOf("oz")
            // console.log("index: " + index)
        amountString = amountString.slice(index - 10, index + 4)
            // console.log(amountString)
    }

    if (amountString.includes("half-pound")) {
        amountString = "0.5lbs"
    }


    amountString = sliceAndTight(amountString);
    let weightType = ""
    if (amountString[findIndexUnit(amountString, /l|o/)] == "l") {
        weightType = "lb"
    }
    if (amountString[findIndexUnit(amountString, /l|o/)] == "o") {
        weightType = "oz"
    }

    amountString = amountString.slice(0, findIndexUnit(amountString, /l|o/))
    let multiplySymbolIndex
    let howMany
    let size
    if (amountString.includes("x")) {
        multiplySymbolIndex = findIndexUnit(amountString, /x/)
        howMany = Number(amountString.slice(0, multiplySymbolIndex))
        size = Number(amountString.slice(multiplySymbolIndex + 1))
            // console.log(howMany)
            // console.log(size)
        weight = howMany * size;
        // console.log("Includes 'x' weight: " + weight)
    } else {
        weight = Number(amountString)
            // console.log("Includes 'x' weight: " + weight)
    }

    return {
        weight: weight,
        weightType: weightType

    }
}

function findindex(str) {
    if (str.includes("$")) {
        let index = str.indexOf("$")
        str = str.slice(index + 2)
        let nums = str.match(/\d/);
        return str.indexOf(nums) + index + 2;
    } else {
        let nums = str.match(/\d/);
        return str.indexOf(nums);
    }
}

function findIndexUnit(str, regex) {
    let nums = str.match(regex);
    return str.indexOf(nums)
}

function sliceAndTight(str) {
    let amountIndex = findindex(str)
        // console.log("amountIndex:" + amountIndex)
    return str.slice(amountIndex).replace(/\s+/g, '')
        // console.log("Amount String:" + amountString)
}