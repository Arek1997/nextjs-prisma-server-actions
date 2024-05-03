import ChangePassword from "./components/ChangePassword";
import ForgotPassword from "./components/ForgotPassword";

type Props = {
  searchParams: { [key: string]: string | undefined };
};

const ReserPasswordPage = ({ searchParams }: Props) => {
  const token = searchParams.token;

  return (
    <div className="mx-auto mt-4 max-w-[300px] space-y-4 text-left">
      {token ? <ChangePassword token={token} /> : <ForgotPassword />}
    </div>
  );
};

export default ReserPasswordPage;
