import {
  FileIcon,
  LogOutIcon,
  PencilIcon,
  SettingsIcon,
  Shield,
  UserIcon,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { FaRegBookmark } from "react-icons/fa";

const UserButton = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar>
          <AvatarImage src="" />
          <AvatarFallback className="border-2 border-gray-200 dark:border-gray-700">
            <UserIcon size={20} />
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem>
          <button className="flex items-center gap-2">
            <UserIcon size={18} /> Profile
          </button>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <button className="flex items-center gap-2">
            <PencilIcon size={18} /> Create Post
          </button>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <button className="flex items-center gap-2">
            <FaRegBookmark size={18} /> Bookmark
          </button>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <button className="flex items-center gap-2">
            <Shield size={18} /> Admin
          </button>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <button className="flex items-center gap-2">
            <LogOutIcon size={18} /> Logout
          </button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
export default UserButton;
