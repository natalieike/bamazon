//Required Node Modules
var mysql = require("mysql");
var inquirer = require("inquirer");
//Required custom Module - shared methods for all bamazon scripts
var Bamazon = require("./bamazon.js");

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
	var bamazon = new Bamazon();
	bamazon.listProducts("customer", connection, mainMenu);
};

//

//Initialize SQL connection and call Main Menu to start
connection.connect(function(err){
	if(err){
		return console.log(err);
	}
	mainMenu();
});