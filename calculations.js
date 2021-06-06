function calculateUnitPrice(priceString, amountString) {
    console.log("Start of Calculation")
    let index = priceString.indexOf("$")
    let price = Number(priceString.slice(index + 1))

    /*     console.log("index:" + index);
        console.log("priceString:" + priceString);
        console.log("price:" + price) */

    function findindex(str) {
        console.log(str)
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

    /*   function findindex(str) {
        console.log(str)
        if (str.includes("$")) {
                    let index = str.indexOf("$")
                    str = str.slice(index + 2)
                    let nums = str.match(/\d/);
                    return str.indexOf(nums) + index + 2;
        if (str.includes("lb")) {
          let index = str.indexOf("lb")
          return (index - 4)
          console.log("index: " + index)
          //            str = str.slice(index -5, index + 4)
          console.log(str)
          //            let nums = str.match(/\d/);
          return str.indexOf(nums) + index + 2;
      
        } else {
          let nums = str.match(/\d/);
          return str.indexOf(nums);
        }
      } */

    function findIndexUnit(str, regex) {
        let nums = str.match(regex);
        return str.indexOf(nums)
    }

    //some amount boxes have descriptions like "Each unit of Ground Beef (85/15) contains 2 x 1 lb packs" so we need to get around just choosing the first number for index
    console.log("before ' x ':" + amountString)
    if (amountString.includes(" x ")) {
        let index = amountString.indexOf(" x ")
        amountString = amountString.slice(index - 5, index + 9)
    }
    console.log("after ' x ':" + amountString)
    console.log("before include lb:" + amountString)

    if (amountString.includes("lb")) {
        let index = amountString.indexOf("lb")
        console.log("index: " + index)
        amountString = amountString.slice(index - 6, index + 4)
    }

    console.log("after include lb:" + amountString)


    // if (amountString.includes("lb")) {
    //     let index = amountString.indexOf("lb")
    //     console.log("index: " + index)
    //     amountString = amountString.slice(index - 5, index + 4)
    //     console.log(amountString)
    // }


    if (amountString.includes("oz")) {
        let index = amountString.indexOf("oz")
        console.log("index: " + index)
        amountString = amountString.slice(index - 10, index + 4)
        console.log(amountString)
    }

    if (amountString.includes("half-pound")) {
        amountString = "0.5lbs"
    }

    let amountIndex = findindex(amountString)
    console.log("amountIndex:" + amountIndex)
    amountString = amountString.slice(amountIndex).replace(/\s+/g, '')
    console.log("Amount String:" + amountString)
        //   console.log(findIndexUnit(amountString, /l|o/))
        //     console.log(amountString[findIndexUnit(amountString, /l|o/)]) 
    let weightType = ""
    if (amountString[findIndexUnit(amountString, /l|o/)] == "l") {
        weightType = "lb"
    }
    if (amountString[findIndexUnit(amountString, /l|o/)] == "o") {
        weightType = "oz"
    }


    //  console.log(amountString.slice(0, findIndexUnit(amountString, /l|o/)));

    amountString = amountString.slice(0, findIndexUnit(amountString, /l|o/))
    let multiplySymbolIndex
    let howMany
    let size
    let weight
    if (amountString.includes("x")) {
        multiplySymbolIndex = findIndexUnit(amountString, /x/)
        howMany = Number(amountString.slice(0, multiplySymbolIndex))
        size = Number(amountString.slice(multiplySymbolIndex + 1))
        console.log(howMany)
        console.log(size)
        weight = howMany * size;
        console.log(weight)
    } else {
        weight = Number(amountString)
        console.log(weight)
    }
    console.log(price)
    let pricePerUnit = (price / weight).toFixed(2)
    console.log("price per unit " + pricePerUnit)
        //console.log(weightType)
    if (weightType == "lb") {
        return "$" + pricePerUnit + "/lb"
    }
    if (weightType == "oz") {
        return "$" + (pricePerUnit * 16) + "/lb"
    }
}