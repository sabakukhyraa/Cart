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



function infoPrinter (elem) {
    //This function shows to the user all the information of products with the arrays name parameter.


    //FOR LOOP - to reaching all the products in the "products" array.
    for (let i = 0; i < elem.length; i++) {

        // Creating a product section as a div with an image, name, price and "addToCart" button as child.

        const node = document.createElement("div") //Creating the parent div.
        const name = document.createElement("h4") //Creating the name as a child of div which will have the "product" class.
        const price = document.createElement("h5") //Price as a child of div which will have the "product" class.
        const pic = document.createElement("img") //Image as a child of div which will have the "product" class.
        const add = document.createElement("button") //addToCart Button as a child of div which will have the "product" class.

        document.querySelector(".products").appendChild(node) //Append the div to the ".products" section as a child.

        node.classList.add("product") //Giving the "product" class to the product.

        //Assigning the features as a child to the parent div.
        node.appendChild(pic)
        node.appendChild(name)
        node.appendChild(price)
        node.appendChild(add)
        //

        //Giving the class for style and giving the attribute "addToCart" func when clicked to the button.
        let att = document.createAttribute("onclick")
        att.value = `addToCart(${elem[i].id})`
        add.setAttributeNode(att)
        add.innerHTML = "Add to Cart"
        add.classList.add("button")
        //

        //Giving the file path to the image as attribute value.
        let att2 = document.createAttribute("src")
        att2.value = elem[i].img_src
        pic.setAttributeNode(att2)
        //

        //Giving the "alt" attribute for the moments when the image is not supported.
        let att3 = document.createAttribute("alt")
        att3.value = elem[i].productName
        pic.setAttributeNode(att3)
        //


        //Selecting the correct element and giving it the correct features with the help of for loop.
        document.querySelector(`.product:nth-of-type(${i + 1})>h4`).innerHTML = elem[i].productName
        document.querySelector(`.product:nth-of-type(${i + 1})>h5`).innerHTML = `${elem[i].unitPrice} TL`

    }

}



function addToCart (itemId) {
    //This function gets a parameter which is the id of the product.

    //Selecting the correct product with the help of "Id" key and filter method. example for Id key = (-->id: 3<--, productName: "Heinz - Conserve Beans"...) 
    let item = products.filter(obj => (obj.id == itemId))

    // Adding the object and product ID to the arrays.
    cart.push(item[0])
    quantityOfIds.push(itemId)


    // Creating the table of cart.
    const tableLoc = document.querySelector(".product-cart-table")
    const itemLine = document.createElement("tr") // New Line for the item.
    itemLine.classList.add(`${itemId}`) // Giving the class as its id to reaching it easier.
    const itemName = document.createElement("td")
    const quantity = document.createElement("td")
    quantity.setAttribute("id", `${itemId}`) // Giving the id attribute as its "product.id" to reaching it easier.
    const price =  document.createElement("td")
    const removeBtn = document.createElement("button") // A button to remove the item from the cart.
    removeBtn.classList.add("button") // for style.
    removeBtn.setAttribute("onclick", `removeFromCart(${itemId})`) // for function.


    if ((quantityFinder(itemId).length) != 1) { //If the item is already in the cart don't add a new line to the table, increase the quantity instead. 
        document.getElementById(`${itemId}`).innerHTML = quantityFinder(itemId).length
    }

    else { //If the item is not in the cart, add it to the cart and create a new line on the table.
        tableLoc.appendChild(itemLine)
        itemLine.appendChild(itemName)
        itemLine.appendChild(quantity)
        itemLine.appendChild(price)
        itemLine.appendChild(removeBtn)
        itemName.innerHTML = item[0].productName
        quantity.innerHTML = quantityFinder(itemId).length
        price.innerHTML = `${item[0].unitPrice} TL`
        removeBtn.innerHTML = "X"
    }

    priceCalculator() //Calculate the price with priceCalculator after adding a new item to the cart. 
}



function removeFromCart (Id) {
    // This function removes the item which the item id entered as the parameter.

    
    let indexOfItem = quantityOfIds.indexOf(Id) // Finding the index of item id with indexOf function to use the splice method of the arrays that takes two parameters which are index and the deleteCount. The reason why I'm using the splice method in this function is to decrease the quantity.
    


    if ((quantityFinder(Id).length) == 1) { //If the quantity of the item is 1 when it's in the cart remove the whole line of this product in the table. 
        const elem = document.getElementById(`${Id}`).parentElement
        elem.remove()
        cart.splice(indexOfItem, 1) //The reason why I'm using the splice method in here is to remove it from the cart array.
        quantityOfIds.splice(indexOfItem, 1) //The reason why I'm using the splice method in here is to decrease the quantity.
    }



    if ((quantityFinder(Id).length) > 1) { //If the quantity of the items are more than 1, just decrease the quantity.
        cart.splice(indexOfItem, 1)
        quantityOfIds.splice(indexOfItem, 1)
        document.getElementById(`${Id}`).innerHTML = quantityFinder(Id).length
    }



    priceCalculator() //Calculate the price with priceCalculator after removing an item. 
}



function priceCalculator() {
    // This function calculates the total price of the all items in the cart.


    paymentLoc.appendChild(totalPrice) 


    let total = cart.reduce((acc, product) => acc + product.unitPrice, 0) //Addition with reduce function.


    totalPrice.classList.add("price") //for style.
    totalPrice.innerHTML = `TRY ${total.toFixed(2)}` //Printing the total price to innerHTML in a span which have the ".paymentSection" parent.


    paymentLoc.appendChild(endButton) //The checkout button.
    endButton.classList.add("button") //for style.
    endButton.getAttribute("onclick", "checkout()") //Adding the function "checkout" which is empty to the button.
    endButton.innerHTML = "Proceed to checkout"
}