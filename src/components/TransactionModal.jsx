import React, { useState } from 'react';
import { X, Check } from 'lucide-react';

const CATEGORIES = {
    income: [
        'Gaji', 'Bonus', 'Investasi', 'Lainnya'
    ],
    expense: [
        'Makanan', 'Transportasi', 'Belanja', 'Tagihan', 'Hiburan', 'Lainnya'
    ]
};

const TransactionModal = ({ isOpen, onClose, type, onSubmit }) => {
    const [amount, setAmount] = useState('');
    const [category, setCategory] = useState('');
    const [notes, setNotes] = useState('');
    const [date, setDate] = useState(() => {
        const now = new Date();
        now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
        return now.toISOString().slice(0, 16);
    });

    if (!isOpen) return null;

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!amount || !category) return;

        onSubmit({
            amount: parseFloat(amount),
            category,
            notes,
            date,
            type
        });

        // Reset form
        setAmount('');
        setCategory('');
        setNotes('');
        const now = new Date();
        now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
        setDate(now.toISOString().slice(0, 16));

        onClose();
    };

    const isIncome = type === 'income';
    const themeColor = isIncome ? 'emerald' : 'rose';

    // Tailwind v3 Safe dynamic classes need complete strings or Safelist, but simple interpolation often works in JIT if configured broadly. 
    // Better to use static lookups or inline styles if dynamic classes get purged.
    // For safety, let's hardcode the button classes based on type variable.

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div
                className="absolute inset-0 bg-slate-900/80 backdrop-blur-sm animate-fade-in"
                onClick={onClose}
            ></div>

            <div className="relative w-full max-w-sm bg-slate-800 rounded-2xl border border-slate-700 shadow-xl p-6 overflow-hidden animate-slide-up">
                {/* Decorative Glow */}
                <div className={`absolute top-0 right-0 w-32 h-32 ${isIncome ? 'bg-emerald-500/10' : 'bg-rose-500/10'} rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none`}></div>

                <div className="flex justify-between items-center mb-6 relative">
                    <h3 className="text-xl font-semibold text-white">
                        {isIncome ? 'Tambah Pemasukan' : 'Tambah Pengeluaran'}
                    </h3>
                    <button onClick={onClose} className="text-slate-400 hover:text-white transition-colors">
                        <X size={24} />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="flex flex-col gap-4 relative">
                    <div>
                        <label className="block text-xs font-medium text-slate-400 mb-1">Jumlah</label>
                        <div className="relative">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 font-medium">Rp</span>
                            <input
                                type="number"
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                                className="w-full bg-slate-900/50 border border-slate-700 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-slate-500 transition-colors"
                                placeholder="0"
                                required
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-xs font-medium text-slate-400 mb-1">Tanggal & Jam</label>
                        <input
                            type="datetime-local"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            className="w-full bg-slate-900/50 border border-slate-700 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-slate-500 transition-colors scheme-dark"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-medium text-slate-400 mb-1">Kategori</label>
                        <div className="grid grid-cols-2 gap-2">
                            {CATEGORIES[type].map((cat) => (
                                <button
                                    key={cat}
                                    type="button"
                                    onClick={() => setCategory(cat)}
                                    className={`py-2 px-3 rounded-lg text-sm font-medium transition-colors border ${category === cat
                                        ? isIncome
                                            ? 'bg-emerald-500/20 border-emerald-500 text-emerald-400'
                                            : 'bg-rose-500/20 border-rose-500 text-rose-400'
                                        : 'bg-slate-900/50 border-slate-700 text-slate-400 hover:bg-slate-800'
                                        }`}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div>
                        <label className="block text-xs font-medium text-slate-400 mb-1">Catatan</label>
                        <textarea
                            value={notes}
                            onChange={(e) => setNotes(e.target.value)}
                            className="w-full bg-slate-900/50 border border-slate-700 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-slate-500 transition-colors resize-none"
                            rows="2"
                            placeholder="Opsional..."
                        />
                    </div>

                    <button
                        type="submit"
                        className={`mt-2 w-full py-3.5 rounded-xl font-semibold text-white shadow-lg flex items-center justify-center gap-2 transition-transform active:scale-95 ${isIncome
                            ? 'bg-emerald-500 hover:bg-emerald-600 shadow-emerald-500/20'
                            : 'bg-rose-500 hover:bg-rose-600 shadow-rose-500/20'
                            }`}
                    >
                        <Check size={18} />
                        Simpan Transaksi
                    </button>
                </form>
            </div>
        </div>
    );
};

export default TransactionModal;
