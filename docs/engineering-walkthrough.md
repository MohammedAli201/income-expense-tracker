# State and user interaction

The tracker is a small React application with one shared state provider. Its value as a portfolio project is that the add/edit/delete interactions can be tried without a backend.

## Trace an entry

| Responsibility | Implementation |
| --- | --- |
| Summary totals and page composition | [App.js](../src/App.js) |
| Form input and amount validation | [addTrans.js](../src/components/addTrans.js) |
| Dispatch and stable entry IDs | [TransactionProvider.js](../src/Providers/TransactionProvider.js) |
| Immutable add/edit/delete transitions | [TranReducer.js](../src/reducer/TranReducer.js) |
| Filters, row actions and deletion confirmation | [listOfTransaction.js](../src/components/listOfTransaction.js) |
| Edit all fields without losing metadata | [editTransaction.js](../src/components/editTransaction.js) |
| Consistent NOK display | [formatMoney.js](../src/utils/formatMoney.js) |

Income is positive and expenses are negative in state. The form uses an explicit type selector and converts a positive input into the appropriate signed value. The balance is income minus expenses.

IDs are created when entries are added, rather than from the current list length. Deleting a row therefore does not make a later row reuse the ID of an existing entry.

The edit form starts with the original date and category and sends them back with the updated amount. Delete requires confirmation; cancelling keeps the entry.

## What the tests prove

The interaction suite checks decimal input and totals, editing without losing metadata, deletion and cancellation, stable row behaviour after deletion/addition, income/expense filters, invalid input and explicit sample-data loading. Tests exercise the interface through labels and buttons.

Screenshots show the actual application with synthetic entries. They are not product mockups.

## Scope

State stays in memory for the current session. There is no persistence, login, bank integration or backend. Money uses JavaScript numbers for this UI exercise; it is not an accounting ledger or a payment calculation system.

The original Create React App toolchain is retained. The lockfile records dependency versions, but a successful build does not establish a current vulnerability audit or production readiness.
