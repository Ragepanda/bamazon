var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "",
  database: "bamazon"
});

// Sets up connection and begins inquirer process
connection.connect(function(err) {
  if (err) throw err;
  openingPrompt();
});

// The function that is run directly after the SQL connection is made. Pulls data needed for app and passes it off a method to launch an inquirer prompt
function openingPrompt(){
    connection.query("SELECT * FROM products", (err, data) =>{
        if (err) console.log(err);
        printItemList(data);
        selectionPrompt(data);
    })
}

// Takes in DB object as a parameter and prints out each item in the products table
function printItemList(data){
    
        
        data.forEach(row => {
            console.log(` 
Item ID:    ${row.item_id} 
Item Name:  ${row.product_name} 
Department: ${row.department_name} 
Price:      ${row.price} 
In Stock:   ${row.stock_quantity}
            `)
        });
    
}
// Takes inputs from inquirer and determines if sale is valid 
function selectionPrompt(data){
        inquirer.prompt([{
        name: "id",
        type: "input",
        message: "What item ID would you like to select?"
    },
    {
        name: "quantity",
        type: "input",
        message: "How many of units of this item would you like to purchase?"
    }
]).then(selected =>{
    var id = parseInt(selected.id);
    var quantityPuchased = parseInt(selected.quantity);
    var quantityInStock = parseInt(data[id-1].stock_quantity);
    var price = new Number(data[id-1].price);

    if(quantityPuchased > quantityInStock){
        console.log("Bamazon has insufficient quantity!");        
        connection.end();
    }
    // If enough of product is in stock, the quantity will be updated.
    else
        updateQuantity(id, quantityPuchased, quantityInStock, price);
        
    
})
}
// Queries the DB to update stock
function updateQuantity(id, quantityPuchased, quantityInStock, price){
    connection.query("UPDATE products SET stock_quantity = ? WHERE item_id = ?", [quantityInStock-quantityPuchased, id], (err, data) =>{
        if (err) console.log(err);
        // Waits for query before officially showing user total price.
        console.log("TOTAL PRICE: "+price*quantityPuchased);
    })
    connection.end();
}


