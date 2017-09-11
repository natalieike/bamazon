//Required Node Modules
var mysql = require("mysql");
var inquirer = require("inquirer");
var cliTable = require("cli-table");
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
	console.log("SUPERVISOR VIEW");
	inquirer.prompt([
    {
    	type: "rawlist",
    	message: "Main Menu: ",
    	choices: ["View Department Sales Report", "Add New Department", "Exit"],
    	name: "menu"
    }
	]).then(function(res){
		switch(res.menu){
			case ("Exit"):
				connection.end();
				return;
				break;
			case ("View Department Sales Report"):
				deptSalesReport();
				break;
			case ("Add New Department"):
				addDept();
				break;
			default:
				console.log("Oops, something weird happened.  Please try again.");
				mainMenu();
		}
	});
};

//Render Department Sales Report
var deptSalesReport = function(){
	bamazon.getDepartments(connection, function(){
		bamazon.listProducts("supervisor", connection, function(){
			var table = new cliTable({
				head: ["ID", "Department Name", "Overhead Costs", "Sales in $", "Profit in $"]
			});
			for(var i = 0; i < bamazon.productList.length; i++){
				var tableIndex = table.findIndex(x => x[1] === bamazon.productList[i].deptName);
				var deptIndex = bamazon.deptList.findIndex(x => x.deptName === bamazon.productList[i].deptName);
				var productSale = bamazon.productList[i].numSold * bamazon.productList[i].retailPrice;
				var profit = productSale - bamazon.deptList[deptIndex].deptOverhead;
				if(tableIndex < 0){
					table.push([bamazon.deptList[deptIndex].deptId, bamazon.deptList[deptIndex].deptName, bamazon.deptList[deptIndex].deptOverhead, productSale, profit]);
				} else{
					table[tableIndex][3] += productSale;
					table[tableIndex][4] = productSale - table[tableIndex][2];
				}
			};
			console.log(table.toString());
			mainMenu();
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