import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { JobberEmbed } from "./JobberEmbed";

interface JobberDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const JobberDialog = ({ open, onOpenChange }: JobberDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl h-[85vh] p-0 flex flex-col">
        <div className="p-6 pb-4 border-b bg-gradient-to-r from-primary/5 to-accent/5">
          <DialogHeader>
            <DialogTitle className="text-3xl font-bold text-primary">Schedule Your Service</DialogTitle>
            <DialogDescription className="text-base mt-2">
              Fill out the form below and we'll reach out within 24 hours with your free, no-pressure quote.
            </DialogDescription>
          </DialogHeader>
        </div>

        <div className="flex-1 overflow-hidden">
          <JobberEmbed className="h-full" />
        </div>
      </DialogContent>
    </Dialog>
  );
};
