import React, { useState, useRef, useEffect } from 'react';
import { MoreVertical, History, Trash2, Info, Wallet } from 'lucide-react';

const Header = ({ onMenuSelect }) => {
    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef(null);

    // Close menu when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleSelect = (action) => {
        setIsOpen(false);
        onMenuSelect(action);
    };

    return (
        <div className="flex justify-between items-center p-4 relative z-30">
            <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-emerald-500/20 rounded-lg flex items-center justify-center text-emerald-500">
                    <Wallet size={20} />
                </div>
                <h1 className="text-lg font-medium text-slate-200">Pelacak Keuangan</h1>
            </div>

            <div className="relative" ref={menuRef}>
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className={`text-slate-400 hover:text-white transition-colors p-1 rounded-full ${isOpen ? 'bg-slate-800 text-white' : ''}`}
                >
                    <MoreVertical size={20} />
                </button>

                {isOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-slate-800 rounded-xl shadow-xl border border-slate-700 overflow-hidden py-1">
                        <button
                            onClick={() => handleSelect('history')}
                            className="w-full text-left px-4 py-3 text-sm text-slate-300 hover:bg-slate-700 hover:text-white flex items-center gap-3 transition-colors"
                        >
                            <History size={16} /> Riwayat Lengkap
                        </button>
                        <button
                            onClick={() => handleSelect('clear')}
                            className="w-full text-left px-4 py-3 text-sm text-rose-400 hover:bg-rose-500/10 hover:text-rose-300 flex items-center gap-3 transition-colors"
                        >
                            <Trash2 size={16} /> Hapus Semua Data
                        </button>
                        <div className="h-px bg-slate-700 mx-2 my-1"></div>
                        <button
                            onClick={() => handleSelect('about')}
                            className="w-full text-left px-4 py-3 text-sm text-slate-400 hover:bg-slate-700 hover:text-white flex items-center gap-3 transition-colors"
                        >
                            <Info size={16} /> Tentang
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Header;
