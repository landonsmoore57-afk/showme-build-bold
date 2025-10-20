import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { JobberEmbed } from "./JobberEmbed";

interface JobberDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const JobberDialog = ({ open, onOpenChange }: JobberDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-primary">Schedule Your Service</DialogTitle>
          <DialogDescription>
            Fill out the form below and we'll reach out within 24 hours with your free, no-pressure quote.
          </DialogDescription>
        </DialogHeader>

        <div className="mt-4">
          <JobberEmbed />
        </div>
      </DialogContent>
    </Dialog>
  );
};
