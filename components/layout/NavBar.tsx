import Container from "./Container";
import ThemeToggle from "./ThemeToggle";
import { MdNoteAlt } from "react-icons/md";
import SearchInput from "./SearchInput";
import Notifications from "./Notifications";
import UserButton from "./UserButton";
import Link from "next/link";

const NavBar = () => {
  return (
    <nav className="fixed left-0 right-0 top-0 z-50 bg-white dark:bg-slate-900 border-b">
      <Container>
        <div className="flex justify-between items-center gap-8">
          {/* Logo and brand name */}
          <div className="flex items-center gap-1 cursor-pointer">
            <MdNoteAlt size={24} />
            <div className="font-bold text-xl">WEBDEV.blog</div>
          </div>

          <SearchInput />

          {/* Right side nav */}
          <div className="flex gap-5 sm:gap-8 items-center justify-center">
            <ThemeToggle />
            <Notifications />
            <UserButton />
            <>
              <Link href="/login">Login</Link>
              <Link href="/register">Register</Link>
            </>
          </div>
        </div>
      </Container>
    </nav>
  );
};

export default NavBar;
