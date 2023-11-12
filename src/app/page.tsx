import { Button, Input } from "@nextui-org/react";

const HomePage = () => {
  return (
    <div className="mx-auto flex max-w-[500px] items-center justify-center gap-5">
      <Input type="text" label="Your status" />
      <Button variant="light" className="uppercase">
        Update
      </Button>
    </div>
  );
};

export default HomePage;
