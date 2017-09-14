# bamazon

## Intro

This command-line application suite is composed of three applications:
1.  **bamazonCustomer** is the customer-facing application, which allows a user to list items, purchase items, and view cart/checkout.
1.  **bamazonManager** is the storefront manager application, which allows a user to view an enhanced item list, update inventory numbers, and add new products.
1.  **bamazonSupervisor** is the supervisor application, which allows a user to view a sales report and add new departments.

## To Install

1.  Copy repository to a local drive that has access to MySQL and Node.  Current application is configured for localhost.
1.  Run *npm install* to install required Node modules.
1.  Run bamazon.sql in MySQL to create the bamazonDB database and seed the tables.
1.  Each application can be started from the command line, using Node.  See the below sections for user experience.

## bamazonCustomer

**To run** at the command line prompt, type:
```
node bamazonCustomer
```
No arguments need to be passed.

Upon startup, the Main Menu is shown. 

![Main Menu](/images/bamazonCustomerMainMenu.png)

Choosing Option 1 - **View Products** - will list the customer-facing metadata for each product in the database.

![Option 1](/images/bamazonCustomerOpt1-a.png)

At the end of the listing, the Main Menu is displayed, prompting for the next action.

![Option 1 Main Menu](/images/bamazonCustomerOpt1-b.png)

Choosing Option 2 - **Buy Product** - lists the customer-facing metadata for each product in the database, and prompts the user for a choice.  

![Option 2 Prompt](/images/bamazonCustomerOpt2-a.png)

User must enter a Product ID and Quantity.  If there are enough products, the item is added to the cart, and the Main Menu is again displayed.

![Option 2 Success](/images/bamazonCustomerOpt2-b.png)

Non-numeric choices will display an error and bring the user back to the Main Menu.

![Option 2 Error - enter a Product Number](/images/bamazonCustomerOpt2-c.png)

![Option 2 Error - enter Quantity as a Number](/images/bamazonCustomerOpt2-d.png)

If there are not enough items in stock, an error is displayed, and the user is brought back to the Main Menu.

![Option 2 Error - not enough items in stock](/images/bamazonCustomerOpt2-e.png)

Choosing Option 3 - **Checkout** - lists the items in the shopping cart, and displays the total cost of the purchase.  User is then brought back to the Main Menu.

![Option 3](/images/bamazonCustomerOpt3.png)

Choosing Option 4 - **Exit** - closes the database connection and exits the application.

![Option 4](/images/bamazonCustomerOpt4.png)

## bamazonManager

**To run** at the command line prompt, type:
```
node bamazonManager
```
No arguments need to be passed.

Upon startup, the Main Menu is shown. A heading appears at the top of the menu to notify the user that they are in the Manager view.

![Main Menu](/images/bamazonManagerMainMenu.png)

Choosing Option 1 - **View Products** - will list the enhanced metadata for each product in the database.

![Option 1](/images/bamazonManagerOpt1-a.png)

At the end of the listing, the Main Menu is displayed, prompting for the next action.

![Option 1 Main Menu](/images/bamazonManagerOpt1-b.png)

Choosing Option 2 - **View Low Inventory** - will list the enhanced metadata for products with 5 or less items in stock.  User is then brought back to the Main Menu.

![Option 2](/images/bamazonManagerOpt2-a.png)

![Option 2 Main Menu](/images/bamazonManagerOpt2-b.png)

Choosing Option 3 - **Update Inventory Count** - lists the enhanced metadata for each product, and then prompts the user for a selection.

![Option 3 Prompt](/images/bamazonManagerOpt3-a.png)

Non-numeric choices will display an error and bring the user back to the Main Menu.

![Option 3 Error - enter a Product Number](/images/bamazonManagerOpt3-b.png)

![Option 3 Error - enter Quantity as a Number](/images/bamazonManagerOpt3-c.png)

The user is prompted for the total amount of inventory, but if the user enters a number that is less than what is currently in stock, they are promtped for whether they intend to update the stock total to this number, or add this to the current stock.

![Option 3 Prompt - entry is less than inventory number](/images/bamazonManagerOpt3-d.png)

If the inventory count entered is more than the stock count, the database is updated with no further prompts, and the user is returned to the Main Menu.

![Option 3 Success](/images/bamazonManagerOpt3-e.png)

Choosing Option 4 - **Add New Product** - prompts the user for product metadata.  If all metadata is valid, the new product is created in the database, and the user is returned to the Main Menu.

![Option 4 Prompts](/images/bamazonManagerOpt4-a.png)

![Option 4 Success](/images/bamazonManagerOpt4-b.png)

Non-numeric entries for Wholesale Price, Retail Price, or Quantity will display an error and bring the user back to the Main Menu.

![Option 4 Error - WSP Not a Number](/images/bamazonManagerOpt4-c.png)

![Option 4 Error - Retail Price Not a Number](/images/bamazonManagerOpt4-d.png)

![Option 4 Error - Quantity Not a Number](/images/bamazonManagerOpt4-e.png)

Choosing Option 5 - **Exit** - closes the database connection and exits the application.

![Option 5](/images/bamazonManagerOpt5.png)

## bamazonSupervisor

**To run** at the command line prompt, type:
```
node bamazonSupervisor
```
No arguments need to be passed.

Upon startup, the Main Menu is shown. A heading appears at the top of the menu to notify the user that they are in the Supervisor view.

![Main Menu](/images/bamazonSupervisorMainMenu.png)

Choosing Option 1 - **View Department Sales Report** - outputs a chart, grouped by Department, that consists of:  Department ID, Department Name, Overhead Costs, Sales in $, and Profit in $.  Sales is calculated based on the retail price multiplied by the quantity sold, for each item in the department.  Profit is calculated by subtracting the Overhead Costs from the Sales.

The user is returned to the Main Menu at the end of the report.

![Sales Report](/images/bamazonSupervisorOpt1.png)

Choosing Option 2 - **Add New Department** - prompts the user for department metadata.  

Non-numeric entries for Overhead Costs will display an error and bring the user back to the Main Menu.

![Option 2 - Error](/images/bamazonSupervisorOpt2-a.png)

If all metadata is valid, the new product is created in the database, and the user is returned to the Main Menu. 

![Option 2 - Success](/images/bamazonSupervisorOpt2-b.png)

Choosing Option 3 - **Exit** - closes the database connection and exits the application.

![Option 3](/images/bamazonSupervisorOpt3.png)