import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Sidebar from "./Sidebar";
import MenuIcon from "@mui/icons-material/Menu";
import { useState } from "react";

function Hamburger() {
  const [open, setOpen] = useState(false);
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="outline"
          className="border-none outline-none shadow-none"
          onClick={() => setOpen(true)}
        >
          <MenuIcon />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-64">
        <SheetHeader className="text-left pb-6 border-b border-slate-50">
          <div className="flex items-center gap-3">
            {/* Wahi Logo Icon jo Sidebar mein use kiya tha */}
            <div className="h-9 w-9 bg-blue-600 rounded-xl flex items-center justify-center shadow-md shadow-blue-100">
              <span className="text-white text-xl font-black">N</span>
            </div>

            <div className="flex flex-col">
              <SheetTitle className="text-xl font-black text-slate-900 tracking-tighter leading-none">
                NEXUS
              </SheetTitle>
              <SheetDescription className="text-[10px] font-bold text-blue-500 tracking-[1.5px] uppercase mt-1">
                Admin Panel
              </SheetDescription>
            </div>
          </div>
        </SheetHeader>
        <SheetClose asChild>
          <Sidebar closeSheet={() => setOpen(false)} />
        </SheetClose>
      </SheetContent>
    </Sheet>
  );
}

export default Hamburger;
