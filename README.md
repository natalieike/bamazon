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

**To run:** 
```
Node bamazonCustomer
```
No arguments need to be passed.

