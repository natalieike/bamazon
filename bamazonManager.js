var mysql = require("mysql");
var inquirer = require("inquirer");
//Required custom Module - shared methods for all bamazon scripts
var Bamazon = require("./bamazon.js");
var bamazon = new Bamazon();

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
	console.log("MANAGER VIEW");
	inquirer.prompt([
    {
    	type: "rawlist",
    	message: "Main Menu: ",
    	choices: ["View Products", "View Low Inventory", "Update Inventory Count", "Add New Product", "Exit"],
    	name: "menu"
    }
	]).then(function(res){
		switch(res.menu){
			case ("Exit"):
				connection.end();
				return;
				break;
			case ("View Products"):
				listProdsMgr();
				break;
			case ("View Low Inventory"):
				viewLowInventory();
				break;
			case ("Update Inventory Count"):
				updateInventory();
				break;
			case ("Add New Product"):
				addNewProduct();
				break;
			default:
				console.log("Oops, something weird happened.  Please try again.");
				mainMenu();
		}
	});
};

//Lists products in Manager format (ID, Name, Description, Retail Price, WSP, Quantity, Total Sold, Dept)
var listProdsMgr = function(){
	bamazon.listProducts("mgr", connection, mainMenu);
};

//Lists products with 5 items or less in stock
var viewLowInventory = function(){
	bamazon.listProducts("low", connection, mainMenu);	
};

//Updates the inventory count
var updateInventory = function(){
	bamazon.listProducts("mgr", connection, function(){
		inquirer.prompt([
  	  {
    		type: "input",
    		message: "Please Enter the Product ID of the item to update:",
    		name: "product"
    	},
    	{
    		type: "input",
    		message: "Please enter the total amount of inventory available: ",
    		name: "totalInventory"
    	}
		]).then(function(res){
			var prod = parseInt(res.product);
			var quant = parseInt(res.totalInventory);
			var prodIndex = bamazon.productList.findIndex(x => x.prodId === prod);
			if(isNaN(res.product)){
				console.log("You need to enter a Product Number.  Please try again.");
				mainMenu();
				return;
			}else if(isNaN(res.totalInventory)){
				console.log("You need to enter the total amount as a number.  Please try again.");
				mainMenu();
				return;
			}else if(quant < bamazon.productList[prodIndex].stockQty){
				inquirer.prompt([
				  {
				  	type: "list",
				  	message: "The quantity entered is less than current stock.",
				  	choices: ["Update stock quantity", "Add to stock quantity"],
				  	name: "confirmation"
				  }
				]).then(function(result){
					if(result.confirmation === "Update stock quantity"){
						var newQuant = {productId: prod, field: "stock_qty", value: quant};
					}else{
						var newQuant = {productId: prod, field: "stock_qty", value: bamazon.productList[prodIndex].stockQty + quant};
					}
					bamazon.updateProduct(newQuant, connection, mainMenu);	
				});
				return;
			}else{
				var newQuant = {productId: prod, field: "stock_qty", value: quant};
				bamazon.updateProduct(newQuant, connection, mainMenu);	
			}
		});
	});
};

//Adds a new product to the databse
var addNewProduct = function(){
	bamazon.getDepartments(connection, function(){
		var departments = [];
		for (var i = 0; i < bamazon.deptList.length; i++){
			departments.push(bamazon.deptList[i].deptName);
		}
		inquirer.prompt([
  	  {
	    	type: "input",
    		message: "Enter a Product Name",
    		name: "prodName"
  	  },
	    {
    		type: "input",
    		message: "Enter a Product Description",
  	  	name: "prodDescription"
	    },
    	{
    		type: "input",
    		message: "Enter the Wholesale Price",
  	  	name: "prodWsp"
	    },
    	{
  	  	type: "input",
	    	message: "Enter the Retail Price",
    		name: "prodRetailPrice"
    	},
    	{
  	  	type: "input",
	    	message: "Enter the Stock Quantity",
    		name: "prodStockQty"
    	},
    	{
    		type: "list",
    		message: "Choose the department",
    		choices: departments,
    		name: "prodDept"
    	}
		]).then(function(res){
			var deptIndex = bamazon.deptList.findIndex(x => x.deptName === res.prodDept);
			var deptId = bamazon.deptList[deptIndex].deptId;
			var newProduct = {
				prod_name: res.prodName,
				prod_descr: res.prodDescription,
				dept_id: deptId,
				wsp: res.prodWsp,
				retail_price: res.prodRetailPrice,
				stock_qty: res.prodStockQty
			};
			if(isNaN(res.prodWsp)){
				console.log("Wholesale Price should be in dollars.  Please try again.");
				mainMenu();
				return;
			}else if(isNaN(res.prodRetailPrice)){
				console.log("Retial Price should be in dollars.  Please try again.");
				mainMenu();
				return;
			}else if(isNaN(res.prodStockQty)){
				console.log("You need to enter the total amount as a number.  Please try again.");
				mainMenu();
				return;
			}else{	
				bamazon.addProduct(newProduct, connection, mainMenu);
			}
		});
	});
};

//Initialize SQL connection and call Main Menu to start
connection.connect(function(err){
	if(err){
		connection.end();
		return console.log(err);
	}
	mainMenu();
});