import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";
import { ContactUs } from "./ContactUs";
import { ReactNode, useState } from "react";

interface ContactModalProps {
  children: ReactNode;
}

export function ContactModal({ children }: ContactModalProps) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="max-w-4xl p-0 bg-transparent border-none shadow-none">
        <div className="max-h-[90vh] overflow-y-auto rounded-2xl">
          <ContactUs />
        </div>
      </DialogContent>
    </Dialog>
  );
}
