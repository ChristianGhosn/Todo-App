"use client";

import { useSession, signOut } from "next-auth/react";
import Button from "./button";

const Navbar = () => {
  const { data: session } = useSession();
  return (
    <nav>
      <div className="w-full h-12 flex items-center justify-between px-2">
        <span>{session ? `${session.user.name}'s` : ""} Todo List</span>
        {session && <Button type="button" onClick={signOut} label="Sign Out" />}
      </div>
    </nav>
  );
};

export default Navbar;
