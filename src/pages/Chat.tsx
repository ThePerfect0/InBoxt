import { useState, useEffect, useRef } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useToast } from '@/hooks/use-toast';
import { Send, Loader2, Trash2, MessageSquare } from 'lucide-react';
import { format } from 'date-fns';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  created_at: string;
}

export const Chat = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [conversationId, setConversationId] = useState<string | null>(null);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    loadConversation();
  }, [user]);

  const loadConversation = async () => {
    if (!user) return;

    try {
      // Get most recent conversation
      const { data: conversations, error: convError } = await supabase
        .from('chat_conversations')
        .select('id')
        .eq('user_id', user.id)
        .order('updated_at', { ascending: false })
        .limit(1);

      if (convError) throw convError;

      if (conversations && conversations.length > 0) {
        const convId = conversations[0].id;
        setConversationId(convId);

        // Load messages
        const { data: msgs, error: msgsError } = await supabase
          .from('chat_messages')
          .select('*')
          .eq('conversation_id', convId)
          .order('created_at', { ascending: true });

        if (msgsError) throw msgsError;
        
        // Filter to only include user and assistant messages
        const validMessages = (msgs || []).filter(
          msg => msg.role === 'user' || msg.role === 'assistant'
        ) as Message[];
        
        setMessages(validMessages);
      }
    } catch (error) {
      console.error('Error loading conversation:', error);
    }
  };

  const handleSend = async () => {
    if (!inputMessage.trim() || isLoading) return;

    const userMessage = inputMessage.trim();
    setInputMessage('');
    
    // Optimistically add user message
    const optimisticMessage: Message = {
      id: 'temp-' + Date.now(),
      role: 'user',
      content: userMessage,
      created_at: new Date().toISOString()
    };
    setMessages(prev => [...prev, optimisticMessage]);
    setIsLoading(true);

    try {
      const { data, error } = await supabase.functions.invoke('chat-assistant', {
        body: {
          conversationId,
          message: userMessage
        }
      });

      if (error) throw error;

      if (data.error) {
        throw new Error(data.error);
      }

      // Update conversation ID if it was created
      if (data.conversationId && !conversationId) {
        setConversationId(data.conversationId);
      }

      // Add assistant message
      const assistantMessage: Message = {
        id: 'assistant-' + Date.now(),
        role: 'assistant',
        content: data.message,
        created_at: new Date().toISOString()
      };

      setMessages(prev => prev.map(msg => 
        msg.id === optimisticMessage.id ? { ...msg, id: 'user-' + Date.now() } : msg
      ).concat(assistantMessage));

    } catch (error: any) {
      console.error('Error sending message:', error);
      
      // Remove optimistic message on error
      setMessages(prev => prev.filter(msg => msg.id !== optimisticMessage.id));
      
      toast({
        title: 'Error',
        description: error.message || 'Failed to send message. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleClearConversation = async () => {
    if (!conversationId) return;

    try {
      const { error } = await supabase
        .from('chat_conversations')
        .delete()
        .eq('id', conversationId);

      if (error) throw error;

      setMessages([]);
      setConversationId(null);
      
      toast({
        title: 'Success',
        description: 'Conversation cleared successfully',
      });
    } catch (error) {
      console.error('Error clearing conversation:', error);
      toast({
        title: 'Error',
        description: 'Failed to clear conversation',
        variant: 'destructive',
      });
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <MessageSquare className="w-5 h-5 text-foreground-muted" />
          <h2 className="text-heading-sm text-foreground">AI Chat Assistant</h2>
          <span className="text-body-sm text-foreground-muted">
            Ask about your emails and tasks
          </span>
        </div>
        {messages.length > 0 && (
          <Button
            variant="outline"
            size="sm"
            onClick={handleClearConversation}
            className="gap-2"
          >
            <Trash2 className="h-4 w-4" />
            Clear
          </Button>
        )}
      </div>

      {/* Chat Container */}
      <div className="bg-card border border-border-subtle rounded-lg overflow-hidden flex flex-col h-[calc(100vh-16rem)]">
        {/* Messages */}
        <ScrollArea className="flex-1 p-6" ref={scrollAreaRef}>
          <div className="space-y-4">
            {messages.length === 0 ? (
              <div className="text-center py-12">
                <MessageSquare className="h-12 w-12 mx-auto text-foreground-muted mb-4" />
                <h3 className="text-lg font-medium text-foreground mb-2">
                  Start a conversation
                </h3>
                <p className="text-sm text-foreground-muted">
                  Ask me anything about your emails, tasks, or email management
                </p>
              </div>
            ) : (
              messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] rounded-lg px-4 py-2.5 ${
                      msg.role === 'user'
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-surface text-card-foreground border border-border-subtle'
                    }`}
                  >
                    <p className="text-sm whitespace-pre-wrap break-words">{msg.content}</p>
                    <p
                      className={`text-xs mt-1 ${
                        msg.role === 'user'
                          ? 'text-primary-foreground/70'
                          : 'text-foreground-muted'
                      }`}
                    >
                      {format(new Date(msg.created_at), 'h:mm a')}
                    </p>
                  </div>
                </div>
              ))
            )}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-surface text-card-foreground border border-border-subtle rounded-lg px-4 py-2.5">
                  <Loader2 className="h-4 w-4 animate-spin" />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>

        {/* Input */}
        <div className="p-4 border-t border-border-subtle bg-surface">
          <div className="flex gap-2">
            <Input
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask me about your emails..."
              disabled={isLoading}
              className="flex-1 min-h-[44px]"
            />
            <Button
              onClick={handleSend}
              disabled={!inputMessage.trim() || isLoading}
              size="icon"
              className="min-h-[44px] min-w-[44px]"
            >
              {isLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Send className="h-4 w-4" />
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};