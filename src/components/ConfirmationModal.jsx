import React from 'react';
import { AlertTriangle } from 'lucide-react';

const ConfirmationModal = ({ isOpen, onClose, onConfirm, title, message }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div
                className="absolute inset-0 bg-slate-900/80 backdrop-blur-sm animate-fade-in"
                onClick={onClose}
            ></div>

            <div className="relative w-full max-w-sm bg-slate-800 rounded-2xl border border-slate-700 shadow-xl p-6 overflow-hidden animate-slide-up">
                <div className="flex flex-col items-center text-center">
                    <div className="w-12 h-12 bg-rose-500/20 rounded-full flex items-center justify-center mb-4 text-rose-500">
                        <AlertTriangle size={24} />
                    </div>

                    <h3 className="text-lg font-bold text-white mb-2">{title}</h3>
                    <p className="text-slate-400 text-sm mb-6">
                        {message}
                    </p>

                    <div className="grid grid-cols-2 gap-3 w-full">
                        <button
                            onClick={onClose}
                            className="py-2.5 px-4 rounded-xl font-medium text-slate-300 bg-slate-700 hover:bg-slate-600 transition-colors"
                        >
                            Batal
                        </button>
                        <button
                            onClick={onConfirm}
                            className="py-2.5 px-4 rounded-xl font-medium text-white bg-rose-500 hover:bg-rose-600 shadow-lg shadow-rose-500/20 transition-colors"
                        >
                            Hapus
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ConfirmationModal;
