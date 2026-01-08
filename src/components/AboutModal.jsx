import React from 'react';
import { X, Heart, Github } from 'lucide-react';

const AboutModal = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div
                className="absolute inset-0 bg-slate-900/80 backdrop-blur-sm animate-fade-in"
                onClick={onClose}
            ></div>

            <div className="relative w-full max-w-sm bg-slate-800 rounded-2xl border border-slate-700 shadow-xl p-8 overflow-hidden animate-slide-up text-center">
                <button onClick={onClose} className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors">
                    <X size={24} />
                </button>

                <div className="w-16 h-16 bg-emerald-500/20 rounded-2xl flex items-center justify-center mx-auto mb-6 text-emerald-500">
                    <Heart size={32} fill="currentColor" />
                </div>

                <h3 className="text-xl font-bold text-white mb-2">Pelacak Keuangan</h3>
                <p className="text-slate-400 text-sm mb-6">v1.0.0</p>

                <p className="text-slate-300 mb-8 leading-relaxed">
                    Aplikasi sederhana untuk mencatat pemasukan dan pengeluaran harian Anda.
                    <br />
                    Built with React, Supabase & TailwindCSS.
                </p>

                <div className="inline-flex items-center gap-2 px-4 py-2 bg-slate-900/50 rounded-full border border-slate-700 text-sm text-slate-400">
                    <span>Made with love by</span>
                    <span className="text-emerald-400 font-medium">@angga0x</span>
                </div>
            </div>
        </div>
    );
};

export default AboutModal;
