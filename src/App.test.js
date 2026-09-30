import { fireEvent, render, screen, within } from '@testing-library/react';
import App from './App';

function addEntry({ description = 'Groceries', amount = '640.50', category = 'Food', date = '2026-09-30', type = 'expense' } = {}) {
  const form = within(screen.getByRole('region', { name: 'Add an entry' }));
  fireEvent.change(form.getByLabelText('Entry type'), { target: { value: type } });
  fireEvent.change(form.getByLabelText('Description'), { target: { value: description } });
  fireEvent.change(form.getByLabelText('Amount (NOK)'), { target: { value: amount } });
  fireEvent.change(form.getByLabelText('Date'), { target: { value: date } });
  fireEvent.change(form.getByLabelText('Category'), { target: { value: category } });
  fireEvent.click(form.getByRole('button', { name: 'Add entry' }));
}

test('starts empty and adds a decimal expense with a correct balance', () => {
  render(<App />);
  expect(screen.getByText('A fresh start.')).toBeInTheDocument();
  addEntry();
  expect(screen.getByText('Groceries')).toBeInTheDocument();
  const summary = within(screen.getByRole('region', { name: 'Financial summary' }));
  expect(summary.getByText(/-.*640\.50/)).toBeInTheDocument();
  expect(summary.getAllByText(/NOK.*640\.50/)).toHaveLength(2);
});

test('editing preserves date and category, while allowing the amount to change', () => {
  render(<App />);
  addEntry();
  fireEvent.click(screen.getByRole('button', { name: 'Edit Groceries' }));
  const editor = within(screen.getByRole('region', { name: 'Edit entry' }));
  expect(editor.getByLabelText('Date')).toHaveValue('2026-09-30');
  expect(editor.getByLabelText('Category')).toHaveValue('Food');
  fireEvent.change(editor.getByLabelText('Amount (NOK)'), { target: { value: '750.25' } });
  fireEvent.click(editor.getByRole('button', { name: 'Save changes' }));
  expect(screen.getByText(/Food.*2026-09-30/)).toBeInTheDocument();
  expect(screen.getByRole('button', { name: 'Edit Groceries' })).toBeInTheDocument();
  expect(screen.getByText(/−NOK.*750\.25/)).toBeInTheDocument();
});

test('cancelling deletion keeps the entry; confirming removes only the chosen entry', () => {
  render(<App />);
  addEntry(); addEntry({ description: 'Train pass', category: 'Transport', amount: '890' });
  fireEvent.click(screen.getByRole('button', { name: 'Delete Groceries' }));
  fireEvent.click(screen.getByRole('button', { name: 'Keep entry' }));
  expect(screen.getByText('Groceries')).toBeInTheDocument();
  fireEvent.click(screen.getByRole('button', { name: 'Delete Groceries' }));
  fireEvent.click(screen.getByRole('button', { name: 'Delete entry' }));
  expect(screen.queryByText('Groceries')).not.toBeInTheDocument();
  expect(screen.getByText('Train pass')).toBeInTheDocument();
  addEntry({ description: 'Coffee', amount: '78' });
  fireEvent.click(screen.getByRole('button', { name: 'Delete Coffee' }));
  fireEvent.click(screen.getByRole('button', { name: 'Delete entry' }));
  expect(screen.getByText('Train pass')).toBeInTheDocument();
});

test('income and expense filters show the relevant entries', () => {
  render(<App />);
  addEntry(); addEntry({ description: 'Contract work', amount: '12000', type: 'income', category: 'Work' });
  fireEvent.click(screen.getByRole('button', { name: 'Income' }));
  expect(screen.getByText('Contract work')).toBeInTheDocument();
  expect(screen.queryByText('Groceries')).not.toBeInTheDocument();
  fireEvent.click(screen.getByRole('button', { name: 'Expenses' }));
  expect(screen.getByText('Groceries')).toBeInTheDocument();
  expect(screen.queryByText('Contract work')).not.toBeInTheDocument();
});

test('blank descriptions and zero values never become transactions', () => {
  render(<App />);
  addEntry({ description: '   ' });
  expect(screen.getByText('A fresh start.')).toBeInTheDocument();
  addEntry({ amount: '0' });
  expect(screen.getByText('A fresh start.')).toBeInTheDocument();
});

test('sample entries are explicit and populate a complete demonstration', () => {
  render(<App />);
  fireEvent.click(screen.getByRole('button', { name: /Try sample entries/ }));
  expect(screen.getByText('4 entries')).toBeInTheDocument();
  expect(screen.getByText('Groceries')).toBeInTheDocument();
  expect(screen.queryByRole('button', { name: /Try sample entries/ })).not.toBeInTheDocument();
});
