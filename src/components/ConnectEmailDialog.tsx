import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useAuth } from '@/hooks/useAuth';
import { Mail, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ConnectEmailDialogProps {
  open: boolean;
  onClose: () => void;
  onConnected: () => void;
}

export function ConnectEmailDialog({ open, onClose, onConnected }: ConnectEmailDialogProps) {
  const [isConnecting, setIsConnecting] = useState(false);
  const { connectGmail } = useAuth();
  const { toast } = useToast();

  const handleConnectGmail = async () => {
    setIsConnecting(true);
    try {
      const { error } = await connectGmail();
      
      if (error) {
        toast({
          title: "Connection failed",
          description: error.message,
          variant: "destructive",
        });
      } else {
        // OAuth will redirect to dashboard where initial fetch will happen
        onConnected();
      }
    } catch (error) {
      toast({
        title: "Connection failed",
        description: "Failed to connect Gmail. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsConnecting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Connect your email</DialogTitle>
          <DialogDescription>
            Choose how you want to connect your email to start receiving daily digests.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <Button
            onClick={handleConnectGmail}
            disabled={isConnecting}
            className="w-full justify-start gap-3 h-12"
            variant="outline"
          >
            {isConnecting ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <Mail className="w-5 h-5" />
            )}
            Connect Gmail (OAuth)
          </Button>
          
          <Button
            variant="ghost"
            className="w-full justify-start gap-3 h-12 opacity-50 cursor-not-allowed"
            disabled
          >
            <Mail className="w-5 h-5" />
            Other IMAP (Coming soon)
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}