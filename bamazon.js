//Required Node Modules
var mysql = require("mysql");

//Constructor for Bamazon object
function Bamazon(){
	if(!(this instanceof Bamazon)){
		return new Bamazon();
	}

	this.productList = [];
};
