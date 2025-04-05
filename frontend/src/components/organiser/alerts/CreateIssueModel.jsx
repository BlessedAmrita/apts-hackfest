import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const CreateIssueModal = ({ open, onClose }) => {
  const { toast } = useToast();
  const [category, setCategory] = useState("");
  const [severity, setSeverity] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    toast({
      title: "Issue reported",
      description: "Your issue has been reported successfully.",
    });
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Report New Issue</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 pt-4">
          <div className="space-y-2">
            <label htmlFor="title" className="text-sm font-medium">Issue Title</label>
            <Input id="title" placeholder="Brief description of the issue" required />
          </div>
          <div className="space-y-2">
            <label htmlFor="description" className="text-sm font-medium">Detailed Description</label>
            <Textarea id="description" placeholder="Provide more details about the issue" required />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="location" className="text-sm font-medium">Location</label>
              <Input id="location" placeholder="Where is the issue?" required />
            </div>
            <div className="space-y-2">
              <label htmlFor="category" className="text-sm font-medium">Category</label>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger id="category">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="technical">Technical</SelectItem>
                  <SelectItem value="crowd">Crowd Management</SelectItem>
                  <SelectItem value="medical">Medical</SelectItem>
                  <SelectItem value="security">Security</SelectItem>
                  <SelectItem value="vip">VIP</SelectItem>
                  <SelectItem value="inventory">Inventory</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="space-y-2">
            <label htmlFor="severity" className="text-sm font-medium">Severity Level</label>
            <Select value={severity} onValueChange={setSeverity}>
              <SelectTrigger id="severity">
                <SelectValue placeholder="Select severity" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="low">Low</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="critical">Critical</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
            <Button type="submit">Report Issue</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateIssueModal;
