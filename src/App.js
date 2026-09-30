import React from 'react';
import TransactionProvider from './Providers/TransactionProvider';
import AddTrans from './components/addTrans';
import ListOfTransaction from './components/listOfTransaction';
import useTrans from './hooks/useTrans';
import { formatMoney } from './utils/formatMoney';
import './App.css';

function Dashboard() {
  const { state, loadSampleData } = useTrans();
  const income = state.transactions.reduce((total, item) => total + Math.max(item.amount, 0), 0);
  const expenses = state.transactions.reduce((total, item) => total + Math.max(-item.amount, 0), 0);

  return (
    <div className="app-shell">
      <header className="topbar">
        <a className="brand" href="#main"><span className="brand-mark" aria-hidden="true">↗</span>Flow<span className="brand-caption">Income & expenses</span></a>
        <a className="source-link" href="https://github.com/MohammedAli201/income-expense-tracker">View source <span aria-hidden="true">↗</span></a>
      </header>
      <main id="main" className="dashboard">
        <div className="page-heading">
          <div><p className="eyebrow">PERSONAL FINANCE / NOK</p><h1>Your money, at a glance.</h1><p className="page-description">A little clarity for the everyday ins and outs.</p></div>
          {state.transactions.length === 0 && <button className="sample-button" onClick={loadSampleData}>Try sample entries <span aria-hidden="true">↗</span></button>}
        </div>
        <section className="summary-grid" aria-label="Financial summary">
          <div className="metric balance"><p>Balance</p><strong>{formatMoney(income - expenses)}</strong><span>Income minus expenses</span></div>
          <div className="metric"><p><span className="metric-dot income-dot" />Income</p><strong>{formatMoney(income)}</strong><span>Total money coming in</span></div>
          <div className="metric"><p><span className="metric-dot expense-dot" />Expenses</p><strong>{formatMoney(expenses)}</strong><span>Total money going out</span></div>
        </section>
        <div className="workspace"><AddTrans /><ListOfTransaction /></div>
        <footer className="page-footer"><span>Built by <a href="https://github.com/MohammedAli201">Mohamed Ali Abdullahi</a></span><span>Entries stay in this session. Refreshing clears them.</span></footer>
      </main>
    </div>
  );
}

export default function App() {
  return <TransactionProvider><Dashboard /></TransactionProvider>;
}
