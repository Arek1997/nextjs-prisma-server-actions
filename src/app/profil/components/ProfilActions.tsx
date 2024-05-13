"use client";

import { Tabs, Tab } from "@nextui-org/react";
import Link from "next/link";
import ChangePassword from "./ChangePassword";
import DeleteProfile from "./DeleteProfile";

type Props = {
  userEmail: string;
};

const ProfilActions = ({ userEmail }: Props) => {
  return (
    <>
      <h2 className="mb-4 mt-6 font-bold">Profil action</h2>
      <Tabs
        aria-label="Profile actions"
        fullWidth
        radius="none"
        variant="underlined"
      >
        <Tab key="change-password" title="Change password">
          <ChangePassword />
        </Tab>

        <Tab
          key="forgot-password"
          title="Forgot password"
          as={Link}
          href="/reset-password"
        />

        <Tab key="delete-profile" title="Delete profile">
          <DeleteProfile userEmail={userEmail} />
        </Tab>
      </Tabs>
    </>
  );
};

export default ProfilActions;
