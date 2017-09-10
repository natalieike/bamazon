//Required Node Modules
var mysql = require("mysql");

//Constructor for Bamazon object
function Bamazon(){
	if(!(this instanceof Bamazon)){
		return new Bamazon();
	}

	this.productList = [];
};

//
Bamazon.prototype.listProducts = function(mode, connection, whichMenuFunc){
	connection.query("SELECT * FROM products LEFT JOIN depts on products.dept_id = depts.dept_id ORDER BY products.prod_id", function(err, res){
		if(err){
			return console.log(err);
		}
		for(var i = 0; i < res.length; i++){
			console.log("Product ID: " + res[i].prod_id);
			console.log("Product Name: " + res[i].prod_name);
			console.log("Description: " + res[i].prod_descr);
			console.log("Price: $" + res[i].retail_price);
			if(mode != "customer"){
				console.log("------");
				console.log("Wholesale Price: $" + res[i].wsp);
				console.log("Quantity in Stock: " + res[i].stock_qty);
				console.log("Total Number Sold: " + res[i].num_sold);
				console.log("Department: " + res[i].dept_name); 
			}
			console.log("-----------------------------");
		}
		whichMenuFunc();
	});
};

module.exports = Bamazon;