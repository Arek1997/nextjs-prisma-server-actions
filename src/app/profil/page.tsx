import { redirect } from "next/navigation";
import { getUserById } from "../actions/getUser";
import ProfilActions from "./components/ProfilActions";
import { formatDate } from "@/utils/functions";

const ProfilPage = async () => {
  const currentUser = await getUserById();

  if (!currentUser) {
    redirect("/login");
  }

  return (
    <section className="mt-10 md:mx-auto md:max-w-[500px]">
      <article className="space-y-4 rounded-xl border border-black p-4 text-left dark:border-white">
        <h1 className="text-center font-bold">Profil details</h1>
        <p className="flex items-center justify-between gap-4">
          Name: <span>{currentUser.name}</span>
        </p>
        <p className="flex items-center justify-between gap-4">
          Email:
          <span>{currentUser.email}</span>
        </p>
        <p className="flex items-center justify-between gap-4">
          Created at:
          <span> {formatDate(currentUser.createdAt)}</span>
        </p>
        {currentUser.modifiedAt && (
          <p className="flex items-center justify-between gap-4">
            Last modification:
            <span>{formatDate(currentUser.modifiedAt)}</span>
          </p>
        )}
      </article>

      <ProfilActions userEmail={currentUser.email} />
    </section>
  );
};

export default ProfilPage;
