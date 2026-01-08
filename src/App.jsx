import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import BalanceCard from './components/BalanceCard';
import ActionButtons from './components/ActionButtons';
import TransactionList from './components/TransactionList';
import TransactionModal from './components/TransactionModal';
import FullHistory from './components/FullHistory';
import { fetchTransactions, addTransaction, clearTransactions } from './api';

function App() {
  const [transactions, setTransactions] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState('income');
  const [loading, setLoading] = useState(true);
  const [currentView, setCurrentView] = useState('dashboard'); // 'dashboard' or 'history'

  useEffect(() => {
    loadTransactions();
  }, []);

  const loadTransactions = async () => {
    try {
      const data = await fetchTransactions();
      setTransactions(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = (type) => {
    setModalType(type);
    setIsModalOpen(true);
  };

  const handleCreateTransaction = async (data) => {
    try {
      const newTransaction = {
        title: data.category,
        amount: data.amount,
        type: data.type,
        category: data.category,
        date: data.date,
        notes: data.notes
      };
      await addTransaction(newTransaction);
      await loadTransactions();
    } catch (error) {
      console.error(error);
    }
  };

  const handleMenuSelect = async (action) => {
    if (action === 'history') {
      setCurrentView('history');
    } else if (action === 'about') {
      alert('Financial Tracker App v1.0.0\nMade with love by @angga0x');
    } else if (action === 'clear') {
      if (window.confirm('Yakin ingin menghapus semua data? Tindakan ini tidak dapat dibatalkan.')) {
        try {
          await clearTransactions();
          await loadTransactions();
          alert('Semua data berhasil dihapus.');
        } catch (error) {
          console.error(error);
          alert('Gagal menghapus data.');
        }
      }
    }
  };

  const renderContent = () => {
    if (currentView === 'history') {
      return <FullHistory transactions={transactions} onBack={() => setCurrentView('dashboard')} />;
    }

    return (
      <>
        <Header onMenuSelect={handleMenuSelect} />

        {loading ? (
          <div className="flex-1 flex items-center justify-center p-10 text-slate-500">Loading...</div>
        ) : (
          <>
            <BalanceCard transactions={transactions} />
            <ActionButtons
              onIncomeClick={() => handleOpenModal('income')}
              onExpenseClick={() => handleOpenModal('expense')}
            />
            <TransactionList transactions={transactions} />
          </>
        )}
      </>
    );
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 max-w-md mx-auto relative shadow-2xl border-x border-slate-800 flex flex-col">
      {renderContent()}

      <TransactionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        type={modalType}
        onSubmit={handleCreateTransaction}
      />
    </div>
  );
}

export default App;
