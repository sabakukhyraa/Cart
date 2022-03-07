// FICTITOUS DATA
const products = [
    {id: 1, productName: "Apple - Iphone 13", unitPrice: 8900.0, img_src: "../Cart/assets/1.jpg"},
    {id: 2, productName: "Gelliebro - Guitar", unitPrice: 2450.0, img_src: "../Cart/assets/2.jpg"},
    {id: 3, productName: "Heinz - Conserve Beans", unitPrice: 14.75, img_src: "../Cart/assets/3.png"},
    {id: 4, productName: "Converse - Shoes", unitPrice: 229.90, img_src: "../Cart/assets/4.jpg"},
    {id: 5, productName: "Logitech - Headphone", unitPrice: 1350.0, img_src: "../Cart/assets/5.png"},
    {id: 6, productName: "Mr.Pen - Tip Pen", unitPrice: 25.55, img_src: "../Cart/assets/6.jpg"},
    {id: 7, productName: "Marvel's Avengers Comic Book", unitPrice: 51.90, img_src: "../Cart/assets/7.png"},
    {id: 8, productName: "Selfie Stick", unitPrice: 37.75, img_src: "../Cart/assets/8.jpg"}
]

const quantityFinder = (theId) => quantityOfIds.filter(unit => (unit == theId))

function addToCart (itemId) {

    let item = products.filter(obj => (obj.id == itemId))

    cart.push(item[0])
    quantityOfIds.push(itemId)

    const tableLoc = document.querySelector(".product-cart-table")
    const itemLine = document.createElement("tr")
    itemLine.classList.add(`${itemId}`)
    const itemName = document.createElement("td")
    const quantity = document.createElement("td")
    quantity.setAttribute("id", `${itemId}`)
    const price =  document.createElement("td")
    const removeBtn = document.createElement("button")
    removeBtn.classList.add("button")
    removeBtn.setAttribute("onclick", `removeFromCart(${itemId})`)


    if ((quantityFinder(itemId).length) != 1) {
        document.getElementById(`${itemId}`).innerHTML = quantityFinder(itemId).length
    }

    else {
        tableLoc.appendChild(itemLine)
        itemLine.appendChild(itemName)
        itemLine.appendChild(quantity)
        itemLine.appendChild(price)
        itemLine.appendChild(removeBtn)
        itemName.innerHTML = item[0].productName
        quantity.innerHTML = quantityFinder(itemId).length
        price.innerHTML = item[0].unitPrice
        removeBtn.innerHTML = "X"
    }

    priceCalculator()
}



function removeFromCart (Id) {  
    
    let indexOfItem = quantityOfIds.indexOf(Id)
    


    if ((quantityFinder(Id).length) == 1) {
        const elem = document.getElementById(`${Id}`).parentElement
        elem.remove()
        cart.splice(indexOfItem, 1)
        quantityOfIds.splice(indexOfItem, 1)
        console.log("ananke")
    }


    if ((quantityFinder(Id).length) > 1) {
        cart.splice(indexOfItem, 1)
        quantityOfIds.splice(indexOfItem, 1)
        document.getElementById(`${Id}`).innerHTML = quantityFinder(Id).length
    }

    priceCalculator()
}



function infoPrinter (elem) {

    for (let i = 0; i < elem.length; i++) {

        const node = document.createElement("div")
        const name = document.createElement("h4")
        const price = document.createElement("h5")
        const pic = document.createElement("img")
        const add = document.createElement("button")

        document.querySelector(".products").appendChild(node)

        node.classList.add("product")

        node.appendChild(pic)
        node.appendChild(name)
        
        node.appendChild(price)
        node.appendChild(add)

        let att = document.createAttribute("onclick")
        att.value = `addToCart(${elem[i].id})`
        add.setAttributeNode(att)
        add.innerHTML = "Add to Cart"
        add.classList.add("button")

        let att2 = document.createAttribute("src")
        att2.value = elem[i].img_src
        pic.setAttributeNode(att2)

        let att3 = document.createAttribute("alt")
        att3.value = elem[i].productName
        pic.setAttributeNode(att3)

        document.querySelector(`.product:nth-of-type(${i + 1})>h4`).innerHTML = elem[i].productName
        document.querySelector(`.product:nth-of-type(${i + 1})>h5`).innerHTML = `${elem[i].unitPrice} TL`
    }
}


function priceCalculator() {

    paymentLoc.appendChild(totalPrice)

    let total = cart.reduce((acc, product) => acc + product.unitPrice, 0)

    totalPrice.classList.add("price")
    totalPrice.innerHTML = `TRY ${total.toFixed(2)}`

    paymentLoc.appendChild(endButton)
    endButton.classList.add("button")
    endButton.getAttribute("onclick", "checkout()")
    endButton.innerHTML = "Proceed to checkout"

}