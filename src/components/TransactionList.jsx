import React from 'react';
import { Wallet, ShoppingCart, Coffee, PiggyBank, Car, FileText, Zap, TrendingUp, TrendingDown } from 'lucide-react';

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

const TransactionList = ({ transactions }) => {
    return (
        <div className="flex-1 px-4 mt-8 pb-4">
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium text-slate-200">Transaksi Terakhir</h3>
                <a href="#" className="text-sm text-emerald-500 hover:text-emerald-400 font-medium">Lihat Semua</a>
            </div>

            <div className="flex flex-col gap-3">
                {transactions.map((transaction) => {
                    const Icon = CATEGORY_MAP[transaction.category] || FileText;
                    const isIncome = transaction.type === 'income';
                    const colorClass = isIncome ? 'bg-emerald-500/10 text-emerald-500' : 'bg-rose-500/10 text-rose-500';
                    const amountClass = isIncome ? 'text-emerald-500' : 'text-rose-500';
                    const sign = isIncome ? '+' : '-';

                    return (
                        <div key={transaction.id} className="flex items-center justify-between p-4 bg-slate-800/50 rounded-2xl border border-slate-700/50 hover:bg-slate-800 transition-colors">
                            <div className="flex items-center gap-4">
                                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${colorClass}`}>
                                    <Icon size={20} />
                                </div>
                                <div className="flex flex-col">
                                    <span className="font-medium text-slate-200">{transaction.title || transaction.category}</span>
                                    <span className="text-xs text-slate-400">
                                        {new Date(transaction.date).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
                                        {transaction.notes ? ` • ${transaction.notes}` : ''}
                                    </span>
                                </div>
                            </div>

                            <span className={`font-semibold ${amountClass}`}>
                                {sign}{new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(transaction.amount)}
                            </span>
                        </div>
                    );
                })}
                {transactions.length === 0 && (
                    <div className="text-center py-8 text-slate-500 text-sm">Belum ada transaksi</div>
                )}
            </div>
        </div>
    );
};

export default TransactionList;
