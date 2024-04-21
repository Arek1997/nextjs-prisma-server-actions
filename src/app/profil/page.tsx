import { redirect } from "next/navigation";
import { getUser } from "./api";
import ChangePassword from "./components/ChangePassword";

const ProfilPage = async () => {
  const currentUser = await getUser();

  if (!currentUser) {
    redirect("/login");
  }

  return (
    <section className="mt-10 md:mx-auto md:max-w-[400px]">
      <article className="space-y-4 border border-black p-4 text-left dark:border-white">
        <h1 className="text-center font-bold">Profil details</h1>
        <p className="flex items-center justify-between gap-4">
          Profile name: <span>{currentUser.name}</span>
        </p>
        <p className="flex items-center justify-between gap-4">
          Profile email:
          <span>{currentUser.email}</span>
        </p>
        <p className="flex items-center justify-between gap-4">
          Profile created at:
          <span> {new Date(currentUser.createdAt).toLocaleDateString()}</span>
        </p>
        {currentUser.modifiedAt && (
          <p className="flex items-center justify-between gap-4">
            Last modification:
            <span>{new Date(currentUser.modifiedAt).toLocaleDateString()}</span>
          </p>
        )}
      </article>
      <ChangePassword />
    </section>
  );
};

export default ProfilPage;
