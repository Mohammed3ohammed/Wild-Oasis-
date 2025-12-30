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
        gap-10
        lg:gap-20
        border
        border-primary-800
        py-6
        px-6
        lg:px-10
        mb-24
      "
    >

      <div
        className="
          relative
          aspect-[4/3]
          lg:aspect-auto
          lg:scale-[1.15]
          lg:-translate-x-3
        "
      >
        <Image
          src={image}
          fill
          className="object-cover"
          alt={`Cabin ${name}`}
        />
      </div>


      <div>
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
            lg:pb-1
            lg:w-[150%]
            lg:-translate-x-[254px]
          "
        >
          Cabin {name}
        </h3>

        <p className="text-base sm:text-lg text-primary-300 mb-10">
          <TextExpander>{description}</TextExpander>
        </p>

        <ul className="flex flex-col gap-4 mb-7">
          <li className="flex gap-3 items-center">
            <UsersIcon className="h-5 w-5 text-primary-600" />
            <span>
              For up to <span className="font-bold">{maxCapacity}</span> guests
            </span>
          </li>

          <li className="flex gap-3 items-center">
            <MapPinIcon className="h-5 w-5 text-primary-600" />
            <span>
              Located in the heart of the{" "}
              <span className="font-bold">Dolomites</span> (Italy)
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
