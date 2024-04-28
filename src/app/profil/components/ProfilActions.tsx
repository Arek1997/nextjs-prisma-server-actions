"use client";

import { Tabs, Tab } from "@nextui-org/react";
import ChangePassword from "./ChangePassword";
import ForgotPassword from "./ForgotPassword";

const ProfilActions = () => {
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

        <Tab key="forgot-password" title="Forgot password">
          <ForgotPassword />
        </Tab>
      </Tabs>
    </>
  );
};

export default ProfilActions;
