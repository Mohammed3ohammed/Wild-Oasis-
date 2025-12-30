import Image from "next/image";
import Link from "next/link";

function Logo() {
  return (
    <Link href="/" className="flex items-center gap-3 z-10 h-16 shrink-0">
      <Image
        src="/logo.png"
        height={50}
        width={50}
        alt="The Wild Oasis logo"
        priority
      />


      <span className="hidden sm:block text-xl font-semibold text-primary-100 leading-none">
        The Wild Oasis
      </span>
    </Link>
  );
}

export default Logo;
