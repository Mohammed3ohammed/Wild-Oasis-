import Link from "next/link";
import Image from "next/image";
import { authConfig } from "../lib/auth";
import { getServerSession } from "next-auth";

export default async function Navigation() {
  const session = await getServerSession(authConfig);

  return (
    <nav className="z-10 text-xl">
      <ul className="flex gap-16 items-center">
        <li>
          <Link href="/cabins">Cabins</Link>
        </li>

        <li>
          <Link href="/about">About</Link>
        </li>

        <li>
          {session?.user?.image ? (
            <Link
              href="/account"
              className="flex items-center gap-4"
            >
              <Image
                className="h-8 w-8 rounded-full"
                src={session.user.image}
                alt={session.user.name}
                referrerPolicy="no-referrer"
              />
              <span>Guest area</span>
            </Link>
          ) : (
            <Link href="/account">Guest area</Link>
          )}
        </li>
      </ul>
    </nav>
  );
}
