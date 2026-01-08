import React from 'react';
import { ArrowDown, ArrowUp } from 'lucide-react';

const ActionButtons = ({ onIncomeClick, onExpenseClick }) => {
    return (
        <div className="grid grid-cols-2 gap-4 px-4 mt-6">
            <button
                onClick={onIncomeClick}
                className="flex flex-col items-center justify-center gap-1 bg-emerald-500 hover:bg-emerald-600 active:bg-emerald-700 transition-colors py-4 rounded-xl text-white group shadow-lg shadow-emerald-500/20"
            >
                <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center mb-1 group-hover:scale-110 transition-transform">
                    <ArrowDown size={18} />
                </div>
                <span className="font-medium">+ Uang Masuk</span>
            </button>

            <button
                onClick={onExpenseClick}
                className="flex flex-col items-center justify-center gap-1 bg-rose-500 hover:bg-rose-600 active:bg-rose-700 transition-colors py-4 rounded-xl text-white group shadow-lg shadow-rose-500/20"
            >
                <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center mb-1 group-hover:scale-110 transition-transform">
                    <ArrowUp size={18} />
                </div>
                <span className="font-medium">- Uang Keluar</span>
            </button>
        </div>
    );
};

export default ActionButtons;
