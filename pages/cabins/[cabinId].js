import CabinView from "@/components/CabinView";
import Head from "next/head";
import { getCabin } from "@/lib/data-service";

export async function getServerSideProps({ params }) {
  const cabin = await getCabin(params.cabinId);
  return { props: { cabin } };
}



function Cabin({ cabin }) {
    return (
        <>
            <Head>
                <title>Cabin {cabin.name} The Wild Oasis</title>
            </Head>

            <div className="max-w-6xl mx-auto mt-8">
                    <CabinView cabin={cabin} />
            </div>
        </>
    )
}

export default Cabin;