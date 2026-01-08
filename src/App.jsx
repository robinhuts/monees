import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import BalanceCard from './components/BalanceCard';
import ActionButtons from './components/ActionButtons';
import TransactionList from './components/TransactionList';
import TransactionModal from './components/TransactionModal';
import AboutModal from './components/AboutModal';
import ConfirmationModal from './components/ConfirmationModal';
import FullHistory from './components/FullHistory';
import { fetchTransactions, addTransaction, clearTransactions } from './api';

function App() {
  const [transactions, setTransactions] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState('income');
  const [loading, setLoading] = useState(true);
  const [currentView, setCurrentView] = useState('dashboard'); // 'dashboard' or 'history'

  // Modal States
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);

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

  const handleMenuSelect = (action) => {
    if (action === 'history') {
      setCurrentView('history');
    } else if (action === 'about') {
      setIsAboutOpen(true);
    } else if (action === 'clear') {
      setIsDeleteConfirmOpen(true);
    }
  };

  const handleConfirmDelete = async () => {
    try {
      await clearTransactions();
      await loadTransactions();
      setIsDeleteConfirmOpen(false);
      // Optional: Show success toast/modal if needed, but list update is visible enough
    } catch (error) {
      console.error(error);
      alert('Gagal menghapus data.');
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

      <AboutModal
        isOpen={isAboutOpen}
        onClose={() => setIsAboutOpen(false)}
      />

      <ConfirmationModal
        isOpen={isDeleteConfirmOpen}
        onClose={() => setIsDeleteConfirmOpen(false)}
        onConfirm={handleConfirmDelete}
        title="Hapus Semua Data?"
        message="Tindakan ini akan menghapus seluruh riwayat transaksi Anda secara permanen. Data tidak dapat dikembalikan."
      />
    </div>
  );
}

export default App;
