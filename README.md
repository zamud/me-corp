A full-stack app for tracking finances.

# The Idea

Ok, so maybe a finance tracker isn't the most original project (for a bit more creativity, see [bop-brackets](https://github.com/zamud/bop-brackets)). However, I wanted a subscription-free improvement on my current, spreadsheet-intensive, method. My goals were to:

- Improve efficiency and accuracy while entering transactions
- Allow transaction management on a granular, individual level
- Replicate my current spreadsheet view of transactions, while adding new data visualization

All, of course, while honing my full-stack skills and striving for clean, smart code.

# The Solution

MeCorp is my new personal finance tracker, implemented as a full-stack app (React, Node, Express, MongoDB) with a custom REST API supporting CRUD operations. This all amounted to an effective means of entering, managing, and analyzing personal income and expenses.

## Server & API

### Server

Set up an Express server to mediate between the React client and MongoDB database. Transaction schema and validation are handled via Mongoose. Transactions consist of the following fields (all required):

```
{
    "date": "2020-01-23T00:00:00.000Z",
    "merchant": "CHIPOTLE",
    "amount": 8.86,
    "category": "restaurants",
    "isIncome": false,
}
```

### API

Used Express to build the following routes:

| Route                          | HTTP   | Description                                                                  |
| ------------------------------ | ------ | ---------------------------------------------------------------------------- |
| `/transactions`                | GET    | Get all transactions                                                         |
| `/transactions`                | POST   | Given transaction data (JSON), create a new transaction                      |
| `/transactions/:transactionId` | GET    | Get the transaction with ID matching the query parameter `:transactionId`    |
| `/transactions/:transactionId` | PUT    | Update the transaction with ID matching the query parameter `:transactionId` |
| `/transactions/:transactionId` | DELETE | Delete the transaction with ID matching the query parameter `:transactionId` |

## Client

### Add Transactions

One of MeCorp's main objectives was to simplify transaction entry. Before, I painstakingly went through an exported `.csv` from my bank, copy/pasted each transaction into another table broken down by category, and put the sum of each category in an overall table. Needless to say, there was room for improvement.

#### Import Transactions

For efficient bulk entry, MeCorp accepts a spreadsheet of transactions - each row consting of date, merchant, amount in that order. In my case, I could massage the aforementioned `.csv` a bit, and have this ready in seconds. For example:

| 7/5/2020 | GAS STATION | $2.43 |
| 7/6/2020 | GROCERY STORE | $23.32 |
| 7/9/2020 | FANCY RESTAURANT | \$76.23 |
| ... | ... | ... |

Using [`react-dropzone`](https://react-dropzone.js.org/), one can import a spreadsheet, and MeCorp will set up a list of transactions to complete:

** SCREENSHOT - IMPORT TRANSACTIONS **

The user can specify income transactions, choose transaction categories, and exclude transactions if desired. The submit button will write all transactions to the database.

#### Create Transactions

For smaller-scale transaction entry, MeCorp provides the option to create transactions directly in the app. The user may add and delete as many as desired on this page, and click Submit. If any transactions fail validation, they will remain on the screen for the user to correct.

** SCREENSHOT - CREATE TRANSCATIONS **

### View Transactions

My spreadsheet-based approach culminated in a monthly table, broken down by category. It was a nice table, which I did replicate, but React and npm offered more data visualization options. The following views are available in a single tabbed view dashboard.

** SCREENSHOT - TABS **

#### List

A simple list of all transactions meeting the date and category filter criteria set at the top of the page. Date selection was aided by [`react-dates`](https://github.com/airbnb/react-dates), and category selection by [`react-dropdown`](https://github.com/fraserxu/react-dropdown).

** SCREENSHOT - TRANSACTION LIST **

#### Table

Leveraged [`react-data-table-component`](https://github.com/jbetancur/react-data-table-component#readme) to create three monthly tables:

1. By Category to track where money goes each month

** SCREENSHOT **

2. By Group for a broader spending breakdown

** SCREENSHOT **

3. Net Income to track what's left over at the end of the month (Income - All Other Categories)

** SCREENSHOT **

#### Bar Graph

Used [`react-vis`](https://github.com/uber/react-vis) to render transaction data in a multi-layered graph. The graph consists of:

1. Monthly expenses in bar form, color-coded by group
2. Monthly income as a line overlaying the expense bars

** SCREENSHOT - BAR GRAPH **

### Manage Transactions

With transactions stored in a database, MeCorp provides the ability to update or delete individual transactions. Similar to the List capability, transactions can be filtered by date and category. In this view, each transaction comes with Edit and Delete buttons.

#### Edit Transaction

Data for the selected transaction is displayed. The user may update the fields, reset as needed, and cancel if desired. The update form is handled by [`Formik`](https://github.com/formik/formik), using [`Yup`](https://github.com/jquense/yup) for validation.

** SCREENSHOT - EDIT TRANSACTION **

#### Delete Transaction(s)

In this view the user can delete either an individual transaction, or all transactions currently displayed. For example, one could delete all 'Restaurant' transactions between 06/01/2020 and 06/31/2020 with a single click. In either case, the user is prompted for confirmation before deleting.

** SCREENSHOT - BULK DELETE **
