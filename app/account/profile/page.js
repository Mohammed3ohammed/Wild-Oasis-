// import { auth } from "../../lib/auth";
import { getGuest } from "../../lib/data-service";
import SelectCountry from "../../components/SelectCountry";
import UpdateProfileForm from "../../components/UpdateProfileForm";
import { getServerSession } from "next-auth";




export const metadata = {
  title: "Update profile",
};


export default async function Page() {
    // const session = await auth();
    //   if (!session || !session.user || !session.user.email) return null;

  const session = await getServerSession(authConfig);
  if (!session?.user?.email) return null;

    const guest = await getGuest(session.user.email);
     if (!guest) return null;

     
  return (
    <div>
      <h2 className="font-semibold text-2xl text-accent-400 mb-4">
          Update your guest profile
      </h2>

      <p className="text-lg mb-8 text-primary-200">
        Providing the following information will make your check-in process
        faster and smoother. See you soon !
      </p>

        <UpdateProfileForm>
            <SelectCountry
              name="nationality"
              id="nationality"
              className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
              defaultCountry={guest.nationality}
            />
          </UpdateProfileForm> 


    </div>
  );
}
