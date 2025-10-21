import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { JobberEmbed } from "./JobberEmbed";

interface JobberDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const JobberDialog = ({ open, onOpenChange }: JobberDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-6xl w-[95vw] h-[90vh] md:h-[95vh] p-0 flex flex-col overflow-hidden gap-0">
        <div className="p-4 pb-3 border-b bg-gradient-to-r from-primary/5 to-accent/5 flex-shrink-0">
          <DialogHeader>
            <DialogTitle className="text-xl md:text-2xl font-bold text-primary pr-8">Schedule Your Service</DialogTitle>
            <DialogDescription className="text-xs md:text-sm mt-1">
              Fill out the form below and we'll reach out within 24 hours with your free, no-pressure quote.
            </DialogDescription>
          </DialogHeader>
        </div>

        <div className="flex-1 overflow-auto min-h-0">
          <JobberEmbed />
        </div>
      </DialogContent>
    </Dialog>
  );
};
