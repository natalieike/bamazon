//Required Node Modules
var mysql = require("mysql");
var inquirer = require("inquirer");
//Required custom Module - shared methods for all bamazon scripts
var Bamazon = require("./bamazon.js");
var bamazon = new Bamazon();

//Shopping Cart - array of objects to hold items purchased
var shoppingCart = [];

//Connect to local instance of SQL database using mysql
var connection = mysql.createConnection({
	host: "localhost",
	port: 8889,
	user: "root",
	password: "root",
	database: "bamazonDB"
});

//Main Menu function - called as the last step in any async workflow
var mainMenu = function(){
	inquirer.prompt([
    {
    	type: "rawlist",
    	message: "Main Menu: ",
    	choices: ["View Products", "Buy Product", "Checkout", "Exit"],
    	name: "menu"
    }
	]).then(function(res){
		switch(res.menu){
			case ("Exit"):
				connection.end();
				return;
				break;
			case ("View Products"):
				listProdsCustomer();
				break;
			case ("Buy Product"):
				buyProduct();
				break;
			case ("Checkout"):
				checkout();
				break;
			default:
				console.log("Oops, something weird happened.  Please try again.");
				mainMenu();
		}
	});
};

//Lists products in Customer format (ID, Name, Description, Retail Price)
var listProdsCustomer = function(){
	bamazon.listProducts("customer", connection, mainMenu);
};

//Adds product to Shopping Cart
var buyProduct = function(){
	bamazon.listProducts("customer", connection, function(){
		inquirer.prompt([
      {
      	type: "input",
      	message: "Please enter the Product ID you would like to buy: ",
      	name: "product"
      },
      {
      	type: "input",
      	message: "Quantity: ",
      	name: "quantity"
      }
		]).then(function(res){
			var prod = parseInt(res.product);
			var quant = parseInt(res.quantity);
			var prodIndex = bamazon.productList.findIndex(x => x.prodId === prod);
			if(isNaN(res.product)){
				console.log("You need to enter a Product Number.  Please try again.");
				mainMenu();
				return;
			}else if(isNaN(res.quantity)){
				console.log("You need to enter an amount as a number.  Please try again.");
				mainMenu();
				return;
			}else if(bamazon.productList[prodIndex].stockQty < quant){
				console.log("There are not enough products in stock.  Please try again.");
				mainMenu();
				return;
			}else {	
				var newQuant = {productId: prod, field: "stock_qty", value: bamazon.productList[prodIndex].stockQty - quant};
				var newSold = {productId: prod, field: "num_sold", value: bamazon.productList[prodIndex].numSold + quant};
				shoppingCart.push({
					productId: bamazon.productList[prodIndex].prodId,
					prodName: bamazon.productList[prodIndex].prodName,
					qtyPurchased: quant,
					retailPrice: bamazon.productList[prodIndex].retailPrice
				});
				console.log("Added to Cart!");
				bamazon.updateProduct(newQuant, connection, function(){
					bamazon.updateProduct(newSold, connection, mainMenu);		
				});
			}
		});
	});
};

var checkout = function(){
	var total = 0;
	if(shoppingCart.length < 1){
		console.log("You don't have anything in your cart yet.");
		mainMenu();
		return;
	}
	console.log("You are purchasing the following items: ");
	for (var i = 0; i < shoppingCart.length; i++){
		var prodTotal = shoppingCart[i].retailPrice * shoppingCart[i].qtyPurchased;
		total = total + prodTotal;
		console.log(shoppingCart[i].prodName + " -- Qty: " + shoppingCart[i].qtyPurchased);
	}
	console.log("Your total is: $" + total);
	mainMenu();
};

//Initialize SQL connection and call Main Menu to start
connection.connect(function(err){
	if(err){
		connection.end();
		return console.log(err);
	}
	mainMenu();
});