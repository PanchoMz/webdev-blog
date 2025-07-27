import { Search } from "lucide-react";
import { Input } from "../ui/input";

const SearchInput = () => {
  return (
    <div className="relative hidden sm:block w-full">
      <Search className="absolute left-2 top-1/2 -translate-y-1/2 text-muted-foreground" />
      <Input
        placeholder="Search..."
        className="pl-10 bg-primary/10 w-[200px]"
      />
    </div>
  );
};

export default SearchInput;
