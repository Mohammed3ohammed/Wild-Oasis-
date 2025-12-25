// import { notFound } from "next/navigation";
// import { eachDayOfInterval } from "date-fns";
// import { supabase } from "./supabase";

// export async function getCabin(id) {
//     const { data, error } = await supabase
//     .from('cabins')
//     .select('*')
//     .eq('id', id)
//     .single();

//     if (error) {
//         console.error(error);
//         notFound();
//     }

//     return data;
// }

// export async function getCabinPrice(id) {
//     const { data, error } = await supabase
//     .from("cabins")
//     .select("regularPrice, discount")
//     .eq("id", id)
//     .single();

//     if (error) {
//         console.error(error)
//     }

//     return data
// }

// export const getCabins =  async function () {
//     const { data, error } = await supabase
//     .from('cabins')
//     .select('id, name, maxCapacity, regularPrice, discount, image')
//     .order('name');

//     if (error) {
//         console.error(error);    
//         throw new Error('Cabins could not be loaded');
//     }

//     return data;
// }

// export async function getGuest(email) {
//     const { data, error } = await supabase
//     .from("guests")
//     .select("*")
//     .eq("email", email)
//     .single();

//     return data
// }

// export async function getBooking(id) {
//     const { data, error, count } = await supabase
//     .from("bookings")
//     .select("*")
//     .eq("id", id)
//     .single();

//     if (error) {
//         console.error(error);
//         throw new Error("Booking could not get loaded");
//     }

//     return data;
// }

// export async function getBookings(guestId) {
//     const { data, error, count } = await supabase
//     .from("bookings")
//     .select("id, created_at, startDate, endDate, numNights, numGuests, totalPrice, guestId, cabinId, cabins(name, image)")
//     .eq("guestId", guestId)
//     .order("startDate");

//     if (error) {
//         console.error(error);
//         throw new Error("Bookings could not get loaded");
//     }

//     return data;
// }

// export async function getBookedDatesByCabinId(cabinId) {
//     let today = new Date();
//     today.setUTCHours(0, 0, 0, 0);
//     today = today.toISOString();

//     const { data, error } = await supabase
//     .from("bookings")
//     .select("*")
//     .eq("cabinId", cabinId)
//     .or(`startDate.get.${today},status.eq.checked-in`)

//     if (error) {
//         console.error(error);
//         throw new Error("Bookings could not get loaded");
//     }

//     const bookedDates = data 
//     .map((booking) => {
//         return eachDayOfInterval({
//             start: new Date(booking.startDate),
//             end: new Date(booking.endDate),
//         });
//     })
//     .flat();

//     return bookedDates;

// }

// export async function getSettings() {
//     const { data, error} = await supabase.from("settings").select("*").single();

//     if (error) {
//         console.error(error);
//         throw new Error("Settings could not be loaded");
//     }

//     return data;
// }

// export async function getCountries() {
//     try {
//         const res = await fetch(
//         "https://restcountries.com/v2/all?fields=name,flag"
//     );
//     const countries = await res.json();
//     return countries; 
//     } catch {
//         throw new Error("Could not fetch countries");
//     }
// }

// export async function createGuest(newGuest) {
//     const { data, error } = await supabase.from("guests").insert([newGuest]);

//     if (error) {
//         console.error(error);
//         throw new Error("Guest could not be created");
//     }

//     return data;
// }


import { notFound } from "next/navigation";
import { eachDayOfInterval } from "date-fns";
import { supabase } from "./supabase";

// جلب بيانات كابينة واحدة
export async function getCabin(id) {
    const { data, error } = await supabase
        .from('cabins')
        .select('*')
        .eq('id', id)
        .maybeSingle(); // بدل single() عشان آمن لو مفيش صف

    if (error || !data) {
        console.error(error);
        notFound();
    }

    return data;
}

// جلب سعر الكابينة
export async function getCabinPrice(id) {
    const { data, error } = await supabase
        .from("cabins")
        .select("regularPrice, discount")
        .eq("id", id)
        .maybeSingle(); // بدل single()

    if (error) {
        console.error(error);
    }

    return data;
}

// جلب كل الكابينات
export const getCabins = async function () {
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

// جلب بيانات ضيف واحد
export async function getGuest(email) {
    const { data, error } = await supabase
        .from("guests")
        .select("*")
        .maybeSingle();

    if (error) {
        console.error(error);
    }

    return data;
}

// جلب حجز واحد
export async function getBooking(id) {
    const { data, error } = await supabase
        .from("bookings")
        .select("*")
        .eq("id", id)
        .maybeSingle();

    if (error) {
        console.error(error);
        throw new Error("Booking could not get loaded");
    }

    return data;
}

// جلب كل الحجوزات لضيف معين
export async function getBookings(guestId) {
    const { data, error } = await supabase
        .from("bookings")
        .select("id, created_at, startDate, endDate, numNights, numGuests, totalPrice, guestId, cabinId, cabins(name, image)")
        .eq("guestId", guestId)
        .order("startDate");

    if (error) {
        console.error(error);
        throw new Error("Bookings could not get loaded");
    }

    return data;
}

// جلب الأيام المحجوزة لكابينة
export async function getBookedDatesByCabinId(cabinId) {
    const today = new Date();
    today.setUTCHours(0, 0, 0, 0);

    const { data, error } = await supabase
        .from("bookings")
        .select("*")
        .eq("cabinId", cabinId)
        .gte("endDate", today.toISOString()) // كل الحجوزات اللي لسه شغالة
        .order("startDate");

    if (error) {
        console.error(error);
        throw new Error("Bookings could not get loaded");
    }

    const bookedDates = data
        .map((booking) => eachDayOfInterval({
            start: new Date(booking.startDate),
            end: new Date(booking.endDate),
        }))
        .flat();

    return bookedDates;
}

// جلب إعدادات الموقع
export async function getSettings() {
    const { data, error } = await supabase
        .from("settings")
        .select("*");

    if (error) {
        console.error(error);
        throw new Error("Settings could not be loaded");
    }

    return data[0] || null; // ارجع أول صف فقط أو null لو مفيش
}

// جلب قائمة الدول
export async function getCountries() {
    try {
        const res = await fetch(
            "https://restcountries.com/v2/all?fields=name,flag"
        );
        const countries = await res.json();
        return countries; 
    } catch (error) {
        console.error(error);
        throw new Error("Could not fetch countries");
    }
}

// إنشاء ضيف جديد
export async function createGuest(newGuest) {
    const { data, error } = await supabase
        .from("guests")
        .insert([newGuest]);

    if (error) {
        console.error(error);
        throw new Error("Guest could not be created");
    }

    return data;
}
