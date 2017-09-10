DROP DATABASE IF EXISTS bamazonDB;

CREATE DATABASE bamazonDB;

USE bamazonDB;

CREATE TABLE products (
	prod_id INT NOT NULL AUTO_INCREMENT,
	prod_name VARCHAR(64) NOT NULL,
	prod_descr VARCHAR(256),
	dept_id INT NOT NULL,
	wsp DECIMAL(10,2) NOT NULL,
	retail_price DECIMAL(10,2) NOT NULL,
	stock_qty INT NOT NULL,
	num_sold INT NOT NULL DEFAULT 0,
	PRIMARY KEY(prod_id)
);

CREATE TABLE depts (
	dept_id INT NOT NULL AUTO_INCREMENT,
	dept_name VARCHAR(64) NOT NULL,
	overhead_costs DECIMAL(10,2) NULL,
	PRIMARY KEY(dept_id)
);

INSERT INTO depts (dept_name, overhead_costs)
VALUES ("Electronics", 10000),
		("Clothing", 5000),
		("Shoes", 2000),
		("Books", 3000),
		("Sporting Goods", 7000);
		
INSERT INTO products (prod_name, dept_id, prod_descr, wsp, retail_price, stock_qty)
VALUES ("Samsung TV", 1, "42in TV", 400.00, 600.00, 10),
		("Levis Jeans", 2, "Comfy", 25.00, 50.00, 25),
		("Geeky TShirt", 2, "Something Something with a Tardis", 7.00, 15.00, 15),
		("SQL For Dummies", 4, "A book you should read", 3.00, 12.00, 4),
		("Hiking Boots", 3, "Necessary for hiking", 50.00, 150.00, 12),
		("Tent", 5, "For Basic Camping", 100.00, 200.00, 3),
		("Sports Ball", 5, "For Sporty Ball People", 2.00, 15.00, 35);
		
INSERT INTO depts (dept_name, overhead_costs)
VALUES ("Pets", 1000),
		("Outdoor Products", 3500);		
		
INSERT INTO products (prod_name, dept_id, prod_descr, wsp, retail_price, stock_qty)
VALUES ("Cat Tree", 6, "Cat Jungle", 10.00, 45.00, 35),
		("Dog Leash", 6, "How Dog walks you", 3.00, 15.00, 50),
		("Jungle Gym", 7, "Broken Arm waiting to happen", 200.00, 400.00, 6);		
		
select products.prod_id, products.prod_name, products.prod_descr, products.retail_price, products.stock_qty, depts.dept_name
from products
left join depts on products.dept_id = depts.dept_id
order by products.prod_id
		