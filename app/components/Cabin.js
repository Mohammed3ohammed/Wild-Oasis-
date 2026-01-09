import Image from "next/image";
import TextExpander from "./TextExpander";
import { MapPinIcon, UsersIcon } from "@heroicons/react/24/solid";

function Cabin({ cabin }) {
  const {
    name,
    maxCapacity,
    image,
    description,
  } = cabin;

  return (
<div
  className="
    grid
    grid-cols-1
    lg:grid-cols-[3fr_4fr]
    gap-6
    lg:gap-20
    border
    border-primary-800
    py-6
    px-4
    lg:px-10
    mb-12
    max-w-[95%]       
    lg:max-w-full
    mx-auto           
  "
>
  <div
    className="
      relative
      w-full
       aspect-[1/1]     
      lg:aspect-auto
      rounded-lg
      overflow-hidden
      shadow-lg
    "
  >
    <Image
      src={image}
      fill
      className="object-cover"
      alt={`Cabin ${name}`}
    />
  </div>

  <div className="text-center lg:text-left">
    <h3
      className="
        text-accent-100
        font-black
        text-3xl
        sm:text-4xl
        lg:text-7xl
        mb-5
        bg-primary-950
        p-4
        lg:p-6
        rounded-md
        inline-block
      "
    >
      Cabin {name}
    </h3>

    <p className="text-base sm:text-lg text-primary-300 my-6">
      <TextExpander>{description}</TextExpander>
    </p>

    <ul className="flex flex-col gap-3 mb-4 items-center lg:items-start">
      <li className="flex gap-3 items-center">
        <UsersIcon className="h-5 w-5 text-primary-600" />
        <span>
          For up to <span className="font-bold">{maxCapacity}</span> guests
        </span>
      </li>

      <li className="flex gap-3 items-center">
        <MapPinIcon className="h-5 w-5 text-primary-600" />
        <span>
          Located in the heart of the <span className="font-bold">Dolomites</span> (Italy)
        </span>
      </li>

      <li>
        Privacy <span className="font-bold">100%</span> guaranteed
      </li>
    </ul>
  </div>
</div>

  );
}

export default Cabin;
