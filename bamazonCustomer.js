//Required Node Modules
var mysql = require("mysql");
var inquirer = require("inquirer");
//Required custom Module - shared methods for all bamazon scripts
var bamazon = require("./bamazon.js");

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
	connection.query("SELECT prod_id, prod_name, prod_descr, retail_price FROM products", function(err, res){
		if(err){
			return console.log(err);
		}
		for(var i = 0; i < res.length; i++){
			console.log("Product ID: " + res[i].prod_id);
			console.log("Product Name: " + res[i].prod_name);
			console.log("Description: " + res[i].prod_descr);
			console.log("Price: $" + res[i].retail_price);
			console.log("-----------------------------");
		}
		mainMenu();
	});
};

//Initialize SQL connection and call Main Menu to start
connection.connect(function(err){
	if(err){
		return console.log(err);
	}
	mainMenu();
});