import { supabase } from './lib/supabase';

export const fetchTransactions = async () => {
    const { data, error } = await supabase
        .from('transactions')
        .select('*')
        .order('date', { ascending: false })
        .order('created_at', { ascending: false });

    if (error) {
        console.error('Supabase fetch error:', error);
        throw error;
    }
    return data;
};

export const addTransaction = async (transaction) => {
    const { data, error } = await supabase
        .from('transactions')
        .insert([transaction])
        .select(); // Select to return the inserted data

    if (error) {
        console.error('Supabase insert error:', error);
        throw error;
    }
    return data;
};

export const deleteTransaction = async (id) => {
    const { error } = await supabase
        .from('transactions')
        .delete()
        .eq('id', id);

    if (error) {
        throw error;
    }
    return { success: true };
};

export const clearTransactions = async () => {
    // Supabase requires a WHERE clause for delete.
    // 'id' is distinct from -1 is a safe way to select all generally if IDs are positive.
    const { error } = await supabase
        .from('transactions')
        .delete()
        .neq('id', -1);

    if (error) {
        throw error;
    }
    return { success: true };
};
