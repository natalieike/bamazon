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

User must enter a Product ID and Quantity.  If there are enough products, the item is added to the cart, adn the Main Menu is again displayed.

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

