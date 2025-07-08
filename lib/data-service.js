import { supabase } from './supabase';

export async function getCabin(id) {
    const { data, error } = await supabase
    .from('cabins')
    .select('*')
    .eq('id', id)
    .single();

    if (error) {
        console.error(error);
    }

    return data;
}

export async function getCabins() {
    const { data, error } = await supabase
    .from('cabins')
    .select('id, name, maxCapacity, regularPrice, discount, image')
    .order('name');

    if (error) {
        console.error(error);    
        throw new Error('Cabins could not be loaded');
    }

    return data;
}