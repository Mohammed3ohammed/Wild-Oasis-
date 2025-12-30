"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

export default function Navigation({ session }) {
  const [open, setOpen] = useState(false);

  return (
<nav className="z-50 relative">
      <div className="flex items-center justify-between h-16 px-4">
        <button
          className="md:hidden text-3xl flex items-center justify-center w-10 h-10"
          onClick={() => setOpen(!open)}
        >
          ☰
        </button>


        <ul className="hidden md:flex gap-10 items-center">
          <li>
            <Link href="/cabins">Cabins</Link>
          </li>

          <li>
            <Link href="/about">About</Link>
          </li>

          <li>
            {session?.user?.image ? (
              <Link href="/account" className="flex items-center gap-3">
                <Image
                  className="h-8 w-8 rounded-full"
                  src={session.user.image}
                  alt="User"
                  referrerPolicy="no-referrer"
                />
                <span>Guest area</span>
              </Link>
            ) : (
              <Link href="/account">Guest area</Link>
            )}
          </li>
        </ul>
      </div>


      {open && (
        <ul className="flex flex-col gap-6 mt-6 md:hidden">
          <li>
            <Link href="/cabins" onClick={() => setOpen(false)}>
              Cabins
            </Link>
          </li>

          <li>
            <Link href="/about" onClick={() => setOpen(false)}>
              About
            </Link>
          </li>

          <li>
            <Link href="/account" onClick={() => setOpen(false)}>
              Guest area
            </Link>
          </li>
        </ul>
      )}
    </nav>
  );
}

