import { notFound } from "next/navigation";
import { eachDayOfInterval } from "date-fns";
import { supabase } from "./supabase";

export async function getCabin(id) {
    const { data, error } = await supabase
    .from('cabins')
    .select('*')
    .eq('id', id)
    .single();

    if (error) {
        console.error(error);
        notFound();
    }

    return data;
}

export async function getCabinPrice(id) {
    const { data, error } = await supabase
    .from("cabins")
    .select("regularPrice, discount")
    .eq("id", id)
    .single();

    if (error) {
        console.error(error)
    }

    return data
}

export const getCabins =  async function () {
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

export async function getGuest(email) {
    const { data, error } = await supabase
    .from("guests")
    .select("*")
    .eq("email", email)
    .single();

    return data
}

export async function getBooking(id) {
    const { data, error, count } = await supabase
    .from("bookings")
    .select("*")
    .eq("id", id)
    .single();

    if (error) {
        console.error(error);
        throw new Error("Booking could not get loaded");
    }

    return data;
}