
import { getServerSession } from "next-auth";
import ReservationList from "../../components/ReservationList";
import { authConfig } from "../../lib/auth";
import { getBookings } from "../../lib/data-service";
import Link from "next/link";

export const metadata = {
    title: "Reservations",
}

export default async function Page() {
    // const session = await auth();
    //  if (!session || !session.user || !session.user.guestId) return null;

      const session = await getServerSession(authConfig);
  if (!session?.user?.guestId) return null;

    const bookings = await getBookings(session.user.guestId)|| [];

  return (
    <div>
      <h2 className="font-semibold text-2xl text-accent-400 mb-7">
        Your reservations
      </h2>

        {
            bookings.length === 0 ? (
                <p className="text-lg">You have no reservations yet. check out our{" "}
                    <Link href="/cabins" className="underline text-accent-500">luxury cabins &rarr;</Link>
                </p>
            ) : (
                <ReservationList bookings={bookings} />
            )
        }
    </div>
  );
}
