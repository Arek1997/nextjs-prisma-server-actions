"use client";

import { useState } from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Button,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
} from "@nextui-org/react";
import Logo from "@/components/Logo";
import { usePathname } from "next/navigation";

const menuItems = [
  {
    name: "Posts",
    href: "/posts",
  },
  {
    name: "Log Out",
    href: null,
  },
] as const;

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const pathname = usePathname();

  return (
    <Navbar
      onMenuOpenChange={setIsMenuOpen}
      classNames={{
        wrapper: "px-4",
      }}
    >
      <NavbarContent>
        <NavbarMenuToggle
          aria-expanded={isMenuOpen}
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />
        <NavbarBrand>
          <Link href="/" color="foreground">
            <Logo />
            <p className="font-bold text-inherit">ACME</p>
          </Link>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden gap-4 sm:flex" justify="center">
        {menuItems.map(({ name, href }, index) => {
          if (name === "Log Out") return;

          return (
            <NavbarItem isActive={href === pathname} key={`${name}-${index}`}>
              <Link
                href={href}
                aria-current={href === pathname ? "page" : "false"}
                color={href === pathname ? "primary" : "foreground"}
              >
                {name}
              </Link>
            </NavbarItem>
          );
        })}
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem>
          <Button
            as={Link}
            color="primary"
            href={isLoggedIn ? "/logout" : "/signup"}
            variant="flat"
          >
            {isLoggedIn ? "Log Out" : "Sign Up"}
          </Button>
        </NavbarItem>
      </NavbarContent>
      <NavbarMenu>
        {menuItems.map(({ name, href }, index) => {
          if (name === "Log Out") return;
          return (
            <NavbarMenuItem key={`${name}-${index}`}>
              <Link
                color={href === pathname ? "primary" : "foreground"}
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
    </Navbar>
  );
};

export default Navigation;
