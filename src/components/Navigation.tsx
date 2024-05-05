"use client";

import { useState } from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Button,
  Link,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
} from "@nextui-org/react";
import Logo from "@/components/Logo";
import { usePathname } from "next/navigation";
import ThemeSwitch from "./ThemeSwitch";
import { logOutHandler } from "@/app/actions/logout";

const menuItems = [
  {
    name: "Posts",
    href: "/posts",
  },
  {
    name: "Profil",
    href: "/profil",
  },
] as const;

type Props = {
  hasSession: string | undefined;
};
const Navigation = ({ hasSession }: Props) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <Navbar
      onMenuOpenChange={setIsMenuOpen}
      classNames={{
        wrapper: "px-4",
      }}
    >
      <NavbarContent>
        {hasSession && (
          <NavbarMenuToggle
            aria-expanded={isMenuOpen}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            className="sm:hidden"
          />
        )}
        <NavbarBrand>
          <Link href="/" color="foreground">
            <Logo />
            <p className="font-bold text-inherit">ACME</p>
          </Link>
        </NavbarBrand>
      </NavbarContent>

      {hasSession && (
        <NavbarContent className="hidden gap-4 sm:flex" justify="center">
          {menuItems.map(({ name, href }, index) => {
            const isActive = pathname.includes(href);

            return (
              <NavbarItem isActive={isActive} key={`${name}-${index}`}>
                <Link
                  href={href}
                  aria-current={href === pathname ? "page" : "false"}
                  color={isActive ? "primary" : "foreground"}
                >
                  {name}
                </Link>
              </NavbarItem>
            );
          })}
        </NavbarContent>
      )}
      <NavbarContent justify="end">
        <ThemeSwitch />
        <NavbarItem>
          {hasSession ? (
            <Button
              color="primary"
              variant="flat"
              onPress={() => logOutHandler()}
            >
              Log Out
            </Button>
          ) : (
            <Button as={Link} href="/signup" color="primary" variant="flat">
              Sign Up
            </Button>
          )}
        </NavbarItem>
      </NavbarContent>
      {hasSession && (
        <NavbarMenu>
          {menuItems.map(({ name, href }, index) => {
            const isActive = pathname.includes(href);

            return (
              <NavbarMenuItem key={`${name}-${index}`}>
                <Link
                  color={isActive ? "primary" : "foreground"}
                  aria-current={href === pathname ? "page" : "false"}
                  className="w-full"
                  href={href}
                >
                  {name}
                </Link>
              </NavbarMenuItem>
            );
          })}
        </NavbarMenu>
      )}
    </Navbar>
  );
};

export default Navigation;
