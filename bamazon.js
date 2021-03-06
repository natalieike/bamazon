//Required Node Modules
var mysql = require("mysql");

//Constructor for Bamazon object
function Bamazon(){
	if(!(this instanceof Bamazon)){
		return new Bamazon();
	}

	this.productList = [];
	this.deptList = [];
};

//Pushes products to productList for further reference, outputs product details, depending on Mode.
Bamazon.prototype.listProducts = function(mode, connection, nextFunc){
	var that = this;
	var orderBy = [];
	if(mode != "supervisor"){
		orderBy.push("products.prod_id");
	}else{
		orderBy.push("products.dept_id");
	}
	connection.query("SELECT * FROM products LEFT JOIN depts on products.dept_id = depts.dept_id ORDER BY ??",orderBy, function(err, res){
		if(err){
			connection.end();
			return console.log(err);
		}
		that.productList = [];
		for(var i = 0; i < res.length; i++){
			var product = {
				prodId: res[i].prod_id,
				prodName: res[i].prod_name,
				description: res[i].prod_descr,
				retailPrice: res[i].retail_price,
				wsp: res[i].wsp,
				stockQty: res[i].stock_qty,
				numSold: res[i].num_sold,
				deptName: res[i].dept_name
			};
			that.productList.push(product);
			if (mode != "low" && mode != "supervisor"){
				logMainAttributes(res[i]);
				if(mode != "customer"){
					console.log("------");
					logAdditionalAttributes(res[i]);
				}
				console.log("-----------------------------");
			}
			else if (mode === "low" && res[i].stock_qty <= 5){
				logMainAttributes(res[i]);
				console.log("------");
				logAdditionalAttributes(res[i]);
				console.log("-----------------------------");
			}
		}
		nextFunc();
	});
};

//Updates the database with new values based on passed data
Bamazon.prototype.updateProduct = function(updateObj, connection, nextFunc){
	var that = this;
	connection.query("UPDATE products SET ?? = ? WHERE prod_id = ?", [updateObj.field, updateObj.value, updateObj.productId], function(err, res){
		if(err){
			connection.end();			
			return console.log(err);
		}
		nextFunc();
	});
};

//Fetches the list of departments
Bamazon.prototype.getDepartments = function(connection, nextFunc){
	var that = this;
	this.deptList = [];
	connection.query("SELECT * from depts ORDER BY dept_id", function(err, res){
		if(err){
			connection.end();
			return console.log(err);
		}
		for (var i = 0; i < res.length; i++){
			var dept = {
				deptId: res[i].dept_id,
				deptName: res[i].dept_name,
				deptOverhead: res[i].overhead_costs
			};
			that.deptList.push(dept);
		}
		nextFunc();
	});
};

Bamazon.prototype.addProduct = function(prodObj, connection, nextFunc){
	connection.query("INSERT INTO products SET ?", prodObj, function(err, res){
		if(err){
			connection.end();			
			return console.log(err);
		}
		console.log("Product Added!");
		nextFunc();
	});
};

var logMainAttributes = function(product){
	console.log("Product ID: " + product.prod_id);
	console.log("Product Name: " + product.prod_name);
	console.log("Description: " + product.prod_descr);
	console.log("Price: $" + product.retail_price);	
};

var logAdditionalAttributes = function(product){
	console.log("Wholesale Price: $" + product.wsp);
	console.log("Quantity in Stock: " + product.stock_qty);
	console.log("Total Number Sold: " + product.num_sold);
	console.log("Department: " + product.dept_name); 
};

module.exports = Bamazon;