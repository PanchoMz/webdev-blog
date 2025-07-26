import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Bell } from "lucide-react";

const Notifications = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="relative">
        <div
          className="absolute bottom-2 left-2 bg-rose-500 text-white rounded-full w-5 h-5 
        flex items-center justify-center text-xs"
        >
          <span>3</span>
        </div>
        <Bell size={20} />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-full max-w-[400px]">
        <div className="flex justify-between items-center gap-4 mb-2 p-2">
          <h3 className="text-lg font-semibold">Notifications</h3>
          <button className="text-sm text-muted-foreground">
            Mark all as read
          </button>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
export default Notifications;
