import React, { useMemo } from 'react';
import { TrendingUp } from 'lucide-react';

const BalanceCard = ({ transactions }) => {
    const totalBalance = useMemo(() => {
        return transactions.reduce((acc, curr) => {
            return curr.type === 'income' ? acc + curr.amount : acc - curr.amount;
        }, 0);
    }, [transactions]);

    return (
        <div className="mx-4 mt-4 p-6 bg-gradient-to-b from-slate-700/50 to-slate-800/50 rounded-2xl border border-slate-700/50 backdrop-blur-sm relative overflow-hidden">
            {/* Background glow effect */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-3xl -mr-16 -mt-16"></div>

            <div className="flex flex-col items-center justify-center relative z-10">
                <span className="text-slate-400 text-xs font-medium tracking-wider mb-2">SALDO SAAT INI</span>
                <h2 className="text-4xl font-bold text-white mb-4">
                    {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(totalBalance)}
                </h2>

                <div className="flex items-center gap-1.5 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
                    <TrendingUp size={14} className="text-emerald-400" />
                    <span className="text-emerald-400 text-xs font-medium">Berdasarkan data Anda</span>
                </div>
            </div>
        </div>
    );
};

export default BalanceCard;
