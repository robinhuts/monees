import React from 'react';
import { ArrowLeft, FileText, Wallet, Coffee, ShoppingCart, Car, Zap, TrendingUp, TrendingDown, PiggyBank } from 'lucide-react';

const CATEGORY_MAP = {
    'Gaji': Wallet,
    'Bonus': PiggyBank,
    'Investasi': TrendingUp,
    'Makanan': Coffee,
    'Belanja': ShoppingCart,
    'Transportasi': Car,
    'Tagihan': Zap,
    'Hiburan': TrendingDown,
    'Lainnya': FileText
};

const FullHistory = ({ transactions, onBack }) => {
    return (
        <div className="flex-1 flex flex-col min-h-screen bg-slate-900">
            {/* Custom Header for History */}
            <div className="sticky top-0 bg-slate-900/90 backdrop-blur-md border-b border-slate-800 p-4 flex items-center gap-4 z-20">
                <button onClick={onBack} className="text-slate-400 hover:text-white transition-colors p-1">
                    <ArrowLeft size={24} />
                </button>
                <h2 className="text-lg font-semibold text-white">Riwayat Lengkap</h2>
            </div>

            <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-3">
                {transactions.length === 0 ? (
                    <div className="flex flex-col items-center justify-center p-10 text-slate-500 gap-2">
                        <FileText size={40} className="opacity-20" />
                        <p>Belum ada riwayat transaksi</p>
                    </div>
                ) : (
                    transactions.map((transaction) => {
                        const Icon = CATEGORY_MAP[transaction.category] || FileText;
                        const isIncome = transaction.type === 'income';
                        const colorClass = isIncome ? 'bg-emerald-500/10 text-emerald-500' : 'bg-rose-500/10 text-rose-500';
                        const amountClass = isIncome ? 'text-emerald-500' : 'text-rose-500';
                        const sign = isIncome ? '+' : '-';

                        return (
                            <div key={transaction.id} className="flex items-center justify-between p-4 bg-slate-800/50 rounded-2xl border border-slate-700/50">
                                <div className="flex items-center gap-4">
                                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${colorClass}`}>
                                        <Icon size={20} />
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="font-medium text-slate-200">{transaction.title || transaction.category}</span>
                                        <div className="flex items-center gap-2 text-xs text-slate-400">
                                            <span>{new Date(transaction.date).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })}</span>
                                            {transaction.notes && (
                                                <>
                                                    <span>•</span>
                                                    <span className="truncate max-w-[150px]">{transaction.notes}</span>
                                                </>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                <span className={`font-semibold ${amountClass}`}>
                                    {sign}{new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(transaction.amount)}
                                </span>
                            </div>
                        );
                    })
                )}
            </div>
        </div>
    );
};

export default FullHistory;
